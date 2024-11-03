package com.example.demo.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.CategoryCreationRequest;
import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.respone.NovelNoImageRespone;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.entity.Author;
import com.example.demo.entity.Category;
import com.example.demo.entity.Novel;
import com.example.demo.entity.PointOfView;
import com.example.demo.mapper.INovelMapper;
import com.example.demo.repository.IAuthorRepository;
import com.example.demo.repository.ICategoryRepository;
import com.example.demo.repository.INovelRepository;
import com.example.demo.repository.IPointOfViewRepository;

import jakarta.transaction.Transactional;
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

	public NovelRespone createNovel(NovelCreationRequest request) {
		Novel novel = novelMapper.toNovel(request);

		return novelMapper.toNovelRespone(novelRepository.save(novel));
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

		return novelRepository.findAll().stream().map(t ->novelMapper.toNovelNoImageRespone(t)).toList();
	}

	public NovelRespone getNovelByName(String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);
		NovelRespone novelRespone = novelMapper.toNovelRespone(novel);
		novelRespone
				.setImageNovel("data:image/jpeg;base64," + Base64.getEncoder().encodeToString(novel.getImageNovel()));
		log.info("HUHU: " + novel.getChapter().toString());
		return novelRespone;
	}

	public NovelRespone addCategory(String nameCategory, String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);
		Category category = categoryRepository.findByNameCategory(nameCategory);

		novel.getCategories().add(category);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}
	
	public NovelRespone addAuthor(String nameAuthor, String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);
		Author author = authorRepository.findByNameAuthor(nameAuthor);

		novel.getAuthors().add(author);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}
	
	public NovelRespone addPointOfView(String namePointOfView, String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);
		PointOfView pointOfView = pointOfViewRepository.findByNamePointOfView(namePointOfView);

		novel.getPointOfViews().add(pointOfView);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}
}
