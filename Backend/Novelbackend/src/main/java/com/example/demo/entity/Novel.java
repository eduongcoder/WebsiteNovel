package com.example.demo.entity;

import java.util.Set;

import com.example.demo.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
	String id_Novel;
	@Column(name = "name_Novel")
	String nameNovel;
	String description_Novel;
	@Enumerated(EnumType.STRING)
	Status status_Novel;
	@Lob
	@Column(name = "image_Novel",columnDefinition = "MEDIUMBLOB")
	byte[] image_Novel;
	
	@OneToMany(mappedBy = "novel")
	Set<Chapter> chapter;
	
}
