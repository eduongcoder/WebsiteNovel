package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.ChapterCreationRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.ChapterRespone;
import com.example.demo.service.ChapterService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;

@RequestMapping("/api/chapter")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ChapterController {

	ChapterService chapterService;

	@GetMapping("/getAllChapter")
	public ApiRespone<List<ChapterRespone>> getAllChapterByNameNovel(@RequestParam String nameNovel) {

		return ApiRespone.<List<ChapterRespone>>builder().result(chapterService.getAllChapterByIdNovel(nameNovel))
				.build();
	} 
	
	@PostMapping(value = "/createChapter", consumes = {"multipart/form-data"})
	public ApiRespone<ChapterRespone> createChapter(
	        @RequestParam("file") MultipartFile file, @RequestPart("request")  ChapterCreationRequest request
	       ) throws IOException {
		
	    request.setContent_Chapter(file.getBytes());
	    ChapterRespone chapterRespone = chapterService.createChapter(request);
	    
	    return ApiRespone.<ChapterRespone>builder().result(chapterRespone).build();
	}

	

}
