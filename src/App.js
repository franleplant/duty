import React from 'react';
import './App.css';
import Clock from './Clock';

//TODO
//- A paused clock should blink
//- Clocks should be able to reset
//- The Timer should be tested and incorporate dates to double check
//
//- Use flow!

export default class App extends React.Component {
  state = {
    clocks: {
      length: 1,
      runningClock: null,
      deleted: [],
      data: {
        0: true
      }
    }
  }

  addClock = () => {
    const clocks = this.state.clocks;
    const newId = clocks.length;

    const data = {...clocks.data, [newId]: true}
    const length = clocks.length + 1;

    this.setState({
      clocks: {...clocks, data, length}
    })
  }

  deleteClock = (id) => {
    const clocks = this.state.clocks
    if (clocks.length === clocks.deleted.length + 1) {
      // Cannot delete all clacks
      return;
    }
    this.setState({clocks: {...clocks, deleted: clocks.deleted.concat(id)}})
  }

  handleClockStart = (id) => {
    const clocks = this.state.clocks
    this.setState({clocks: {...clocks, runningClock: id}})
  }

  handleClockStop = (id) => {
    const clocks = this.state.clocks
    this.setState({clocks: {...clocks, runningClock: null}})
  }


  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div className="AppNav">
          <button onClick={this.addClock} className="AppNav-add">
            +
          </button>
          <span className="AppNav-title">Duties</span>
        </div>

        <div>
          <div className="App-clocks">
            {Object.entries(this.state.clocks.data)
              .filter(([id, clock]) => !this.state.clocks.deleted.includes(id))
              .map(([id, clock]) => (
                <Clock
                  id={id}
                  key={id}
                  onDelete={this.deleteClock}
                  run={this.state.clocks.runningClock === id}
                  stop={this.handleClockStop}
                  start={this.handleClockStart}
                />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
