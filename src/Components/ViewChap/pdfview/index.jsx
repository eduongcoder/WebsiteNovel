import React, { useEffect, useState, useRef } from 'react';

function PdfViewe({ pdfId, pageGet }) {
    const [pdfData, setPdfData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);

    // Fetch dữ liệu PDF từ API
    const fetchPdfData = async (pageNum) => {
        try {
            const response = await fetch(`http://26.232.136.42:8080/api/chapter/pages?id=${pdfId}&page=${pageNum}&pageGet=${pageGet}`);
            const data = await response.json();
            console.log(Array.from(data.result));

            if (data.result.pageContent && data.result.totalPages > 0) {
                setPdfData((prevData) => [...prevData, data.result.pageContent]);

                // Kiểm tra còn trang nữa không
                if (data.result.pageNumber < data.result.totalPages) {
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching PDF data:', error);
        }
    };

    // Hàm xử lý cuộn trang
    const handleScroll = () => {
        if (
            containerRef.current &&
            containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight
        ) {
            if (hasMore) {
                setPage((prevPage) => prevPage + pageGet); // Tăng số trang để tải thêm
            }
        }
    };

    useEffect(() => {
        fetchPdfData(page);
    }, [page]);

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="h-screen overflow-y-auto p-4"
        >
            {pdfData.map((pageContent, index) => (
                <iframe
                    src={`data:application/pdf;base64,${pageContent}`}
                    key={index}
                    title={`PDF Page ${index + 1}`}
                    className="w-full h-[1000px] mb-4"
                    style={{ border: 'none' }}
                />
            ))}
            {!hasMore && <p className="text-center text-gray-500">Đã tải hết dữ liệu PDF.</p>}
        </div>
    );
}

export default PdfViewe;
