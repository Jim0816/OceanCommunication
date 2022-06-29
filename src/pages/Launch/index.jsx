import React, { Component } from 'react'
import { Checkbox, InputNumber,message, Button } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import triangle from '../../asserts/photo/triangle2.png'
import rador from '../../asserts/photo/rador.png'
import location from '../../asserts/photo/location.png'
import location_select from '../../asserts/photo/location_select.png'
import launch from './index.module.css'
import store from '../../store/index';

import  {add} from '../../api/launch'
import {get_date_detail} from '../../utils/dateUtil'

const data = [
  {id: 0, name: '发射机A', show: false, icon: rador, lng: 109.91339017089847, lat: 21.085693492605827, angle: 0, size: 100},
  {id: 1, name: '接收机B', show: false, icon: triangle, lng: 114.29211181640628, lat: 20.75730990148982, angle: 60, size: 50},
  {id: 2, name: '接收天线B1', show: false, icon: triangle, lng: 111.91339017089847, lat: 21.085693492605827, angle: 90, size: 50},
  {id: 3, name: '接收天线B2', show: false, icon: triangle, lng: 113.29211181640628, lat: 21.85730990148982, angle: 0, size: 50},
  {id: 4, name: '接收天线B3', show: false, icon: triangle, lng: 112.29211181640628, lat: 20.95730990148982, angle: 180, size: 50}
]

const list = [
  {id: 0, name: '文件名称-1', date_time: '2022-06-28 12:00:00', desc: '描述信息'},
  {id: 1, name: '文件名称-2', date_time: '2022-06-27 12:00:00', desc: '描述信息'},
  {id: 2, name: '文件名称-3', date_time: '2022-06-26 12:00:00', desc: '描述信息'},
  {id: 3, name: '文件名称-4', date_time: '2022-06-25 12:00:00', desc: '描述信息'},
  {id: 4, name: '文件名称-5', date_time: '2022-06-24 12:00:00', desc: '描述信息'},
  {id: 5, name: '文件名称-6', date_time: '2022-06-23 12:00:00', desc: '描述信息'},
  {id: 6, name: '文件名称-7', date_time: '2022-06-22 12:00:00', desc: '描述信息'},
  {id: 7, name: '文件名称-8', date_time: '2022-06-21 12:00:00', desc: '描述信息'},
  {id: 8, name: '文件名称-8', date_time: '2022-06-21 12:00:00', desc: '描述信息'}
]

export default class index extends Component {
  state = {
    list: [], //文件列表
    select: -1, // 选择的文件id
    map: {}, // 地图对象引用
    markers: [], // 页面暂存对象集合
    oper_marker: {}, //当前操作对象
    showList: true
  }

  constructor(props) {
    super(props)
    this.init_data()
  }

  render() {
    let {oper_marker, markers, list, select} = this.state

    return (
      <div className={launch.container}>
          <div className={launch.top}>
            {
              markers.map((marker, index) => {
                return (
                  <Checkbox id={index} key={index} style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}} checked={marker.show} onChange={this.onChangeCheck}>{marker.name}</Checkbox>
                )
              })
            }
          </div>

          {/* 地图层 */}
          <div className={launch.center}>
            <div style={{'position': 'relative', 'width': '100%', 'height': '100%', 'backgroundColor': 'red'}}>
              <div id='map' className={launch.map}></div>
              { this.state.showList ? 
                (<div className={launch.showList}>
                  <div className={launch.showList_close} onClick={this.close_show_list}>关闭</div>
                  {
                    list.map((file, index) => {
                      return (
                        <div className={launch.showList_item} onClick={ (e) => {this.click_file(file.id, e)}}>
                          <span className={launch.showList_item_left}><img style={{'width': '100%', 'height': '100%'}} src={file.id == select ? location_select :location}/></span>
                          <span className={launch.showList_item_right} style={file.id == select ? {'color': '#1296db'} : {'color': 'white'}}>
                            <label style={{'cursor': 'pointer'}}>名称：{file.name}</label>
                            <br/>
                            <label style={{'cursor': 'pointer'}}>时间：{file.date_time}</label>
                          </span>
                        </div>
                      )
                    })
                  }  
                </div>) : null
              }
            </div>
          </div>


