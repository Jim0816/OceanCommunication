import React, { Component } from 'react'
import { Checkbox, InputNumber,message, Button } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import triangle from '../../asserts/photo/triangle2.png'
import rador from '../../asserts/photo/rador.png'
import location from '../../asserts/photo/location.png'
import location_select from '../../asserts/photo/location_select.png'
import launch from './index.module.css'
import store from '../../store/index';

import  {add, getList} from '../../api/launch'
import {get_date_detail, getLocalDateTime} from '../../utils/dateUtil'
import {getAddress} from '../../utils/mapUtil'

const data = [
  {id: 1, name: '发射机A', show: false, icon: rador, lng: 109.91339017089847, lat: 21.085693492605827, time: '', location: '', angle: 0, size: 50},
  {id: 2, name: '接收机B', show: false, icon: triangle, lng: 114.29211181640628, lat: 20.75730990148982, time: '', location: '', angle: 0, size: 50},
  {id: 3, name: '接收天线B1', show: false, icon: triangle, lng: 111.91339017089847, lat: 21.085693492605827, time: '', location: '', angle: 0, size: 50},
  {id: 4, name: '接收天线B2', show: false, icon: triangle, lng: 113.29211181640628, lat: 21.85730990148982, time: '', location: '', angle: 0, size: 50},
  {id: 5, name: '接收天线B3', show: false, icon: triangle, lng: 112.29211181640628, lat: 20.95730990148982, time: '', location: '', angle: 0, size: 50}
]

export default class index extends Component {
  state = {
    location: {},
    list: [], //文件列表
    select: -1, // 选择的文件id
    map: {}, // 地图对象引用
    markers: [], // 页面暂存对象集合
    oper_marker: {}, //当前操作对象
    showList: true
  }

