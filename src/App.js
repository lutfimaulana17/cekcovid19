import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import './style/style.css';

import Header from './components/template/Header'
import Routing from './routes'
import Footer from './components/template/Footer'
import Fab from "./components/widget/Fab";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <Header/>
        <Routing/>
        <Fab/>
        <Footer/>
      </BrowserRouter>
    );
  }
}

export default App;
