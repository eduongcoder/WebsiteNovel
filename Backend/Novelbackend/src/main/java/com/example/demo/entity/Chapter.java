package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	String id_Chapter;
	String title_Chapter;
	String number_Chapter;
	int view_Chapter;
	byte[] content_Chapter;
	
	@ManyToOne
	@JoinColumn(name = "id_Novel",nullable = false)
	Novel novel; 
	 
}
