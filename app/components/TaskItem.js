/**
 * @Author : HungBV
 */
import React from 'react';
import TaskStore from '../stores/TaskStore';
import moment from 'moment';
import classNames from 'classnames';
import TaskService from '../services/TaskService';
import TaskItemInput from './TaskItemInput';

var ReactPropTypes = React.PropTypes;

export default class TaskItem extends React.Component {
  
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
                    'list-group-item', 
                    {
                      'editing': this.state.isEditing
                    });
    var buttonDeleteClassName = classNames(
                    'fa', 
                    'icon-delete-header', 
                    'icon-header');
    var buttonEditClassName = classNames(
                    'fa', 
                    'icon-edit-header', 
                    'icon-header');

    var task = this.props.task;

    // setting the update time for task
    var timeAgo = moment(new Date(task.updateTm)).fromNow();

    var input;
    if (this.state.isEditing) {
      input = <TaskItemInput
                className="edit"
                onSave={this.onSave.bind(this)}
                value={task.text} />
    }

		return (
      <li className={className}>
        {input}
        <div className="view"><a className="text-info" href="#"></a> {task.text}</div>
        <p/>
        <small className="block text-muted"><i className="fa fa-clock-o"></i> {timeAgo}</small>
        <a className={buttonDeleteClassName} href="#" onClick={this.onDelete.bind(this)}></a>
        <a className={buttonEditClassName} href="#" onClick={this.onEdit.bind(this)}></a>
      </li>
  	);
	}

  onEdit() {
    this.setState({isEditing: true});
  }

  onDelete() {
    TaskService.delete(this.props.task.id);
  }

  /**
   * Event handler called within TaskItemHeaderInput.
   * @param  {string} text
   */
   onSave(text) {
    if (text === this.props.task.text) {
      this.setState({isEditing: false});
      return;
    }
    var task = JSON.parse(JSON.stringify(this.props.task));
    task.text = text,

    TaskService.update(task);
    this.setState({isEditing: false});
  }
}

TaskItem.propTypes = {
  task: ReactPropTypes.object.isRequired 
}

TaskItem.defaultProps = { 
  initialIsEditing: false
}