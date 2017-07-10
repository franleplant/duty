import React from 'react';

export default function ClockHead({ editMode, title, onChange, toggleEdit }) {


  let content = (
    <p style={{
      margin: 0,
      textOverflow: 'ellipsis',
      width: '200px',
      whiteSpace: 'nowrap',
    }}>
      {title}
    </p>
  )

  if (editMode) {
    content = (
      <form onSubmit={toggleEdit}>
        <input value={title} onChange={onChange} placeholder="Clock Title"/>
      </form>
    )
  }

  return (
    <div>
      {content}
    </div>
  )
}
