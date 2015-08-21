/**
 * @Author : HungBV
 */
import React from 'react';
import AppDispatcher from '../dispatchers/AppDispatcher';
import {CREATE, GET_ALL, DELETE, UPDATE} from '../constants/TaskConstants';

class TaskActions extends React.Component {

  /**
   * @param  {string} id The ID of the task group item
   * @param  {tasks} task collection retrieved
   */
  getAll(taskGroupId, tasks) {
    AppDispatcher.dispatch({
      actionType: GET_ALL,
      taskGroupId : taskGroupId,
      tasks: tasks
    });
  }

  /**
   * @param  {string} id The ID of the task group item
   * @param  {task} task item
   */
  create(taskGroupId, task) {
    AppDispatcher.dispatch({
      actionType: CREATE,
      taskGroupId : taskGroupId,
      task: task
    });
  }

  /**
   * @param  {task} task item
   */
  update(task) {
    AppDispatcher.dispatch({
      actionType: UPDATE,
      task: task
    });
  }

  /**
   * @param  {task} task item
   */
  delete(task) {
    AppDispatcher.dispatch({
      actionType: DELETE,
      task: task
    });
  }
}

export default new TaskActions();