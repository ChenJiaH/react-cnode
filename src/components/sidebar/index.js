import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './index.scss';

class SideBar extends Component {
	render() {
		const list = this.props.menus.map(menu =>
			<NavLink key={menu.value} to={menu.tab} activeClassName="active" exact onClick={() => this.props.onChange(menu.value)}>
				{menu.value}
			</NavLink>
		)
		return (
			<div>
				<div className={`mask ${this.props.open && 'open'}`} onClick={this.props.onClose}></div>
				<div className={`sidebar ${this.props.open && 'open'}`}>
					<div className="logo">
						<img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt=""/>
					</div>
					<div className="menu-list">
						{list}
					</div>
				</div>
			</div>
		);
	}
}

export default SideBar;
