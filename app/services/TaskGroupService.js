/**
 * @Author : HungBV
 */
import request from 'reqwest';
import when from 'when';
import {API_URL} from '../constants/TaskGroupConstants';
import TaskGroupActions from '../actions/TaskGroupActions';

class TaskGroupService {
  getAll() {
    request({
      url: API_URL,
      method: 'GET',
      crossOrigin: true
    })
    .then(function(response) {
      TaskGroupActions.getAll(response);
    });
  }

  create() {
    request({
      url: API_URL,
      method: 'POST',
      crossOrigin: true
    })
    .then(function(response) {
      TaskGroupActions.create(response);
    });
  }

  delete(taskGroup) {
    request({
      url: API_URL,
      method: 'DELETE',
      crossOrigin: true,
      data: {json : JSON.stringify(taskGroup)}
    })
    .then(function(response) {
      TaskGroupActions.delete(response);
    });
  }

  update(taskGroup) {
    request({
      url: API_URL,
      method: 'PUT',
      crossOrigin: true,
      data: {json : JSON.stringify(taskGroup)}
    })
    .then(function(response) {
      TaskGroupActions.update(response);
    });
  }
}

export default new TaskGroupService();