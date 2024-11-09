package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Author;

@Repository
public interface IAuthorRepository extends JpaRepository<Author, String>{
	Author findByNameAuthor(String nameAuthor);
	boolean existsByNameAuthor(String nameAuthor);
	Author findByIdAuthor(String idAuthor);
}
