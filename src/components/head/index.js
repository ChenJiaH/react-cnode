import React from 'react';

import './index.scss';

function Head(props) {
	return (
		<div className={`header ${props.open && 'open'}`}>
			<div className="btn-menu" onClick={props.onClick}>
				<span className="line"></span>
			</div>
			<p className="title">{props.title}</p>
		</div>
	)
}

export default Head;
