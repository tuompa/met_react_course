import React from 'react';

const Component = props=>(
  <div className="flex">
    <div className="emoji">{'🙁'}</div>
    <div className="emoji">{'😁'}</div>
    <div className="emoji">{'😡'}</div>
    <div className="emoji">{'😐'}</div>
    <div className="emoji">{'🙂'}</div>
    <div className="emoji">{'😁'}</div>
    {/* reimplement emojis using map -> emojis [...].map(...)*/}
  </div>
);

export default Component;
