/**
 * @Author : HungBV
 */
import async from 'async';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import Router from 'react-router';
import exphbs from 'express-handlebars';
import mainAppRoutes from './route/MainAppRoute';
var r = require('rethinkdb');

/*
 * Server configure
 */
var config = require(__dirname + '/config/express.js');
var rethinkdb = require(__dirname + '/utils/rethinkdb.js');

var app = express();

//For serving the index.html and all the other front-end assets.
// parse application/json
app.use(bodyParser.json());
/*
* Handlebars Template engine
*/

//app.enable('view cache');
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        body: function () { return 'FOO!'; }
    }
});
app.engine('.hbs', exphbs({extname: '.hbs'}));

/*
* View Express Configure
*/
app.set('view engine', '.hbs');

/*
 * Store the db connection and start listening on a port.
 */
function startExpress(connection) {
  app.listen(config.port);
  console.log('Listening on port ' + config.port);
};

/*
 * Page-not-found middleware.
 */
function handle404(req, res, next) {
  res.status(404).end('The page can not displayed');
}

/*
 * Generic error handling middleware.
 * Send back a 500 page and log the error to the console.
 */
function handleError(res, error) {
  return res.status(500).send({error: error.message})
}

function routing(req, res, next) {
    var router = Router.create({location: req.url, routes: mainAppRoutes})
    router.run(function(Handler, state) {
      var html = React.renderToString(<Handler/>)
      return res.render('index', {body: html})
    })
}

/*
 * Retrieve all task group items.
 */
function listTaskGroupItems(req, res, next) {
  r.table('taskGroup').orderBy({index: 'index'}).run(req.rdbConnection, function(err, cursor) {
    if(err) {
      return next(err);
    }

    //Retrieve all the task group in an array.
    cursor.toArray(function(err, result) {
      if(err) {
        return next(err);
      }
      res.json(result);
    });
  });
}

function listTaskItems(req, res, next) {
  var taskGroupId = req.query.groupId;
  
  if (taskGroupId == null) {
    handleError(res, new Error("The task group id required"))
  }

  r.table('task').orderBy({index: r.desc('index')}).filter(r.row("taskGroupId").eq(taskGroupId)).run(req.rdbConnection, function(err, cursor) {
    if(err) {
      return next(err);
    }

    cursor.toArray(function(err, result) {
      if(err) {
        return next(err);
      }
      res.json(result);
    });
  });
}

/*
 * Retrieve all todo items.
 */
function newTaskGroupItem(req, res) {
  r.table('taskGroup').max('index').pluck('index').default({index:0}).run(req.rdbConnection, function(error, max) {
    var taskGroup = {
      name : 'Untitled',
      index : max.index + 1,
      updateTm : r.now()
    };
    r.table('taskGroup').insert(taskGroup, {returnChanges: true}).run(req.rdbConnection, function(error, result) {
      if (error) {
          handleError(res, error) 
      }
      else if (result.inserted !== 1) {
          handleError(res, new Error("Document was not inserted.")) 
      }
      else {
          res.send(result.changes[0].new_val);
      }
    });
  });
}


function newTaskItem(req, res) {
  
  var taskGroupId = req.body.groupId;

  if (taskGroupId == null) {
    handleError(res, new Error("The task group id required"))
  }
  
  r.table('task').filter(r.row("taskGroupId").eq(taskGroupId)).max('index').pluck('index').default({index:0}).run(req.rdbConnection, function(error, max) {
    var task = {
      taskGroupId: taskGroupId,
      text : 'Untitled',
      index : max.index + 1,
      updateTm : r.now()
    };
    r.table('task').insert(task, {returnChanges: true}).run(req.rdbConnection, function(error, result) {
      if (error) {
          handleError(res, error) 
      } else if (result.inserted !== 1) {
          handleError(res, new Error("Document was not inserted.")) 
      } else {
          res.send(result.changes[0].new_val);
      }
    });
  });
}

