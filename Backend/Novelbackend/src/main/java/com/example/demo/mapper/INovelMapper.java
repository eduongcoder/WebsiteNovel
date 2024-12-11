package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.request.NovelUpdateRequest;
import com.example.demo.dto.respone.NovelJustIdAndNameRespone;
import com.example.demo.dto.respone.NovelNoChapterRespone;
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
	@Mapping(target = "imageNovel",ignore = true)
	@Mapping(target = "totalPage",ignore = true)
	@Mapping(target = "publicIDNovel",ignore = true)
	Novel toNovel(NovelCreationRequest request); 
	
	NovelJustIdAndNameRespone toNovelJustIdAndNameRespone(Novel novel); 
	NovelNoImageRespone toNovelNoImageRespone(Novel novel);
 
	NovelNoChapterRespone toNovelNoChapterRespone(Novel novel);
	@Mapping(target = "originalNovel",ignore = true)
	NovelRespone toNovelRespone(Novel novel);
	
	@Mapping(target = "authors",ignore = true)
	@Mapping(target = "categories",ignore = true)
	@Mapping(target = "pointOfViews",ignore = true)
	@Mapping(target = "chapter",ignore = true)
	void updateNovelFormRequest(NovelUpdateRequest request,@MappingTarget Novel novel);
}
