import React from 'react';
// import {Card} from 'antd';
//不是按需加载的话文件太大
//import echarts from 'echarts'
//下面是按需加载
//import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import { string } from 'prop-types';


export default class LineChart extends React.Component{

    getOption = () => {
        const {title, labels, childLabels, values} = this.props
        let option = {
            // Make gradient line here
            visualMap: [
              {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 200
              }
            ],
            title: [
              {
                left: 'center',
                text: title,
                textStyle: {
                  fontSize: 15,
                  lineHeight: 15
                },
              }
            ],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: labels
              },
              {
                type: 'category',
                position: 'top',
                boundaryGap: false,
                data: childLabels
              }
            ],
            yAxis: {type: 'value'},
            grid: {
                top: '30%',
                left: '0%',
                right: '0%',
                bottom: '15%'
            },
            series: [
              {
                type: 'line',
                showSymbol: false,
                data: values
              }
            ]
          };
        return option
    }
  
    render(){
      let {height} = this.props
      let chartHeight = height + 'px'
      return(
        <div>
          <div style={{width: '100%', height: chartHeight }}>
              <ReactEcharts option={this.getOption()} theme="Imooc"  style={{width: '100%', height:'100%'}}/>
          </div>
        </div>
      )
    }
  }
  