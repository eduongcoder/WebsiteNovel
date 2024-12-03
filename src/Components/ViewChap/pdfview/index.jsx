import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPdfData } from '@/Redux/ReduxSlice/chapterSlice';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function PdfViewe({ pdfId, pageGet = 1 }) {
    const dispatch = useDispatch();
    const { pdfData, loading, error, hasMore } = useSelector(
        (state) => state.chapter,
    );
    const [page, setPage] = useState(1);
    const containerRef = useRef(null);

    // Fetch dữ liệu PDF từ API khi thay đổi số trang
    useEffect(() => {
        dispatch(fetchPdfData({ pageNum: page, pdfId, pageGet }));
    }, [dispatch, page, pdfId, pageGet]);

    // Hàm xử lý cuộn trang
    const handleScroll = () => {
        if (
            containerRef.current &&
            containerRef.current.scrollTop +
                containerRef.current.clientHeight >=
                containerRef.current.scrollHeight &&
            hasMore &&
            !loading
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="h-screen overflow-y-auto p-4"
        >
            {pdfData.length > 0 ? (
                <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/es5/build/pdf.worker.min.js`}
                >
                    <Viewer
                        fileUrl={`data:application/pdf;base64,${pdfData}`}
                    />
                </Worker>
            ) : (
                !loading && (
                    <p className="text-center text-gray-500">
                        Không có dữ liệu để hiển thị.
                    </p>
                )
            )}
            {loading && (
                <p className="text-center text-blue-500">Đang tải...</p>
            )}
            {!hasMore && !loading && (
                <p className="text-center text-gray-500">
                    Đã tải hết dữ liệu PDF.
                </p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}
        </div>
    );
}

export default PdfViewe;