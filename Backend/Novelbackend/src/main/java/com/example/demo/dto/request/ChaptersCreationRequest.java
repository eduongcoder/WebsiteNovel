package com.example.demo.dto.request;

import java.util.List;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Data
public class ChaptersCreationRequest {
	String idNovel;
	List<String> tilteChapters;
	List<Integer> array;
}
