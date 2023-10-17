import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dbarve1fc',
      api_key: '656898721517155',
      api_secret: 'jE5avJsT923my1lvYka7_3iW4rY',
    });
  },
};
