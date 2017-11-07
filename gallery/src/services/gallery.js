import request from '../utils/request';

export async function queryGalleryDataFn() {
  return request('/api/gallery');
}
