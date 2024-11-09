import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPov } from '@/Redux/ReduxSlice/povSlice';
const InputPOV = () => {
    const [namePointOfView, setNamePOV] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the createCategory thunk action with the input data
        dispatch(createPov({ namePointOfView }));
    };
    

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
        >
            {/* <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                type="text"
                value={idPointOfView}
                onChange={(e) => setIdPOV(e.target.value)}
                placeholder="ID POV"
                required
            /> */}
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
                Submit
            </button>
        </form>
    );
};

export default InputPOV;
