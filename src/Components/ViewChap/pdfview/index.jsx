import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPdfData } from '@/Redux/ReduxSlice/chapterSlice';

const PdfViewer = ({ pdfId, page, pageGet }) => {
    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux store
    const { pdfData, error } = useSelector((state) => state.chapter);
    const pageContent = pdfData; // Sử dụng trực tiếp pdfData vì đây là chuỗi Base64
    // Gọi API khi component mount hoặc khi các props thay đổi
    useEffect(() => {
        if (pdfId && page) {
            dispatch(fetchPdfData({ pageNum: page, pdfId, pageGet }));
        }
    }, [dispatch, pdfId, page, pageGet]);

    return (
        <div>
            <div  className="   dark:bg-gray-900 mx-auto  h-full max-w-[1280px] flex-1 py-0 px-8 md:px-24">
                <button
                    onClick={() =>
                        dispatch(
                            fetchPdfData({ pageNum: page, pdfId, pageGet }),
                        )
                    }
                >
                    Xem Trang {page}
                </button>
                {error && <p className="text-red-500">Error: {error}</p>}
                {pageContent ? (
                    <iframe
                        src={'data:application/pdf;base64,' + pageContent}
                        style={{
                            width: '100%',
                            height: '1000px',
                            border: 'none',
                        }}
                        title="PDF Viewer"
                    ></iframe>
                ) : (
                    <p className="text-red-500">Loading PDF content...</p>
                )}
            </div>
        </div>
    );
};

export default PdfViewer;
