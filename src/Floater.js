import React, { Component } from 'react';
import './css/Floater.css'

export default class Floater extends Component {
  render(){
    let pos = Math.random() > 0.5 ? 'fl-right' : 'fl-left'
    console.log(new Date());
    return (
      <span key={this.props.title} className={`floater ${pos}`} style={{animationDelay:(Math.random()*30)+'s',}}>
      {this.props.title}
      </span> );
  }
}
