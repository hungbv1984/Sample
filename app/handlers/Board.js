/**
 * @Author : HungBV
 */
import React from 'react';
import CardList from './CardList.react';
import Login from './Login.react';

export default class Board extends React.Component {

	/**
	 * @return {object}
	 */
  	render() {
  		return (
        <div id="board" className="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable">
          <div className="list mod-add is-idle">
            <form>
              <span className="placeholder js-open-add-list">Add a goal…</span>
              <input className="list-name-input" type="text" name="name" placeholder="Add a list…" autoComplete="off"/>
              <div className="edit-controls keep u-clearfix">
                <input className="primary confirm js-save-edit" type="submit" value="Save"/>
                <a className="icon-lg icon-close dark-hover cancel js-cancel-edit" href="#"></a>
              </div>
            </form>
          </div>
    	);
  	}
}