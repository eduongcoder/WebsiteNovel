package com.example.demo.service;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.AuthorCreationRequest;
import com.example.demo.dto.request.AuthorUpdateRequest;
import com.example.demo.dto.respone.AuthorRespone;
import com.example.demo.dto.respone.UploadFileRespone;
import com.example.demo.entity.Author;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.IAuthorMapper;
import com.example.demo.repository.IAuthorRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthorService {
	IAuthorRepository authorRepository;
	IAuthorMapper authorMapper;
	UploadFileService uploadFileService;
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	public AuthorRespone createAuthor(AuthorCreationRequest request, MultipartFile image) throws IOException {
		Author author = authorMapper.toAuthor(request);
		UploadFileRespone respone= uploadFileService.uploadFile(image);
		author.setImageAuthor(respone.getUrl());
		author.setPublicIDAuthor(respone.getPublic_id());
		return authorMapper.toAuthorRespone(authorRepository.save(author));
	}

	public List<AuthorRespone> getAllAuthor() {

		return authorRepository.findAll().stream().map(t -> {
			AuthorRespone authorRespone = authorMapper.toAuthorRespone(t);
			if (t.getDobAuthor() != null) {
				String formattedDob = t.getDobAuthor().format(formatter);
				authorRespone.setDobAuthor(formattedDob);
			}

			if (t.getDodAuthor()!=null) {
				String formattedDod = t.getDodAuthor().format(formatter);
				authorRespone.setDodAuthor(formattedDod);
			}
			
//			if (t.getImageAuthor() != null) {
//				authorRespone.setImageAuthor(
//						"data:image/jpeg;base64," + Base64.getEncoder().encodeToString(t.getImageAuthor()));
//
//			}
			return authorRespone;
		}).toList(); 
	}

	public String deleteAuthor(String idAuthor) {
		if (!authorRepository.existsById(idAuthor)) {
			throw new AppException(ErrorCode.AUTHOR_NOT_EXISTED);
		}
		try {
			authorRepository.deleteById(idAuthor);

		} catch (Exception e) {
			throw new AppException(ErrorCode.DELETE_CONTRAINT);
		}
		return idAuthor;
	}

	public Optional<AuthorRespone> uploadImage(String idAuthor, MultipartFile image) {
		if (!authorRepository.existsById(idAuthor)) {
			throw new AppException(ErrorCode.AUTHOR_NOT_EXISTED);
		}
		return authorRepository.findById(idAuthor).map(t -> {
			try {
				UploadFileRespone respone=uploadFileService.uploadFile(image);
				t.setImageAuthor(respone.getUrl());
				t.setPublicIDAuthor(respone.getPublic_id());
				AuthorRespone authorRespone=authorMapper.toAuthorRespone(authorRepository.save(t));
				return authorRespone;
			} catch (IOException e) {
				throw new AppException(ErrorCode.UPLOAD_FILE_ERROR);
			}
			
		});
	}

	public Optional<AuthorRespone> updateAuthor(AuthorUpdateRequest request, MultipartFile image) {
		if (!authorRepository.existsById(request.getIdAuthor())) {
			throw new AppException(ErrorCode.AUTHOR_NOT_EXISTED);
		}
		return authorRepository.findById(request.getIdAuthor()).map(t -> {
			t.setDescriptionAuthor(request.getDescriptionAuthor());
			t.setNameAuthor(request.getNameAuthor());
			try {
				UploadFileRespone respone=uploadFileService.uploadFile(image);
				t.setImageAuthor(respone.getUrl());
				t.setPublicIDAuthor(respone.getPublic_id());
			} catch (IOException e) {
				throw new AppException(ErrorCode.UPLOAD_FILE_ERROR);
			}
		
				t.setDobAuthor(request.getDobAuthor());

		
		
				t.setDodAuthor(request.getDodAuthor());
		
		
				t.setNationality(request.getNationality());

			

			AuthorRespone authorRespone=authorMapper.toAuthorRespone(authorRepository.save(t));

			if (t.getDodAuthor()!=null) {
				authorRespone.setDodAuthor(t.getDodAuthor().format(formatter));
 
			} 
			if (t.getDobAuthor()!=null) {
				authorRespone.setDobAuthor(t.getDobAuthor().format(formatter)) ;
			}
			
			return authorRespone;
		});
	}
}
