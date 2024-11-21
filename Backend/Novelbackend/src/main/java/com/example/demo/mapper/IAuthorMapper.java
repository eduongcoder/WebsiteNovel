package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.AuthorCreateionRequest;
import com.example.demo.dto.request.AuthorUpdateRequest;
import com.example.demo.dto.respone.AuthorRespone;
import com.example.demo.entity.Author;

@Mapper(componentModel = "spring")
public interface IAuthorMapper {
	
	@Mapping(target = "idAuthor",ignore = true)
	@Mapping(target = "imageAuthor",ignore = true)
	Author toAuthor(AuthorCreateionRequest request);
	@Mapping(target = "imageAuthor",ignore = true)
	Author toAuthor(AuthorUpdateRequest request);
	@Mapping(target = "imageAuthor",ignore = true)
	@Mapping(target = "dobAuthor",ignore = true)
	@Mapping(target = "dodAuthor",ignore = true)
	AuthorRespone toAuthorRespone(Author author);
}
