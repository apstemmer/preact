import React, { Component } from 'react';
import "./css/TechnoBox.css"

export default class TechnoBox extends Component {

  render(){
    if(typeof this.props.level === "string"){
      return (
      <div className={`TechnoBox level-${this.props.level}`}>

        <h5>{this.props.title}</h5>
      </div>
      );
    }
    else if(Object.prototype.toString.call(this.props.level) === '[object Object]'){
      let oneofs = [];
      let level = '';
      for(let elem in this.props.level){
        level = this.props.level[elem];
        oneofs.push(
          <h5 key={elem} className="tech-oneof">
            {elem}
          </h5>);
      }
      //<img src={require(`./images/${this.props.title}.svg`)} alt={this.props.title} />
      return(
        <div className={`TechnoBox level-${level} ${this.props.title}`}>
          {oneofs}
        </div>
      );
    }
  }
}
