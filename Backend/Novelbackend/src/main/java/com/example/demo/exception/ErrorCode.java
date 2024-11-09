package com.example.demo.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
	NOVEL_NOT_EXISTED(1001, "Novel not existed"), NOT_IMAGE(1002, "The file is not image"),
	NOT_PDF(1003, "The file is not pdf"), CATEGORY_NOT_EXISTED(1004, "Category not existed"),
	AUTHOR_NOT_EXISTED(1005, "Author not existed"),

	POV_NOT_EXISTED(1006, "Pov not existed"), AUTHOR_ALREADY_IN(1007, "Author already in"),
	CATEGORY_ALREADY_IN(1008, "Category already in"), POV_ALREADY_IN(1009, "Pov already in"),
	USER_EXISTED(1010,"User already existed"),USER_NOT_EXISTED(1011,"User not existed"),
	UNKNOW_ERROR(9999, "Unknow error");

	private int code;
	private String message;

	private ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
