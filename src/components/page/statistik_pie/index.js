import React, {Component} from 'react';
import { Input, Row, Col, Spin } from 'antd';
import { connect } from 'redux-await';
import { bindActionCreators } from 'redux';
import { ReconciliationOutlined, SearchOutlined } from '@ant-design/icons';
import PieChart from "../../widget/PieChart";

import * as helper from '../../../helpers';
import * as actCoronaIndonesia from '../../../redux/actions/coronaindonesia';
import * as actCoronaProvinsi from '../../../redux/actions/coronaprovinsi';

class StatistikPie extends Component {
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
    const colorCluster = ['#52b5f2','#20c997','#808080']

    let idnPositive = 0, idnSembuh = 0, idnMeninggal = 0, idnDirawat = 0;
    if (!loading && coronaindonesialist[0]) {
      idnPositive  = coronaindonesialist[0].Confirmed
      idnSembuh    = coronaindonesialist[0].Recovered
      idnMeninggal = coronaindonesialist[0].Deaths
      idnDirawat   = coronaindonesialist[0].Active
    }
    let piechartIndonesia = {
          position: "bottom",
          labels: ['Dirawat', 'Sembuh', 'Meninggal'],
          datasets: [
              {
                  data: [idnDirawat, idnSembuh, idnMeninggal],
                  backgroundColor: colorCluster,
                  hoverBackgroundColor: colorCluster,
              }
          ]
    }
    
    let dataPieChartProvinsi = []
    if (!isLoadingProvinsi && dataFilterProvinsi.length > 0) {
        dataFilterProvinsi.map((item) => {
           let positive  = item.positive
           let sembuh    = item.sembuh
           let meninggal = item.meninggal
           let dirawat   = positive - sembuh - meninggal
           dataPieChartProvinsi.push({
             provinsi : item,
             chart : {
                position: "bottom",
                labels: ['Dirawat', 'Sembuh', 'Meninggal'],
                datasets: [
                    {
                        data: [dirawat, sembuh, meninggal],
                        backgroundColor: colorCluster,
                        hoverBackgroundColor: colorCluster,
                    }
                ]
            }
           })
        })
    }
    return (
        <div className="container-menu">
            <span className="title-item-chart">Indonesia</span> 
            { !loading && coronaindonesialist[0] ? 
              <Row>
                <Col span={24}>
                  <div className="item-chart">
                      <span className="chart-desc-total">Kasus Positive : {helper.formatNumber(coronaindonesialist[0].Confirmed)}</span>
                      <PieChart dataset={piechartIndonesia}/>
                  </div>
                </Col>
              </Row>
              : <center><Spin size="large" /></center>
            }
            <span className="title-item-chart">Provinsi</span> 
            <div className="search-container">
                <Input addonAfter={<SearchOutlined />} onChange={e => this.handleSearch(e)} placeholder="cari provinsi.." />
            </div>  
            <div className="item-provinsi">
              <Row className="main-indonesia">
              { !isLoadingProvinsi ?
                  dataPieChartProvinsi.length > 0 ?
                  dataPieChartProvinsi.map((item, index) => {
                    return <Col lg={8} md={12} xs={24} key={index}>
                              <div className="list-provinsi"> 
                                  <ReconciliationOutlined />
                                  <span className="provisiName">{item.provinsi.provinsi}</span>
                                  <span className="chart-desc-total-prov">Kasus Positive : {helper.formatNumber(item.provinsi.positive)}</span>
                                  <PieChart dataset={item.chart}/>    
                              </div>
                            </Col>   
                  })
                  : <span>Maaf data tidak ditemukan.</span>
                : <Col span={24}><center><Spin size="large" /></center></Col>
              }             
              </Row>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(StatistikPie);
