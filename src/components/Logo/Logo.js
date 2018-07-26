import React, { Component } from 'react';
import Tilt from 'react-tilt';
import brain from './idea.png';
import './Logo.css';

class Logo extends Component {
	render() {
		return (
			<div className='ma5 mt0'>
				<Tilt className="Tilt br4 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
				 <div className="Tilt-inner pa3" >
				 	<img alt='logo' src={brain}
				 		style={{paddingTop: '2px'}}/>
				 	</div>
				</Tilt>
			</div>
		);
	}
}

export default Logo;
