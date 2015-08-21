/**
 * @Author : HungBV
 */
import React from 'react';
import AppDispatcher from '../dispatchers/AppDispatcher';
import {GET, CREATE, UPDATE, DELETE} from '../constants/TaskGroupConstants';

class TaskGroupActions extends React.Component {

  /**
   * @param  {taskGroups} task group collection retrieved
   */
  getAll(taskGroups) {
    AppDispatcher.dispatch({
      actionType: GET,
      taskGroups: taskGroups
    });
  }

  /**
   * @param  {taskGroup} Task group Item
   */
  create(taskGroup) {
    AppDispatcher.dispatch({
      actionType: CREATE,
      taskGroup: taskGroup
    });
  }

  /**
   * @param  {taskGroup} Task group Item
   */
  update(taskGroup) {
    AppDispatcher.dispatch({
      actionType: UPDATE,
      taskGroup: taskGroup
    });
  }
  
  /**
   * @param  {taskGroup} Task group Item
   */
  delete(taskGroup) {
    AppDispatcher.dispatch({
      actionType: DELETE,
      taskGroup: taskGroup
    });
  }
}

export default new TaskGroupActions();