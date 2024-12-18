package com.example.demo.dto.respone;

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
public class CommentRespone {
	
	String idComment;
	String avatarUser;
	String userName;
	int likeComment;
	int dislikeComment;
	String content_Comment;

	boolean reviewStatusComment;


}
