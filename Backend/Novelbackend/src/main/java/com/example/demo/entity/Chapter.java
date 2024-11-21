package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Chapter {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String idChapter;
	String titleChapter;
	@Column(nullable = false,columnDefinition = "int default 0")
	int viewChapter;
	@Lob
	@Column(name = "content_Chapter",columnDefinition = "LONGBLOB")
	byte[] contentChapter;
	
	@ManyToOne
	@JoinColumn(name = "id_Novel",nullable = false)
	Novel novel; 
	 
}
