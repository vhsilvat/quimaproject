package com.quima.quimaproject.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryDTO {

	public CategoryDTO(String name) {
		setName(name);
	}
	private Long id;
	private String name;
}
