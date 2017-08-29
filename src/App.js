
import React, { Component } from "react";
import ClickBox from "./ClickBox.js"
//import getWeb3 from "./utils/getWeb3";
import Slider from "./Slider.js";
import Increment from "./Increment.js";
import TechnoBox from "./TechnoBox.js";
import Floater from "./Floater.js";
import _ from "lodash";

import "./css/App.css"
import "./css/essentials.css"
import "./css/methodology.css"
import "./css/specs.css"
import "./css/profile.css"
import "./css/equipment.css"
import "./css/other.css"
import "./css/technologies.css"


class App extends Component {
  constructor(props) {
    super(props)


    this.state = {
      storageValue: 0,
      web3: null,
      desc: window.job
    }

    this.handleIncrement  = this.handleIncrement.bind(this);
    this.handleSelect  = this.handleSelect.bind(this);
    this.toggleSwitch  = this.toggleSwitch.bind(this);
  }
  
  handleSelect(location, updated){
    let newState = this.state.desc[location[0]];
    newState[location[1]] = updated;
    let temp = {};
    temp[location[0]] = newState;
    this.setState(temp);
  }

  toggleSwitch(loc){
    let newState = this.state.desc[loc[0]];

    newState[loc[1]] = !newState[loc[1]];
    let temp= {};
    temp[loc[0]] = newState;
    //console.log(temp);
    this.setState(temp);
  }

  handleIncrement(location, change, min, max){
    let spec = this.state.desc.specs;
    //hack for workweek being defined in seconds
    if(location === "workweek") {
      change *= 3600;
      max *= 3600;
      min *= 3600;
    }
    spec[location] += change;
    //ran into some gnarly rounding issues
    spec[location] = Number(spec[location].toFixed(1));
    if(spec[location] > max) spec[location] = max;
    if(spec[location] < min) spec[location] = min;
    this.setState({"specs":spec});
  }

