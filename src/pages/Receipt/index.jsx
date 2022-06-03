import React, { Component } from 'react'
import { Button, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import receipt from './index.module.css'
import LineChart from '../../components/Echarts/lineChart'
import ProgressBar from '../../components/MyCharts/ProgressBar'
import Line from '../../components/MyCharts/Line'
export default class index extends Component {
  state = {
    lines: [{left: '10%', color: 'blue'}, {left: '60%', color: 'red'}],
    charts: [{title: '发射信号', top: '30px'}, {title: '接收信号1', top: '190px'}]
  };

  render() {
    // 获取状态数据
    let {lines, charts} = this.state
    return (
      <div className={receipt.container}>
          <div className={receipt.top}>
            <Button type="primary" icon={<PlusOutlined />} style={{marginTop: 10, marginLeft:15}}></Button>
            <Button type="primary" icon={<MinusOutlined />} style={{marginTop: 10, marginLeft:15}}></Button>
          </div>
          <div className={receipt.center}>

            {/* 折线图 */}
            {charts.map(
                (chart, index) => {
                    return (
                      <div className={receipt.chartCard} style={{top: chart.top}}>
                        <LineChart style={{width: '100%', height: '100%'}} title={chart.title}/>
                      </div>
                    )
                }
            )}
            
            {/* 时间指示器 竖线 */}
            <div className={receipt.lineContent} style={{height: 180 * charts.length + 'px'}}>
              <div className={receipt.lineContentBox}>
                {lines.map(
                    (line, index) => {
                        return (
                          <div className={receipt.line} style={{left: line.left}}>
                              <Line lineColor={line.color}/>
                          </div>
                        )
                    }
                )}
              </div>
            </div>
            
            

          </div>
          <div className={receipt.bottom}>
            <ProgressBar style={{float: 'left', width: '100%', height: '100%'}}/>
          </div>
      </div>
    )
  }
}
