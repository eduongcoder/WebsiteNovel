package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.CommentCreationRequest;
import com.example.demo.dto.request.CommentUpdateRequest;
import com.example.demo.dto.respone.CommentRespone;
import com.example.demo.entity.Chapter;
import com.example.demo.entity.Comment;
import com.example.demo.entity.User;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.ICommentMapper;
import com.example.demo.repository.IChapterRepository;
import com.example.demo.repository.ICommentRepository;
import com.example.demo.repository.IUserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Service
public class CommentService {

	ICommentRepository commentRepository; 
	IChapterRepository chapterRepository;
	IUserRepository userRepository;
	ICommentMapper commentMapper;
	
	public  List<CommentRespone> getAllCommentByChapter(String idChapter) {
		Chapter chapter=chapterRepository.findByIdChapter(idChapter);
		return chapter.getComment().stream().map(t -> commentMapper.toCommentRespone(t)).toList();
	}
	
	public CommentRespone createComment(CommentCreationRequest request) {
		User user=userRepository.findByIdUser(request.getIduser());
		Chapter chapter=chapterRepository.findByIdChapter(request.getIdchapter());
		
		Comment comment=commentMapper.toComment(request);
		comment.setUser(user);
		comment.setChapter(chapter);
		return commentMapper.toCommentRespone(commentRepository.save(comment));
	}
	public Optional<CommentRespone> UpdateComment(CommentUpdateRequest request) {
		if (!commentRepository.existsById(request.getIdComment())) {
			throw new AppException(ErrorCode.COMMENT_NOT_EXISTED);
		}
		return commentRepository.findById(request.getIdchapter()).map(t -> {
			User user=userRepository.findByIdUser(request.getIduser());
			Chapter chapter=chapterRepository.findByIdChapter(request.getIdchapter());
			
			t.setUser(user);
			t.setChapter(chapter);
			
			return commentMapper.toCommentRespone(commentRepository.save(t));
		});
	}
	
	public String deleteComment(String idComment) {
		if (commentRepository.existsById(idComment)) {
			commentRepository.deleteById(idComment);
			return idComment;
		}else {
			throw new AppException(ErrorCode.COMMENT_NOT_EXISTED);
		}
		
	}
}
