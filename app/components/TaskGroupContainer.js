/**
 * @Author : HungBV
 */
import React from 'react/addons';
import TaskGroups from './TaskGroups';
import TaskGroupStore from '../stores/TaskGroupStore';
import TaskGroupService from '../services/TaskGroupService';

export default class TaskGroupContainer extends React.Component {

  /**
   * Contructor
   */
  constructor(props) {
    super(props);

    // setting default state
    this.state = this.getState();

    // event listener binding
    this.getState = this.getState.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Invoked once, both on the client and server, 
   * immediately before the initial rendering occurs. 
   */
  componentDidMount() {
    TaskGroupService.getAll();
    
    TaskGroupStore.addChangeListener(this.onChange);
  }

  /*
   * Invoked immediately before a component is unmounted from the DOM.
   */
  componentWillUnmount() {
    TaskGroupStore.removeChangeListener(this.onChange);
  }

	/**
	 * @return {object}
	 */
	render() {
		return (
        <TaskGroups taskGroups={this.state.taskGroups}/>
  	);
	}

  /**
   * Event handler for 'change' events coming from the TaskGroupStore
   */
  onChange() {
    this.setState(this.getState());
  }

  /**
   * Get lastest state from Store
   */
  getState() {
    return {
      taskGroups: TaskGroupStore.getAll()
    };
  }
}