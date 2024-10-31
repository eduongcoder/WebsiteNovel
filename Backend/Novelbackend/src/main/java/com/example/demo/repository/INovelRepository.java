package com.example.demo.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Novel;


@Repository
public interface INovelRepository extends JpaRepository<Novel, String>{
	Novel findByNameNovel(String nameNovel);
}
