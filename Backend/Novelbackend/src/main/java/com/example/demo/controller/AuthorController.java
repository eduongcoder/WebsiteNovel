package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.AuthorCreationRequest;
import com.example.demo.dto.request.AuthorUpdateRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.AuthorRespone;
import com.example.demo.service.AuthorService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RequestMapping("/api/author")
@RestController
@FieldDefaults(level =  AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class AuthorController {

	AuthorService authorService;
	
	@GetMapping("/getAllAuthor")
	public ApiRespone<List<AuthorRespone>> getAllAuthor() {
		return ApiRespone.<List<AuthorRespone>>builder()
				.result(authorService.getAllAuthor())
				.build();
	}
	
	@PostMapping(value = "/createAuthor",consumes = { "multipart/form-data"})
	public ApiRespone<AuthorRespone> createNovel(@RequestPart AuthorCreationRequest request,@RequestParam MultipartFile image) throws IOException {
		AuthorRespone authorRespone= authorService.createAuthor(request, image);

		return ApiRespone.<AuthorRespone>builder().result(authorRespone).build();
	}
	@PutMapping(value = "/updateAuthor",consumes = { "multipart/form-data"})
	public ApiRespone<Optional<AuthorRespone>> updateAuthor(@RequestPart AuthorUpdateRequest request,@RequestParam MultipartFile image) {
		 
		return ApiRespone.<Optional<AuthorRespone>>builder().result(authorService.updateAuthor(request,image)).build();
	}
	
	@PutMapping(value = "/uploadAuthor",consumes = {"multipart/form-data"})
	public ApiRespone<Optional<AuthorRespone>> uploadAuthor(@RequestPart String idAuthor,@RequestParam MultipartFile image) {
		

		return ApiRespone.<Optional<AuthorRespone>>builder().result(authorService.uploadImage(idAuthor,image)).build();
	}
	
	
	@DeleteMapping("/deleteAuthor")
	public ApiRespone<String> deleteCategory(@RequestParam String idAuthor) {
		

		return ApiRespone.<String>builder().result(authorService.deleteAuthor(idAuthor)).build();
	}
}
