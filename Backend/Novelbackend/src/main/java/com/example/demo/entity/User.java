package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String idUser;
	
	String userName;
	@Column(name = "password",nullable = true)
	String password;
	
	@Column(name = "email",unique = true)
	String email;
	
	@Lob
	@Column(name = "avatarUser",columnDefinition = "MEDIUMBLOB")
	byte[] avatarUser;
	
	LocalDate dobUser;
	
}
