import React, {Component} from 'react';
import Head from "../../components/head";
import SideBar from "../../components/sidebar";

import './index.scss'

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
		}
		this.toggle = this.toggle.bind(this)
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

	render() {
		return (
			<div className="page-about">
				<Head open={this.state.open} title={this.state.title} onClick={this.toggle}/>
				<SideBar open={this.state.open} menus={this.state.menus} onChange={this.changeTitle.bind(this)} onClose={this.toggle}/>
				<div className="page-cont">
					<div className="about-title">关于项目</div>
					<div className="about-desc">一个CNode社区webapp版。采用react&react-router-dom重写，使用webpack打包，调用Cnode API。</div>
					<div className="about-title">作者博客</div>
					<div className="about-desc"><a href="http://mcchen.club/">McChen - 博客</a></div>
					<div className="about-title">源码地址</div>
					<div className="about-desc"><a href="https://github.com/ChenJiaH/react-cnode">https://github.com/ChenJiaH/react-cnode</a></div>
					<div className="about-title">意见反馈</div>
					<div className="about-desc"><a href="https://github.com/ChenJiaH/react-cnode/issues">交流反馈区</a></div>
					<div className="about-title">最后</div>
					<div className="about-desc">欢迎Github或者博客交流</div>
				</div>
			</div>
		);
	}
}

export default Index;
