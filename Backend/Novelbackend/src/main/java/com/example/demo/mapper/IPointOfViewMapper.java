package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.PointOfViewCreationRequest;
import com.example.demo.dto.request.PointOfViewUpdateRequest;
import com.example.demo.dto.respone.PointOfViewRespone;
import com.example.demo.entity.PointOfView;

@Mapper(componentModel = "spring")
public interface IPointOfViewMapper {
	
	@Mapping(target = "idPointOfView",ignore = true)
	PointOfView toPointOfView(PointOfViewCreationRequest request);
	PointOfView toPointOfView(PointOfViewUpdateRequest request);
	PointOfViewRespone toPointOfViewRespone(PointOfView pointOfView);  
}
