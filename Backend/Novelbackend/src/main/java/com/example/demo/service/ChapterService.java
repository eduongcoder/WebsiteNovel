package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

	public List<ChapterRespone> getAllChapterByIdNovel(String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);

		List<Chapter> chapterRespones = new ArrayList<>(novel.getChapter());

		return chapterRespones.stream().map(t -> chapterMapper.toChapterRespone(t)).toList();
	}

	public List<ChapterNoContentRespone> getAllChapterNoContentByIdNovel(String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);

		List<Chapter> chapterRespones = new ArrayList<>(novel.getChapter());

		return chapterRespones.stream().map(t -> chapterMapper.toChapterNoContentRespone(t)).toList();
	}

	public boolean isPdfFile(MultipartFile file) {
		String contentType = file.getContentType();

		if (contentType != null && (contentType.equals(MediaType.APPLICATION_PDF_VALUE))) {
			
			return true;
		} else {
			throw new AppException(ErrorCode.NOT_PDF);
		}
	}

}
