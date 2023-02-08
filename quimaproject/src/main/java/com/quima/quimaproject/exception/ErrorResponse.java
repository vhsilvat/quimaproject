package com.quima.quimaproject.exception;

public class ErrorResponse {

	private String message;
	private String exceptionMessage;

	public ErrorResponse(String message) {
		this.message = message;
	}

	public ErrorResponse(String message, String exceptionMessage) {
		this.message = message;
		this.exceptionMessage = exceptionMessage;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}

