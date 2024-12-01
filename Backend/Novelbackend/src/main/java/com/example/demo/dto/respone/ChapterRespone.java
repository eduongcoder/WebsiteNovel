package com.example.demo.dto.respone;

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
public class ChapterRespone {

	String idChapter;
	String titleChapter;
	int viewChapter;
	byte[] contentChapter;
	int totalPageChapter;
}
