import React, {Component} from 'react';
import { Button, Row, Col } from 'antd';
import iconCorona from '../../assets/image/coronaicon.png'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
        <nav className="menuBar">
           <div>
              <img className="coronaIcon" src={iconCorona}/>
              <span className="navTitle">CEK COVID-19</span>
           </div>
           
        </nav>
    );
  }
}

export default Header;
