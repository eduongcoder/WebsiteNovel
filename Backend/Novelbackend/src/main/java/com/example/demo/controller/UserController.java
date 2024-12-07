package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.UserCreationByEmailRequest;
import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserLoginByEmailRequest;
import com.example.demo.dto.request.UserLoginRequest;
import com.example.demo.dto.request.UserUpdateRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.UserRespone;
import com.example.demo.service.MailService;
import com.example.demo.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserController {

	UserService userService;
	MailService mailService;
	
	
	@GetMapping("/getAllUser")
	public ApiRespone<List<UserRespone>> getAllUser(){
		return ApiRespone.<List<UserRespone>>builder().result(userService.getAllUser()).build();
	}
	
	@PostMapping("/createUser")
	public ApiRespone<UserRespone> createUser(@RequestBody UserCreationRequest request){
		return ApiRespone.<UserRespone>builder()
				.result(userService.createUser(request))
				.build();
	}
	
	@PostMapping("/createUserByEmail")
	public ApiRespone<UserRespone> createUserByEmail(@RequestBody UserCreationByEmailRequest request){
		return ApiRespone.<UserRespone>builder()
				.result(userService.createUserByEmail(request))
				.build();
	}
	
	@PostMapping("/sendOTP")
	public ApiRespone<String> sendOTP(@RequestParam String email){
		String otp=mailService.generateOTP(6);
		mailService.sendOTPEmail(email, "Xác nhận OTP", otp);
		return ApiRespone.<String>builder().result(otp).build();
	}
	
	@PostMapping("/login")
	public ApiRespone<UserRespone> login(@RequestBody UserLoginRequest request){
		return ApiRespone.<UserRespone>builder().result(userService.login(request)).build();
	}
	
	@PostMapping("/loginByEmail")
	public ApiRespone<UserRespone> loginByEmail(@RequestBody UserLoginByEmailRequest request){
		return ApiRespone.<UserRespone>builder().result(userService.loginByEmail(request)).build();
	}
	
	@PostMapping(value = "/uploadAvatar", consumes = { "multipart/form-data" })
	public ApiRespone<UserRespone> uploadAvatar(@RequestParam MultipartFile image,@RequestParam String email) throws IOException {
		return ApiRespone.<UserRespone>builder().result(userService.uploadUser(image, email)).build();
	}
	
	@PutMapping(value = "/updateUser",consumes = { "multipart/form-data"})
	public ApiRespone<UserRespone> updateUser(@RequestParam MultipartFile avatar,@RequestPart UserUpdateRequest request) throws IOException{
	
		return ApiRespone.<UserRespone>builder().result(userService.updateUser(avatar,request)).build();
	} 
	
	@DeleteMapping("/deleteUser")
	public ApiRespone<String> deleteUser(@RequestParam String idUser){
		return ApiRespone.<String>builder().result(userService.deleteUser(idUser)).build();
	}
	@PostMapping("/createHistory")
	public ApiRespone<UserRespone> createHistory(@RequestParam String idChapter,@RequestParam String email){
		return ApiRespone.<UserRespone>builder().result(userService.createHistoryRead(idChapter, email)).build();
	}
}
