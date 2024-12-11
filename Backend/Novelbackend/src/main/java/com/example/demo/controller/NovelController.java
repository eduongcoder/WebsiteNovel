package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.request.NovelUpdateRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.NovelJustIdAndNameRespone;
import com.example.demo.dto.respone.NovelNoChapterRespone;
import com.example.demo.dto.respone.NovelNoImageRespone;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.service.NovelService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

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

	@GetMapping(value = "/getAllNovel1Query/{idNovel}")
	public ApiRespone<NovelNoChapterRespone> getMethodName(@PathVariable String idNovel) {
		return ApiRespone.<NovelNoChapterRespone>builder().result(novelService.getAll1Query(idNovel)).build();
	}
	
	
	@GetMapping("/getNovelsNoImage") 
	public ApiRespone<List<NovelNoImageRespone>> getAllNovelNoImage() {
		return ApiRespone.<List<NovelNoImageRespone>>builder().result(novelService.getAllNovelNoImage()).build();
	}
	
	@GetMapping("/getAllNovelsJustIdAndName")
	public ApiRespone<List<NovelJustIdAndNameRespone>> getAllNovelsJustIdAndName() {
		return ApiRespone.<List<NovelJustIdAndNameRespone>>builder().result(novelService.getAllNovelJustIdAndName()).build();
	}     
	  
	@GetMapping("/getNovelsNoChapter")
	public ApiRespone<List<NovelNoChapterRespone>> getAllNovelNoChapter() {
		return ApiRespone.<List<NovelNoChapterRespone>>builder().result(novelService.getAllNovelNoChapter()).build();
	} 

	@GetMapping("/getNovelByName")
	public ApiRespone<NovelRespone> getNovelByName(@RequestParam String nameNovel) {
		return ApiRespone.<NovelRespone>builder().result(novelService.getNovelByName(nameNovel)).build();
	}

	@PostMapping(value = "/createNovel", consumes = { "multipart/form-data" })
	public ApiRespone<NovelRespone> createNovel(@RequestParam MultipartFile image,@RequestParam MultipartFile originalNovel,
			@RequestPart NovelCreationRequest request) throws IOException {
		NovelRespone novelRespone = novelService.createNovel(image,originalNovel, request);

		return ApiRespone.<NovelRespone>builder().result(novelRespone).build();
	} 

	@PostMapping(value = "/testImage", consumes = { "multipart/form-data" })
	public boolean testImage(@RequestParam MultipartFile image) {
		return novelService.isImageFIle(image);
	}

	@PostMapping("/addCategory")
	public ApiRespone<NovelRespone> addCategory(@RequestParam String nameCategory, @RequestParam String idNovel) {
		return ApiRespone.<NovelRespone>builder().result(novelService.addCategory(nameCategory, idNovel)).build();
	}

	@PostMapping("/addAuthor")
	public ApiRespone<NovelRespone> addAuthor(@RequestParam String idAuthor, @RequestParam String idNovel) {
		return ApiRespone.<NovelRespone>builder().result(novelService.addAuthor(idAuthor, idNovel)).build();
	}

	@PostMapping("/addPOV") 
	public ApiRespone<NovelRespone> addPointOfView(@RequestParam String namePOV, @RequestParam String idNovel) {
		return ApiRespone.<NovelRespone>builder().result(novelService.addPointOfView(namePOV, idNovel)).build();
	} 

	@PutMapping(value = "/updateNovel",consumes = {"multipart/form-data"})
	public ApiRespone<Optional<NovelRespone>> updateNovel(@RequestParam(required = false) MultipartFile image, @RequestParam(required = false) MultipartFile originalNovel,@RequestPart NovelUpdateRequest request) throws IOException{

		return ApiRespone.<Optional<NovelRespone>>builder().result(novelService.updateNovel(image,originalNovel,request)).build();
	}
	
	@DeleteMapping("/deleteNovel")
	public ApiRespone<String> deleteNovel(@RequestParam String idNovel) {
		return ApiRespone.<String>builder().result(novelService.delete(idNovel)).build();
	}
}
