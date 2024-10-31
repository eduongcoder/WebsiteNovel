package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Chapter;

@Repository
public interface IChapterRepository extends JpaRepository<Chapter, String>{

}
