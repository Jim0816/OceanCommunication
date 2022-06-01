import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 引入antd样式
import 'antd/dist/antd.css'

// 引入路由组件
import { HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// 引入路由配置
import {mainRoutes} from './routes'

// 将App组件渲染到dom元素 root元素在public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Switch>
      <Route path="/admin" render={routeProps => <App {...routeProps}/>}/>
      {mainRoutes.map(route => {return <Route key={route.path} {...route}></Route>})}
      <Redirect to="/404" />
    </Switch>
  </Router>
);
