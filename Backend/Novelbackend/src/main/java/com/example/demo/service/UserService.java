package com.example.demo.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.UserCreationByEmailRequest;
import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserLoginByEmailRequest;
import com.example.demo.dto.request.UserLoginRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.respone.UploadFileRespone;
import com.example.demo.dto.respone.UserRespone;
import com.example.demo.entity.Chapter;
import com.example.demo.entity.HistoryId;
import com.example.demo.entity.HistoryRead;
import com.example.demo.entity.User;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.IUserMapper;
import com.example.demo.repository.IChapterRepository;
import com.example.demo.repository.IHistoryReadRepository;
import com.example.demo.repository.IUserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

	IUserRepository userRepository;
	IUserMapper userMapper;
	PasswordEncoder passwordEncoder;
	IChapterRepository chapterRepository;
	IHistoryReadRepository historyReadRepository;
	UploadFileService uploadFileService;
	
	public List<UserRespone> getAllUser() {
		return userRepository.findAll().stream().map(t -> userMapper.toUserRespone(t)).toList();
	}
	
	public UserRespone createUser(UserCreationRequest request) {

		User user = userRepository.findByIdUser(request.getEmail());

		if (user != null) {
			throw new AppException(ErrorCode.USER_EXISTED);
		}
		user = userMapper.toUser(request);
		
		user.setPassword(passwordEncoder.encode(request.getPassword()));

		return userMapper.toUserRespone(userRepository.save(user));

	}
	
	public UserRespone createUserByEmail(UserCreationByEmailRequest request) {

		User user = userRepository.findByIdUser(request.getEmail());

		if (user != null) {
			throw new AppException(ErrorCode.USER_EXISTED);
		}
		user = userMapper.toUser(request);
		
		return userMapper.toUserRespone(userRepository.save(user));

	}

	public UserRespone login(UserLoginRequest request) {

		User user=userRepository.findByEmail(request.getEmail());
		if (user==null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}
		PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);
		boolean matches=passwordEncoder.matches(request.getPassword(), user.getPassword());
		
		if (!matches) {
			throw new AppException(ErrorCode.PASSWORD_NOT_MATCHED);
		}
		
		return userMapper.toUserRespone(user);
	}

	public UserRespone loginByEmail(UserLoginByEmailRequest request) {

		User user=userRepository.findByEmail(request.getEmail());
		if (user==null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}
		return userMapper.toUserRespone(user);
	}
	
	public UserRespone updateUser(MultipartFile avatar,UserUpdateRequest request) throws IOException {
		User user = userRepository.findByIdUser(request.getEmail());

		
		UploadFileRespone respone=uploadFileService.uploadFile(avatar);
		
		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}

		user = userMapper.toUser2(request);
		user.setPublicIDUser(respone.getPublic_id());
		user.setAvatarUser(respone.getUrl());
		return userMapper.toUserRespone(userRepository.save(user));

	}
	
	public UserRespone uploadUser(MultipartFile avatar,String email) throws IOException {
		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}
		if (user.getAvatarUser()!=null) {
			uploadFileService.deleteImage(user.getPublicIDUser());
		}
		UploadFileRespone respone=uploadFileService.uploadFile(avatar);
		user.setAvatarUser(respone.getUrl());
		user.setPublicIDUser(respone.getPublic_id());
		return userMapper.toUserRespone(userRepository.save(user));

	}
	
	public String deleteUser(String idUser) {
		User user=userRepository.findByIdUser(idUser);
		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}
		userRepository.deleteById(idUser);
		return idUser; 
	}
	
	public UserRespone createHistoryRead(String idChapter,String email) {
		User user=userRepository.findByEmail(email);
		Chapter chapter=chapterRepository.findByIdChapter(idChapter);
		
		HistoryId historyId=new HistoryId();
		historyId.setIdChapter(idChapter);
		historyId.setIdUser(user.getIdUser());
		
		historyReadRepository.save(HistoryRead.builder().id(historyId).chapter(chapter).readingTime(LocalDateTime.now()).user(user).build());
		return userMapper.toUserRespone(user);
	}
	
}
