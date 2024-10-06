import axios from 'axios';

export const uploadImage = async (image: any) => {
  const formData = new FormData();
  formData.append('file', image);

  formData.append('upload_preset', 'devkbin');
  formData.append('folder', 'e-com');
  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return data.secure_url;
  } catch (error) {
    console.log('Error on upload:', error);
  }
};
