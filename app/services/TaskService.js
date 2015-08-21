/**
 * @Author : HungBV
 */
import request from 'reqwest';
import when from 'when';
import {API_URL, API_GET_ALL_URL} from '../constants/TaskConstants';
import TaskActions from '../actions/TaskActions';

class TaskService {

  getAll(taskGroup) {
    request({
      url: API_GET_ALL_URL,
      method: 'GET',
      data: {groupId : taskGroup.id}
    })
    .then(function(response) {
      TaskActions.getAll(taskGroup.id, response);
    });
  }

  create(taskGroup) {
    request({
      url: API_URL,
      method: 'POST',
      data: {groupId : taskGroup.id}
    })
    .then(function(response) {
      TaskActions.create(taskGroup.id, response);
    });
  }

  delete(taskId) {
    request({
      url: API_URL,
      method: 'DELETE',
      data: {taskId : taskId}
    })
    .then(function(response) {
      TaskActions.delete(response);
    });
  }

  update(task) {
    request({
      url: API_URL,
      method: 'PUT',
      data: {json : JSON.stringify(task)}
    })
    .then(function(response) {
      TaskActions.update(response);
    });
  }
}

export default new TaskService();