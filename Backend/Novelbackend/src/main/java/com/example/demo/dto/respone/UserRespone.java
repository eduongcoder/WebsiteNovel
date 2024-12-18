package com.example.demo.dto.respone;

import java.time.LocalDate;

import com.example.demo.entity.HistoryRead;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRespone {
	String idUser;

	String userName;
	String password;
	String avatarUser;
	String email;
	String publicIDUser;
	LocalDate dobUser;
	HistoryReadRespone historyRead;

}
