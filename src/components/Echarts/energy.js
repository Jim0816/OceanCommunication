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


export default class EnergyChart extends React.Component{
    getOption =()=> {
        let option = {
            title: {
              text: ''
            },
            legend: {
              data: []
            },
            radar: {
              // shape: 'circle',
              indicator: [
                { name: '1', max: 1000 },
                { name: '2', max: 1000 },
                { name: '3', max: 1000 },
                { name: '4', max: 1000 },
                { name: '5', max: 1000 },
                { name: '6', max: 1000 },
                { name: '7', max: 1000 },
                { name: '8', max: 1000 },
                { name: '9', max: 1000 },
                { name: '10', max: 1000 },
                { name: '11', max: 1000 },
                { name: '12', max: 1000 }
              ]
            },
            series: [
              {
                name: '',
                type: 'radar',
                data: [
                  {
                    value: [0, 500, 800, 1000, 800, 500, 0, 500, 800, 1000, 800, 500],
                    name: ''
                  }
                ]
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
  