/**
 * Created by joonaenbuska on 15/03/2017.
 */
import React from 'react';

const JSXFunction = (props) => {
  console.log('this will print out everytime this component is updated/re-rendered');
  /* JSX function can only return single tag. In it is "parentTag" that has other tags as children*/
  return (
    <div id="parentTag">
      <p>1. /*this text will be VISIBLE*/</p>
      <p>{'2.' /* This is a comment inside jsx element and will be INVISIBLE*/}</p>
      <p>3. props.text</p>{/* text: 'props.text' will be displayed*/}
      <p>4. {props.text}</p>{/* value of props text will be evaluated and displayed*/}
      <p>5. According to best practice files with JSX should be have extension of .jsx</p>
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
