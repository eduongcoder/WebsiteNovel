package com.example.demo.service;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserLoginRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.respone.UserRespone;
import com.example.demo.entity.User;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.IUserMapper;
import com.example.demo.repository.IUserRepository;

import io.swagger.v3.oas.annotations.servers.Server;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Server
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

	IUserRepository userRepository;
	IUserMapper userMapper;
	PasswordEncoder passwordEncoder;

	public UserRespone createUser(UserCreationRequest request) {
		User user = userMapper.toUser(request);

		user.setPassword(passwordEncoder.encode(request.getPassword()));

		return userMapper.toUserRespone(userRepository.save(user));

	}

//	public UserRespone login(UserLoginRequest request) {
//		User user=userRepository.findByIdUser(request.)
//	}

	public UserRespone updateUser(UserUpdateRequest request) {
		User user = userRepository.findByIdUser(request.getIdUser());

		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}

		user = userMapper.toUser2(request);

		return userMapper.toUserRespone(user);

	}
}
