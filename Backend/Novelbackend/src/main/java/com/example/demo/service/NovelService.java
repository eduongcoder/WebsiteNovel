package com.example.demo.service;

import java.util.Base64;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.entity.Novel;
import com.example.demo.mapper.INovelMapper;
import com.example.demo.repository.INovelRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NovelService {

	INovelRepository novelRepository;
	INovelMapper novelMapper;

	public NovelRespone createNovel(NovelCreationRequest request) {
		Novel novel = novelMapper.toNovel(request);

		return novelMapper.toNovelRespone(novelRepository.save(novel));
	}
	
	public List<NovelRespone> getAllNovel(){
		return novelRepository.findAll().stream().map(t ->{
			 NovelRespone novelRespone = novelMapper.toNovelRespone(t);
	            novelRespone.setImage_Novel("data:image/jpeg;base64,"+Base64.getEncoder().encodeToString(t.getImage_Novel())); 
	            return novelRespone;  
		}).toList();
	}
	
	public NovelRespone getNovelByName(String nameNovel) {
		Novel novel=novelRepository.findByNameNovel(nameNovel);
		
		return novelMapper.toNovelRespone(novel);
	}
}
