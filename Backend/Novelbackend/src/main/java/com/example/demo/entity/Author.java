package com.example.demo.entity;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Author {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String idAuthor;

	String descriptionAuthor;
	String nameAuthor;
	String nationality;

	@Column(name = "imageAuthor", length = 255)
	String imageAuthor;
	String publicIDAuthor;
	LocalDate dobAuthor;
	LocalDate dodAuthor;

}
