import React from 'react';
import { useParams } from 'react-router-dom';
import PdfViewe from './pdfview';
import Navbar from '@/Layout/DefaultLayout/navbar';
function ViewChap() {
    const { idChapter } = useParams();

    if (!idChapter) {
        return (
            <div className="text-center mt-10 text-red-500">
                <h1>Lỗi</h1>
                <p>ID chương không hợp lệ. Vui lòng kiểm tra lại URL.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
        <Navbar />
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Chi tiết chương</h1>
                <p className="text-gray-600">Mã chương: {idChapter}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Xem file PDF</h2>
                <PdfViewe pdfId={idChapter}  />
            </div>
        </div>
    );
}

export default ViewChap;
