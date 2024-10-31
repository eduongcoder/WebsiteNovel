package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.ChapterCreationRequest;
import com.example.demo.dto.respone.ChapterRespone;
import com.example.demo.entity.Chapter;

@Mapper(componentModel = "spring")
public interface IChapterMapper {

	@Mapping(target = "id_Chapter",ignore = true)
	@Mapping(target = "novel",ignore = true)
	Chapter toChapter(ChapterCreationRequest request);
	ChapterRespone toChapterRespone(Chapter chapter);
}
