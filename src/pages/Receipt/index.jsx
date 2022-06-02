import React, { Component } from 'react'
import { Button, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import receipt from './index.module.css'
import LineChart from '../../components/Echarts/lineChart'
export default class index extends Component {
  render() {
    return (
      <div className={receipt.container}>
          <div className={receipt.top}>
            <Button type="primary" icon={<PlusOutlined />} style={{marginTop: 10, marginLeft:15}}></Button>
            <Button type="primary" icon={<MinusOutlined />} style={{marginTop: 10, marginLeft:15}}></Button>
          </div>
          <div className={receipt.center}>
            <div className={receipt.chartCard}>
              <LineChart style={{width: '100%', height: '100%'}}/>
            </div>
            <div className={receipt.chartCard}></div>
            <div className={receipt.chartCard}></div>
          </div>
          <div className={receipt.bottom}></div>
      </div>
    )
  }
}
