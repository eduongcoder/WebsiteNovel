import React, { useState } from 'react';
import PdfViewe from './pdfview';
import PdfViewer from './pdfview copy 2';

function ViewChap() {
    // const pdfId = '93feaae0-38a1-4834-9296-78efdb4fd1a0';
    // const [currentBase64Pdf, setCurrentBase64Pdf] = useState(null);

    // const handlePageChange = (newBase64Pdf) => {
    //     setCurrentBase64Pdf(newBase64Pdf);
    // };

    // return (
    //     <div className="flex flex-col md:flex-row">
    //         <h1 className="w-full text-center text-xl font-semibold my-4">Xem file PDF</h1>
            
    //         {/* Sidebar chứa PdfViewe */}
    //         <div className="w-full md:w-1/3 h-screen overflow-y-auto p-4 border-r">
    //             <PdfViewe pdfId={pdfId} onPageChange={handlePageChange} />
    //         </div>

    //         {/* PdfViewer hiển thị trang PDF */}
    //         <div className="w-full md:w-2/3 h-screen">
    //             {currentBase64Pdf ? (
    //                 <PdfViewer base64Pdf={currentBase64Pdf} />
    //             ) : (
    //                 <p className="text-center text-gray-500">Chọn một trang để xem.</p>
    //             )}
    //         </div>
    //     </div>
    // );
    const pdfId = '93feaae0-38a1-4834-9296-78efdb4fd1a0'; // Thay 'your_pdf_id_here' bằng ID của file PDF bạn muốn tải
    return (
     <div>
       <h1>Xem file PDF</h1>
       {/* <PdfViewer base64Pdf={pdfFile} /> */}
       <PdfViewe pdfId={pdfId} pageGet={2} />
     </div>
   );
 
}

export default ViewChap;
