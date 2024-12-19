import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, sendOTP } from '@/Redux/ReduxSlice/userSlice';

function Register() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState(''); // OTP nhận được từ API

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSendOtp = async () => {
        if (!email) {
            alert('Please enter a valid email');
            return;
        }
        // Gọi API để gửi OTP
        const result = await dispatch(sendOTP(email));
        console.log('OTP sent:', result);  // Kiểm tra kết quả gửi OTP
        // Kiểm tra nếu OTP gửi thành công (giả sử API trả về mã OTP)
        if (result.payload && result.payload !== 'string') {
            setOtpCode(result.payload); // Lưu mã OTP vào state
            setIsOtpSent(true); // Đánh dấu OTP đã được gửi
        } else {
            alert('Failed to send OTP');
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch) {
            alert('Passwords do not match');
            return;
        }
        console.log("Entered OTP:",  otp);  // Kiểm tra giá trị OTP người dùng nhập
        console.log("Sent OTP Code:", otpCode);  // Kiểm tra giá trị OTP nhận được từ API
        if (otp === otpCode) {
            const result = await dispatch(createUser({ email, password }));
            if (result.payload) {
                alert('User registered successfully');
                toggleModal(); // Đóng modal sau khi đăng ký thành công
            } else {
                alert('Registration failed');
            }
        } else {
            alert('Invalid OTP');
        }
    };
    

    return (
        <>
            <button
                onClick={toggleModal}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                type="button"
            >
                Register
            </button>

            {isModalOpen && (
                <div
                    id="authentication-modal"
                    tabIndex="-1"
                    aria-hidden={!isModalOpen}
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Đăng ký Tài Khoản
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4">
                                <form
                                    className="space-y-4"
                                    onSubmit={handleSubmit}
                                >
                                    {!isOtpSent ? (
                                        <>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Your email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    placeholder="name@company.com"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Your password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    value={password}
                                                    onChange={
                                                        handlePasswordChange
                                                    }
                                                    placeholder="••••••••"
                                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="confirm-password"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Confirm password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirm-password"
                                                    id="confirm-password"
                                                    value={confirmPassword}
                                                    onChange={
                                                        handleConfirmPasswordChange
                                                    }
                                                    placeholder="••••••••"
                                                    className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
                                                        !passwordMatch
                                                            ? 'border-red-500'
                                                            : 'border-gray-300'
                                                    }`}
                                                    required
                                                />
                                                {!passwordMatch && (
                                                    <p className="text-sm text-red-500">
                                                        Passwords do not match
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleSendOtp}
                                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Send OTP
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <label
                                                    htmlFor="otp"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Enter OTP
                                                </label>
                                                <input
                                                    type="text"
                                                    name="otp"
                                                    id="otp"
                                                    value={otp}
                                                    onChange={handleOtpChange}
                                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    placeholder="Enter OTP"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Complete Registration
                                            </button>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Register;
