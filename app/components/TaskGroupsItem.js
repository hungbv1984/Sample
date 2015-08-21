/**
 * @Author : HungBV
 */
import React from 'react';
import TaskItemHeader from '../components/TaskItemHeader';
import TaskItemBody from '../components/TaskItemBody';

var ReactPropTypes = React.PropTypes;

export default class TaskGroupsItem extends React.Component {
	/**
	 * @return {object}
	 */
	render() {
		return (
	        <div className="panel panel-default">
	          <TaskItemHeader taskGroup={this.props.taskGroup}/>
	          <TaskItemBody taskGroup={this.props.taskGroup}/>
	        </div>
		);
	}
}

TaskGroupsItem.propTypes = {
  taskGroup: ReactPropTypes.object.isRequired 
}