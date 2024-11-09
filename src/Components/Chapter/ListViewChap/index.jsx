// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TABLE_HEADS = [
//     'ID Author',
//     'Description Author',
//     'Name Author',
//     'Action',
// ];

// function ListViewChap() {
//     const [chaps, setCategories] = useState([]);

//     useEffect(() => {
//         axios
//             .get('http://26.232.136.42:8080/api/chapter/getAllChapter')
//             .then((chaps) => {
//                 setCategories(Array.from(chaps.data.result));
//                 console.log(Array.from(chaps.data.result)); // Log for debugging
//             })
//             .catch((error) => console.error('Error fetching data:', error));
//     }, []);

//     return (
//         <div>
//             <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
//                 <div className="mb-3">
//                     <h4 className="text-[18px] text-sky-400">Novel</h4>
//                 </div>
//                 <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-track-[var(--scroll-track-bg-color)] scrollbar-thumb-gray-200">
//                     <table className="min-w-[900px] w-full border-collapse text-zinc-900">
//                         <thead className="text-left text-[17px] bg-slate-400">
//                             <tr>
//                                 {TABLE_HEADS.map((th, index) => (
//                                     <th key={index} className="px-3 py-3">
//                                         {th}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {chaps.map((chap) => (
//                                 <tr key={chap.idAuthor}>
//                                     <td className="px-3 py-3">
//                                         {chap.idAuthor}
//                                     </td>
//                                     <td className="px-3 py-3">
//                                         {chap.descriptionAuthor}
//                                     </td>
//                                     <td className="px-3 py-3">
//                                         {chap.nameAuthor}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default ListViewChap;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '@/Redux/ReduxSlice/categorySlice';

const TABLE_HEADS = ['ID Category', 'Name Category', 'Action'];

function ListViewCategory() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Hàm để xóa một mục
  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa mục này?');
    if (confirmDelete) {
      dispatch(deleteCategory(itemId)); // Gọi action xóa category
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
        <div className="mb-3">
          <h4 className="text-[18px] text-sky-400">Category List</h4>
        </div>
        <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-track-[var(--scroll-track-bg-color)] scrollbar-thumb-gray-200">
          <table className="min-w-[900px] w-full border-collapse text-zinc-900">
            <thead className="text-left text-[17px] bg-slate-400">
              <tr>
                {TABLE_HEADS.map((th, index) => (
                  <th key={index} className="px-3 py-3">
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.idCategory}>
                  <td className="px-3 py-3">{category.idCategory}</td>
                  <td className="px-3 py-3">{category.nameCategory}</td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleDelete(category.idCategory)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ListViewCategory;

