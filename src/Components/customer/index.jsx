import React, { useEffect } from 'react';
import axios from 'axios';

function Customer() {
    useEffect(() => {
        axios.delete('http://26.232.136.42:8080/api/category/deleteCategory?idCategory=7f338a97-f817-41b5-ac2d-f5f3c74')
        .then(response => {
          console.log('Đã xóa mục thành công:', response.data);
        })
        .catch(error => {
          console.error('Lỗi khi xóa mục:', error);
        });
      
    }, []);
    // 1a80d4ec-4dd1-4f36-b015-b5069f4b60ed
    return <div>Xóa category thành công</div>;
}

export default Customer;
