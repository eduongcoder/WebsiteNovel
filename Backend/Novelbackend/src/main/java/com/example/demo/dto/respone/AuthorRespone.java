package com.example.demo.dto.respone;

import java.time.LocalDate;

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
public class AuthorRespone {

	String idAuthor;
	
	String descriptionAuthor;
	String nameAuthor;
	String nationality;
	String imageAuthor;
	String dobAuthor;
	String dodAuthor;
	
}
