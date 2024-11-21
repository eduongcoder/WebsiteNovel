package com.example.demo.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.ChapterCreationRequest;
import com.example.demo.dto.respone.ChapterNoContentRespone;
import com.example.demo.dto.respone.ChapterRespone;
import com.example.demo.entity.Chapter;
import com.example.demo.entity.Novel;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.IChapterMapper;
import com.example.demo.mapper.INovelMapper;
import com.example.demo.repository.IChapterRepository;
import com.example.demo.repository.INovelRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChapterService {

	IChapterRepository chapterRepository;
	IChapterMapper chapterMapper;
	INovelRepository novelRepository;

	public ChapterRespone createChapter(MultipartFile file, ChapterCreationRequest request) throws IOException {
		isPdfFile(file);
		Novel novel = novelRepository.findByNameNovel(request.getNovelName());
		request.setContentChapter(file.getBytes());

		request.setNovel(novel);
		Chapter chapter = chapterMapper.toChapter(request);
		chapter.setViewChapter(0);
		return chapterMapper.toChapterRespone(chapterRepository.save(chapter));

	}

	public ChapterRespone createChapter(byte[] file, ChapterCreationRequest request) throws IOException {

		Novel novel = novelRepository.findByNameNovel(request.getNovelName());
		request.setContentChapter(file);

		request.setNovel(novel);
		Chapter chapter = chapterMapper.toChapter(request);
		chapter.setViewChapter(0);
		return chapterMapper.toChapterRespone(chapterRepository.save(chapter));

	}

	public List<ChapterRespone> getAllChapterByIdNovel(String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);

		List<Chapter> chapterRespones = new ArrayList<>(novel.getChapter());

		return chapterRespones.stream().map(t -> chapterMapper.toChapterRespone(t)).toList();
	}

	public List<ChapterNoContentRespone> getAllChapterNoContent(String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);

		List<Chapter> chapterRespones = new ArrayList<>(novel.getChapter());

		return chapterRespones.stream().map(t -> chapterMapper.toChapterNoContentRespone(t)).toList();
	}

	public List<ChapterNoContentRespone> getAllChapterNoContentByIdNovel(String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);

		List<Chapter> chapterRespones = new ArrayList<>(novel.getChapter());

		return chapterRespones.stream().map(t -> chapterMapper.toChapterNoContentRespone(t)).toList();
	}

	public String deleteChapter(String idChapter) {
		if (!chapterRepository.existsById(idChapter)) {
			throw new AppException(ErrorCode.CHAPTER_NOT_EXISTED);
		}
		try {
			chapterRepository.deleteById(idChapter);

		} catch (Exception e) {
			throw new AppException(ErrorCode.DELETE_CONTRAINT);
		}
		return idChapter;
	}

	public boolean isPdfFile(MultipartFile file) {
		String contentType = file.getContentType();

		if (contentType != null && (contentType.equals(MediaType.APPLICATION_PDF_VALUE))) {

			return true;
		} else {
			throw new AppException(ErrorCode.NOT_PDF);
		}
	}

	public ChapterRespone getChapter(String idChapter) {
		Chapter chapter = chapterRepository.findByIdChapter(idChapter);

		return chapterMapper.toChapterRespone(chapter);
	}

	public String getPdfPage(byte[] pdfBytes, int pageNumber) throws IOException {
		try (PDDocument document = PDDocument.load(pdfBytes)) {
			if (pageNumber < 0 || pageNumber >= document.getNumberOfPages()) {
				throw new IllegalArgumentException("Invalid page number");
			}

			PDPage page = document.getPage(pageNumber);
			try (PDDocument singlePageDoc = new PDDocument()) {
				singlePageDoc.addPage(page);
				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				singlePageDoc.save(outputStream);
				return Base64.getEncoder().encodeToString(outputStream.toByteArray());
			}
		}
	}

	public String getPdfPages(byte[] pdfBytes, int pageNumber, int pageGet) throws IOException {

		try (PDDocument document = PDDocument.load(pdfBytes)) {
			int totalPage = document.getNumberOfPages();
			if (pageNumber < 0 || pageNumber >= totalPage) {
				throw new IllegalArgumentException("Invalid page number");
			}

			if (pageGet <= 0) {
				throw new IllegalArgumentException("Page get must be greater than 0");
			}

			int endPage = Math.min(pageGet + pageNumber, totalPage);

			try (PDDocument multiPageDoc = new PDDocument()) {
				for (int i = pageNumber; i < endPage; i++) {
					PDPage page = document.getPage(i);
					multiPageDoc.addPage(page);

				}
				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				multiPageDoc.save(outputStream);
				return Base64.getEncoder().encodeToString(outputStream.toByteArray());
			}
		}
	}

	public int getTotalPages(byte[] pdfBytes) throws IOException {
		try (PDDocument document = PDDocument.load(pdfBytes)) {
			return document.getNumberOfPages();
		}
	}

	public boolean createChapters(MultipartFile filePdf, String idNovel, int totalChapter,
			List<Integer> array) throws IOException {
	
		if (filePdf.getSize() < 0) {
			throw new AppException(ErrorCode.NO_FILE_UPLOAD);
		}
		try {
			int count = 1;
			for (int i = 0; i < array.size(); i += 2) {
				String chapterContent = getPdfPages(filePdf.getBytes(), array.get(i), array.get(i + 1));
				ChapterCreationRequest chapterCreationRequest = new ChapterCreationRequest();

				createChapter(chapterContent.getBytes(),
						chapterCreationRequest.builder().contentChapter(chapterContent.getBytes())
								.titleChapter("Chương"+count)
								.novelName(novelRepository.findByIdNovel(idNovel).getNameNovel()).build());
				count++;
			}
			return true;
		} catch (Exception e) {
			throw e;
		}

	}
//	public ChapterRespone name() {
//		
//	}
	
}
