package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.request.AuthorCreateionRequest;
import com.example.demo.dto.request.AuthorUpdateRequest;
import com.example.demo.dto.request.CategoryUpdateRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.AuthorRespone;
import com.example.demo.dto.respone.CategoryRespone;
import com.example.demo.service.AuthorService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("/api/author")
@RestController
@FieldDefaults(level =  AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class AuthorController {

	AuthorService authorService;
	
	@GetMapping("/getAllAuthor")
	public ApiRespone<List<AuthorRespone>> getAllAuthor() {
		return ApiRespone.<List<AuthorRespone>>builder()
				.result(authorService.getAllAuthor())
				.build();
	}
	
	@PostMapping("/createAuthor")
	public ApiRespone<AuthorRespone> createNovel(@RequestBody AuthorCreateionRequest request) {
		

		return ApiRespone.<AuthorRespone>builder().result(authorService.createAuthor(request)).build();
	}
	@PutMapping("/updateAuthor")
	public ApiRespone<Optional<AuthorRespone>> updateCategory(@RequestBody AuthorUpdateRequest request) {
		

		return ApiRespone.<Optional<AuthorRespone>>builder().result(authorService.updateAuthor(request)).build();
	}
	@DeleteMapping("/deleteAuthor")
	public ApiRespone<String> deleteCategory(@RequestParam String idAuthor) {
		

		return ApiRespone.<String>builder().result(authorService.deleteAuthor(idAuthor)).build();
	}
}
