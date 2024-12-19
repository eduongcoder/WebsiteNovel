
import CreateChaptersForm from './InputChap/chapters';
import ListViewChapters from './ListViewChap';
import UpdateChapter from './InputChap/updatechapter';
import React from 'react';
import { useState } from 'react';
// function Chapter() {
//     return (
//         <div>
         
//             <CreateChaptersForm />
//             {/* <ListViewChapters /> */}
//         </div>
//     );
// }

// export default Chapter;
export default function Chapter() {
    // State để lưu tab hiện tại (default là "chapters")
    const [activeTab, setActiveTab] = useState('about');
    return (
        <div className="text-gray-600 bg-blue-200 body-font mx-auto pb-8 h-full max-w-[1280px] flex-1 py-0 px-8 md:px-24">
            {/* Tabs header */}
            <div className="text-sm font-medium text-center  text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    {/* Tab About */}
                    <li className="me-2">
                        <button
                            onClick={() => setActiveTab('about')} // Đổi state về "about"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'about'
                                    ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                            }`}
                        >
                            Input chapter
                        </button>
                    </li>
                    {/* Tab Chapters */}
                    <li className="me-2">
                        <button
                            onClick={() => setActiveTab('chapters')} // Đổi state về "chapters"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === 'chapters'
                                    ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                            }`}
                        >
                            Update chapter
                        </button>
                    </li>
                </ul>
            </div>

            {/* Nội dung hiển thị dựa trên tab hiện tại */}
            {activeTab === 'about' &&  <CreateChaptersForm />}
            {activeTab === 'chapters' && <UpdateChapter  />}
        </div>
    );
}
