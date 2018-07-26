import React, { Component } from 'react';

class FaceRecognition extends Component {
	render() {
		const { imageUrl } = this.props;
		return (
			<div className='center'>
				<div className='absolute mt2'>
					<img alt='' src={imageUrl} width='500px' height='auto'/>
				</div>
			</div>
		);
	}
}

export default FaceRecognition;
