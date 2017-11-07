import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Gallery from './routes/Gallery';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/gallery" component={Gallery} />
    </Router>
  );
}

export default RouterConfig;
