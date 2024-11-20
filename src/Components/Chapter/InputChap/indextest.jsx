import React, { useState } from 'react';
import createChapterr from './test';

const ChapterForm = () => {
    const [file, setFile] = useState(null);
    const [chapterData, setChapterData] = useState({
        chapterTitle: '',
        chapterContent: '',
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChapterData({
            ...chapterData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file && chapterData.chapterTitle && chapterData.chapterContent) {
            await createChapterr(file, chapterData);
        } else {
            console.log('Please fill in all the required fields and select a file.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Chapter Title:</label>
                <input
                    type="text"
                    name="chapterTitle"
                    value={chapterData.chapterTitle}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Chapter Content:</label>
                <textarea
                    name="chapterContent"
                    value={chapterData.chapterContent}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Upload File:</label>
                <input type="file" onChange={handleFileChange} required />
            </div>
            <button type="submit">Create Chapter</button>
        </form>
    );
};

export default ChapterForm;
