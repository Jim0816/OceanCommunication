import React, { Component } from 'react'
import { Button, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import receipt from './index.module.css'
import LineChart from '../../components/Echarts/lineChart'
import OverviewBar from '../../components/MyCharts/OverviewBar'
import Line from '../../components/MyCharts/Line'
import Draggable from 'react-draggable'

const labels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009"]
const values = [
  {title: '发射信号', data: [16, 49, 129, 29, 129, 29, 90, 69, 199, 70]},
  {title: '接收信号', data: [36, 0, 9, 29, 39, 79, 90, 100, 139, 180]}
]
const colors = ['red', 'black', 'green', 'orange', 'pink', 'yellow', 'blue']

export default class index extends Component {

  state = {
    showLeft: '10%', // 记录下方阴影部分左边距
    showWidth: '70%', // 记录下方阴影部分宽度
    indicators: [],
    charts: [], // 记录上方所有折线图数据
    lineShowLabels: [],
    lineChartWidth: 0, // 折线图坐标区域宽度
    LineChartLeftBorder: 0, // 折线图坐标区域左边界位置
    overviewBarWidth: 0, // 总览图宽度
    overviewBarLeftBorder: 0, // 总览图左边界位置
    indicatorXBeforeMove: '0px', // 指示器移动前位置
    indicatorLabelBeforeMove: 0, // 指示器移动前对应横坐标比例 如 1.2 【1，2，3，4】表示在2，3之间的20%
  };


  constructor(props) {
    super(props)
    this.init()
   }

   componentDidMount() {
     // 初始化折线图和总览图边界、位置
    let lineBox = document.getElementById('line-border-box')
    let lineBoxLeft = lineBox.getBoundingClientRect().left
    let lineBoxWidth = lineBox.offsetWidth
    let overViewBox = document.getElementById('overview-border-box')
    let overViewBoxLeft = overViewBox.getBoundingClientRect().left
    let overViewBoxWidth = overViewBox.offsetWidth

    // 注意：通过setState() 形式修改状态会触发render() 
    this.state.lineChartWidth = lineBoxWidth
    this.state.LineChartLeftBorder = lineBoxLeft
    this.state.overviewBarWidth = overViewBoxWidth
    this.overviewBarLeftBorder = overViewBoxLeft
   }

  render() {
    // 获取状态数据
    let {indicators, charts} = this.state
    return (
      <div className={receipt.container}>
          <div className={receipt.center}>
            {/* 折线图 */}
            {charts.map(
                (chart) => {
                    return (
                      <div className={receipt.chartCard} style={{top: chart.top}}>
                        <div id='line-border-box' style={{marginLeft: '5%', width: '90%', height: '100%', overflow: 'hidden'}}>
                          <LineChart style={{width: '100%', height: '100%'}} title={chart.title} labels={chart.labels} values={chart.values}/>
                        </div>
                      </div>
                    )
                }
            )}
            
            {/* 时间指示器 竖线 */}
            <div className={receipt.lineContent} style={{height: 180 * charts.length + 'px'}}>
              <div className={receipt.lineContentBox}>
                {indicators.map(
                    (indicator) => {
                        return (
                          <Draggable 
                            axis='x'
                            bounds='parent'
                            onStart={(e) => this.handleDrag(indicator.id, 'start', e)}
                            onDrag={(e) => this.handleDrag(indicator.id, 'drag', e)}
                            onStop={(e) => this.handleDrag(indicator.id, 'end', e)}
                          >
                              <div id={'indicator-' + indicator.id} className={receipt.line} style={{left: indicator.left}} onClick={(e) => this.selectIndicator(e)}>
                                <Line lineColor={indicator.color} main={indicator.main}/>
                              </div>
                          </Draggable>
                        )
                    }
                )}
              </div>
            </div>
          </div>
          <div className={receipt.bottom}>
            <div id='overview-border-box' style={{float: 'left', marginLeft: '1%', marginTop: '10px', width: '96%', height: '70px',}}>
              <OverviewBar 
              overviewBarWidth={this.state.overviewBarWidth}
              overviewBarLeftBorder={this.state.overviewBarLeftBorder}
              showLeft={this.state.showLeft} 
              showWidth={this.state.showWidth} 
              indicators={this.state.indicators} 
              labels={labels} values={values} />
            </div>
            <div style={{float: 'left', marginLeft: '0.4%', marginTop: '10px', width: '2%', height: '70px', fontSize: '20px', lineHeight: '20px', fontWeight: 'bolder'}}>
              <span onClick={this.addIndicator} style={{float: 'left', marginLeft: '0%', marginTop: '7px', width: '100%', height: '23px', textAlign: 'center', background: 'gray', cursor: 'pointer'}}>+</span>
              <span style={{float: 'left', marginLeft: '0%', marginTop: '10px', width: '100%', height: '23px', textAlign: 'center', background: 'gray', cursor: 'pointer'}}>-</span>
            </div>
            {/* <ProgressBar style={{float: 'left', width: '100%', height: '100%'}} rangeNum={10} rezoom={this.rezoom}/> */}
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

  handleDrag = (id, type, e) => {
    const indicator = document.getElementById('indicator-' + id)
    var x = indicator.getBoundingClientRect().left
    let rangeNum = this.state.charts[0].labels.length - 1 // 折线图显示的横坐标区间段数量
    let itemDistance = this.state.lineChartWidth / rangeNum // 每个小区间所占长度 px

    if (type === 'start'){
      console.log(id, '移动前位置：' + x)
      this.state.indicatorXBeforeMove = x
      let location = Math.floor(x - this.state.LineChartLeftBorder) * 100 / 100 // 指示器移动前所在位置偏移
      this.state.indicatorLabelBeforeMove = location / itemDistance // 移动前label所在
      console.log(id, '移动前横坐标：' + this.state.indicatorLabelBeforeMove)
    }else if (type === 'drag'){
    }else if (type === 'end'){
      console.log(id, '最终位置：' + x)
      let distance = x - this.state.indicatorXBeforeMove
      console.log(id, '移动距离：' + distance)
      // 通过移动距离，计算当前结束位置的横坐标区间占比
      let change = distance / itemDistance
      let indicatorLabel = change + this.state.indicatorLabelBeforeMove
      console.log(id, '移动后横坐标：' + indicatorLabel)
      this.state.indicators[id].labelLocation = indicatorLabel
      // 触发render()
      this.forceUpdate();
    }
  }

  // 初始化数据
  init = () => {
    // 初始化折线图数据
    var charts = []
    for (let i = 0 ; i < values.length ; i++){
      let value = values[i]
      let chart = {
        title: value.title,
        top: (160 * i + 30) + 'px',
        labels: labels,
        values: value .data
      }
      charts.push(chart)
    }

    // 初始化时间指示器
    // 更新状态数据
    this.state.charts = charts
    this.state.lineShowLabels = labels
  }

  addIndicator = () => {
    //{id: 0, color: 'red', left: '0%', labelLocation: 0, labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009"]}
    let {indicators} = this.state
    // 选取一种新颜色
    let color = ''
    for (let i = 0 ; i < colors.length ; i++ ){
      let find = false
      for (let j = 0 ; j < indicators.length ; j++){
        if (colors[i] === indicators[j].color){
          find = true
          break
        }
      }

      if (!find){
        // 找到新颜色 结束
        color = colors[i]
        break
      }
    }
    // 生成新指示器
    let index = (this.state.lineShowLabels.length - 1) / 2.0
    let indicator = {id: indicators.length, color: color, left: '50%', labelLocation: index, main: true, labels: this.state.lineShowLabels}
    // 更新主marker：新生成的指示器为主marker 其他为副marker
    let new_indicators = []

    for (let i = 0 ; i < indicators.length ; i++){
      let item = indicators[i]
      item.main = false
      new_indicators.push(item)
    }

    new_indicators.push(indicator)
    this.state.indicators = new_indicators
    // 触发render()
    this.forceUpdate();
  }

  selectIndicator = (e) => {
    //alert(e.currentTarget)
  }

  // 缩放调整
  // rezoom = (startIndex, endindex) => {
  //   // 更新所有图标对应的数据
  //   let charts = []
  //   for (let i = 0 ; i < this.state.charts.length ; i++){
  //     let chart = this.state.charts[i]
  //     let dataItem = JSON.parse(JSON.stringify(data[i]))
  //     console.log(dataItem)
  //     let curData = dataItem.splice(startIndex, endindex + 1)
  //     console.log(curData)
  //     charts.push({...chart, data: curData})
  //   }

  //   console.log(charts)

  //   this.setState({
  //     charts: charts
  //   })

    
  // }
}
