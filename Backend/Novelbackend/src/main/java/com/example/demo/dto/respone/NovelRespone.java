package com.example.demo.dto.respone;

import java.util.Set;

import com.example.demo.entity.Author;
import com.example.demo.entity.Category;
import com.example.demo.entity.PointOfView;
import com.example.demo.enums.Status;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE)
public class NovelRespone {

	String idNovel;
	String nameNovel;
	String descriptionNovel;
	Status statusNovel;
	String imageNovel;
	int totalChapter;
	String originalNovel; 
	int totalPage;
	
	Set<Category> categories; 
	Set<ChapterNoContentRespone> chapter;
	Set<Author> authors;
	Set<PointOfView> pointOfViews;
	
}
