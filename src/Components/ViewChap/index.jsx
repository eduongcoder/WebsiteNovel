import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import PdfViewe from './pdfview';
import Navbar from '@/Layout/DefaultLayout/navbar';
import Comment from '../Comment/Comment';
import ViewComponent from '../Comment/ViewComment/ViCo';
function ViewChap() {
    const { idChapter } = useParams();
    const [searchParams] = useSearchParams();

    const startPage = searchParams.get('startPage');
    const totalPageChapter = searchParams.get('totalPageChapter');
    const titleChapter = searchParams.get('titleChapter');
    if (
        !idChapter ||
        startPage === undefined ||
        totalPageChapter === undefined
    ) {
        return (
            <div className="text-center mt-10 text-red-500">
                <h1>Lỗi</h1>
                <p>
                    Thông tin không hợp lệ. Vui lòng kiểm tra lại URL hoặc dữ
                    liệu truyền vào.
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <Navbar />
            <div className=" bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Chi tiết chương</h1>
                <p className="text-gray-600">
                    {titleChapter} st: {startPage} total: {totalPageChapter}
                </p>
            </div>
            <div className=" shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Xem file PDF</h2>
                <PdfViewe
                    pdfId={idChapter}
                    page={startPage}
                    pageGet={totalPageChapter }
                />
                <Comment idChapter={idChapter} />
            </div>
            
        </div>
    );
}

export default ViewChap;
