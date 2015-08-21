/**
 * @Author : HungBV
 */
import React from 'react';
import TaskStore from '../stores/TaskStore';
import TaskItem from '../components/TaskItem';
import TaskService from '../services/TaskService';

var ReactPropTypes = React.PropTypes;

export default class TaskItemBody extends React.Component {
  /**
   * Contructor
   */
  constructor(props) {
    super(props);

    // setting default state
    this.state = this.getTaskState();
    
    // Event listener bidning
    this.getTaskState = this.getTaskState.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Invoked once, both on the client and server, 
   * immediately before the initial rendering occurs. 
   */
  componentDidMount() {
    TaskService.getAll(this.props.taskGroup);

    TaskStore.addChangeListener(this.onChange);
    window.addEventListener('resize', this.onChange);
  }

  /*
   * Invoked immediately before a component is unmounted from the DOM.
   */
  componentWillUnmount() {
    TaskStore.removeChangeListener(this.onChange);
    window.removeEventListener('resize', this.onChange);
  }

	/**
	 * @return {object}
	 */
	render() {
    var styles = {
      body : {
        height:this.state.windowHeight - 175
      }
    }
    
    var tasks = this.state.tasks;
    var taskItems = [];
    for (var id in tasks) {
      taskItems.push(
        <TaskItem key={id} task={tasks[id]}/>
      );
    }

		return (
      <div className="panel-body" style={styles.body}>
        <ul className="list-group">
          {taskItems}
        </ul>
      </div>
  	);
	}

  onChange() {
    this.setState(this.getTaskState());
  }

  getTaskState() {
    return {
      tasks: TaskStore.getAll(this.props.taskGroup.id),
      windowHeight: window.innerHeight
    };
  }
}


TaskItemBody.propTypes = {
   taskGroup: ReactPropTypes.object.isRequired
}
TaskItemBody.defaultProps = { 
  initialIsEditing: false,
  taskGroup: []
}