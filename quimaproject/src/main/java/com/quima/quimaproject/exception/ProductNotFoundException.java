package com.quima.quimaproject.exception;

public class ProductNotFoundException extends RuntimeException {

	public ProductNotFoundException() {
		super("Product not found.");
	}
}
