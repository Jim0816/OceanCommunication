import React, { Component } from 'react'
import OverviewBar from './index.module.css'
import LineArea from '../../Echarts/lineArea'
export default class index extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    // 获取状态数据
    let {showLeft, showWidth, indicators, labels, values, overviewBarWidth, overviewBarLeftBorder} = this.props
    return (
      <div className={OverviewBar.container}>
        <LineArea style={{width: '100%', height: '100%'}} labels={labels} values={values}/>
          <div className={OverviewBar.showArea} style={{left: showLeft, width: showWidth}}></div>
          {indicators.map(
            (indicator) => {
                let integer = Math.trunc(indicator.labelLocation / 1)
                // 位于当前区间的百分之多少位置
                let decimal = indicator.labelLocation % 1
                let label = indicator.labels[integer]
                let index = 0
                // 计算全局数据中label位置
                // 查找label在全局数据哪个位置
                //console.log(label)
                for (let i = 0 ; i < labels.length ; i++){
                  let cur_label = labels[i]
                  if (cur_label === label) {
                    index = i
                    break
                  }
                }
                //console.log(index)
                // 计算全局中每个区间长度
                let itemWidth = overviewBarWidth / (labels.length - 1)
                let location = overviewBarLeftBorder + itemWidth * (index + decimal)
                // 计算left百分比
                let left = (location / overviewBarWidth) * 100 + '%'
                return (
                  <div className={OverviewBar.indicator} style={{left: left, backgroundColor: indicator.color}}></div>
                )
            }
          )}
      </div>
    )
  }
}
