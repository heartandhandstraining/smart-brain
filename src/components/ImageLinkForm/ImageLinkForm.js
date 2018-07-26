import React, { Component } from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends Component {
	render() {
		const { onInputChange, onButtonSubmit } = this.props;
		return (
			<div>
				<p className='f3'>
					{'This Magic Brain will detect faces in your pictures.'}
				</p>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text'
						onChange={onInputChange}
					/>
					<button
						className='f4 ph3 pv2 dib link w-30 grow white bg-light-purple'
						onClick={onButtonSubmit}
					> Detect</button>
				</div>
			</div>
		);
	}
}

export default ImageLinkForm;
