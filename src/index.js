/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//router-dom 설정
import { BrowserRouter } from 'react-router-dom';
//redux 세팅
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';

//크롭 redux 도구 사용 세팅
// const reduxDevTool =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//리덕스 store 세팅, 스토어장소 설정 후 Provider에 넣어줘야하고 reducer: 에는 combin한 JS파일을 임폴트해준다.
// const store = configureStore({ reducer: combineReducers }, reduxDevTool);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 2번 렌더링 방지
  // <React.StrictMode>

  //router-dom 설정
  <BrowserRouter>
    {/* redux 세팅  추후 store추가해야함*/}
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </BrowserRouter>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
