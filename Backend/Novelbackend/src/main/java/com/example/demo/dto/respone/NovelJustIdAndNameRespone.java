package com.example.demo.dto.respone;

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
public class NovelJustIdAndNameRespone {

	String idNovel;
	String nameNovel;
	String descriptionNovel;
	Status statusNovel;
	int totalPage;

}
