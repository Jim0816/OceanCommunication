import React, { Component } from 'react'
import './index.css'
import EnergyChart from '../../components/Echarts/energy'
export default class index extends Component {
  render() {
    return (
      <div className='container'>
          <h2>接收分析</h2>
          <div style={{float: "left", width: 300, height: 300}}>
            <EnergyChart/>
          </div>
      </div>
    )
  }
}
