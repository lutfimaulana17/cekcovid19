import React, {Component} from 'react';
import { Carousel, Row, Col, Input, Spin } from 'antd';
import { connect } from 'redux-await';
import { bindActionCreators } from 'redux';
import { ReconciliationOutlined, SearchOutlined } from '@ant-design/icons';
import Banner from '../../../assets/image/banner.jpeg'

import * as helper from '../../../helpers';
import * as actCoronaIndonesia from '../../../redux/actions/coronaindonesia';
import * as actCoronaProvinsi from '../../../redux/actions/coronaprovinsi';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingProvinsi: true,
      dataMasterProvinsi: [],
      dataFilterProvinsi: []
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.actCoronaIndonesia.clearCoronaIndonesiaList();
    this.props.actCoronaIndonesia.loadCoronaIndonesiaList({});
    this.props.actCoronaProvinsi.clearCoronaProvinsiList();
    this.props.actCoronaProvinsi.loadCoronaProvinsiList({});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadingprovinsi) {
      let coronaprovinsilist = nextProps.coronaprovinsilist
      let data = []
      Object.keys(coronaprovinsilist).map((key) => {
        data.push({
          provinsi: coronaprovinsilist[key].Provinsi,
          positive: coronaprovinsilist[key].Kasus_Posi,
          meninggal: coronaprovinsilist[key].Kasus_Meni,
          sembuh: coronaprovinsilist[key].Kasus_Semb
        })
      })
      this.setState({isLoadingProvinsi: false, dataMasterProvinsi: data, dataFilterProvinsi: data})
    }
  }

  filterItemsArrayLike(value, dataArray) {
    let query = value.toLowerCase();
    return dataArray.filter(item => item.provinsi.toLowerCase().indexOf(query) >= 0);
  }

  handleSearch(e) {
    const {dataMasterProvinsi} = this.state
    let dataFilter = this.filterItemsArrayLike(e.target.value, dataMasterProvinsi)
    this.setState({dataFilterProvinsi: dataFilter})
  }

  render() {
    const {coronaindonesialist, loading} = this.props    
    const {dataFilterProvinsi, isLoadingProvinsi} = this.state    
    return (
        <div>
          <div className="slider">
            <Carousel autoplay>
                <div className="item-slider">
                  <img src={Banner} />
                </div>
                <div className="item-slider">
                  <img src={Banner} />
                </div>
                <div className="item-slider">
                  <img src={Banner} />
                </div>
                <div className="item-slider">
                  <img src={Banner} />
              </div>
            </Carousel>
          </div> 
          <div className="main">
            <span className="title-home">Indonesia</span> 
            { !loading && coronaindonesialist[0] ? 
              <Row className="main-indonesia">
                  <Col span={24}>
                    <div className="home-main"> 
                      <Row>
                        <Col span={12}>
                          <div className="total-positive">
                            <span>{helper.formatNumber(coronaindonesialist[0].Confirmed)}</span>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="title-total">
                            <span>Positive</span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="home-main"> 
                      <Row>
                        <Col span={12}>
                          <div className="total-sembuh">
                            <span>{helper.formatNumber(coronaindonesialist[0].Recovered)}</span>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="title-total">
                            <span>Sembuh</span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="home-main"> 
                      <Row>
                        <Col span={12}>
                          <div className="total-meninggal">
                            <span>{helper.formatNumber(coronaindonesialist[0].Deaths)}</span>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="title-total">
                            <span>Meninggal</span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
              </Row>
              : <center><Spin size="large" /></center>
            }
            <span className="title-home">Provinsi</span> 
            <div className="search-container">
              <Input addonAfter={<SearchOutlined />} onChange={e => this.handleSearch(e)} placeholder="cari provinsi.." />
            </div>  
            <div className="item-provinsi">
              <Row className="main-indonesia">
              { !isLoadingProvinsi ?
                  dataFilterProvinsi.length > 0 ?
                    dataFilterProvinsi.map((item, index) => {
                      return  <Col span={24} key={index}>
                                <div className="list-provinsi"> 
                                    <ReconciliationOutlined />
                                    <span className="provisiName">{item.provinsi}</span>
                                    <Row className="main-indonesia">
                                        <Col span={8} className="container-total-provinsi">
                                          <div className="title-value-province">
                                            <span>Positive</span>
                                          </div>
                                          <div className="total-province-positive">
                                            <span>{helper.formatNumber(item.positive)}</span>
                                          </div>
                                        </Col>
                                        <Col span={8} className="container-total-provinsi">
                                          <div className="title-value-province">
                                            <span>Sembuh</span>
                                          </div>
                                          <div className="total-province-sembuh">
                                            <span>{helper.formatNumber(item.sembuh)}</span>
                                          </div>
                                        </Col>
                                        <Col span={8}>
                                          <div className="title-value-province">
                                            <span>Meninggal</span>
                                          </div>
                                          <div className="total-province-meninggal">
                                            <span>{helper.formatNumber(item.meninggal)}</span>
                                          </div>
                                        </Col>
                                    </Row>
                                </div>
                              </Col>
                    })
                  : <span>Maaf data tidak ditemukan.</span>
                : <Col span={24}><center><Spin size="large" /></center></Col>
              }
              </Row>
            </div>
          </div>  
        </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
      coronaindonesialist: state.coronaindonesia.coronaindonesialist,
      loading: state.coronaindonesia.loading,
      coronaprovinsilist: state.coronaprovinsi.coronaprovinsilist,
      loadingprovinsi: state.coronaprovinsi.loading,
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
      actCoronaIndonesia: bindActionCreators(actCoronaIndonesia, dispatch),
      actCoronaProvinsi: bindActionCreators(actCoronaProvinsi, dispatch)
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
