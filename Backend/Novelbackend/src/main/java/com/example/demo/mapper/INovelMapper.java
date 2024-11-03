package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.respone.NovelNoImageRespone;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.entity.Novel;

@Mapper(componentModel = "spring")
public interface INovelMapper {
	@Mapping(target = "chapter",ignore = true)
	@Mapping(target = "idNovel",ignore = true)
	@Mapping(target = "authors",ignore = true)
	@Mapping(target = "categories",ignore = true)
	@Mapping(target = "pointOfViews",ignore = true)
	Novel toNovel(NovelCreationRequest request);
	NovelNoImageRespone toNovelNoImageRespone(Novel novel);
	@Mapping(target = "imageNovel",ignore = true)
	NovelRespone toNovelRespone(Novel novel);
	
}
