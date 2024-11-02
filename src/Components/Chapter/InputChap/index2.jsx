function getAllChapters(nameNovel) {
    const encodedNameNovel = encodeURIComponent(nameNovel);
    fetch(`http://26.232.136.42:8080/api/chapter/getAllChapter?nameNovel=${encodedNameNovel}`)
      .then(response => response.json())
      .then(data => {
        data.result.forEach(chapter => {
          const pdfContent = chapter.content_Chapter; // Chuỗi base64
          const blob = base64ToBlob(pdfContent); // Chuyển đổi base64 thành Blob
          const pdfUrl = URL.createObjectURL(blob); // Tạo URL từ Blob
    
          // Tạo iframe để hiển thị PDF
          const iframe = document.createElement('iframe');
          iframe.src = pdfUrl;
          iframe.width = '900';
          iframe.height = '400';
          document.body.appendChild(iframe);
         
        });
      })
      .catch(error => console.error('Error:', error));
    }
    export default getAllChapters;