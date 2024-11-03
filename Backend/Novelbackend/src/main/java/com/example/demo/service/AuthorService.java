package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.AuthorCreateionRequest;
import com.example.demo.dto.request.AuthorUpdateRequest;
import com.example.demo.dto.request.CategoryUpdateRequest;
import com.example.demo.dto.respone.AuthorRespone;
import com.example.demo.dto.respone.CategoryRespone;
import com.example.demo.entity.Author;
import com.example.demo.mapper.IAuthorMapper;
import com.example.demo.repository.IAuthorRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AuthorService {
	IAuthorRepository authorRepository;
	IAuthorMapper authorMapper;
	
	public AuthorRespone createAuthor(AuthorCreateionRequest request) {
		Author pov = authorMapper.toAuthor(request);

		return authorMapper.toAuthorRespone(authorRepository.save(pov));
	}

	public List<AuthorRespone> getAllAuthor() {

		return authorRepository.findAll().stream().map(t -> authorMapper.toAuthorRespone(t)).toList();
	}
	public String deleteAuthor(String idAuthor) {
		authorRepository.deleteById(idAuthor);
		return idAuthor;
	}

	public Optional<AuthorRespone> updateAuthor(AuthorUpdateRequest request) {
		
		return authorRepository.findById(request.getIdAuthor()).map(t -> {
			t.setDescriptionAuthor(request.getDescriptionAuthor());
			t.setNameAuthor(t.getNameAuthor());
			return authorMapper.toAuthorRespone(authorRepository.save(t));
		});
	}
}
