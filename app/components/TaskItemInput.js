/**
 * @Author : HungBV
 */
import React from 'react';

var ReactPropTypes = React.PropTypes;
var ENTER_KEY_CODE = 13;

export default class TaskItemInput extends React.Component {

  /**
   * Contructor
   */
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
  }
  
	/**
	 * @return {object}
	 */
	render() {
		return (
      <textarea
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this.onSave.bind(this)}
        onChange={this.onChange.bind(this)}
        value={this.state.value}
        autoFocus={true}
      />
  	);
	}

  /**
   * Invokes the callback passed in as onSave
   */
  onSave() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  }

  /**
   * @param {object} event
   */
  onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

    /**
   * @param  {object} event
   */
  onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.onSave();
    }
  }
}

TaskItemInput.propTypes = {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
}
