package com.quima.quimaproject.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
@Entity
@Table(name = "categories")
public class Category {

	public Category() {}

	public Category(long id, String categoryName) {
		setId(id);
		setName(categoryName);
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name is mandatory")
	@Column(name = "name", nullable = false)
	private String name;
}