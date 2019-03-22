import React, {Component} from 'react';
import Head from "../../components/head";
import SideBar from "../../components/sidebar";
import {api, Axios} from "../../api/api";

import './index.scss'

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
			topic: null
		}
		this.toggle = this.toggle.bind(this)
	}

	componentWillMount() {
		this.getTopic()
	}

	toggle() {
		this.setState((state) => ({
			open: !state.open
		}))
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

	getTopic () {
		const id = this.props.match.params.id
		Axios.get(`${api.topic}${id}`).then(res => {
			this.setState({
				topic: res.data
			})
		})
	}

	render() {
		const topic = this.state.topic
		return (
			<div className="page-topic">
				<Head open={this.state.open} title={topic ? topic.title : '主题'} onClick={this.toggle}/>
				<SideBar open={this.state.open} menus={this.state.menus} onChange={this.changeTitle.bind(this)} onClose={this.toggle}/>
				{topic ? (
					<div className="page-cont">
						<div className="topic-title">{topic.title}</div>
						<div className="author-box">
							<div className="author-avatar">
								<img src={topic.author.avatar_url} alt=""/>
							</div>
							<div className="author-desc">
								<p className="author-name">{topic.author.loginname}</p>
								<p className="author-ctime"> 发布于：{formatTime(topic.create_at, 'yyyy.MM.dd')}</p>
							</div>
							<div className="author-view"> {topic.visit_count}次浏览</div>
						</div>
						<div className="topic-content markdown-body" dangerouslySetInnerHTML={{__html: topic.content}}></div>
						<div className="topic-reply-count"><b>{topic.reply_count}</b>条回复</div>
						<div className="topic-reply">
							<ul className="reply-list">
								{topic.replies.map(reply => (
									<li key={reply.id}>
										<div className="reply-info">
											<div className="reply-avatar">
												<img src={reply.author.avatar_url} alt=""/>
											</div>
											<div className="reply-desc">
												<p className="clearfix">{reply.author.loginname} 发布于：{formatTime(reply.create_at, 'yyyy.MM.dd')}<span className="fr"><i
													className="iconfont icon-zan"></i>{reply.ups.length}</span></p>
											</div>
										</div>
										<div className="reply-content" dangerouslySetInnerHTML={{__html: reply.content}}></div>
									</li>
								))}
							</ul>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default Index;