  render() {
    let {oper_marker, markers, list, select} = this.state

    return (
      <div className={launch.container}>
          <div className={launch.top}>
            {
              markers.map((marker, index) => {
                return (
                  <Checkbox id={index + 1} key={index} style={{"marginTop": 15, "marginLeft": 20, "fontWeight": "bolder"}} checked={marker.show} onChange={this.onChangeCheck}>{marker.name}</Checkbox>
                )
              })
            }
          </div>

          {/* 地图层 */}
          <div className={launch.center}>
            <div style={{'position': 'relative', 'width': '100%', 'height': '100%'}}>
              <div id='map' className={launch.map}></div>
              { this.state.showList ? 
                (<div className={launch.showList}>
                  <div className={launch.showList_close} onClick={this.close_show_list}>关闭</div>
                  {
                    list.map((file, index) => {
                      return (
                        <div key={index} className={launch.showList_item} onClick={ (e) => {this.click_file(file._id, e)}}>
                          <span className={launch.showList_item_left}><img style={{'width': '100%', 'height': '100%'}} src={file._id.toString() === select? location_select :location}/></span>
                          <span className={launch.showList_item_right} style={file._id.toString() === select ? {'color': '#1296db'} : {'color': 'white'}}>
                            <label style={{'cursor': 'pointer'}}>名称：{file.filename}</label>
                            <br/>
                            <label style={{'cursor': 'pointer'}}>时间：{file.time}</label>
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

  async componentDidMount() {
    var page_state = this.state
    // 初始化数据
    await getList().then(
      res => {
        console.log(res)
        this.state.list = res
      }
    ).catch(
      err => {
        message.error('数据加载失败')
        console.log(err)
      }
    )
    this.state.markers = data

    // 初始化地图
    document.addEventListener('contextmenu', this._handleContextMenu);
    const map = new window.BMapGL.Map("map");// 创建地图实例 
    var point = new window.BMapGL.Point(111.91339017089847, 21.085693492605827);  //  默认
    map.centerAndZoom(point, 9);  
    // 定位修改
    var geolocation = new window.BMapGL.Geolocation();
    geolocation.getCurrentPosition(function(r){  
        if (this.getStatus() == 0){
            map.setCenter(new window.BMapGL.Point(r.longitude, r.latitude))
            // 初始化默认marker
            let markers = []
            for (let i = 0 ; i < data.length ; i++){
              let item = JSON.parse(JSON.stringify(data[i]))
              item.lng = r.longitude
              item.lat = r.latitude
              item.location = r.address.province + r.address.city + r.address.country
              markers.push(item)
            }
            page_state.markers = markers
            //this.forceUpdate()
        }else{
            console.log('获取位置失败....')
        }
    });

    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放    
    var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);


    // 初始化所有marker
    //this.init_markers(map)

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

  // 获取选择的文件内容
  click_file = (id, event) => {
    let {list, markers, map} = this.state
    let new_markers

    //先清空前面marker
    map.clearOverlays()

    // 更新缓存中 markers
    for (let i = 0 ; i < list.length ; i++){
      let cur_id = (list[i]._id).toString()
      if (id.toString() === cur_id){
        new_markers = list[i].content
        break
      }
    }
    // 格式化markers 便于适配交互
    for (let i = 0 ; i < markers.length ; i++){
      //markers[i] = {id: 1, name: '发射机A', show: false, icon: rador, lng: 109.91339017089847, lat: 21.085693492605827, time: '', location: '', angle: 0, size: 100}
      new_markers[i]['show'] = true
      new_markers[i]['icon'] = markers[i].name.indexOf('发射') != -1 ? rador : triangle
      new_markers[i]['size'] = 50
      new_markers[i]['time'] = ''
      new_markers[i]['location'] = ''
    }
    // 修改select、修改当前页面缓存
    this.setState({
      select: id,
      markers: new_markers
    }, () => {
      // 地图上渲染新marker
      // 调整地图中心位置
      map.setCenter(new window.BMapGL.Point(new_markers[0].lng, new_markers[0].lat))
      for (let i = 0 ; i < new_markers.length ; i++){
        this.showMarker(new_markers[i].id)
      }
    })
    // 将当前页面缓存更新到全局域
    store.dispatch({ type: 'markers', new_markers })
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
    marker.setRotation(item.angle - 45)
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
    oper_marker.location = getAddress(obj.getPosition().lng, obj.getPosition().lat)
    this.state.oper_marker = oper_marker
    // 拖动结束，将当前marker信息更新到当前页面state
    this.update_cur_marker_to_state(oper_marker)
    this.forceUpdate()
  }

  // 拖动marker更新底部信息
  updateBottomInfo = (marker) => {
    let {markers} = this.state 
    let obj = marker.currentTarget
    let title = obj.getTitle()
    let arr = title.split(":")
    let id = Number(arr[0])
    let name = arr[1]
    let cur_marker
    for (let i = 0 ; i < markers.length ; i++){
      if (markers[i].id == id){
        cur_marker = markers[i]
        break
      }
    }
    cur_marker.lng = obj.getPosition().lng
    cur_marker.lat = obj.getPosition().lat
    cur_marker.angle = obj.getRotation() -315

    this.state.oper_marker = cur_marker
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
        let acture_angle = Number(oper_marker.angle) - 45
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
    //store.dispatch({ type: 'markers', markers })
    let data = this.formatData(markers)
    add(data).then(
      res => {
        if (res.result == 1){
          message.success("位置文件创建成功!")
          store.dispatch({ type: 'markers', data})
          // 刷新数据
          getList().then(
            res => {
              this.state.list = res
              if (res.length > 0){
                this.state.select = res[0]._id.toString()
              }
              this.forceUpdate()
            }
          ).catch(
            err => {
              message.error('数据加载失败')
              console.log(err)
            }
          )
        }
        
      }
    ).catch(
      err => {
        message.error('操作失败')
        console.log(err)
      }
    )
  }

  formatData = (markers) => {
    var data = []
    var time = getLocalDateTime()
    for (let i = 0 ; i < markers.length ; i++){
      let marker = markers[i]
      let item = {
        id: marker.id,
        name: marker.name,
        lng: marker.lng,
        lat: marker.lat,
        angle: marker.angle,
        time: time,
        location: marker.location
      }
      data.push(item)
    }
    return {data: data}
  }

  update_cur_marker_to_state = (marker) => {
    let {markers} = this.state
    for (let i = 0 ; i < markers.length ; i++){
      if (markers[i].id === marker.id){
        markers[i] = marker
        break
      }
    }
    this.state.markers = markers
  }

  


}
