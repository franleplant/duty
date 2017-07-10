import React from 'react';


export default function StartButton({ onClick, isRunning, ...props }) {

  return (
    <button onClick={onClick} className="Clock-start" {...props}>
      {isRunning ? '||' : '>'}
    </button>
  )
}
