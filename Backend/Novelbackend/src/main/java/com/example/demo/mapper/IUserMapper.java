package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.respone.UserRespone;
import com.example.demo.entity.User;

@Mapper(componentModel = "spring")
public interface IUserMapper {
	@Mapping(target = "idUser",ignore = true)
	User toUser(UserCreationRequest request);
	UserRespone toUserRespone(User user);
	User toUser2(UserUpdateRequest request);
}
