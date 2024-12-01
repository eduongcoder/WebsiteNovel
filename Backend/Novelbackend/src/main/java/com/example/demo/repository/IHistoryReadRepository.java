package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.HistoryId;
import com.example.demo.entity.HistoryRead;
import com.example.demo.entity.User;
import com.example.demo.entity.Chapter;



@Repository
public interface IHistoryReadRepository extends JpaRepository<HistoryRead, HistoryId>{

	HistoryRead findByUser(User user);
	List<HistoryRead> findByChapter(Chapter chapter);
	
}
