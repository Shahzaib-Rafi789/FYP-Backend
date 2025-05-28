import { v2 as cloudinary } from 'cloudinary';

// export const cloudinaryConfig = {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   };

  export const cloudinaryConfig = {
    cloud_name: "dflru2zxn",
    api_key: "348112931346276",
    api_secret: "1C8uk0l_5TVXe8Fz3ufYgdwX-Tk",
  };

// console.log (cloudinaryConfig);
cloudinary.config(cloudinaryConfig);
export default cloudinary;
  