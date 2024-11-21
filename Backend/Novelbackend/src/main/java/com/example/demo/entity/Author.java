package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
	@Lob
	@Column(name = "imageAuthor", columnDefinition = "MEDIUMBLOB")
	byte[] imageAuthor;

	LocalDate dobAuthor;
	LocalDate dodAuthor;

}
