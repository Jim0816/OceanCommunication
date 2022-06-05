import React, { Component } from 'react'
import { Button, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import receipt from './index.module.css'
import LineChart from '../../components/Echarts/lineChart'
import ProgressBar from '../../components/MyCharts/ProgressBar'
import Line from '../../components/MyCharts/Line'
import Draggable from 'react-draggable'

const data = [
  [["2000", 16], ["2001", 49], ["2002", 129], ["2003", 29], ["2004", 129], ["2005", 29], ["2006", 90], ["2007", 69], ["2008", 199], ["2009", 70]],
  [["2000", 36], ["2001", 0], ["2002", 9], ["2003", 29], ["2004", 39], ["2005", 79], ["2006", 90], ["2007", 100], ["2008", 139], ["2009", 180]]
]

export default class index extends Component {

  constructor(props) {
    super(props)
    this.init()
   }


  state = {
    xRange: [],
    start: 0,
    end: 0,
    indicator: [{id: 1, x: '2001'}, {id: 2, x: '2006'}],
    lines: [{left: '10%', color: 'blue', isDrag: false}, {left: '60%', color: 'red', isDrag: false}],
    charts: []
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
                        <LineChart style={{width: '100%', height: '100%'}} title={chart.title} data={chart.data}/>
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
                          <Draggable 
                            axis='x'
                            bounds='parent'
                            onStop={(e) => {this.handleStop(e)}}
                          >
                              <div className={receipt.line} style={{left: line.left}}>
                                <Line lineColor={line.color}/>
                              </div>
                          </Draggable>
                        )
                    }
                )}
              </div>
            </div>
            
            

          </div>
          <div className={receipt.bottom}>
            <ProgressBar style={{float: 'left', width: '100%', height: '100%'}} rangeNum={10} rezoom={this.rezoom}/>
          </div>
      </div>
    )
  }

  /******
   ************   自定义方法  **************
   * *****/ 
  // TODO 暂时不同 鼠标拖拽 index表示数组索引 type表示事件类型 1:左键按下 2:正在拖拽 3:松开左键
  dragIndicatior = (index, type) => {
    const list = this.state.lines
    if (type === 1){
      // 开启拖拽
      console.log('拖拽开始...')
      this.setState({
        lines: list.map((item, idx) => idx === index ? {...item, isDrag: true} : item)
      })
    }else if(type === 2){
      let line = list[index]
      if(line.isDrag){
        // 拖拽已经开启
        console.log('==========正在拖拽=========')
      }
    }else if(type === 3){
      // 关闭拖拽
      console.log('拖拽结束...')
      this.setState({
        lines: list.map((item, idx) => idx === index ? {...item, isDrag: false} : item)
      })
    }
    
    
  }

  handleStop = (e) => {console.log(e)}

  // 初始化数据
  init = () => {
    //console.log('初始化函数')
    // 横坐标范围
    let xRange = []
    let chart = data[0]
    chart.map((item, index) => {
      xRange.push(item[0])
    })

    let charts = this.state.charts
    charts[0] = {
      title: '发射信号', top: '30px', data: data[0]
    }

    charts[1] = {
      title: '接收信号', top: '190px', data: data[1]
    }

  
    this.setState({
      xRange: xRange,
      charts: charts,
      start: 0,
      end: xRange.length - 1
    })
  }

  // 缩放调整
  rezoom = (startIndex, endindex) => {
    // 更新所有图标对应的数据
    let charts = []
    for (let i = 0 ; i < this.state.charts.length ; i++){
      let chart = this.state.charts[i]
      let dataItem = JSON.parse(JSON.stringify(data[i]))
      console.log(dataItem)
      let curData = dataItem.splice(startIndex, endindex + 1)
      console.log(curData)
      charts.push({...chart, data: curData})
    }

    console.log(charts)

    this.setState({
      charts: charts
    })

    
  }
}
