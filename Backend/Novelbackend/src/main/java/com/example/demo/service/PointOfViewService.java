package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.AuthorUpdateRequest;
import com.example.demo.dto.request.PointOfViewCreationRequest;
import com.example.demo.dto.request.PointOfViewUpdateRequest;
import com.example.demo.dto.respone.AuthorRespone;
import com.example.demo.dto.respone.PointOfViewRespone;
import com.example.demo.entity.PointOfView;
import com.example.demo.mapper.IPointOfViewMapper;
import com.example.demo.repository.IPointOfViewRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PointOfViewService {

	IPointOfViewRepository pointOfViewRepository;
	IPointOfViewMapper pointOfViewMapper;

	public PointOfViewRespone createPOV(PointOfViewCreationRequest request) {
		PointOfView pov = pointOfViewMapper.toPointOfView(request);

		return pointOfViewMapper.toPointOfViewRespone(pointOfViewRepository.save(pov));
	}

	public List<PointOfViewRespone> getAllPOV() {
		return pointOfViewRepository.findAll().stream().map(t ->pointOfViewMapper.toPointOfViewRespone(t)).toList();
	}
	public String deletePOV(String idPOV) {
		pointOfViewRepository.deleteById(idPOV);
		return idPOV;
	}

	public Optional<PointOfViewRespone> updatePOV(PointOfViewUpdateRequest request) {
		
		return pointOfViewRepository.findById(request.getIdPointOfView()).map(t -> {
			t.setNamePointOfView(request.getNamePointOfView());
			return pointOfViewMapper.toPointOfViewRespone(pointOfViewRepository.save(t));
		});
	}
}