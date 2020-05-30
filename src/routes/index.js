import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from '../components/page/home'
import StatistikPie from '../components/page/statistik_pie'
import StatistikBar from '../components/page/statistik_bar'
import Maping from '../components/page/maping'

class Routing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/piechart"  component={StatistikPie}/>
            <Route path="/barchart" component={StatistikBar}/>
            <Route path="/maps" component={Maping}/>
        </Switch>     
    );
  }
}

export default Routing;
