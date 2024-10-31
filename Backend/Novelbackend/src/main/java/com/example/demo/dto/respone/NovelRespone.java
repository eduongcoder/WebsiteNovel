package com.example.demo.dto.respone;

import java.util.Set;

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

	String id_Novel;
	String nameNovel;
	String description_Novel;
	Status status_Novel;
	String image_Novel;
	
	Set<ChapterRespone> chapter;
}
