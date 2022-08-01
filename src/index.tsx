import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// apiSpecifications：{servers:[ {url: string} ], paths:[string: {选项: {parameters: [{
//                      "in": string,
//                      "name":string
//                   },
//  ]} }] }

// get/post
// 另外，in 的 value 只能是 "path" | "query" | "header" | "cookie" | "processing";