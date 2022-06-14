import React, { Component } from 'react'
import {Map, CustomOverlay} from 'react-bmapgl';
import EnergyChart from '../../components/Echarts/energy'
import Triangle from '../../components/MyCharts/Triangle'
import interaction from './index.module.css'
export default class index extends Component {
  render() {
    return (
      <div className={interaction.container}>
          <div className={interaction.left}>1</div>
          <div className={interaction.center}>2</div>
          <div className={interaction.right}>
            <div className={interaction.center_top}></div>
            <div className={interaction.center_bgmap}>
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
            <div className={interaction.center_bottom}></div>
          </div>
      </div>
    )
  }
}
