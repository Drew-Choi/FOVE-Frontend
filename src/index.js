/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//router-dom 설정
import { BrowserRouter } from 'react-router-dom';
//redux 세팅
import { Provider } from 'react-redux';
import rootReducer from './store';
import { configureStore } from '@reduxjs/toolkit';

//크롭 redux 도구 사용 세팅
const reduxDevTool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//리덕스 store 세팅, 스토어장소 설정 후 Provider에 넣어줘야하고 reducer: 에는 combin한 JS파일을 임폴트해준다.
const store = configureStore({ reducer: rootReducer }, reduxDevTool);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //router-dom 설정
  <BrowserRouter>
    {/* redux 세팅  추후 store 추가해야함*/}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);

reportWebVitals();
