package com.example.demo.dto.request;

import com.example.demo.enums.Status;

import ch.qos.logback.core.subst.Token.Type;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level =  AccessLevel.PRIVATE)
public class NovelCreationRequest {

//	String id_Novel;
	String nameNovel;
	String descriptionNovel;
	@Enumerated(EnumType.STRING) 
	Status statusNovel;
	byte[] imageNovel;
	byte[] originalNovel;
	int totalChapter;

	
	
}
