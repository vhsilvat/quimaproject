package com.quima.quimaproject.service;

import com.quima.quimaproject.configuration.CategoryMapper;
import com.quima.quimaproject.configuration.ProductMapper;
import com.quima.quimaproject.dto.ProductDTO;
import com.quima.quimaproject.entity.Category;
import com.quima.quimaproject.entity.Product;
import com.quima.quimaproject.exception.CategoryNotFoundException;
import com.quima.quimaproject.exception.ProductNotFoundException;
import com.quima.quimaproject.repository.CategoryRepository;
import com.quima.quimaproject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

	@Service
	public class ProductService {

		private final ProductRepository productRepository;
		private final CategoryRepository categoryRepository;
		private final ProductMapper productMapper;
		private final CategoryMapper categoryMapper;

		@Autowired
		public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository,
		                      ProductMapper productMapper, CategoryMapper categoryMapper) {
			this.productRepository = productRepository;
			this.categoryRepository = categoryRepository;
			this.productMapper = productMapper;
			this.categoryMapper = categoryMapper;
		}

		public List<ProductDTO> getAllProducts() {
			return productMapper.toProductDTOs(productRepository.findAll());
		}

		public List<ProductDTO> getProductsByCategory(String categoryName) {
			return productMapper.toProductDTOs(productRepository.findByCategoryName(categoryName));
		}

		public ProductDTO getProductById(Long id) {
			return productRepository.findById(id)
					.map(productMapper::toProductDTO)
					.orElseThrow(ProductNotFoundException::new);
		}

		public ProductDTO addProduct(ProductDTO productDTO) {
			Optional<Category> optionalCategory = categoryRepository.findByName(productDTO.getCategory().getName());
			if (!optionalCategory.isPresent()) {
				throw new CategoryNotFoundException();
			}
			Product product = productMapper.toProduct(productDTO);
			Category category = optionalCategory.get();
			product.setCategory(category);
			return productMapper.toProductDTO(productRepository.save(product));
		}

		public ProductDTO updateProduct(ProductDTO productDTO, Long id) {
			Optional<Product> optionalProduct = productRepository.findById(id);
			if (!optionalProduct.isPresent()) {
				throw new ProductNotFoundException();
			}
			Optional<Category> optionalCategory = categoryRepository.findByName(productDTO.getCategory().getName());
			if (!optionalCategory.isPresent()) {
				throw new CategoryNotFoundException();
			}
			Product product = productMapper.toProduct(productDTO);
			Category category = optionalCategory.get();
			product.setId(id);
			product.setCategory(category);
			return productMapper.toProductDTO(productRepository.save(product));
		}

		public void deleteProduct(Long id) {
			Optional<Product> optionalProduct = productRepository.findById(id);
			if (!optionalProduct.isPresent()) {
				throw new ProductNotFoundException();
			}
			productRepository.deleteById(id);
		}
	}
