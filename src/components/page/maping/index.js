import React, {Component} from 'react';
import { Row, Col, Button } from 'antd';
import IconWorld from '../../../assets/image/world.png'


class Maping extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
        <div className="container-menu">
             <div className="item-provinsi">
                <Row>
                    <Col span={4}>
                      <div className="icon-link">
                          <img src={IconWorld} style={{ width: 30, height: 30 }} />
                      </div>
                    </Col>
                    <Col span={10}>
                      <span className="title-link">covid19.big.go.id</span>
                    </Col>
                    <Col span={10}>
                      <div className="btn-link">
                          <a href="https://covid19.big.go.id/" target="_blank" className='ant-btn ant-btn-primary'>Klik Disini</a>
                      </div>
                    </Col>
                </Row>   
             </div>
        </div>
    );
  }
}

export default Maping;
