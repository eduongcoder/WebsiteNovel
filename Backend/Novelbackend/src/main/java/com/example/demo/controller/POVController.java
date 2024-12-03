package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.AuthorUpdateRequest;
import com.example.demo.dto.request.PointOfViewCreationRequest;
import com.example.demo.dto.request.PointOfViewUpdateRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.AuthorRespone;
import com.example.demo.dto.respone.PointOfViewRespone;
import com.example.demo.dto.respone.UploadFileRespone;
import com.example.demo.service.PointOfViewService;
import com.example.demo.service.UploadFileService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("/api/pov")
@RestController
@FieldDefaults(level =  AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class POVController {

	PointOfViewService pointOfViewService;
	UploadFileService uploadFileService;
	
	@GetMapping("/getAllPOV") 
	public ApiRespone<List<PointOfViewRespone>> getAllPOV() {
		return ApiRespone.<List<PointOfViewRespone>>builder()
				.result(pointOfViewService.getAllPOV())
				.build();
	}
	
	@PostMapping("/createPOV")
	public ApiRespone<PointOfViewRespone> createPOV(@RequestBody PointOfViewCreationRequest request) {
		

		return ApiRespone.<PointOfViewRespone>builder().result(pointOfViewService.createPOV(request)).build();
	}
	@PutMapping("/updatePOV")
	public ApiRespone<Optional<PointOfViewRespone>> updateCategory(@RequestBody PointOfViewUpdateRequest request) {
		

		return ApiRespone.<Optional<PointOfViewRespone>>builder().result(pointOfViewService.updatePOV(request)).build();
	}
	@DeleteMapping("/deletePOV")
	public ApiRespone<String> deleteCategory(@RequestParam String idPOV) {
		 

		return ApiRespone.<String>builder().result(pointOfViewService.deletePOV(idPOV)).build();
	}
	
	@PostMapping(value = "/testAPI", consumes = { "multipart/form-data" })
	public ApiRespone<UploadFileRespone> testAPI(@RequestParam MultipartFile file) throws IOException{
		return ApiRespone.<UploadFileRespone>builder().result(uploadFileService.uploadFile(file)).build();
	}
	
	@DeleteMapping("/testAPI2")  
	public ApiRespone<String> testAPI2(@RequestParam String publicID) throws IOException{
		return ApiRespone.<String>builder().result(uploadFileService.deleteImage(publicID)).build();
	}
}