  render() {
    let essentials = this.state.desc.essentials;
    let meth = this.state.desc.methodology;
    let specs = this.state.desc.specs;
    let profile = this.state.desc.profile;
    let equip = this.state.desc.equipment;
    console.log('menum',equip.monitorsEnum);
    let tech = this.state.desc.technologies;
    let oth = this.state.desc.other;
    let misc = this.state.desc.misc;

    let startdate = new Date(essentials.startdate);
    let floatarray = oth.concat(misc.freestuff);
    let methelem = [], methclick = [], profArray = [], techelems=[], miscelem = [];
    for(let elem in meth){
      if(typeof meth[elem] === "boolean"){
        methelem.push(
          <div key={elem} className={`slide-wrap ${elem}`}>
            <h4>{elem}</h4>
            <Slider active={meth[elem]} route={['methodology',elem]} onToggle={this.toggleSwitch}/>
          </div>
        );
      }
    }

    for(let elem in misc){
      if(typeof misc[elem] === "boolean"){
        miscelem.push(
          <div key={elem} className={`slide-wrap ${elem}`}>
            <h4>{elem}</h4>
            <Slider active={misc[elem]} route={['misc',elem]} onToggle={this.toggleSwitch}/>
          </div>
        );
      }
    }

    for(let elem in profile){
      profArray.push(
        <div key={elem} className={`profile-part ${elem}`} style={{width:profile[elem]+"%"}}>
          <span>{elem}:{profile[elem]}%</span>
        </div>
      )
    }

    for(let elem in tech){
      techelems.push(
        <TechnoBox key={elem} title={elem} level={tech[elem]} />
      );
    }

    return (
      <div className="App">
        <header className="content-block">
          <h1>Position <br /> Vacant</h1>
          <div>
            <h3 className="subtitle">{window.job.headline}</h3>
            <p>To apply to join our fledgling Ðapp and blockchain integration team, examine this and give us (or point us to) some code that processes it into a lovely-looking web (HTML/CSS/JS) document. You can use whatever framework you want (if any); a pointer to a github.com repo would be sensible.</p>
          </div>
        </header>

        <section className="essentials content-block">

          <div className="startdate">
            <h5>start date</h5>
            <span>{startdate.getDate()} / {startdate.getMonth()} / {startdate.getFullYear()}</span>
          </div>

          <div className="salary">
            <h4>{essentials.salary.status} Salary </h4>
            <div>{`${essentials.salary.amount} ${essentials.salary.currency}/${essentials.salary.interval}`}</div>
            <span>stocks: {essentials.salary.stockoptions ? "included" : "nope"}</span>
          </div>

          <div className="industry">
            <h5 className="sliding-u-l-r">industry</h5>
            <span>{essentials.industry}</span>
          </div>

          <div className="teamsize">
            <h5>size of team</h5>
            <span>{essentials.teamsize.min} - {essentials.teamsize.max}</span>
          </div>

          <div className="corehours">
            <h5>core hours</h5>
            <span> {specs.corehours.from} to {specs.corehours.to}</span>
          </div>
        </section>

        <section className="specs content-block">

          <div className="increment-wrapper">
            <div className="workload">
              <div className="title-wrap"><h5>workload</h5></div>
              <Increment loc="workload" min={0.1} max={10} step={0.1} val={specs.workload} handleChange={this.handleIncrement}/>
            </div>
            <div className="workweek">
              <div className="title-wrap"><h5>workweek</h5></div>
              <Increment loc="workweek" min={1} max={100} step={1} val={specs.workweek/3600} handleChange={this.handleIncrement}/>
            </div>
            <div className="holdidays">
              <div className="title-wrap"><h5>holidays</h5></div>
              <Increment loc="holidays" min={0} max={90} step={1} val={specs.holidays} handleChange={this.handleIncrement}/>
            </div>
          </div>
        </section>

        <section className="methodology content-block">
          {methelem}
          {miscelem}
        </section>

        <section className="content-block profile">
          {profArray}
        </section>

        <section className="methodology content-block">

          <div className="click-wrap">
            <h5>locations</h5>
            <ClickBox list={essentials.locations} route={["essentials","locselect"]} selected={essentials.locselect} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap" id="companysize">
            <h5>company size</h5>
            <ClickBox list={essentials.companysizeEnum.all} route={["essentials","companysize"]} selected={essentials.companysize} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>employment</h5>
            <ClickBox list={essentials.employmentEnum.all} route={["essentials","employment"]} selected={essentials.employment} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>buildserver</h5>
            <ClickBox list={meth.buildserverEnum.all} route={["methodology","buildserver"]} selected={meth.buildserver} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>static code analysis</h5>
            <ClickBox list={meth.staticcodeanalysisEnum.all} route={["methodology","staticcodeanalysis"]} selected={meth.staticcodeanalysis} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>version control</h5>
            <ClickBox list={meth.versioncontrolEnum.all} route={["methodology","versioncontrol"]} selected={meth.versioncontrol} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>issue tracker</h5>
            <ClickBox list={meth.issuetrackerEnum.all} route={["methodology","issuetracker"]} selected={meth.issuetracker} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>knowledge repo</h5>
            <ClickBox list={meth.knowledgerepoEnum.all} route={["methodology","knowledgerepo"]} selected={meth.knowledgerepo} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>agile management</h5>
            <ClickBox list={meth.agilemanagementEnum.all} route={["methodology","agilemanagement"]} selected={meth.agilemanagement} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>travel</h5>
            <ClickBox list={specs.travelEnum.all} route={["specs","travel"]} selected={specs.travel} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>remote</h5>
            <ClickBox list={specs.remoteEnum.all} route={["specs","remote"]} selected={specs.remote} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>relocation</h5>
            <ClickBox list={specs.relocationpackageEnum.all} route={["specs","relocationpackage"]} selected={specs.relocationpackage} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>training</h5>
            <ClickBox list={misc.trainingEnum.all} route={["misc","training"]} selected={misc.training} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>foss philosphy</h5>
            <ClickBox list={misc.fossphilosophyEnum.all} route={["misc","fossphilosophy"]} selected={misc.fossphilosophy} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>conferences</h5>
            <ClickBox list={misc.conferencesEnum.all} route={["misc","conferences"]} selected={misc.conferences} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>computer</h5>
            <ClickBox list={equip.computerEnum.all} route={["equipment","computer"]} selected={equip.computer} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>monitor</h5>
            <ClickBox list={equip.monitorsEnum.all} route={["equipment","monitors"]} selected={equip.monitors} onSelect={this.handleSelect} />
          </div>

        </section>

        <section className="content-block equipment">
          <h3>Operating System</h3>
          <div className="operatingsystem">
            {equip.operatingsystem.map((elem)=>{
              return (<div key={elem} className={`os-item ${elem}`}>
                <img src={require(`./images/${elem}.svg`)}/>
                <h4>{elem}</h4>
              </div>);
            })}
          </div>
        </section>

        <section className="techsection content-block">
          <h3>Technologies</h3>
          <div><span className="expert">Expert</span>
          <span className="good">Good</span> <span className="familiar">Familiar</span></div>
          <div className="technologies">{techelems}</div>

        </section>

        <footer>
        </footer>



      </div>
    );
  }
}



export default App

// {
//   floatarray.map((elem)=>{
//     return <Floater title={elem} />
//   })
// }
