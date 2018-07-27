import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation'
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import particlesOptions from './ParticlesOptions.json';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
 apiKey: '508d3d7015384f96b7788e5773fd3fcd'
});

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		password: '',
		entries: 0,
		joined: '',
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	componentDidMount() {
		fetch('http://localhost:3000')
			.then(response => response.json())
			.then(console.log)
	}

	loadUser = (user) => {
		this.setState({user: {
			id: user.id,
			name: user.name,
			email: user.email,
			password: user.password,
			entries: user.entries,
			joined: user.joined,
		}})
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: (1- clarifaiFace.right_col) * width,
			bottomRow: (1- clarifaiFace.bottom_row) * height,
		}
	}

	displayFaceBox = (box) => {
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL,
			this.state.input)
		.then( response => {
			if (response) {
				fetch('http://localhost:3000/image', {
					method: 'put',
					headers: { 'Content-Type': 'application/json' },
					body:
						JSON.stringify({
							id: this.state.user.id,
						})
				}).then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, {entries: count}));
					})
					.catch(console.log)
			}
			this.displayFaceBox(this.calculateFaceLocation(response))
		})
	  .catch(console.log);
	}

	onRouteChange = (route) => {
		if (route==='home') this.setState({isSignedIn: true});
		else this.setState(initialState);
		this.setState({route: route});
	}

  render() {
  	const { isSignedIn, imageUrl, route, box } = this.state;
  	const { name, entries } = this.state.user;
    return (
      <div className="App">
      	<Particles className="particles"
          params={particlesOptions}
        />

	      <Navigation
	      	isSignedIn={isSignedIn}
	      	onRouteChange={this.onRouteChange}
	      />

	      { route === 'signin' &&
	      	<Signin
	      		loadUser={this.loadUser}
	      		onRouteChange={this.onRouteChange}
	      	/>
	      }

	      { route === 'home' &&
	      	<div>
				    <Logo />
				    <Rank name={name} entries={entries} />
				    <ImageLinkForm
				    	onInputChange={this.onInputChange}
				    	onButtonSubmit={this.onButtonSubmit}
				    />
				    <FaceRecognition box={box} imageUrl={imageUrl}/>
				  </div>
	      }

				{ route === 'register' &&
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				}
      </div>
    );
  }
}

export default App;
