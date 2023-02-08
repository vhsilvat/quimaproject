package com.quima.quimaproject.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "products")
public class Product {

	public Product() {}

	public Product(long id, String name, double price, Category category) {
		setId(id);
		setName(name);
		setPrice(price);
		setCategory(category);
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name is mandatory")
	@Column(name = "name", nullable = false)
	private String name;

	@NotNull
	@Column(name = "price", nullable = false)
	private Double price;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "category_path")
	private String categoryPath;

	@NotNull
	@Column(name = "available", nullable = false)
	private Boolean available;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id", referencedColumnName = "id")
	private Category category;
}