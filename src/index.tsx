import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/hash/Hash';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Subscribe from "./components/subscribe/Subscribe";
import ConnectedRoute from "./components/connected-route";
import Info from './components/info/info';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/" element={<ConnectedRoute />}>
                <Route path="info" element={<Info />} />
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
