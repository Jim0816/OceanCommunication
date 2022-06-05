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


export default class LineChart extends React.Component{

    getOption =()=> {
        const data = this.props.data;
        const dateList = data.map(function (item) {
          return item[0];
        });
        const valueList = data.map(function (item) {
          return item[1];
        });

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
                text: this.props.title,
                textStyle: {
                  fontSize: 17,
                  lineHeight: 15
                },
              }
            ],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: [
              {
                data: dateList
              }
            ],
            yAxis: [
              {},
            ],
            grid: {
                top: '10%',
                left: '5%',
                right: '5%',
                bottom: '75%'
            },
            series: [
              {
                type: 'line',
                showSymbol: false,
                data: valueList
              }
            ]
          };
        return option
    }
  
    render(){
      return(
        <div>
          <div title="折线图表之一">
              <ReactEcharts option={this.getOption()} theme="Imooc"  style={{height:'400px'}}/>
          </div>
        </div>
      )
    }
  }
  