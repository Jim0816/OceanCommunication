import React, { Component } from 'react'
import { Checkbox, InputNumber } from 'antd';
import { Button, Tooltip } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import EnergyChart from '../../components/Echarts/energy'
import Triangle from '../../components/MyCharts/Triangle'
import triangle from '../../asserts/photo/triangle2.png'
import rador from '../../asserts/photo/rador.png'
import launch from './index.module.css'

const data = [
  {id: 0, name: '发射机A', icon: rador, lng: 109.91339017089847, lat: 21.085693492605827, angle: 0, size: 100},
  {id: 1, name: '接收机B', icon: triangle, lng: 114.29211181640628, lat: 20.75730990148982, angle: 60, size: 50},
  {id: 2, name: '接收天线B1', icon: triangle, lng: 111.91339017089847, lat: 21.085693492605827, angle: 90, size: 50},
  {id: 3, name: '接收天线B2', icon: triangle, lng: 113.29211181640628, lat: 21.85730990148982, angle: 0, size: 50},
  {id: 4, name: '接收天线B3', icon: triangle, lng: 112.29211181640628, lat: 20.95730990148982, angle: 180, size: 50}
]

export default class index extends Component {
  state = {
    map: {},
    markers: [],
    oper_marker: {}
  }

  render() {
    let {oper_marker} = this.state
    return (
      <div className={launch.container}>
          <div className={launch.top}>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>发射机A</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收机B</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收天线B1</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收天线B2</Checkbox>
            <Checkbox style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}}>接收天线B3</Checkbox>
          </div>

          {/* 地图层 */}
          <div id="map" className={launch.center}>
          
          </div>


          <div className={launch.bottom}>
            <Button type="primary" icon={<CloudSyncOutlined />} style={{marginTop: 10, marginLeft:15}}>Sync</Button>
            <span className={launch.bottomSpan} style={{width: '200px'}}>
              角度(顺时针0-360)：
              <InputNumber
                style={{
                  width: 60,
                }}
                defaultValue="1"
                value={oper_marker.angle}
                min="0"
                max="360"
                step="0.1"
                stringMode
                controls={false}
                onBlur={(event) => this.updateMarker(event)}
                onChange={(event) => this.changeValue('angle', event)}
              />
            </span>
            <span className={launch.bottomSpan}>
              经度：
              <InputNumber
                style={{
                  width: 180,
                }}
                defaultValue="1"
                value={oper_marker.lng}
                min="0"
                max="200"
                step="0.1"
                stringMode
                controls={false}
                onChange={(event) => this.changeValue('lng', event)}
              />
            </span>
            <span className={launch.bottomSpan}>
              纬度：
              <InputNumber
                style={{
                  width: 180,
                }}
                defaultValue="1"
                value={oper_marker.lat}
                min="0"
                max="200"
                step="0.1"
                stringMode
                controls={false}
                onChange={(event) => this.changeValue('lat', event)}
              />
            </span>
          </div>
      </div>
    )
  }

  componentDidMount() {
    //var map = document.getElementById('map')
    //console.log(map)
    const map = new window.BMapGL.Map("map");          // 创建地图实例 
    var point = new window.BMapGL.Point(111.91339017089847, 21.085693492605827);  // 创建点坐标 
    map.centerAndZoom(point, 9);  
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放    
    var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);

    // 初始化所有marker
    this.init_markers(map)

    var copyrights = document.getElementsByClassName(' BMap_cpyCtrl anchorBL');
    if (copyrights.length > 0){
      copyrights[0].style.display = 'none'
    }

    this.state.map = map
    this.forceUpdate()
  }

  init_markers = (map) => {
    for (let i = 0 ; i < data.length ; i++){
      let item = data[i]
      let point = new window.BMapGL.Point(item.lng, item.lat);  // 创建点坐标 
      let myIcon = new window.BMapGL.Icon(item.icon, new window.BMapGL.Size(item.size, item.size), {anchor: new window.BMapGL.Size(0, 0)});     
      let marker = new window.BMapGL.Marker(point, {title: item.id + ':' + item.name, icon: myIcon, enableDragging: true, enableClicking: true, draggingCursor: 'move'});
      marker.setRotation(item.angle + 45)
      // 点击事件
      marker.addEventListener('click', (e) => {this.updateBottomInfo(e)});
      // 覆盖物拖拽开始事件
      marker.addEventListener('dragstart', (e) => {this.updateBottomInfo(e)});
      // 覆盖物拖拽事件
      marker.addEventListener('dragend', function () {
          var nowPoint = marker.getPosition(); // 拖拽完成之后坐标的位置
          console.log('当前位置:', nowPoint)
      });
      map.addOverlay(marker); 
    }
    
  }

  // 拖动marker更新底部信息
  updateBottomInfo = (marker) => {
    let obj = marker.currentTarget
    let title = obj.getTitle()
    let arr = title.split(":")
    let id = Number(arr[0])
    let name = arr[1]
    this.state.oper_marker = {id: id, name: name, lng: obj.getPosition().lng, lat: obj.getPosition().lat, angle: obj.getRotation() - 45}
    this.forceUpdate()
  }

  // 底部输入框更新输入数据
  changeValue = (key, event) => {
    let {oper_marker} = this.state
    switch (key){
      case 'angle':
        oper_marker.angle = event == null ? 0 : event
        break;
      case 'lng':
        oper_marker.lng = event
        break;
      case 'lat':
        oper_marker.lat = event
        break;
      default:
        break;
    }
    this.state.oper_marker = oper_marker
  }


  // 输入底部信息，更新地图上marker的位置、角度
  updateMarker = () => {
    let {map, oper_marker} = this.state
    let markers = map.getOverlays()
    for (let i = 0 ; i < markers.length ; i++){
      let marker = markers[i]
      let id = Number(marker.getTitle().split(":")[0])
      if (id === oper_marker.id){
        let acture_angle = 45 + Number(oper_marker.angle)
        marker.setRotation(acture_angle)
        break;
      }
    }
    //console.log(oper_marker)
    this.forceUpdate()
  }

  


}
