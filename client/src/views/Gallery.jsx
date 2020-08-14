import React from 'react';

class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			response: '',
		};
	}

	getResponse = async () => {
		// try {
		const response = await fetch('/api/hello');
		const body = await response.json();
		if (response.status !== 200) throw body.message;
		return body;
		// } catch (error) {}
	};

	componentDidMount() {
		this.getResponse().then((res) => {
			this.setState({ response: res });
		});
	}

	render() {
		const { response } = this.state;
		return <h1>Did not have enough time to implement the Gallery view.</h1>;
	}
}

export default Gallery;
