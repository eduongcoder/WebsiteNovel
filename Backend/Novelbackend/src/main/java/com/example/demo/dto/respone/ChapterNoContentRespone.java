package com.example.demo.dto.respone;

import java.util.Set;

import com.example.demo.entity.HistoryRead;

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
public class ChapterNoContentRespone {

	String idChapter;
	String titleChapter;
	int viewChapter;
	int startPage;
	int endPage;
	int totalPageChapter;
	Set<HistoryRead> historyReads;
	String idNovel;
}
