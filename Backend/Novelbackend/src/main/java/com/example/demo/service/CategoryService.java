package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.CategoryCreationRequest;
import com.example.demo.dto.request.CategoryUpdateRequest;
import com.example.demo.dto.respone.CategoryRespone;
import com.example.demo.entity.Category;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.ICategoryMapper;
import com.example.demo.repository.ICategoryRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CategoryService {

	ICategoryMapper categoryMapper;
	ICategoryRepository categoryRepository;

	public List<CategoryRespone> getAllCategory() {
		return categoryRepository.findAll().stream().map(t -> categoryMapper.toCategoryRespone(t)).toList();
	}

	public CategoryRespone createCategory(CategoryCreationRequest request) {
		if (categoryRepository.existsByNameCategory(request.getNameCategory())) {
			throw new AppException(ErrorCode.CATEGORY_ALREADY_IN);
		}
		Category category = categoryMapper.toCategory(request);

		return categoryMapper.toCategoryRespone(categoryRepository.save(category));
	}

	public String deleteCategory(String idCategory) {
		if (!categoryRepository.existsById(idCategory)) {
			throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
		}
		try {
			categoryRepository.deleteById(idCategory);

		} catch (Exception e) {
			throw new AppException(ErrorCode.DELETE_CONTRAINT);
		}
		return idCategory;
	}

	public Optional<CategoryRespone> updateCategory(CategoryUpdateRequest request) {
		if (!categoryRepository.existsById(request.getIdCategory())) {
			throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
		}
		return categoryRepository.findById(request.getIdCategory()).map(t -> {
			t.setNameCategory(request.getNameCategory());
			return categoryMapper.toCategoryRespone(categoryRepository.save(t));
		});
	}
}
