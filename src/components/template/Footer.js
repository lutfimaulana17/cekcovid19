import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import { Button, Row, Col } from 'antd';
import iconHome from '../../assets/image/menu/home.png'
import iconDiagram from '../../assets/image/menu/pie-chart.png'
import iconBar from '../../assets/image/menu/bar-graph.png'
import iconMap from '../../assets/image/menu/location.png'

class Footer extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    render() {
      return (
        <Row className="footer">
            <Col span={6}>
                <Link to="/">
                    <div className="item-footer"> 
                        <img className="footer-icon" src={iconHome}/>
                        <span>Home</span>
                    </div>
                </Link>    
            </Col>
            <Col span={6}>
                <Link to="/piechart">
                    <div className="item-footer">
                        <img className="footer-icon" src={iconDiagram}/>
                        <span>Pie Chart</span>
                    </div>
                </Link>   
            </Col>
            <Col span={6}>
                <Link to="/barchart">
                    <div className="item-footer">
                        <img className="footer-icon" src={iconBar}/>
                        <span>Bar Chart</span>
                    </div>
                </Link>        
            </Col>
            <Col span={6}>
                <Link to="/maps">
                    <div className="item-footer">
                        <img className="footer-icon" src={iconMap}/>
                        <span>Maps Cluster</span>
                    </div>
                </Link>    
            </Col>
        </Row>
      );
    }
  }
  
  export default Footer;