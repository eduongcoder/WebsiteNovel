package com.example.demo.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.NovelCreationRequest;
import com.example.demo.dto.request.NovelUpdateRequest;
import com.example.demo.dto.respone.NovelJustIdAndNameRespone;
import com.example.demo.dto.respone.NovelNoChapterRespone;
import com.example.demo.dto.respone.NovelNoImageRespone;
import com.example.demo.dto.respone.NovelRespone;
import com.example.demo.dto.respone.UploadFileRespone;
import com.example.demo.entity.Author;
import com.example.demo.entity.Category;
import com.example.demo.entity.Chapter;
import com.example.demo.entity.Comment;
import com.example.demo.entity.HistoryRead;
import com.example.demo.entity.Novel;
import com.example.demo.entity.PointOfView;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.INovelMapper;
import com.example.demo.repository.IAuthorRepository;
import com.example.demo.repository.ICategoryRepository;
import com.example.demo.repository.IHistoryReadRepository;
import com.example.demo.repository.INovelRepository;
import com.example.demo.repository.IPointOfViewRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NovelService {

	INovelRepository novelRepository;
	ChapterService chapterService;
	INovelMapper novelMapper;
	ICategoryRepository categoryRepository;
	IPointOfViewRepository pointOfViewRepository;
	IAuthorRepository authorRepository;
	UploadFileService uploadFileService;
	IHistoryReadRepository historyReadRepository;
	HistoryReadService historyReadService;
	CommentService commentService;

	public NovelRespone createNovel(MultipartFile image, MultipartFile orginalNovel, NovelCreationRequest request)
			throws IOException {
		isImageFIle(image);
		UploadFileRespone respone = uploadFileService.uploadFile(image);
		request.setOriginalNovel(orginalNovel.getBytes());
		int totalPage = chapterService.getTotalPages(request.getOriginalNovel());
		Novel novel = novelMapper.toNovel(request);
		novel.setImageNovel(respone.getUrl());
		novel.setPublicIDNovel(respone.getPublic_id());
		novel.setTotalPage(totalPage);
		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}

	public String deleteNovel(String idNovel) {

		Novel novel = novelRepository.findByIdNovel(idNovel);
		if (novel != null) {
			if (novel.getChapter().isEmpty()) {

				novelRepository.deleteById(idNovel);
				return idNovel;

			} else {
				List<Chapter> listcChapters = novel.getChapter();
				for (Chapter chapter : listcChapters) {
					chapterService.deleteChapter(chapter.getIdChapter());
				}
				novelRepository.deleteById(idNovel);
				return idNovel;
			}
		}

		throw new AppException(ErrorCode.NOVEL_NOT_EXISTED);

	}

	public List<NovelNoChapterRespone> getAllNovelNoChapter() {

		return novelRepository.findAll().stream().map(t -> {
			NovelNoChapterRespone novelRespone = novelMapper.toNovelNoChapterRespone(t);
			return novelRespone;
		}).toList();
	}

	public NovelRespone getNovelHaveOrginFile(String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);

		NovelRespone novelRespone = novelMapper.toNovelRespone(novel);
		novelRespone.setOriginalNovel(
				"data:application/pdf;base64," + Base64.getEncoder().encodeToString(novel.getOriginalNovel()));
		return novelRespone;
	}

	public List<NovelRespone> getAllNovel() {

		return novelRepository.findAll().stream().map(t -> {
			NovelRespone novelRespone = novelMapper.toNovelRespone(t);

			return novelRespone;
		}).toList();
	}

	public List<NovelNoImageRespone> getAllNovelNoImage() {

		return novelRepository.findAll().stream().map(t -> novelMapper.toNovelNoImageRespone(t)).toList();
	}

	public List<NovelJustIdAndNameRespone> getAllNovelJustIdAndName() {

		return novelRepository.findAll().stream().map(t -> novelMapper.toNovelJustIdAndNameRespone(t)).toList();
	}

	public NovelRespone getNovelByName(String nameNovel) {
		Novel novel = novelRepository.findByNameNovel(nameNovel);
		if (novel==null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED);
		}
		NovelRespone novelRespone = novelMapper.toNovelRespone(novel);

		return novelRespone;
	}

	public Optional<NovelRespone> updateNovel(MultipartFile image, MultipartFile originalFile,
			NovelUpdateRequest request) throws IOException {
		Novel novel = novelRepository.findByIdNovel(request.getIdNovel());
		if (novel == null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED);
		}
	
		if ( image!=null   ) {
			uploadFileService.deleteImage(novel.getPublicIDNovel());
			UploadFileRespone respone = uploadFileService.uploadFile(image);
			request.setImageNovel(respone.getUrl());
			request.setPublicIDNovel(respone.getPublic_id());
		} else {
			request.setImageNovel(novel.getImageNovel());
			request.setPublicIDNovel(novel.getPublicIDNovel());
		}
		if ( originalFile!=null) {
			log.info("file không null");
			request.setOriginalNovel(originalFile.getBytes());
			
		} else {
			log.info("file null");

			request.setOriginalNovel(novel.getOriginalNovel());
			
		}

		if (novel.getTotalChapter()>request.getTotalChapter()) {
			throw new AppException(ErrorCode.NEED_TO_DELETE_CHAPTER);
		}
		
		return novelRepository.findById(request.getIdNovel()).map(t -> {

			try {
				novelMapper.updateNovelFormRequest(request, t);

				t.setTotalPage(chapterService.getTotalPages(request.getOriginalNovel()));
				return novelMapper.toNovelRespone(novelRepository.save(t));

			} catch (IOException e) {
				throw new AppException(ErrorCode.UPLOAD_FILE_ERROR);
			}

		});
	}

	public NovelRespone addCategory(String nameCategory, String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);
		Category category = categoryRepository.findByNameCategory(nameCategory);

		if (novel == null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED);
		}

		if (category == null) {
			throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
		}
		if (novel.getCategories().contains(category)) {
			throw new AppException(ErrorCode.CATEGORY_ALREADY_IN);
		}
		novel.getCategories().add(category);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}

	public NovelRespone addAuthor(String idAuthor, String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);
		Author author = authorRepository.findByIdAuthor(idAuthor);
		if (novel == null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED);
		}

		if (author == null) {
			throw new AppException(ErrorCode.AUTHOR_NOT_EXISTED);
		}
		if (novel.getAuthors().contains(author)) {
			throw new AppException(ErrorCode.AUTHOR_ALREADY_IN);
		}
		novel.getAuthors().add(author);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}

	public NovelRespone addPointOfView(String namePointOfView, String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);

		PointOfView pointOfView = pointOfViewRepository.findByNamePointOfView(namePointOfView);
		if (novel == null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED);
		}

		if (pointOfView == null) {
			throw new AppException(ErrorCode.POV_NOT_EXISTED);

		}
		if (novel.getPointOfViews().contains(pointOfView)) {
			throw new AppException(ErrorCode.POV_ALREADY_IN);
		}
		novel.getPointOfViews().add(pointOfView);

		return novelMapper.toNovelRespone(novelRepository.save(novel));

	}

	public boolean isImageFIle(MultipartFile file) {
		String contentType = file.getContentType();

		boolean flag;
		flag = contentType != null && (contentType.equals(MediaType.IMAGE_JPEG_VALUE)
				|| contentType.equals(MediaType.IMAGE_PNG_VALUE) || contentType.equals(MediaType.IMAGE_GIF_VALUE));
		if (flag) {
			return flag;
		} else {
			throw new AppException(ErrorCode.NOT_IMAGE);
		}
	}

	public String delete(String idNovel) {
		Novel novel = novelRepository.findByIdNovel(idNovel);
		if (novel == null) {
			throw new AppException(ErrorCode.NOVEL_NOT_EXISTED);
		}
		List<Chapter> chapters = novel.getChapter();

		if (!chapters.isEmpty()) {
			for (Chapter chapter : chapters) {
				List<HistoryRead> historyRead = historyReadRepository.findByChapter(chapter);
				if (!historyRead.isEmpty()) {
					for (int i = 0; i < historyRead.size(); i++) {
						historyReadService.deleteHistoryRead(historyRead.get(i).getId());

					}
				}
				
				List<Comment> comments = chapter.getComment();
				if (!comments.isEmpty()) {
					for (int i = 0; i < comments.size(); i++) {
						commentService.deleteComment(comments.get(i).getIdComment());

					}
				}
				
				chapterService.deleteChapter(chapter.getIdChapter());
			}
		}
		
		novelRepository.deleteById(idNovel);

		return idNovel;
	}

	public int totalView(String idNovel) {
		return novelRepository.findByIdNovel(idNovel).getChapter().stream()
				.mapToInt(value -> value.getViewChapter()).sum();
	}
	
	public NovelNoChapterRespone getAll1Query(String idNovel) {
		return novelMapper.toNovelNoChapterRespone(novelRepository.findNovelWithCategoriesAndAuthors(idNovel));
	}
}
