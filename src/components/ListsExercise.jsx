import React from 'react';
const emojis = [ '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', ];
const Component = props => (
  <div className='flex note-exercise-s'>
    <ul>
      {emojis.map(i => <li className='emoji' key={i}>{i}</li>)}
    </ul>
  </div>
);
/* <div className='emoji'>{'😡'}</div>
 <div className='emoji'>{'🙁'}</div>
 <div className='emoji'>{'😐'}</div>
 <div className='emoji'>{'🙂'}</div>
 <div className='emoji'>{'😁'}</div>
 { reimplement emojis using map -> emojis [...].map(...)*/

export default Component;
