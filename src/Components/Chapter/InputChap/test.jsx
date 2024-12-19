import axios from 'axios';
const BASE_URL = 'http://26.232.136.42:8080/api/chapter';

const createChapterr = async (file, chapterData) => {
    const formData = new FormData();

    // Add file
    formData.append('file', file);

    // Add JSON data (ChapterCreationRequest)
    formData.append(
        'request',
        new Blob([JSON.stringify(chapterData)], { type: 'application/json' })
    );

    try {
        const response = await axios.post(`${BASE_URL}/createChapter`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
};

export default createChapterr;
