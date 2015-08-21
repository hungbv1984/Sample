/**
 * @Author : HungBV
 */
import BaseStore from './BaseStore';
import {GET, CREATE, UPDATE, DELETE} from '../constants/TaskGroupConstants';

class TaskGroupStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.doAddNew = this.doAddNew.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this._taskGroups = [];
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case GET:
        this._taskGroups = action.taskGroups;
        this.emitChange();
        break;
      case CREATE:
        this.doAddNew(action.taskGroup);
        this.emitChange();
        break;
      case UPDATE:
        this.doUpdate(action.taskGroup);
        this.emitChange();
        break;
      case DELETE:
        this.doDelete(action.taskGroup);
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
  getAll() {
    return this._taskGroups;
  }

  doAddNew(taskGroup) {
    this._taskGroups.push(taskGroup);
  }

  doUpdate(taskGroup) {
    var taskGroups = this._taskGroups;
    for (var taskGroupTmp in taskGroups) {
      if (taskGroups[taskGroupTmp].id === taskGroup.id) {
        taskGroups[taskGroupTmp] = taskGroup;
      }
    }
  }
  
  doDelete(taskGroup) {
    var taskGroups = this._taskGroups;
    for (var taskGroupTmp in taskGroups) {
      if (taskGroups[taskGroupTmp].id === taskGroup.id) {
        delete this._taskGroups[taskGroupTmp];
      }
    }
  }
}

export default new TaskGroupStore();