/*
 * Update task group item.
 */
function updateTaskGroupItem(req, res) {
  var taskGroup;
  try {
    taskGroup = JSON.parse(req.body.json);
  } catch (e) {
    //NOP
  }
  
  if ((taskGroup != null) && (taskGroup.id != null)) {
      r.table('taskGroup').get(taskGroup.id).update(taskGroup, {returnChanges: true}).run(req.rdbConnection, function(error, result) {
          if (error) {
            handleError(res, error) 
          } else if (result.replaced !== 1) {
            handleError(res, new Error("Document was not update.")) 
          } else {
            res.send(result.changes[0].new_val);
          }
      });
  } else {
      handleError(res, new Error("The task group must have a field `id`."))
  }
}

/*
 * Update task group item.
 */
function updateTaskItem(req, res) {
  var task;
  try {
    task = JSON.parse(req.body.json);
  } catch (e) {
    //NOP
  }
  
  if ((task == null) || (task.id == null)) {
      handleError(res, new Error("The task must have a field `id`."))
  }

  r.table('task').get(task.id).update(task, {returnChanges: true}).run(req.rdbConnection, function(error, result) {
    if (error) {
      handleError(res, error) 
    } else if (result.replaced !== 1) {
      handleError(res, new Error("Document was not update.")) 
    } else {
      res.send(JSON.stringify(result.changes[0].new_val));
    }
  });
}


/*
 * Delete task group and task items .
 */
function deleteTaskGroupItem(req, res) {
  var taskGroup;
  try {
    taskGroup = JSON.parse(req.body.json);
  } catch (e) {
    //NOP
  }

  if ((taskGroup == null) || (taskGroup.id == null)) {
    handleError(res, new Error("The TaskGroup must have a field `id`."))
  }

  r.table('taskGroup').get(taskGroup.id).delete({returnChanges: true}).run(req.rdbConnection, function(error, result) {
    if (error) {
        handleError(res, error) 
    } else if (result.deleted !== 1) {
      handleError(res, new Error("Document was not deleted.")) 
    } else {
        r.table('task').filter(r.row("taskGroupId").eq(taskGroup.id)).delete().run(req.rdbConnection);
        res.send(result.changes[0].old_val);
    }
  });
}

/*
 * Delete task group and task items .
 */
function deleteTaskItem(req, res) {
  var taskId = req.body.taskId;

  if (taskId == null) {
    handleError(res, new Error("Task id is required"));
  }

  r.table('task').get(taskId).delete({returnChanges: true}).run(req.rdbConnection, function(error, result) {
    if (error) {
        handleError(res, error) 
    } else if (result.deleted !== 1) {
      handleError(res, new Error("Document was not deleted.")) 
    } else {
        res.send(result.changes[0].old_val);
    }
  });
}

/*
 * Router configure
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(rethinkdb.connectMiddleware);

app.use('/static',express.static('static'));

// Routes
app.route('/api/taskGroup')
  .get(listTaskGroupItems)
  .post(newTaskGroupItem)
  .put(updateTaskGroupItem)
  .delete(deleteTaskGroupItem);

app.route('/api/taskGroup/getTasks')
  .get(listTaskItems)

app.route('/api/task')
  .get(listTaskGroupItems)
  .post(newTaskItem)
  .put(updateTaskItem)
  .delete(deleteTaskItem);

app.use(routing);

//If we reach this middleware the route could not be handled and must be unknown.
app.use(handle404);

//Generic error handling middleware.
app.use(handleError);

app.use(rethinkdb.disconnectMiddleware);

/*
 * RethinkDB configure
 */
rethinkdb.init([
  {
    name: 'taskGroup',
    indexes: ['name','updateTm','index']
  }, 
  {
    name: 'task',
    indexes: ['taskGroupId','content','updateTm','index']
  }
  ], function(err, connection) {
   if(err) {
    console.error(err);
    process.exit(1);
    return;
  }

  startExpress(connection);
});