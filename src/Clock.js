import React from 'react';
import moment from 'moment'
import './Clock.css';
import Timer from './Timer';
import Time from './Time';
import ClockHead from './ClockHead';
import StartButton from './StartButton'

const INTERVAL = 10;

export default class Clock extends React.Component {
  interval = null

  state = {
    //run: false,
    time: null,
    startTime: null,
    stopTime: null,
    title: 'MyTimer',
    editMode: false,
  }

  componentWillReceiveProps(nextProps) {
    const oldProps = this.props;

    if (nextProps.run && !oldProps.run) {
      this.start();
    } else if (!nextProps.run && oldProps.run) {
      this.stop();
    }
  }


  start = () => {
    const startTime = this.state.startTime || new Date().getTime()
    const stopTime = null
    this.setState({startTime, stopTime });
    this.toogleInterval(true)
  }

  stop = () => {
    const stopTime = new Date().getTime();
    this.setState({ stopTime });
    this.toogleInterval(false)
  }


  toogleInterval = (run) => {
    if (!run) {
      this.timer && this.timer.stop();
      return;
    }


    this.timer = new Timer((timeStep) => {
      const time = this.state.time + timeStep
      this.setState({time})
    }, INTERVAL)
  }


  handleTitleChange = (e) => {
    this.setState({title: e.target.value})
  }

  handleToggleEditMode = () => {
    console.log("asdasd")
    this.setState({editMode: !this.state.editMode})
  }

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  }


  handleStart = () => {
    const handler = this.props.run ? this.props.stop : this.props.start
    handler(this.props.id)
  }

  render() {
    return (
      <div className="Clock">
        <button onClick={this.handleDelete} className="Clock-delete">
          X
        </button>

        <button onClick={this.handleToggleEditMode} className="Clock-edit">
          {this.state.editMode ? 'Save' : 'Edit'}
        </button>

        <ClockHead
          editMode={this.state.editMode}
          title={this.state.title}
          onChange={this.handleTitleChange}
          toggleEdit={this.handleToggleEditMode}
        />

        <div style={{
          marginTop: '30px',
          marginBottom: '30px',
        }}>
          <Time value={this.state.time} />
        </div>

        <StartButton
          onClick={this.handleStart}
          isRunning={this.props.run}
        />

        {(() => {
          if (this.state.stopTime) {

            //const time = this.state.stopTime - this.state.startTime;
            //console.log(this.state)
            //console.log(time)
            //const d = moment.duration(time)

            // TODO improve the timing of this thing
            // TODO incorporate this with the pause step, and if possible try to compensate any discrepancies
            //return `${d.minutes()} ${d.seconds()} ${pad(Math.floor(d.milliseconds() / 10))}`
          }

          return ''
        })()}
      </div>
    );
  }
}

