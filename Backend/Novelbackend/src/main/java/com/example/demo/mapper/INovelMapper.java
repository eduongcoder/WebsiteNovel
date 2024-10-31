package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.entity.Novel;

@Mapper(componentModel = "spring")
public interface INovelMapper {
	@Mapping(target = "chapter",ignore = true)
	@Mapping(target = "id_Novel",ignore = true)
	Novel toNovel(NovelCreationRequest request);
	@Mapping(target = "image_Novel",ignore = true)
	NovelRespone toNovelRespone(Novel novel);
	
}
