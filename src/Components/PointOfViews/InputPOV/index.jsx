// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createPov } from '@/Redux/ReduxSlice/povSlice';
// const InputPOV = () => {
//     const [namePointOfView, setNamePOV] = useState('');
//     const dispatch = useDispatch();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Dispatch the createCategory thunk action with the input data
//         dispatch(createPov({ namePointOfView }));
//     };
    

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
//         >
//             <input
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
//                 type="text"
//                 value={namePointOfView}
//                 onChange={(e) => setNamePOV(e.target.value)}
//                 placeholder="Name POV"
//                 required
//             />
//             <button
//                 type="submit"
//                 className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// };

// export default InputPOV;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPov, updatePov, fetchPov } from '@/Redux/ReduxSlice/povSlice';

const InputPOV = () => {
    const [idPov, setIdPov] = useState('');  // State để lưu id của POV
    const [namePointOfView, setNamePOV] = useState('');
    const dispatch = useDispatch();

    // Lấy danh sách POV từ Redux
    useEffect(() => {
        dispatch(fetchPov()); // Gọi fetchPov để lấy dữ liệu từ API
    }, [dispatch]);

    const povs = useSelector((state) => state.pov.povs);  // Giả sử bạn có state.pov.povs chứa danh sách POV

    // Hàm xử lý khi chọn POV
    const handlePovChange = (e) => {
        const selectedPovId = e.target.value;
        setIdPov(selectedPovId);

        // Tìm POV đã chọn trong danh sách
        const selectedPov = povs.find((pov) => pov.idPointOfView === selectedPovId);

        if (selectedPov) {
            setNamePOV(selectedPov.namePointOfView); // Điền namePointOfView vào input nếu tìm thấy
        } else {
            setNamePOV(''); // Nếu không tìm thấy, xóa dữ liệu trong namePointOfView
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (idPov) {
            // Nếu có idPov, thực hiện cập nhật POV
            dispatch(updatePov({
                povId: idPov,
                updatedPov: { namePointOfView }
            }));
        } else {
            // Nếu chưa có idPov, thực hiện tạo POV mới
            dispatch(createPov({ namePointOfView }));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            {/* Combobox để chọn POV */}
            <select
                value={idPov}
                onChange={handlePovChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            >
                <option value="">Chọn POV</option>
                {povs.map((pov) => (
                    <option key={pov.idPointOfView} value={pov.idPointOfView}>
                        {pov.namePointOfView}
                    </option>
                ))}
            </select>

            {/* Input để nhập tên POV */}
            <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={namePointOfView}
                onChange={(e) => setNamePOV(e.target.value)}
                placeholder="Name POV"
                required
            />

            <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
            >
                {idPov ? 'Cập nhật POV' : 'Tạo POV'}
            </button>
        </form>
    );
};

export default InputPOV;
