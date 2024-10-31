import React, { useState } from "react";

function InpPro() {
    const [formData, setFormData] = useState({
        bookTitle: "",
        genre: "",
        authorName: "",
        description: "",
        profileImage: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profileImage: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append("bookTitle", formData.bookTitle);
        formDataToSend.append("genre", formData.genre);
        formDataToSend.append("authorName", formData.authorName);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("profileImage", formData.profileImage);

        try {
            const response = await fetch("http://26.232.136.42:8080/api/novel/getNovels", {
                method: "GET",
                body: formDataToSend,
            });
            if (response.ok) {
                alert("Data successfully sent to backend!");
            } else {
                alert("Failed to send data.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Book Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="bookTitle">Tên tiểu thuyết</label>
                            <input
                                id="bookTitle"
                                type="text"
                                value={formData.bookTitle}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="genre">Thể loại</label>
                            <input
                                id="genre"
                                type="text"
                                value={formData.genre}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="authorName">Tên tác giả</label>
                            <input
                                id="authorName"
                                type="text"
                                value={formData.authorName}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="profileImage">Ảnh bìa</label>
                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="description">Mô tả</label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                rows="5"
                                placeholder="Nhập mô tả về sách..."
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600">Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default InpPro;
