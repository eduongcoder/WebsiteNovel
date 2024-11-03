package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.CategoryCreationRequest;
import com.example.demo.dto.request.CategoryUpdateRequest;
import com.example.demo.dto.respone.CategoryRespone;
import com.example.demo.entity.Category;
import com.example.demo.mapper.ICategoryMapper;
import com.example.demo.repository.ICategoryRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {

	ICategoryMapper categoryMapper;
	ICategoryRepository categoryRepository;

	public List<CategoryRespone> getAllCategory() {
		return categoryRepository.findAll().stream().map(t -> categoryMapper.toCategoryRespone(t)).toList();
	}

	public CategoryRespone createCategory(CategoryCreationRequest request) {
		Category category = categoryMapper.toCategory(request);

		return categoryMapper.toCategoryRespone(categoryRepository.save(category));
	}

	public String deleteCategory(String idCategory) {
		categoryRepository.deleteById(idCategory);
		return idCategory;
	}

	public Optional<CategoryRespone> updateCategory(CategoryUpdateRequest request) {
		
		return categoryRepository.findById(request.getIdCategory()).map(t -> {
			t.setNameCategory(request.getNameCategory());
			return categoryMapper.toCategoryRespone(categoryRepository.save(t));
		});
	}
}
