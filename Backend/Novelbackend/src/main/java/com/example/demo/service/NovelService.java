package com.example.demo.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.respone.NovelJustIdAndNameRespone;
import com.example.demo.dto.respone.NovelNoChapterRespone;
import com.example.demo.dto.respone.NovelNoImageRespone;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.entity.Author;
import com.example.demo.entity.Category;
import com.example.demo.entity.Novel;
import com.example.demo.entity.PointOfView;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.INovelMapper;
import com.example.demo.repository.IAuthorRepository;
import com.example.demo.repository.ICategoryRepository;
import com.example.demo.repository.INovelRepository;
import com.example.demo.repository.IPointOfViewRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NovelService {

	INovelRepository novelRepository;
	INovelMapper novelMapper;
	ICategoryRepository categoryRepository;
	IPointOfViewRepository pointOfViewRepository;
	IAuthorRepository authorRepository;

	public NovelRespone createNovel(MultipartFile image, NovelCreationRequest request) throws IOException {
		isImageFIle(image);

		request.setImageNovel(image.getBytes());

		Novel novel = novelMapper.toNovel(request);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}

	public List<NovelNoChapterRespone> getAllNovelNoChapter() {

		return novelRepository.findAll().stream().map(t -> {
			NovelNoChapterRespone novelRespone = novelMapper.toNovelNoChapterRespone(t);
			novelRespone
					.setImageNovel("data:image/jpeg;base64," + Base64.getEncoder().encodeToString(t.getImageNovel()));
			return novelRespone;
		}).toList();
	}
	
	public List<NovelRespone> getAllNovel() {

		return novelRepository.findAll().stream().map(t -> {
			NovelRespone novelRespone = novelMapper.toNovelRespone(t);
			novelRespone
					.setImageNovel("data:image/jpeg;base64," + Base64.getEncoder().encodeToString(t.getImageNovel()));
			return novelRespone;
		}).toList();
	}

	public List<NovelNoImageRespone> getAllNovelNoImage() {

		return novelRepository.findAll().stream().map(t -> novelMapper.toNovelNoImageRespone(t)).toList();
	}
	
	public List<NovelJustIdAndNameRespone> getAllNovelJustIdAndName() {

		return novelRepository.findAll().stream().map(t -> novelMapper.toNovelJustIdAndNameRespone(t)).toList();
	}
	

	public NovelRespone getNovelByName(String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);
		NovelRespone novelRespone = novelMapper.toNovelRespone(novel);
		novelRespone
				.setImageNovel("data:image/jpeg;base64," + Base64.getEncoder().encodeToString(novel.getImageNovel()));
		return novelRespone;
	}

	public NovelRespone addCategory(String nameCategory, String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);
		Category category = categoryRepository.findByNameCategory(nameCategory);
		
		if (novel==null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED); 
		}
		
		if (category == null) {
			throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
		}
		if (novel.getCategories().contains(category)) {
			throw new AppException(ErrorCode.CATEGORY_ALREADY_IN);
		}
		novel.getCategories().add(category);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}

	public NovelRespone addAuthor(String idAuthor, String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);
		Author author = authorRepository.findByIdAuthor(idAuthor);
		if (novel==null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED); 
		}
		
		if (author == null) {
			throw new AppException(ErrorCode.AUTHOR_NOT_EXISTED);
		}
		if (novel.getAuthors().contains(author)) {
			throw new AppException(ErrorCode.AUTHOR_ALREADY_IN);
		}
		novel.getAuthors().add(author);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}

	public NovelRespone addPointOfView(String namePointOfView, String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);

		PointOfView pointOfView = pointOfViewRepository.findByNamePointOfView(namePointOfView);
		if (novel==null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED); 
		}
		
		if (pointOfView == null) {
			throw new AppException(ErrorCode.POV_NOT_EXISTED);

		}
		if (novel.getPointOfViews().contains(pointOfView)) {
			throw new AppException(ErrorCode.POV_ALREADY_IN);
		}
		novel.getPointOfViews().add(pointOfView);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}

	public boolean isImageFIle(MultipartFile file) {
		String contentType = file.getContentType();
		
		boolean flag;
		flag = contentType != null && (contentType.equals(MediaType.IMAGE_JPEG_VALUE)
				|| contentType.equals(MediaType.IMAGE_PNG_VALUE) || contentType.equals(MediaType.IMAGE_GIF_VALUE));
		if (flag) {
			return flag;
		} else {
			throw new AppException(ErrorCode.NOT_IMAGE);
		}
	}
}
