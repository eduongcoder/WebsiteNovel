import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPdfData } from '@/Redux/ReduxSlice/chapterSlice';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Cấu hình worker cho pdf.js
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.279/pdf.worker.min.js';

function PdfViewer({ pdfId, pageGet = 1 }) {
    const dispatch = useDispatch();
    const { pdfData,pageContent, loading, error, hasMore } = useSelector(
        (state) => state.chapter,
    );
    console.log("PdfViewer  pagecontent", pageContent);
    const [page, setPage] = useState(1);
    const containerRef = useRef(null);
    // Fetch dữ liệu từ API khi thay đổi số trang
    useEffect(() => {
        dispatch(fetchPdfData({ pageNum: page, pdfId, pageGet }));
    }, [dispatch, page, pdfId, pageGet]);

    // Xử lý cuộn trang
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
    console.log(" console.log(pdfData?.pageContent?.length)",pdfData )
    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="h-screen overflow-y-auto p-4"
        >
       
            {pdfData?.pageContent?.length > 0

                ? pdfData.pageContent.map(
                  
                      (pageContent, index) => (
                          console.log(pageContent),
                          (
                              <div key={index} className="mb-4">
                                  <Document
                                      file={`data:application/pdf;base64,${pageContent}`}
                                  >
                                      <Page pageNumber={index + 1} />
                                  </Document>
                              </div>
                          )
                      ),
                  )
                : !loading && (
                      <p className="text-center text-gray-500">
                          Không có dữ liệu để hiển thị.
                      </p>
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

export default PdfViewer;
