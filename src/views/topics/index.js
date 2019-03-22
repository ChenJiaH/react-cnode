import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Head from "../../components/head";
import SideBar from "../../components/sidebar";
import {api, Axios} from "../../api/api";

import './index.scss'

function throttle (fn, wait, mustRun) {
	let timeout;
	let startTime = new Date();
	return function() {
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

function formatTime(time, format) {
	var t = new Date(time);
	var tf = function (i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
		switch (a) {
			case 'yyyy':
				return tf(t.getFullYear());
			case 'MM':
				return tf(t.getMonth() + 1);
			case 'mm':
				return tf(t.getMinutes());
			case 'dd':
				return tf(t.getDate());
			case 'HH':
				return tf(t.getHours());
			case 'ss':
				return tf(t.getSeconds());
			default:
				return ''
		}
	})
}

class Index extends Component {
	constructor(props) {
		super(props)
		const menus = [{
			value: '全部',
			tab: '/topics/all',
		}, {
			value: '问答',
			tab: '/topics/ask',
		}, {
			value: '分享',
			tab: '/topics/share',
		}, {
			value: '招聘',
			tab: '/topics/job',
		}, {
			value: '精华',
			tab: '/topics/good',
		}, {
			value: '关于',
			tab: '/about'
		}]
		const pathname = props.location.pathname
		const menu = menus.find(_ => ~_.tab.indexOf(pathname))
		this.state = {
			open: false,
			menus,
			title: menu ? menu.value : '全部',
			list: [],
		}
		this.page = 1
		this.LOCK = false
		this.reset = this.reset.bind(this)
		this.toggle = this.toggle.bind(this)
	}

	componentWillMount() {
		const tab = this.props.match ? this.props.match.params.tab : 'all'
		this.getTopics(this.page, tab)
	}

	componentDidMount() {
		window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 300, 1000));
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	handleScroll(e) {
		if (!this.LOCK) {
			let totalH = parseInt(document.documentElement.scrollHeight)
			let scrollH = parseInt(document.documentElement.scrollTop)
			let winH = parseInt(window.innerHeight)
			if (scrollH + winH + 200 > totalH) {
				this.LOCK = true
				this.getTopics(this.page + 1)
			}
		}
	}

	getTopics(page, tab) {
		Axios.get(api.topics, {params: {page: page, limit: 20, mdrender: true, tab}}).then(res => {
			if (res.data.length) {
				this.LOCK = false
				this.page = page
				this.setState((state) => ({
					list: state.list.concat(res.data)
				}))
			} else {
				this.LOCK = true
			}

		}).catch(err => {
			this.LOCK = false
		})
	}

	toggle() {
		this.setState((state) => ({
			open: !state.open
		}))
	}
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			this.reset()
			this.getTopics(this.page, nextProps.match.params.tab)
		}
		return true
	}

	changeTitle(title) {
		if (title === this.state.title) {
			this.toggle()
		} else {
			this.setState({
				open: false,
				title: title
			})
		}
	}

	reset() {
		this.setState({
			list: []
		})
		this.page = 1
		this.LOCK = false
	}

	render() {
		const list = this.state.list
		const topics = list.map((topic) => (
			<li key={topic.id + Math.random()}>
				<Link to={`/topic/${topic.id}`}>
					<div className="topic-title">{topic.title}</div>
					<div className="topic-content">
						<div className="topic-avatar">
							<img src={topic.author.avatar_url} alt="" className="avatar"/>
						</div>
						<div className="topic-info">
							<p>
								<span className="topic-author">{topic.author.loginname}</span>
								<span className="topic-total"><b>{topic.reply_count}</b>/{topic.visit_count}</span>
							</p>
							<p>
								<span className="topic-ctime">Post:{formatTime(topic.create_at, 'yyyy.MM.dd')}</span>
								<span className="topic-rtime">Reply:{formatTime(topic.last_reply_at, 'yyyy.MM.dd')}</span>
							</p>
						</div>
					</div>
				</Link>
			</li>
		))
		return (
			<div className="page-topics">
				<Head open={this.state.open} title={this.state.title} onClick={this.toggle}/>
				<SideBar open={this.state.open} menus={this.state.menus} onChange={this.changeTitle.bind(this)} onClose={this.toggle}/>
				<div className="page-cont">
					<ul className="topic-list">
						{topics}
					</ul>
				</div>
			</div>
		);
	}
}

export default Index;
