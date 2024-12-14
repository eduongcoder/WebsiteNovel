package com.example.demo.service;


import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.respone.StatisticsViewRespone;
import com.example.demo.entity.Chapter;
import com.example.demo.repository.INovelRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class StatisticService {

	INovelRepository novelRepository;
	
	public List<StatisticsViewRespone> getStatisticsView() {
		
	    return novelRepository.findAll().parallelStream()
	            .map(novel -> {
	                int sum = novel.getChapter().stream()
	                        .mapToInt(Chapter::getViewChapter)
	                        .sum();
	                return new StatisticsViewRespone()
	                        .builder()
	                        .novelName(novel.getNameNovel())
	                        .view(sum)
	                        .build();
	            })
	            .collect(Collectors.toList());
	}
	
	public List<StatisticsViewRespone> getStatisticsViewTop() {
		List<StatisticsViewRespone> statistics= getStatisticsView();
		statistics.sort(Comparator.comparing(StatisticsViewRespone::getView).reversed());
		return statistics;
	}
	
//	   public static List<LocalDateTime> getDateRange(LocalDateTime startDate, LocalDateTime endDate) {
//	        List<LocalDateTime> range = new ArrayList<>();
//	        LocalDateTime currentDate = startDate;
//
//	        while (!currentDate.isAfter(endDate)) {
//	            range.add(currentDate);
//	            currentDate = currentDate.plusDays(1); 
//	        }
//
//	        return range;
//	    }
	
}
