import React, { Component } from 'react'
import { Checkbox, InputNumber } from 'antd';
import {Map, CustomOverlay} from 'react-bmapgl';
import { Button, Tooltip } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import EnergyChart from '../../components/Echarts/energy'
import './index.css'


export default class index extends Component {
  render() {
    return (
      <div className='container'>
          <div className='top'>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>发射</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收1</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收2</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收3</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收4</Checkbox>
          </div>

          {/* 地图层 */}
          <div className='center'>
          <Map
            style={{ height: "100%", width: "100%" }}
            center={{lng: 109.91339017089847, lat: 18.313424294273666}}
            zoom={12}
            onClick={e => console.log(e)}
            enableScrollWheelZoom>
              <CustomOverlay position={{lng: 109.91339017089847, lat: 18.313424294273666}}>
              <div style={{float: "left", width: 150, height: 150}}>
                <EnergyChart/>
              </div>
              </CustomOverlay>
          </Map>
          </div>


          <div className='bottom'>
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
