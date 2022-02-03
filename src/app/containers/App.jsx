import React, {Component} from "react";
import {ButtonGroup, Button, TextField} from '@mui/material';
import store from '../../store'
import {createStore, rootReducer} from '../reducers/examples'
import {saveExamples} from '../actions/examples'

let reduxStore = createStore(rootReducer);

class App extends Component {

  constructor() {
    super();
    this.state = {
      mainOutput: 0,
      hasItBeenCounted: true,
      countOfFetchedExamples: 6,
      fetchResult: [],
      outputForFetchedExamples: [],
    };
  }

  setNumber(value) {
    let newValue = value;

    if (this.state.mainOutput === 0) {
      this.state.mainOutput = ''
    }

    this.setState({
      mainOutput: this.state.mainOutput + newValue,
      hasItBeenCounted: true
    })
  }

  calculate(symbol) {
    let currentSymbol = symbol;

    if (this.state.hasItBeenCounted === true) {
      this.getResult(symbol);
      this.setState({
        mainOutput: this.state.mainOutput + currentSymbol,
        hasItBeenCounted: this.state.hasItBeenCounted = false
      })
    } else {
      this.setState({
        mainOutput: this.state.mainOutput.slice(0, this.state.mainOutput.length - 1)
          + currentSymbol,
      })
    }
  }

  clear() {
    this.setState({
      mainOutput: 0,
      hasItBeenCounted: true
    })
  }

  getResult() {
    this.setState({
      mainOutput: this.state.mainOutput = eval(this.state.mainOutput),
      hasItBeenCounted: true
    })
  }

  getNewExamples() {
    return fetch(
      `http://localhost:8080/spring_rc_examples/math/examples/?count=${
        this.state.countOfFetchedExamples
        }`,
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
          .then(response => {
            this.getFetchResult(response)
          });
      }
    });
  };

  getFetchResult(response) {
    this.setState({
      fetchResult: response
    });
    reduxStore.dispatch(saveExamples(response));
    console.log("Fetch Result: " + this.state.fetchResult);
    console.log("Redux Store(Fetch Result): " + reduxStore.getState());
  };

  getResultForExamples() {
    this.getNewExamples();
    this.state.fetchResult = reduxStore.getState();
    this.state.fetchResult.forEach(element => {
        this.state.outputForFetchedExamples.push(element + "=" + eval(element));
        this.setState({
          outputForFetchedExamples: this.state.outputForFetchedExamples
        })
      }
    );
    reduxStore.dispatch(saveExamples(this.state.outputForFetchedExamples));
    console.log("Output for fetched examples: " + this.state.outputForFetchedExamples);
    console.log("Redux Store(output for fetched examples): " + reduxStore.getState())
  };

  componentDidMount() {
    this.getNewExamples();
  }

  render() {
    return (

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginTop: '100px',
            width: '215px'
          }}
        >
          <TextField
            disabled
            id="filled-disabled"
            defaultValue={this.state.mainOutput}
            value={this.state.mainOutput}
            variant="filled"
            size="small"
          />
          <div>
            <ButtonGroup
              orientation="vertical"
              size="large"
              variant="outlined"
              aria-label="large button group"
            >
              {store.firstLine.map((item) => {
                return <Button
                  onClick={() => {
                    this.setNumber(item.name)
                  }}
                >
                  {item.name}
                </Button>
              })}
              <Button
                onClick={() => {
                  this.clear()
                }}
              >
                {store.nameC}
              </Button>
            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              size="large"
              variant="outlined"
              aria-label="large button group"
            >
              {store.secondLine.map((item) => {
                return <Button
                  onClick={() => {
                    this.setNumber(item.name)
                  }}
                >{item.name}</Button>
              })}
            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              size="large"
              variant="outlined"
              aria-label="large button group"
            >
              {store.thirdLine.map((item) => {
                return <Button
                  onClick={() => {
                    this.setNumber(item.name)
                  }}
                >
                  {item.name}
                </Button>
              })}
              <Button
                onClick={() => {
                  this.getResult()
                }}
              >
                {store.nameE}
              </Button>
            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              size="large"
              variant="outlined"
              aria-label="large button group"
            >
              {store.forthLine.map((item) => {
                return <Button
                  onClick={() => {
                    this.calculate(item.name)
                  }}
                >
                  {item.name}
                </Button>
              })}
            </ButtonGroup>
          </div>
        </div>
        <div
          style={{
            marginTop: '50px',
            width: '215px',
          }}
        >
          <Button
            onClick={() => {
              this.getResultForExamples()
            }}
            variant="outlined"
          >
            Get and solve examples
          </Button>
          {this.state.outputForFetchedExamples.map(item => {
            return <ol style={{color: 'green'}}>{item}</ol>
          })}
        </div>
      </div>
    );
  }
}

export default App;
