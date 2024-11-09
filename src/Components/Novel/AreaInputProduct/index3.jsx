import React, { useState } from 'react';
import axios from 'axios';

const NovelCreationForm = () => {
  const [formData, setFormData] = useState({
    id_Novel: '',
    name_Novel: '',
    description_Novel: '',
    status_Novel: 'COMPLETED', // Giá trị mặc định cho enum
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Add các trường từ formData
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Add ảnh (file)
    if (imageFile) {
      data.append('image_Novel', imageFile);
    }

    try {
      const response = await axios.post('http://26.232.136.42:8080/api/novel/createNovel', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Novel created:', response.data);
    } catch (error) {
      console.error('Error creating novel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id_Novel"
        value={formData.id_Novel}
        onChange={handleChange}
        placeholder="ID Novel"
        required
      />
      <input
        type="text"
        name="name_Novel"
        value={formData.name_Novel}
        onChange={handleChange}
        placeholder="Name Novel"
        required
      />
      <textarea
        name="description_Novel"
        value={formData.description_Novel}
        onChange={handleChange}
        placeholder="Description"
      />
      <select
        name="status_Novel"
        value={formData.status_Novel}
        onChange={handleChange}
        required
      >
        <option value="COMPLETED">COMPLETED</option>
        <option value="CONTINUE">CONTINUE</option>
        <option value="DROP">DROP</option>
      </select>
      <input type="file" name="image_Novel" onChange={handleFileChange} />

      <button type="submit">Create Novel</button>
    </form>
  );
};

export default NovelCreationForm;