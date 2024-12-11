package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.ChapterCreationRequest;
import com.example.demo.dto.request.ChaptersCreationRequest;
import com.example.demo.dto.request.ChaptersUpdateRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.ChapterNoContentRespone;
import com.example.demo.dto.respone.ChapterRespone;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.dto.respone.PdfPageResponse;
import com.example.demo.entity.Novel;
import com.example.demo.repository.INovelRepository;
import com.example.demo.service.ChapterService;
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
	INovelRepository novelRepository;
	
	@GetMapping("/getAllChapter")
	public ApiRespone<List<ChapterRespone>> getAllChapterByNameNovel(@RequestParam String idNovel) {

		return ApiRespone.<List<ChapterRespone>>builder().result(chapterService.getAllChapterByIdNovel(idNovel))
				.build(); 
	}

	@GetMapping("/getAllChapterNoContent") 
	public ApiRespone<List<ChapterNoContentRespone>> getAllChapterNoContentByNameNovel(@RequestParam String nameNovel) {

		return ApiRespone.<List<ChapterNoContentRespone>>builder()
				.result(chapterService.getAllChapterNoContent(nameNovel)).build();
	}
	
	@GetMapping("/getAllChapterNoContentByNameNovel")
	public ApiRespone<List<ChapterNoContentRespone>> getAllChapterNoContentByidNovel(@RequestParam String idNovel) {

		return ApiRespone.<List<ChapterNoContentRespone>>builder()
				.result(chapterService.getAllChapterNoContentByIdNovel(idNovel)).build();
	}
	

	
	
	@PostMapping(value = "/createChapter", consumes = { "multipart/form-data" })
	public ApiRespone<ChapterRespone> createChapter(
			@RequestPart("request") ChapterCreationRequest request) throws IOException {
		ChapterRespone chapterRespone = chapterService.createChapter(request);

		return ApiRespone.<ChapterRespone>builder().result(chapterRespone).build();
	}

	@PostMapping(value = "/testChapter", consumes = { "multipart/form-data" })
	public boolean testChapter(@RequestPart("file") MultipartFile file) throws IOException {

		return chapterService.isPdfFile(file);
	}

	
	@DeleteMapping("/deleteChapter")
	public ApiRespone<String> deleteChapter(@RequestParam String idChapter){
		return ApiRespone.<String>builder().result(chapterService.deleteChapter(idChapter)).build();
	}
	
	// lấy 1 trang từ file pdf
	// pageNumber trang muốn lấy
	@GetMapping("/page")
	public ApiRespone<PdfPageResponse> getPdfPage(@RequestParam("id") String pdfId,
			@RequestParam("page") int pageNumber) throws IOException {
		byte[] pdfBytes = chapterService.getChapter(pdfId).getContentChapter();

		String pageContent = chapterService.getPdfPage(pdfBytes, pageNumber);
		int totalPages = chapterService.getTotalPages(pdfBytes);

		return ApiRespone.<PdfPageResponse>builder().result(PdfPageResponse.builder().pageContent(pageContent)
				.totalPages(pageNumber).totalPages(totalPages).build()).build();
	}

	// lấy nhiều trang từ file pdf
	// page là số trang bắt đầu lấy
	// pageGet là số trang lấy
	@GetMapping("/pages")
	public ApiRespone<PdfPageResponse> getPdfPages(@RequestParam("id") String pdfId,
			@RequestParam("page") int pageNumber, @RequestParam("pageGet") int pageGet) throws IOException {
		byte[] pdfBytes = chapterService.getChapter(pdfId).getContentChapter();
//		byte[] pdfBytesNovel=novelRepository.findById(pdfId).get().getOriginalNovel();
		
//		String pageContent = chapterService.getPdfPages(pdfBytesNovel, pageNumber, pageGet);
		String pageContent = chapterService.getPdfPages(pdfBytes, pageNumber, pageGet);
		int totalPages = chapterService.getTotalPages(pdfBytes);

		return ApiRespone.<PdfPageResponse>builder().result(PdfPageResponse.builder().pageContent(pageContent)
				.totalPages(pageNumber).totalPages(totalPages).build()).build();
	}

	@PostMapping("/createChapters")
	public ApiRespone<Boolean> createChapters(
			@RequestBody ChaptersCreationRequest request) throws IOException {

		return ApiRespone.<Boolean>builder()
				.result(chapterService.createChapters(request.getIdNovel(), request.getArray(),request.getTilteChapters()))
				.build();
	}
	
	@PutMapping(value = "/updateChapter")
	public ApiRespone<ChapterRespone> updateChapter(@RequestBody ChaptersUpdateRequest request ) throws IOException{
		return ApiRespone.<ChapterRespone>builder().result(chapterService.updateChapter(request)).build();
	}
	
	@GetMapping(value = "/testPDFChapter/{idChapter}")
	public ApiRespone<String> testPDFChapter(@PathVariable String idChapter){
		return ApiRespone.<String>builder().result(chapterService.testChapterPdf(idChapter)).build();
	}
	@PutMapping(value = "/upView/{idChapter}")
	public ApiRespone<Boolean> upView(@PathVariable String idChapter) {
		return ApiRespone.<Boolean>builder().result(chapterService.upView(idChapter)).build();
	}
}
