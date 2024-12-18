package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.dto.request.CommentCreationRequest;
import com.example.demo.dto.request.CommentUpdateRequest;
import com.example.demo.dto.respone.CommentRespone;
import com.example.demo.entity.Comment;

@Mapper(componentModel = "spring")
public interface ICommentMapper {
	
	@Mapping(target = "chapter",ignore = true)
	@Mapping(target = "idComment",ignore = true)
	@Mapping(target = "user",ignore = true)
	Comment toComment(CommentCreationRequest request);

	@Mapping(target = "avatarUser",ignore = true)
	@Mapping(target = "userName",ignore = true) 
	CommentRespone toCommentRespone(Comment comment);
	
	@Mapping(target = "chapter",ignore = true)
	@Mapping(target = "user",ignore = true)
	void updateCommentRequest(CommentUpdateRequest request,@MappingTarget Comment comment);
}
