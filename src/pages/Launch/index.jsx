import React, { Component } from 'react'
import { Checkbox, InputNumber } from 'antd';
import {Map, CustomOverlay} from 'react-bmapgl';
import { Button, Tooltip } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import EnergyChart from '../../components/Echarts/energy'
import Triangle from '../../components/MyCharts/Triangle'
import launch from './index.module.css'


export default class index extends Component {
  render() {
    return (
      <div className={launch.container}>
          <div className={launch.top}>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>发射</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收1</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收2</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收3</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收4</Checkbox>
          </div>

          {/* 地图层 */}
          <div className={launch.center}>
          <Map
            style={{ height: "100%", width: "100%" }}
            center={{lng: 111.91339017089847, lat: 21.085693492605827}}
            zoom={8}
            onClick={e => console.log(e)}
            enableScrollWheelZoom>
              {/* 能量图 */}
              <CustomOverlay position={{lng: 109.91339017089847, lat: 21.085693492605827}}>
              <div style={{float: "left", width: 120, height: 120}}>
                <EnergyChart/>
              </div>
              </CustomOverlay>
              {/* 接收三角形1 */}
              <CustomOverlay position={{lng: 114.29211181640628, lat: 20.75730990148982}}>
              <div style={{float: "left", width: 60, height: 60}}>
                <Triangle/>
              </div>
              </CustomOverlay>

              {/* 接收三角形2 */}
              <CustomOverlay position={{lng: 113.29211181640628, lat: 21.85730990148982}}>
              <div style={{float: "left", width: 60, height: 60}}>
                <Triangle/>
              </div>
              </CustomOverlay>

              {/* 接收三角形3 */}
              <CustomOverlay position={{lng: 113.29211181640628, lat: 20.95730990148982}}>
              <div style={{float: "left", width: 60, height: 60}}>
                <Triangle/>
              </div>
              </CustomOverlay>

              {/* 接收三角形4 */}
              <CustomOverlay position={{lng: 112.29211181640628, lat: 20.95730990148982}}>
              <div style={{float: "left", width: 60, height: 60}}>
                <Triangle/>
              </div>
              </CustomOverlay>

          </Map>
          </div>


          <div className={launch.bottom}>
            <Button type="primary" icon={<CloudSyncOutlined />} style={{marginTop: 10, marginLeft:15}}>Sync</Button>
            <span className='bottom-span'>
              角度：
              <InputNumber
                style={{
                  width: 120,
                }}
                defaultValue="1"
                min="0"
                max="360"
                step="0.1"
                stringMode
              />
            </span>
            <span className='bottom-span'>
              经度：
              <InputNumber
                style={{
                  width: 120,
                }}
                defaultValue="1"
                min="0"
                max="200"
                step="0.1"
                stringMode
              />
            </span>
            <span className='bottom-span'>
              纬度：
              <InputNumber
                style={{
                  width: 120,
                }}
                defaultValue="1"
                min="0"
                max="200"
                step="0.1"
                stringMode
              />
            </span>
          </div>
      </div>
    )
  }
}
