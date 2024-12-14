package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.StatisticsViewRespone;
import com.example.demo.service.StatisticService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class StatisticsController {
		StatisticService service;
		
		@GetMapping("/getAllViewNovel") 
		public ApiRespone<List<StatisticsViewRespone>> getAllViewNovel(){
			return ApiRespone.<List<StatisticsViewRespone>>builder().result(service.getStatisticsView()).build();
		}
		@GetMapping("/getAllViewNovelIncresOrder") 
		public ApiRespone<List<StatisticsViewRespone>> getAllViewNovelIncresOrder(){
			return ApiRespone.<List<StatisticsViewRespone>>builder().result(service.getStatisticsViewTop()).build();
		}
}
