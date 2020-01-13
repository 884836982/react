import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
ReactDOM.render( 
<ConfigProvider locale={zhCN}><BrowserRouter>< App/></BrowserRouter></ConfigProvider> , 
document.getElementById('root'));