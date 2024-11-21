package com.example.demo.dto.request;

import java.time.LocalDate;

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
public class AuthorUpdateRequest {

	String idAuthor;
	String descriptionAuthor;
	String nameAuthor;
	String nationality;
	LocalDate dobAuthor;
	LocalDate dodAuthor;
}
