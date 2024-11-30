package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String idComment;
	
	int likeComment;
	int dislikeComment;
	@Column(name = "contentComment",length = 255)
	String content_Comment;
	
	boolean reviewStatusComment;
	
	@ManyToOne
	@JoinColumn(name = "idChapter",nullable = false)
	Chapter chapter;
	
	@ManyToOne
	@JoinColumn(name = "idUser",nullable = false)
	User user;
}
