import React from 'react';

const JSXFunction = (props) => {
  /* JSX function can only return single tag. In it is "parentTag" that has other tags as children*/
  return (
    <div id="parentTag">
      Hello world
    </div>
  );
};

JSXFunction.propTypes = {
  text: React.PropTypes.string.isRequired,
};
JSXFunction.defaultProps = {
  text: 'DEFAULT TEXT',
};

export default JSXFunction;
