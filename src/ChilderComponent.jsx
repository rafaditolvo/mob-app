import React from 'react';
import Header from './Header';
function ChilderComponent(props) {
  console.log(props);
  return <h2>Status do pai: {props.status}</h2>;
}
export default ChilderComponent;
