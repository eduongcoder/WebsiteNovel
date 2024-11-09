function PdfViewer({ base64Pdf }) {
    return (
        <iframe
            src={`data:application/pdf;base64,${base64Pdf}#toolbar=0`}
            className="w-full h-screen border-none"
            title="PDF Viewer"
        />
    );
}

export default PdfViewer;
