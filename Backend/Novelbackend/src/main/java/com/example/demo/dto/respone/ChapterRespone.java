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

	String id_Chapter;
	String title_Chapter;
	String number_Chapter;
	int view_Chapter;
	byte[] content_Chapter;
}
