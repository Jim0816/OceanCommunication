import React, { Component } from 'react'
import progressBar from './index.module.css'
export default class index extends Component {
  render() {
    return (
      <div className={progressBar.container}>
          <div className={progressBar.main}>
            <div className={progressBar.surface} style={{left: '10%', width: '40%'}}></div>
            <div className={progressBar.start} style={{left: '10%'}}></div>
            <div className={progressBar.end} style={{left: '70%'}}></div>
          </div>
      </div>
    )
  }
}
