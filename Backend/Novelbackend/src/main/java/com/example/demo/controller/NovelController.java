package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.service.NovelService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/novel")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class NovelController {

	NovelService novelService;

	@GetMapping("/getNovels")
	public ApiRespone<List<NovelRespone>> getAllNovel() {
		return ApiRespone.<List<NovelRespone>>builder().result(novelService.getAllNovel()).build();
	}

	@PostMapping(value = "/createNovel", consumes = { "multipart/form-data"})
	public ApiRespone<NovelRespone> createNovel(@RequestParam MultipartFile image,
			@RequestPart NovelCreationRequest request) throws IOException {
		request.setImage_Novel(image.getBytes());
		NovelRespone novelRespone = novelService.createNovel(request);

		return ApiRespone.<NovelRespone>builder().result(novelRespone).build();
	}

}
