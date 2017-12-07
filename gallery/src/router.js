import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Gallery from './routes/Gallery';
import Carousel from './routes/Carousel';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/carousel" component={Carousel} />
    </Router>
  );
}

export default RouterConfig;
