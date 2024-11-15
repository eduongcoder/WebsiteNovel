package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.HistoryId;
import com.example.demo.entity.HistoryRead;
import com.example.demo.entity.User;


@Repository
public interface IHistoryReadRepository extends JpaRepository<HistoryRead, HistoryId>{

	HistoryRead findByUser(User user);
}
