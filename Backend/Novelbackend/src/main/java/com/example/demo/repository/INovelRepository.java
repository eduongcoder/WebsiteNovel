package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Novel;

@Repository
public interface INovelRepository extends JpaRepository<Novel, String> {
	Novel findByNameNovel(String nameNovel);

	Novel findByIdNovel(String idNovel);
	@Query("SELECT n FROM Novel n LEFT JOIN FETCH n.categories LEFT JOIN FETCH n.authors WHERE n.idNovel = :idNovel")
	Novel findNovelWithCategoriesAndAuthors(String idNovel);

}
