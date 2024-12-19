import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    UpdateUser as updateUserAction,
    UpdateAvater,
} from '@/Redux/ReduxSlice/userSlice';

const UpdateUser = ({ user }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState(user.email || '');
    const [userName, setUserName] = useState(user.userName || '');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleUpdateAvater = async (e) => {
        e.preventDefault();
        if (!file) return; // Prevent update if no file is selected
        console.log('Updating avatar:', file);
        try {
            const filedata = new FormData();
            filedata.append("image",file);
            console.log(filedata)
            await dispatch(UpdateAvater({ ima: filedata, email }));
        } catch (error) {
            console.error(error);
        }
    };

    const [dobUser, setDobUser] = useState(
        user?.dobUser
            ? `${user.dobUser[0]}-${user.dobUser[1]
                  .toString()
                  .padStart(2, '0')}-${user.dobUser[2]
                  .toString()
                  .padStart(2, '0')}`
            : '',
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            email,
            userName,
            dobUser,
            // ... other fields if needed
        };
        dispatch(updateUserAction(JSON.stringify(body)));
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email} // Use the state variable `email` here
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        User Name
                    </label>
                    <input
                        type="text"
                        value={userName} // Use the state variable `userName` here
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        value={dobUser}
                        onChange={(e) => setDobUser(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update User
                    </button>
                    <button
                        type="button"
                        onClick={handleUpdateAvater}
                        className="px-8 py-2.5 leading-5 text-white bg-green-600 rounded-md hover:bg-green-500"
                    >
                        Update Avatar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
