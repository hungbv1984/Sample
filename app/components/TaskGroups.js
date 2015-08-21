/**
 * @Author : HungBV
 */
import React from 'react';
import TaskGroupsItem from '../components/TaskGroupsItem';
import TaskGroupService from '../services/TaskGroupService';

var ReactPropTypes = React.PropTypes;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class TaskGroups extends React.Component {

  /**
   * Contructor
   */
  constructor(props) {
    super(props);
  }

	/**
	 * @return {object}
	 */
	render() {
    
    var taskGroupsItems = [];
    var taskGroups = this.props.taskGroups;
    
    for (var id in taskGroups) {
      taskGroupsItems.push(<TaskGroupsItem key={id} taskGroup={taskGroups[id]}/>);
    }

		return (
      <div className="content">
        <ReactCSSTransitionGroup transitionName="TaskGroups">
          {taskGroupsItems}
        </ReactCSSTransitionGroup>
        <a onClick={this.onCreate.bind(this)} className="button">Add New Group</a>
      </div>
  	);
	}

  /**
   * Add new Task Group Item
   */
  onCreate() {
    TaskGroupService.create();
  }
}

TaskGroups.propTypes = {
  taskGroups: ReactPropTypes.array.isRequired 
}

TaskGroups.defaultProps = { 
  taskGroups: {}
}
