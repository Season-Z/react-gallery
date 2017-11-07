import { queryGalleryDataFn } from '../services/gallery';

export default {

  namespace: 'gallery',

  state: {
    dataList: [],
  },

  subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        history.listen((location) => {
          if (location.pathname === '/gallery') {
            dispatch({
              type: 'queryGalleryData',
              payload: {},
            });
          }
        });
      },
  },

  effects: {
    *queryGalleryData({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(queryGalleryDataFn);
      yield put({
        type: 'querySuccess',
        payload: {
          dataList: data.data,
        },
      });
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      return { ...state, ...payload };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
