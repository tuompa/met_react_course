import React from 'react';

const GREETINGS = ['Ohoi','Moi','Hei',];

const Component = props=>(
  <div className="flex">
    <ul>
      <li>{GREETINGS[0]}</li>
      <li>{GREETINGS[1]}</li>
      <li>{GREETINGS[2]}</li>
    </ul>
    {/* use map to generate greetings: GREETIGS.map(...)*/}
  </div>
);

export default Component;
