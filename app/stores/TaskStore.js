/**
 * @Author : HungBV
 */
import BaseStore from './BaseStore';
import TaskGroupStore from './TaskGroupStore';
import AppDispatcher from '../dispatchers/AppDispatcher';
import {CREATE, GET_ALL, DELETE, UPDATE} from '../constants/TaskConstants';

class TaskStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.doAddNew = this.doAddNew.bind(this);
    this._tasks = [];
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case GET_ALL:
        this._tasks[action.taskGroupId] = action.tasks;
        this.emitChange();
        break;
      case CREATE:
        this.doAddNew(action.taskGroupId, action.task);
        this.emitChange();
        break;
      case UPDATE:
        this.doUpdate(JSON.parse(action.task));
        this.emitChange();
        break;
      case DELETE:
        this.doDelete(action.task);
        this.emitChange();
        break;
      default:
        break;
    };
  }

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll(taskGroupId) {
    return this._tasks[taskGroupId];
  }

  doAddNew(taskGroupId, task) {
    this._tasks[taskGroupId].unshift(task);
  }

  doUpdate(task) {
    var tasks = this._tasks;
    for (var taskTmp in tasks) {
      var taskArr = tasks[taskTmp];
      for (var taskTmp in taskArr) {
        if (taskArr[taskTmp].id === task.id) {
          taskArr[taskTmp] = task;
        }
      }
    }
  }

  doDelete(task) {
    var tasks = this._tasks[task.taskGroupId];
    for (var tasksTmp in tasks) {
      if (tasks[tasksTmp].id === task.id) {
        delete this._tasks[task.taskGroupId][tasksTmp];
      }
    }
  }
}

export default new TaskStore();