import { config, uploader } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudinaryConfig = (req, res, next) => {
  config({
    // cloud_name: 'phantware-nigeria',
    // api_key: '328459338566541',
    // api_secret: '9r5CjO6did7WqUSeOk8cS-WdgoU'

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    
  });
  next();
  // console.log(p);
};
export { cloudinaryConfig, uploader };
