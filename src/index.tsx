import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './a1-main/b1-ui/App';
import {HashRouter} from "react-router-dom";
import {store} from "./a1-main/b2-bll/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
);
