'use strict'
import React from'react';
import mobservable from 'mobservable';
import {reactiveComponent} from 'mobservable-react';
export {B2};

@reactiveComponent class B2 extends React.Component {
  // class B2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => {
  return (
    <div> <h1>Cow</h1> </div>
  )}
}

React.render(<B2 key='B2' />, document.getElementById('divSix'))

