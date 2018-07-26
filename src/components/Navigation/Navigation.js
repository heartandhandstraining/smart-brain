import React, { Component } from 'react';

class Navigation extends Component {
	render() {
		const { onRouteChange, isSignedIn } = this.props;
		return ( isSignedIn ?
				<nav style={{display:' flex', justifyContent: 'flex-end'}}>
					<p
						className='f3 black dim underline pa3 pointer link'
						onClick={() => onRouteChange('signin')}
					> Sign Out </p>
				</nav>
			: <nav style={{display:' flex', justifyContent: 'flex-end'}}>
						<p
							className='f3 black dim underline pa3 pointer link'
							onClick={() => onRouteChange('signin')}
						> Sign In </p>
						<p
							className='f3 black dim underline pa3 pointer link'
							onClick={() => onRouteChange('register')}
						> Register </p>
				</nav>
		);
	}
}

export default Navigation;
