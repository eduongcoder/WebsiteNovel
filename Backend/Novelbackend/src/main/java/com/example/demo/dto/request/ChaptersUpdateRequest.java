package com.example.demo.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Data
public class ChaptersUpdateRequest {
	String idChapter;
	String idNovel;
	String titleChapter;
	int viewChapter;
	byte[] contentChapter;
	int startPage;
	int endPage;
}
