import React, { Component } from 'react';
import { withRouter } from 'react-router'
export class ScrollToTop extends Component {
	componentDidUpdate(prevProps, prevState) {
		if(this.props.location !== prevProps.location){
			window.scrollTo(0, 0)
		}
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default withRouter(ScrollToTop)