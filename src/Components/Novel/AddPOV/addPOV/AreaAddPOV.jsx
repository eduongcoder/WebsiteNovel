import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNovelOnlyName, addPOV } from '@/Redux/ReduxSlice/novelSlice';
import { fetchPov } from '@/Redux/ReduxSlice/povSlice';

function AddPOV() {
    const dispatch = useDispatch();

    const [namePointOfView, setNamePOV] = useState('');
    const [idNovel, setIdNovel] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { pov: povs } = useSelector((state) => state.pov);
    const novels = useSelector((state) => state.novel.novels);
    console.log(povs);
    useEffect(() => {
        dispatch(fetchPov());
        dispatch(fetchNovelOnlyName());
    }, [dispatch]);

    const handleAddPOV = async () => {
        setMessage('');
        console.log(namePointOfView, idNovel);
        if (namePointOfView && idNovel) {
            setIsLoading(true);
            try {
                await dispatch(addPOV({ namePointOfView, idNovel })).unwrap();
                setMessage('Failed to add POV. Please try again.');
                setNamePOV('');
                setIdNovel('');
            } catch (error) {
                setMessage('POV added successfully! ');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setMessage('Please select both a POV and a novel.');
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Add POV to Novel
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="pov"
                    className="block text-gray-600 font-medium mb-2"
                >
                    Point of View
                </label>
                <select
                    id="pov"
                    value={namePointOfView}
                    onChange={(e) => setNamePOV(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select POV</option>
                    {povs.map((pov) => (
                        <option
                            key={pov.idPointOfView}
                            value={pov.namePointOfView}
                        >
                            {pov.namePointOfView}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label
                    htmlFor="novel"
                    className="block text-gray-600 font-medium mb-2"
                >
                    Novel
                </label>
                <select
                    id="novel"
                    value={idNovel}
                    onChange={(e) => setIdNovel(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select Novel</option>
                    {novels.map((novel) => (
                        <option key={novel.idNovel} value={novel.idNovel}>
                            {novel.nameNovel}
                        </option>
                    ))}
                </select>
            </div>

            {message && (
                <p
                    className={`text-center mb-4 ${
                        message.includes('successfully')
                            ? 'text-green-500'
                            : 'text-red-500'
                    }`}
                >
                    {message}
                </p>
            )}

            <button
                onClick={handleAddPOV}
                disabled={isLoading}
                className={`w-full py-3 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 ${
                    isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                }`}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <span className="loader mr-2"></span> Adding...
                    </div>
                ) : (
                    'Add POV'
                )}
            </button>
        </div>
    );
}

export default AddPOV;
