package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entity.HistoryId;
import com.example.demo.repository.IHistoryReadRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class HistoryReadService {

	IHistoryReadRepository historyReadRepository;
	
	public String deleteHistoryRead(HistoryId historyId) {
		historyReadRepository.deleteById(historyId);
		return historyId.getIdChapter()+" "+historyId.getIdUser();
	}
}
