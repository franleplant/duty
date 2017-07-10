import React from 'react';
import moment from 'moment'


export default class Time extends React.Component {

  render() {
    const { value } = this.props;
    const duration = moment.duration(value)

    return (
      <div style={{
      }}>
        <span style={{fontSize: '40px'}}>
          {pad(2, duration.minutes())}
        </span>
        :
        <span style={{fontSize: '40px'}}>
          {pad(2, duration.seconds())}
        </span>
        {' '}
        <small>{pad(2, ms(duration.milliseconds()))}</small>
      </div>
    )
  }
}

function pad(n, value) {
  const str = value.toString()
  const pad = "0".repeat(n)
  return pad.substring(0, n - str.length) + str
}

function ms(value) {
  return Math.floor(value / 10)
}

