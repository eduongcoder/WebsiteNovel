package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.dto.request.ChapterCreationRequest;
import com.example.demo.dto.request.ChaptersUpdateRequest;
import com.example.demo.dto.respone.ChapterNoContentRespone;
import com.example.demo.dto.respone.ChapterRespone;
import com.example.demo.entity.Chapter;

@Mapper(componentModel = "spring")
public interface IChapterMapper {

	@Mapping(target = "idChapter",ignore = true)
	@Mapping(target = "comment",ignore = true)
	@Mapping(target = "viewChapter",ignore = true)
	Chapter toChapter(ChapterCreationRequest request);
	ChapterRespone toChapterRespone(Chapter chapter); 
	
	@Mapping(target = "historyReads",ignore = true)
	@Mapping(target  = "idNovel",source ="idNovel" )
	ChapterNoContentRespone toChapterNoContentRespone(Chapter chapter,String idNovel);
  
	@Mapping(target = "comment",ignore = true)
	@Mapping(target = "novel",ignore = true)
	void updateChapterRequest(ChaptersUpdateRequest request,@MappingTarget Chapter chapter);

}
