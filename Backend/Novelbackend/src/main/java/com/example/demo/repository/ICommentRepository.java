package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, String>{

	Comment findByIdComment(String idComment);
	
	@Query(value = "SELECT c.* " +
            "FROM comment c " +
            "JOIN chapter ch ON c.id_chapter = ch.id_chapter " +
            "JOIN novel n ON ch.id_novel = n.id_novel " +
            "WHERE n.id_novel = :idNovel", nativeQuery = true)
	List<Comment> findCommentsByNovelId(@Param("idNovel") String idNovel);

}
