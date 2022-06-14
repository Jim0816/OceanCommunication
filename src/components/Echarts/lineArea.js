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


export default class LineArea extends React.Component{
    
  state = {
    option: {}
  }

  constructor(props) {
    super(props)
    this.state.option = this.getOption()
  }
  
    render(){
      return(
        <div>
          <div>
              <ReactEcharts option={this.state.option} theme="Imooc"  style={{width: '1100px', height:'100%'}}/>
          </div>
        </div>
      )
    }

    // 自定义方法
    getOption =()=> {
      const {labels, values} = this.props
      var newSeries = []
      for (let i = 0 ; i < values.length ; i++){
        let item = {
          data: values[i].data,
          type: 'line',
          areaStyle: {}
        }
        newSeries.push(item)
      }

      let option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: labels
          },
          yAxis: {
            type: 'value'
          },
          grid: {
              top: '0%',
              left: '0%',
              right: '0%',
              bottom: '40%'
          },
          series: newSeries
        };
      return option
  }
}
  