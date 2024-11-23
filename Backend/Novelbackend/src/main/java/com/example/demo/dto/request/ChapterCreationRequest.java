package com.example.demo.dto.request;

import com.example.demo.entity.Novel;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChapterCreationRequest {
	
	String novelName;
	String titleChapter;
//	@Builder.Default
//	int viewChapter=0;
	byte[] contentChapter;
	int startPage;
	int endPage;
	Novel novel;
}
