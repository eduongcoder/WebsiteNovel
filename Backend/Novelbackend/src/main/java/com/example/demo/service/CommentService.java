package com.example.demo.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.request.CommentCreationRequest;
import com.example.demo.dto.request.CommentUpdateRequest;
import com.example.demo.dto.respone.ChapterRespone;
import com.example.demo.dto.respone.CommentRespone;
import com.example.demo.dto.respone.UserRespone;
import com.example.demo.entity.Chapter;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Novel;
import com.example.demo.entity.User;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.IChapterMapper;
import com.example.demo.mapper.ICommentMapper;
import com.example.demo.mapper.IUserMapper;
import com.example.demo.repository.IChapterRepository;
import com.example.demo.repository.ICommentRepository;
import com.example.demo.repository.INovelRepository;
import com.example.demo.repository.IUserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
@Slf4j
public class CommentService {

	ICommentRepository commentRepository;
	IChapterRepository chapterRepository;
	IUserRepository userRepository;
	ICommentMapper commentMapper;

	public List<CommentRespone> getAllCommentByChapter(String idChapter) {
		Chapter chapter = chapterRepository.findByIdChapter(idChapter);
		return chapter.getComment().stream().map(t -> {
			CommentRespone commentRespone = commentMapper.toCommentRespone(t);
			commentRespone.setAvatarUser(t.getUser().getAvatarUser());
			commentRespone.setUserName(t.getUser().getUserName());
			return commentRespone;
		}).toList();
	}

	public CommentRespone createComment(CommentCreationRequest request) {

		User user = userRepository.findByIdUser(request.getIdUser());

		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}

		Chapter chapter = chapterRepository.findByIdChapter(request.getIdChapter());

		if (chapter == null) {
			throw new AppException(ErrorCode.CHAPTER_NOT_EXISTED);
		}

		Comment comment = commentMapper.toComment(request);
		comment.setUser(user);
		comment.setChapter(chapter);
		return commentMapper.toCommentRespone(commentRepository.save(comment));

	}

	public Optional<CommentRespone> UpdateComment(CommentUpdateRequest request) {

		if (!commentRepository.existsById(request.getIdComment())) {
			throw new AppException(ErrorCode.COMMENT_NOT_EXISTED);
		}

		return commentRepository.findById(request.getIdComment()).map(t -> {
			User user = userRepository.findByIdUser(request.getIdUser());
			Chapter chapter = chapterRepository.findByIdChapter(request.getIdChapter());

			commentMapper.updateCommentRequest(request, t);

			t.setUser(user);
			t.setChapter(chapter);

			CommentRespone commentRespone = commentMapper.toCommentRespone(commentRepository.save(t));

			commentRespone.setAvatarUser(t.getUser().getAvatarUser());
			commentRespone.setUserName(t.getUser().getUserName());
			return commentRespone;
		});
	}

	public String deleteComment(String idComment) {
		if (commentRepository.existsById(idComment)) {
			commentRepository.deleteById(idComment);
			return idComment;
		} else {
			throw new AppException(ErrorCode.COMMENT_NOT_EXISTED);
		}

	}

	public String like(String idComment) {
		try {
			Comment comment = commentRepository.findByIdComment(idComment);
			comment.setLikeComment(comment.getLikeComment() + 1);
			commentRepository.save(comment);
			return idComment;
		} catch (Exception e) {
			throw new AppException(ErrorCode.COMMENT_NOT_EXISTED);
		}

	}

	public String dislike(String idComment) {
		try {
			Comment comment = commentRepository.findByIdComment(idComment);
			int dislike = comment.getDislikeComment();
		
			comment.setDislikeComment(dislike + 1);
			commentRepository.save(comment);
			return idComment;
		} catch (Exception e) {
			throw new AppException(ErrorCode.COMMENT_NOT_EXISTED);
		}
	}

	public List<CommentRespone> getAllCommentByIdNovel(String idNovel) {
		List<Comment> comments = commentRepository.findCommentsByNovelId(idNovel);
		return comments.stream().map(t -> {

			CommentRespone commentRespone = commentMapper.toCommentRespone(t);
			commentRespone.setAvatarUser(t.getUser().getAvatarUser());
			commentRespone.setUserName(t.getUser().getUserName());
			return commentRespone;

		}).toList();
	}
}
