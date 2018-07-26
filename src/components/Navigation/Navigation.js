import React, { Component } from 'react';

class Navigation extends Component {
	render() {
		const { onRouteChange } = this.props;
		return (
			<nav style={{display:' flex', justifyContent: 'flex-end'}}>
				<p
					className='f3 black dim underline pa3 pointer link'
					onClick={() => onRouteChange('signin')}
				> Sign Out </p>
			</nav>
		);
	}
}

export default Navigation;