          <div className={launch.bottom}>
            <Button type="primary" icon={<CloudSyncOutlined />} style={{marginTop: 10, marginLeft:15}} onClick={this.submitChange}>生成</Button>
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
    document.addEventListener('contextmenu', this._handleContextMenu);
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

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);
  }

  _handleContextMenu = (event) => {
    event.preventDefault();
    this.state.showList = true
    this.forceUpdate()
  }

  close_show_list = () => {
    this.state.showList = false
    this.forceUpdate()
  }

  // 格式化后端获取的初始数据 list
  init_data = () => {
    this.state.list = JSON.parse(JSON.stringify(list))
  }

  // 获取选择的文件内容
  click_file = (id, event) => {
    // 去后端获取该文件的内容
    let data1 = JSON.parse(JSON.stringify(data))
    // 修改select、修改当前页面缓存
    this.setState({
      select: id,
      markers: data1
    })
    // 将当前页面缓存更新到全局域
    store.dispatch({ type: 'markers', data })
  }

  init_markers = (map) => {
    let {markers} = this.state
    for (let i = 0 ; i < markers.length ; i++){
      let item = markers[i]
      if (item.show) {
        let marker = this.generate_marker(item)
        map.addOverlay(marker);
      } 
    }
    store.dispatch({ type: 'markers', markers })
  }

  // 创建一个marker对象
  generate_marker = (item) => {
    let point = new window.BMapGL.Point(item.lng, item.lat);  // 创建点坐标 
    let myIcon = new window.BMapGL.Icon(item.icon, new window.BMapGL.Size(item.size, item.size), {anchor: new window.BMapGL.Size(0, 0)});     
    let marker = new window.BMapGL.Marker(point, {title: item.id + ':' + item.name, icon: myIcon, enableDragging: true, enableClicking: true, draggingCursor: 'move'});
    marker.setRotation(item.angle + 45)
    // 点击事件
    marker.addEventListener('click', (e) => {this.updateBottomInfo(e)});
    // 覆盖物拖拽开始事件
    marker.addEventListener('dragstart', (e) => {this.updateBottomInfo(e)});
    // 覆盖物拖拽事件
    marker.addEventListener('dragend', (e) => {this.endDragMarker(e)});
    return marker
  }

  onChangeCheck = (e) => {
    let {markers} = this.state
    let id = e.target.id
    let show = e.target.checked
    if (show){
      this.showMarker(id)
    }else{
      this.removeMarker(id)
    }

    for (let i = 0 ; i < markers.length ; i++){
      if (markers[i].id === id){
        markers[i].show = show
        break
      }
    }

    this.state.markers = markers
    this.forceUpdate()
  }

  // 在地图上显示marker，不修改数据
  showMarker = (id) => {
    let {markers, map} = this.state
    // 更新地图上的角度显示效果
    for (let i = 0 ; i < markers.length ; i++){
      let item = markers[i]
      if (item.id === id) {
        let marker = this.generate_marker(item)
        map.addOverlay(marker);
        return false;
      }
    }
  }

  // 在地图上移除marker，不修改数据
  removeMarker = (marker_id) => {
    let { map} = this.state
    let markers = map.getOverlays()
    for (let i = 0 ; i < markers.length ; i++){
      let marker = markers[i]
      let id = Number(marker.getTitle().split(":")[0])
      if (id === marker_id){
        console.log(marker)
        map.removeOverlay(marker)
        break;
      }
    }
  }



  // 拖拽marker结束
  endDragMarker = (marker) => {
    let {oper_marker} = this.state
    let obj = marker.currentTarget
    oper_marker.lng = obj.getPosition().lng
    oper_marker.lat = obj.getPosition().lat
    this.state.oper_marker = oper_marker
    // 拖动结束，将当前marker信息更新到当前页面state
    this.update_cur_marker_to_state(oper_marker)
    this.forceUpdate()
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


  // 输入底部信息，更新地图上角度
  updateMarker = () => {
    let {map, oper_marker} = this.state
    // 更新地图上的角度显示效果
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
    this.update_cur_marker_to_state(oper_marker)
    this.forceUpdate()
  }

  // 点击同步按钮，更新数据
  submitChange = () => {
    let {oper_marker, markers} = this.state
    // 将本页操作marker的结果更新到缓存，同时推送到后端
    store.dispatch({ type: 'markers', markers })
    let data = this.formatData(markers)
    console.log(data)
    // add().then(
    //   res => {
    //     console.log(res)
    //   }
    // ).catch(
    //   err => {
    //     console.log(err)
    //   }
    // )
    
    // if (oper_marker.id == null){
    //   alert('请选择地图上组件')
    // }else{
    //   // 更新前端的marker信息: state 、 store
    //   for (let i = 0 ; i < markers.length ; i++){
    //     if (markers[i].id === oper_marker.id){
    //       markers[i] = oper_marker
    //       break
    //     }
    //   }
    //   this.state.markers = markers
    //   this.forceUpdate()
    //   store.dispatch({ type: 'markers', markers })
    // }
  }

  formatData = (markers) => {
    let data = []
    let date = get_date_detail()
    for (let i = 0 ; i < markers.length ; i++){
      let item = JSON.parse(JSON.stringify(date))
      // 添加经度lng、纬度lat、角度
      item.push(markers[i].lng.toString(), markers[i].lat.toString(), markers[i].angle.toString())
      data.push(item)
    }
    return data
  }

  update_cur_marker_to_state = (marker) => {
    let {markers} = this.state
    // 更新前端的marker信息: state 、 store
    for (let i = 0 ; i < markers.length ; i++){
      if (markers[i].id === marker.id){
        markers[i] = marker
        break
      }
    }
    this.state.markers = markers
  }

  


}
