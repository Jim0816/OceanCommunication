import React, { Component } from 'react'
import { Button, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import receipt from './index.module.css'
import LineChart from '../../components/Echarts/lineChart'
import OverviewBar from '../../components/MyCharts/OverviewBar'
import Indicator from '../../components/MyCharts/Indicator'
import Draggable from 'react-draggable'

const labels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012" , "2013", "2014", "2015"]
const values = [
  {title: '发射信号', data: [16, 49, 129, 29, 129, 29, 90, 69, 199, 70, 16, 49, 129, 29, 129, 29]},
  {title: '接收信号', data: [36, 0, 9, 29, 39, 79, 90, 100, 139, 180, 16, 29, 39, 79, 90, 100]}
]

const showWidth = 1000
const colors = ['red', 'black', 'green', 'orange', 'pink', 'yellow', 'blue']


const rdom = require('react-dom');

export default class index extends Component {

  state = {
    indicators: [],
    charts: [], // 记录上方所有折线图数据
    showRange: [], // 当前展示区间索引
    lineChartWidth: 0, // 折线图坐标区域宽度
    LineChartLeftBorder: 0, // 折线图坐标区域左边界位置
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

    // 注意：通过setState() 形式修改状态会触发render() 
    this.state.lineChartWidth = lineBoxWidth
    this.state.LineChartLeftBorder = lineBoxLeft
    
   }

  render() {
    // 获取状态数据
    let {indicators, charts} = this.state
    return (
      <div className={receipt.container}>
          <div className={receipt.center} onWheel={(e) => this.handleScroll(e)} >
            {/* 折线图 */}
            {charts.map(
                (chart) => {
                    return (
                      <div id='chartCard' className={receipt.chartCard} style={{top: chart.top}}>
                        <div onMouseDown={e => {this.moveChart(e)}} id='line-border-box' style={{position: 'relative', width: showWidth + 'px', height: '100%', overflow: 'hidden'}}>
                          {/* <div onClick={e => {this.adjustShowRange(-1 ,e)}} style={{position: 'absolute', top: '25px', left: '10px', width: '50px', height: '50px', backgroundColor: 'black', opacity: '0.4', borderRadius: '40px', zIndex: 3, color: 'white', fontSize: '30px', fontWeight: 'bolder', lineHeight: '45px', textAlign: 'center'}}><label>&lt;</label></div>
                          <div onClick={e => {this.adjustShowRange(1, e)}} style={{position: 'absolute', top: '25px', left: '940px', width: '50px', height: '50px', backgroundColor: 'black', opacity: '0.4', borderRadius: '40px', zIndex: 3, color: 'white', fontSize: '30px', fontWeight: 'bolder', lineHeight: '45px', textAlign: 'center'}}><label>&gt;</label></div> */}
                          <LineChart style={{width: '100%', height: '100%'}} title={chart.title} labels={chart.labels} values={chart.values}/>
                        </div>
                      </div>
                    )
                }
            )}
            
            {/* 时间指示器 竖线 */}
            <div id='lineContentBox-parent'className={receipt.lineContent} style={{height: 180 * charts.length + 'px'}}>
              <div id='lineContentBox' className={receipt.lineContentBox} style={{width: showWidth + 10 + 'px'}}>
                <Indicator 
                  labels={labels}
                  showWidth={showWidth}
                  showRange={this.state.showRange}
                  indicators={this.state.indicators} 
                  updateIndicators={this.updateIndicators}/>
              </div>
            </div>
          </div>
          <div className={receipt.bottom}>
            <div style={{float: 'left', marginLeft: '1%', marginTop: '10px', width: '1100px', height: '70px',}}>
              <OverviewBar 
              showRange={this.state.showRange}
              indicators={this.state.indicators} 
              labels={labels} values={values} />
            </div>
            <div style={{float: 'left', marginLeft: '0.4%', marginTop: '10px', width: '2%', height: '70px', fontSize: '20px', lineHeight: '20px', fontWeight: 'bolder'}}>
              <span onClick={this.addIndicator} style={{float: 'left', marginLeft: '0%', marginTop: '7px', width: '100%', height: '23px', textAlign: 'center', background: 'gray', cursor: 'pointer'}}>+</span>
              <span onClick={this.removeIndicator} style={{float: 'left', marginLeft: '0%', marginTop: '10px', width: '100%', height: '23px', textAlign: 'center', background: 'gray', cursor: 'pointer'}}>-</span>
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
      //console.log('拖拽开始...')
      this.setState({
        lines: list.map((item, idx) => idx === index ? {...item, isDrag: true} : item)
      })
    }else if(type === 2){
      let line = list[index]
      if(line.isDrag){
        // 拖拽已经开启
        //console.log('==========正在拖拽=========')
      }
    }else if(type === 3){
      // 关闭拖拽
      //console.log('拖拽结束...')
      this.setState({
        lines: list.map((item, idx) => idx === index ? {...item, isDrag: false} : item)
      })
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
        values: value.data
      }
      charts.push(chart)
    }

    // 初始化时间指示器
    // 更新状态数据
    this.state.charts = charts
    this.state.lineShowLabels = labels
    this.state.showRange = [0, labels.length -1]
  }

  // 添加时间指示器
  addIndicator = () => {
    let {indicators, showRange} = this.state
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
    // 生成新指示器 index 是在全局数据的索引
    let index = (showRange[0] + showRange[1]) / 2.0
    let location = showWidth / 2
    let lineShowLabels = labels.slice(showRange[0], showRange[1] + 1)
    let indicator = {id: indicators.length, color: color, left: location, labelLocation: index, main: true, labels: lineShowLabels}
    
    // 更新所有marker为副marker
    let new_indicators = []
    for (let i = 0 ; i < indicators.length ; i++){
      let item = indicators[i]
      item.main = false
      new_indicators.push(item)
    }

    // 添加当前指示器为主marker
    new_indicators.push(indicator)
    // 更新数据
    this.state.indicators = new_indicators
    this.forceUpdate()
  }

  // 删除主轴线
  removeIndicator = () => {
    let {indicators} = this.state
    let new_indicators = []
    for (let i = 0 ; i < indicators.length ; i++){
      if (!indicators[i].main){
        new_indicators.push(indicators[i])
      }
    }
    
    // 选出最左边一根为主轴
    if (new_indicators.length > 0){
      let min_left = 99999
      let index = 0
      for (let i = 0 ; i < new_indicators.length ; i++){
        if (new_indicators[i].left < min_left){
          index = i
        }
      }
      new_indicators[index].main = true
    }

    this.state.indicators = new_indicators
    this.forceUpdate()
  }

  // 子组件更新indicators
  updateIndicators = (indicators) => {
    this.state.indicators = indicators
    this.forceUpdate()
  }

  // 缩放折线图展示范围
  handleScroll = (e) => {
    const ele = rdom.findDOMNode(this);
    if (e.nativeEvent.deltaY <= 0) {
      /* scrolling up 缩小区间*/
      if(ele.scrollTop <= 0) {
        //e.preventDefault();
        // 每滑动一下，区间两边同时减少一个label
        this.changeLineChartData(-1)
      }
    } else{
      /* scrolling down 扩大区间 */
      if(ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
        //e.preventDefault();
        this.changeLineChartData(1)
      }
    }
  }

  changeLineChartData = (change) => {
    let size = this.state.showRange[1] - this.state.showRange[0] + 1 // 区间大小
    let start = 0
    let end = 0
    let result = false
    if (change > 0){
      // 扩大区间
      // if (change <= (labels.length - size) / 2){
        
      //   console.log('======= 扩大区间 =========', start ,end)
      // }
      start = this.state.showRange[0] - change >= 0 ? this.state.showRange[0] - change : this.state.showRange[0]
      end = this.state.showRange[1] + change <= labels.length - 1 ? this.state.showRange[1] + change : this.state.showRange[1]
      result = true
    }else {
      // 缩小区间
      if ((-1 * change) < (size / 2)){
        start = this.state.showRange[0] - change
        end = this.state.showRange[1] + change
        result = true
      }
    }

    if (result){
      let charts = []
      for (let i = 0 ; i < this.state.charts.length ; i++){
        let chart = this.state.charts[i]
        let new_label = labels.slice(start, end + 1)
        // 从全局数据中截取
        let value = values[i]
        
        let new_chart = {
          ...chart,
          labels: new_label,
          values: value.data.slice(start, end + 1)
        }
        charts.push(new_chart)
      }

      // 鼠标滚动完，打印当前指示器位置
      let indicators = this.adjustIndicator(start, end)
      //console.log(indicators)
      //this.state.indicators = indicators

      this.setState({
        charts: charts,
        indicators: indicators,
        showRange: [start, end]
      }, () => {
        
      })

    }

  }

  adjustIndicator = (start, end) => {
    // 只需要调整折线图层中指示器的位置，全局位置不变
    // let indicator = {id: indicators.length, color: color, left: '50%', labelLocation: index, main: true, labels: this.state.lineShowLabels}
    var indicators = []
    for (let i = 0 ; i < this.state.indicators.length ; i++){
      let indicator = this.state.indicators[i]
      let left = '0px'
      console.log(start, end, indicator.labelLocation)
      if (indicator.labelLocation >=  start && indicator.labelLocation <= end){
        // 在展示区域
        console.log(' === 中间 ===')
        let itemWidth = showWidth / (end - start)
        //new_indicator.left =(indicator.labelLocation - start) * itemWidth + 'px'
        left = (indicator.labelLocation - start) * itemWidth + 'px'
        console.log(left)
      }else{
        // 不在展示区域，靠边停放
        if (indicator.labelLocation > end){
          // 靠右边
          console.log(' === 右边 ===')
          left =  showWidth + 'px'
        }else if (indicator.labelLocation < start){
          // 靠左边
          console.log(' === 左边 ===')
          left = '0px'
        }
      }
      let lineShowLabels = labels.slice(start, end)
      indicator.left = left
      indicator.labels = lineShowLabels
      indicators.push(indicator)
    }
    
    return indicators
  }

  // 这里的change是整数 带方向
  moveRange = (change) => {
    let {indicators} = this.state
    let start = this.state.showRange[0]
    let end =  this.state.showRange[1]
    let flag = false
    let rightNoShowNum = labels.length - 1 - this.state.showRange[1]
    let leftNoShowNum = this.state.showRange[0]

    if (change > 0){
      // 向右边滑动
      if (change <= leftNoShowNum){
        start -= change
        end -= change
        flag = true
      }
    }else if (change < 0){
      // 向左边滑动
      if (-change <= rightNoShowNum){
        start += -change
        end += -change
        flag = true
      }
    }

    if (flag){
      let charts = []
      for (let i = 0 ; i < this.state.charts.length ; i++){
        let chart = this.state.charts[i]
        let new_label = labels.slice(start, end + 1)
        // 从全局数据中截取
        let value = values[i]
        
        let new_chart = {
          ...chart,
          labels: new_label,
          values: value.data.slice(start, end + 1)
        }
        charts.push(new_chart)
      }

      let indicators = this.adjustIndicator(start, end)
      //console.log(indicators)
      //this.state.indicators = indicators

      this.setState({
        charts: charts,
        showRange: [start, end],
        indicators: indicators
      }, () => {
        
      })
    }
    return [start, end]
  }

  moveChart = (e) => {
    let { moveRange} = this
    let {showRange} = this.state
    var e = e || window.event;
    let mouse_init_x = e.clientX
    let start = showRange[0]
    let end = showRange[1]
    let pre_change = 0
    
    /*鼠标的移动事件*/
    document.onmousemove = function (e) {
      //var e = e || window.event;
      //osmall.style.left = e.clientX - osmall.startX + "px";
      //osmall.style.top = e.clientY - osmall.startY + "px";
      /*对于大的DIV四个边界的判断*/
      // 计算偏移位置
      let diff = e.clientX - mouse_init_x
      let item_width = showWidth / (end - start) // 每个区间长度
      let change = Math.trunc(diff / item_width) // 只取整数
      if (pre_change != change){
        moveRange(change)
        pre_change = change
      }
      
      //let range = moveRange(change)
      //start = range[0]
      //end = range[1]
    };
    /*鼠标的抬起事件,终止拖动*/
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;

        // 更新指示器位置
        //let start = 
        //let indicators = adjustIndicator(start, end)
        //this.state.indicators = indicators
        //this.resetIndicators(indicators)
        //console.log('拖拽结束:', start, end)
        
    };

  }


}
