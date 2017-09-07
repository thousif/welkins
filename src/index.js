import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import App from './layout/App';
import Projects from './scenes/projects';
import Issues from './scenes/issues';
import PromoCode from './scenes/promocode/promocode';
import AddPromoCode from './scenes/promocode/add';
import EditPromoCode from './scenes/promocode/edit';
import Login from './scenes/login/index';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Router, Route, Link,IndexRoute, browserHistory, hashHistory } from "react-router";

ReactDOM.render(
  <LocaleProvider locale={enUS}>
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/login" component={Login} />
      <Route path="/" component={App}>
        <IndexRoute component={Projects}></IndexRoute>
        <Route path="/projects" component={Projects} />
        <Route path="/issues" component={Issues} />
        <Route path="/promocode" component={PromoCode} />
        <Route path="/promocode/add" component={AddPromoCode} />
        <Route path="/promocode/edit/:promoid" component={EditPromoCode} />
      </Route>
    </Router>
  </Provider>
  </LocaleProvider>
  ,
document.getElementById('root'));

registerServiceWorker();
