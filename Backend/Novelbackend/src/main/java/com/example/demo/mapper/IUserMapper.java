package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.UserCreationByEmailRequest;
import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.respone.UserRespone;
import com.example.demo.entity.User;

@Mapper(componentModel = "spring")
public interface IUserMapper {
	@Mapping(target = "idUser",ignore = true)
	@Mapping(target = "avatarUser",ignore = true)
	@Mapping(target = "dobUser",ignore = true)
	@Mapping(target = "userName",ignore = true)
	User toUser(UserCreationRequest request);
	
	@Mapping(target = "idUser",ignore = true)
	@Mapping(target = "avatarUser",ignore = true)
	@Mapping(target = "dobUser",ignore = true)
	@Mapping(target = "password",ignore = true) 
	User toUser(UserCreationByEmailRequest request);

	UserRespone toUserRespone(User user);
	@Mapping(target = "email",ignore = true)
	User toUser2(UserUpdateRequest request); 
}
