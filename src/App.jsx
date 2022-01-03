import React, { Component } from "react";
import { ButtonGroup } from '@mui/material';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import store from './store'
import { createStore, rootReducer } from './app/reducers/examples'
import { saveExamples } from './app/actions/examples'

let reduxStore = createStore(rootReducer)

class App extends Component {

	constructor() {
		super()
		this.state = {
			//Current value of the calculator 
			counter: 0,

			//Has it been counted?
			boolean: 1,

			//Get some examples /math/examples?count=6
			count: 6,

			//To convert a promise to an array
			fetchResult: [],
			result: []
		};
	}

	setNumber(value) {
		let newValue = value

		if (this.state.counter == '0') {
			this.state.counter = ''
		}

		this.setState({
			counter: this.state.counter + newValue,
			boolean: 1
		})
	}

	calculate(symbol) {
		let currentSymbol = symbol

		if (this.state.boolean == 1) {

			this.getResult(symbol)

			this.setState({
				counter: this.state.counter + currentSymbol,
				boolean: this.state.boolean = 0
			})
		} else {
			this.state.counter = this.state.counter.slice(0, this.state.counter.length - 1)
			this.setState({
				counter: this.state.counter + currentSymbol,
			})
		}
	}

	clear() {
		this.setState({
			counter: 0,
			boolean: 1
		})
	}

	getResult() {
		this.setState({
			counter: this.state.counter = eval(this.state.counter),
			boolean: 1
		})
	}

	getNewExamples() {

		return fetch(
			`http://localhost:8080/spring_rc_examples/math/examples/?count=${this.state.count}`,
			{

				headers: {

					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'GET',

			},

		).then((response) => {
			console.log(response);
			if (response.ok) {
				response.json()
					.then(res => { this.getFetchResult(res) })
			}
		});
	}

	getFetchResult(res) {

		this.setState({ fetchResult: res });
		reduxStore.dispatch(saveExamples(res))
		console.log("Fetch Result: " + this.state.fetchResult);
		console.log("Redux Store(Fetch Result): " + reduxStore.getState());

	}

	getResultForExamples() {

		this.getNewExamples();

		this.state.fetchResult = reduxStore.getState(),
			this.state.fetchResult.forEach(

				element => {
					this.state.result.push(element + "=" + eval(element))
					this.setState({ result: this.state.result })
				}
			)

		reduxStore.dispatch(saveExamples(this.state.result)),
			console.log("Result: " + this.state.result),
			console.log("Redux Store(Result): " + reduxStore.getState())

	};

	componentDidMount() {

		this.getNewExamples();

	}

	render() {

		return (

			<Stack
				component="form"
				sx={{
					margin: ['0%', '15%'],
				}}
			>
				<div align="center">
					<Stack
						component="form"
						sx={{
							width: '27ch',
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							disabled
							id="filled-disabled"
							defaultValue={this.state.counter}
							value={this.state.counter}
							variant="filled"
							size="small"
						/>

					</Stack>
					<div>

						<ButtonGroup orientation="vertical" size="large" variant="outlined"
							aria-label="large button group">
							{store.firstLine.map((item) => {
								return <Button
									onClick={() => { this.setNumber(item.name) }}
								>{item.name}</Button>
							})}
							<Button
								onClick={() => { this.clear() }}
							>{store.nameC}</Button>
						</ButtonGroup>

						<ButtonGroup orientation="vertical" size="large" variant="outlined"
							aria-label="large button group">
							{store.secondLine.map((item) => {
								return <Button
									onClick={() => { this.setNumber(item.name) }}
								>{item.name}</Button>
							})}
						</ButtonGroup>

						<ButtonGroup orientation="vertical" size="large" variant="outlined"
							aria-label="large button group">
							{store.thirdLine.map((item) => {
								return <Button
									onClick={() => { this.setNumber(item.name) }}
								>{item.name}</Button>
							})}
							<Button
								onClick={() => { this.getResult() }}
							>{store.nameE}</Button>
						</ButtonGroup>

						<ButtonGroup orientation="vertical" size="large" variant="outlined"
							aria-label="large button group">
							{store.forthLine.map((item) => {
								return <Button
									onClick={() => { this.calculate(item.name) }}
								>{item.name}</Button>
							})}
						</ButtonGroup>
					</div>
					<Stack
						component="form"
						sx={{
							margin: ['0%', '15%'],
						}}
					>
						<div>
							<Stack
								component="form"
								sx={{
									width: '27ch',
								}}
							>
								<ButtonGroup orientation="vertical" size="large" variant="outlined"
									aria-label="large button group">
									<Button onClick={() => { this.getResultForExamples() }}>
										Get and solve examples
								</Button>
								</ButtonGroup>

							</Stack>

							{this.state.result.map(item => {
								return <ol style={{ color: 'green' }}>{item}</ol>
							})}

						</div>
					</Stack>
				</div >

			</Stack>

		);
	}

}

export default App;