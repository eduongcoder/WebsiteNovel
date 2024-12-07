package com.example.demo.entity;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.demo.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
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
public class Novel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String idNovel;
//	@Column(name = "name_Novel")
	String nameNovel;
	String descriptionNovel;
	@Enumerated(EnumType.STRING)
	Status statusNovel;
	
	@Column(name = "image_Novel",length = 255)
	String imageNovel;
	
	int totalChapter;
	@Lob
	@Column(name = "originalNovel",columnDefinition = "LONGBLOB")
	byte[] originalNovel;
	
	int totalPage;
	
	String publicIDNovel;
	
	@OneToMany(mappedBy = "novel",fetch = FetchType.EAGER)
	List<Chapter> chapter;
	
	@ManyToMany
	Set<Category> categories =new HashSet<>();
	
	@ManyToMany
	Set<Author> authors=new HashSet<>();
	
	@ManyToMany
	Set<PointOfView> pointOfViews=new HashSet<>();
	
}
