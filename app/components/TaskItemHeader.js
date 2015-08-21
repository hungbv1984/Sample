/**
 * @Author : HungBV
 */
import React from 'react';
import classNames from 'classnames';
import TaskItemHeaderInput from './TaskItemHeaderInput';
import TaskGroupService from '../services/TaskGroupService';
import TaskService from '../services/TaskService';


var ReactPropTypes = React.PropTypes;

export default class TaskItemHeader extends React.Component {
  /**
   * Contructor
   */
  constructor(props) {
    super(props);

    // Setting default state
    this.state = {
      isEditing: props.initialIsEditing,
      hideEditFnc: !props.initialIsEditing
    };
  }

	/**
	 * @return {object}
	 */
	render() {
    
    var className = classNames(
                      'panel-heading', 
                      {
                        'editing': this.state.isEditing
                      });

    var buttonDeleteClassName = classNames(
                      'fa', 
                      'icon-delete-header', 
                      'icon-header', 
                      {
                        'hideEdit': this.state.hideEditFnc
                      });
    var buttonEditClassName = classNames(
                      'fa', 
                      'icon-edit-header', 
                      'icon-header', 
                      {
                        'hideEdit': this.state.hideEditFnc
                      });
    var buttonAddClassName = classNames(
                      'fa', 
                      'icon-add-header', 
                      'icon-header', 
                      {
                        'hideEdit': this.state.hideEditFnc
                      });
  
    var taskGroup = this.props.taskGroup;

    var input;
    if (this.state.isEditing) {
      input = <TaskItemHeaderInput
                className="edit"
                onSave={this.onSave.bind(this)}
                value={taskGroup.name} />
    }

		return (
      <div className={className} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        <div className="view">
          <label onDoubleClick={this.onDoubleClick.bind(this)}>
            {taskGroup.name}
          </label>
          
          <a className={buttonDeleteClassName} href="#" onClick={this.onDelete.bind(this)}></a>
          <a className={buttonEditClassName} href="#" onClick={this.onEdit.bind(this)}></a>
          <a className={buttonAddClassName} href="#" onClick={this.onNewTask.bind(this)}></a>
        </div>
        {input}
      </div>
  	);
	}

  onMouseEnter() {
    this.setState({hideEditFnc: false});
  }

  onMouseLeave() {
    this.setState({hideEditFnc: true});
  }

  onDoubleClick() {
    this.setState({isEditing: true});
  }

  onEdit() {
    this.setState({isEditing: true});
  }

  onDelete() {
    TaskGroupService.delete(this.props.taskGroup);
  }

  onNewTask() {
    TaskService.create(this.props.taskGroup);
  }

  /**
   * Event handler called within TaskItemHeaderInput.
   * @param  {string} text
   */
  onSave(text) {
    if (text === this.props.taskGroup.name) {
      this.setState({isEditing: false});
      return;
    }
    var taskGroup = JSON.parse(JSON.stringify(this.props.taskGroup));
    taskGroup.name = text,

    TaskGroupService.update(taskGroup);
    this.setState({isEditing: false});
  }
}

TaskItemHeader.propTypes = {
   taskGroup: ReactPropTypes.object.isRequired
}
TaskItemHeader.defaultProps = { 
  initialIsEditing: false
}