package com.quima.quimaproject.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductDTO {

	public ProductDTO(String name, double price, CategoryDTO categoryDTO) {
		setName(name);
		setPrice(price);
		setCategory(categoryDTO);
	}

	private Long id;
	private String name;
	private Double price;
	private String description;
	private String categoryPath;
	private Boolean available;
	private CategoryDTO category;
}
