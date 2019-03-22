import React, {Component} from 'react';

import './index.scss';

function throttle(fn, wait, mustRun) {
	let timeout;
	let startTime = new Date();
	return function () {
		let context = this;
		let args = arguments;
		let curTime = new Date();

		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if (curTime - startTime >= mustRun) {
			fn.apply(context, args);
			startTime = curTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			timeout = setTimeout(fn, wait);
		}
	};
};

class Backtop extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 300, 1000));
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	handleScroll(e) {
		const scrollH = parseInt(document.documentElement.scrollTop)
		this.setState({
			show: scrollH > 100 ? true : false
		})
	}

	backTop() {
		document.documentElement.scrollTop = 0
		this.setState({
			show: false
		})
	}

	render() {
		return this.state.show ? (
			<div className="backtop" onClick={this.backTop.bind(this)}><i className="iconfont icon-backtop"></i></div>
		) : null
	}
}

export default Backtop;
