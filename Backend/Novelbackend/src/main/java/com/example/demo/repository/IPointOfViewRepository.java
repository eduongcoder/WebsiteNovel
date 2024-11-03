package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PointOfView;


@Repository
public interface IPointOfViewRepository extends JpaRepository<PointOfView, String> {
	PointOfView  findByNamePointOfView(String namePointOfView);
}
