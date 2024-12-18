package com.example.demo.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
import com.example.demo.entity.Novel;
import com.example.demo.entity.User;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.IHistoryReadMapper;
import com.example.demo.mapper.IUserMapper;
import com.example.demo.repository.IChapterRepository;
import com.example.demo.repository.IHistoryReadRepository;
import com.example.demo.repository.INovelRepository;
import com.example.demo.repository.IUserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {

	IUserRepository userRepository;
	IUserMapper userMapper;
	PasswordEncoder passwordEncoder;
	INovelRepository novelRepository;
	IHistoryReadRepository historyReadRepository;
	UploadFileService uploadFileService;
	IHistoryReadMapper historyReadMapper;
	
	public List<UserRespone> getAllUser() {
		return userRepository.findAll().stream().map(t -> userMapper.toUserRespone(t)).toList();
	}

	public UserRespone createUser(UserCreationRequest request) {

		User user = userRepository.findByEmail(request.getEmail());

		if (user != null) {
			throw new AppException(ErrorCode.USER_EXISTED);
		}
		String userName = request.getEmail().split("@")[0];

		user = userMapper.toUser(request);
		user.setUserName(userName);
		
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		return userMapper.toUserRespone(userRepository.save(user));

	}

	public UserRespone createUserByEmail(UserCreationByEmailRequest request) {

		User user = userRepository.findByEmail(request.getEmail());

		if (user != null) {
			throw new AppException(ErrorCode.USER_EXISTED);
		}

		String userName = request.getEmail().split("@")[0];

		user = userMapper.toUser(request);
		user.setUserName(userName);

		return userMapper.toUserRespone(userRepository.save(user));

	}

	public UserRespone login(UserLoginRequest request) {

		User user = userRepository.findByEmail(request.getEmail());
		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}
		
//		log.info("Request: "+user.getDobUser());
		
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
		boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());

		if (!matches) {
			throw new AppException(ErrorCode.PASSWORD_NOT_MATCHED);
		}

		return userMapper.toUserRespone(user);
	}

	public UserRespone loginByEmail(UserLoginByEmailRequest request) {

		User user = userRepository.findByEmail(request.getEmail());
		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}

		return userMapper.toUserRespone(user);
	}

	public UserRespone updateUser(UserUpdateRequest request) throws IOException {
		User user = userRepository.findByEmail(request.getEmail());
		
		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}

		userMapper.updateUser(request,user);

		
		
		return userMapper.toUserRespone(userRepository.save(user));
//		return null;

	}

	public UserRespone uploadUser(MultipartFile avatar, String email) throws IOException {
		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}
		if (user.getAvatarUser() != null) {
			uploadFileService.deleteImage(user.getPublicIDUser());
		}
		UploadFileRespone respone = uploadFileService.uploadFile(avatar);
		user.setAvatarUser(respone.getUrl());
		user.setPublicIDUser(respone.getPublic_id());
		return userMapper.toUserRespone(userRepository.save(user));

	}

	public String deleteUser(String idUser) {
		User user = userRepository.findByIdUser(idUser);
		if (user == null) {
			throw new AppException(ErrorCode.USER_NOT_EXISTED);
		}
		userRepository.deleteById(idUser);
		return idUser;
	}

	public UserRespone createHistoryRead(String idNovel, String email,String titleChapter) {
		User user = userRepository.findByEmail(email);
		Novel novel = novelRepository.findByIdNovel(idNovel);

		HistoryId historyId = new HistoryId();
		historyId.setIdNovel(idNovel);
		historyId.setIdUser(user.getIdUser());

		HistoryRead historyRead=HistoryRead.builder().id(historyId).novel(novel).readingTime(LocalDateTime.now()).titleChapter(titleChapter)
				.user(user).build();
		
		Optional<HistoryRead> historyReadPast=historyReadRepository.findById(historyId);
		
		if (historyReadPast!=null) {
			historyReadMapper.updateHistoryRead(historyRead, historyReadPast.get());
		}
		
		historyReadRepository.save(historyRead);
		return userMapper.toUserRespone(user);
	}

}
