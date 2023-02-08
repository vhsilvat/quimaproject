package com.quima.quimaproject.service;

import com.quima.quimaproject.dto.CategoryDTO;
import com.quima.quimaproject.dto.ProductDTO;
import com.quima.quimaproject.entity.Category;
import com.quima.quimaproject.entity.Product;
import com.quima.quimaproject.exception.ProductNotFoundException;
import com.quima.quimaproject.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@ExtendWith(MockitoExtension.class)
@SpringBootTest
class ProductServiceTest {

	@MockBean
	private ProductRepository productRepository;

	@Autowired
	private ProductService productService;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);

		Product product1 = new Product(1L, "product 1", 10.0, new Category(1L, "category 1"));
		Product product2 = new Product(2L, "product 2", 20.0, new Category(2L, "category 2"));
		Product product3 = new Product(3L, "product 3", 30.0, new Category(3L, "category 3"));
		Product product4 = new Product(3L, "product 4", 40.0, new Category(4L, "category 4"));

		List<Product> mockProducts = Arrays.asList(product1, product2, product3);

		when(productRepository.findAll()).thenReturn(mockProducts);
		when(productRepository.findById(1L)).thenReturn(Optional.of(product1));
		when(productRepository.save(argThat(arg -> true))).thenReturn(product4);
	}

	@Test
	void getAllProducts_ShouldReturnListOfProducts() {
		List<ProductDTO> products = productService.getAllProducts();
		assertThat(products, notNullValue());
		assertThat(products, hasSize(3));
		assertThat(products.get(0).getName(), is("product 1"));
		assertThat(products.get(1).getName(), is("product 2"));
		assertThat(products.get(2).getName(), is("product 3"));
	}

	@Test
	void getProductById_ShouldReturnProduct() {
		ProductDTO product = productService.getProductById(1L);
		assertThat(product, notNullValue());
		assertThat(product.getName(), is("product 1"));
		assertThat(product.getPrice(), is(10.0));
		assertThat(product.getCategory().getName(), is("category 1"));
	}

	@Test
	void getProductById_ShouldThrowProductNotFoundException() {
		assertThrows(ProductNotFoundException.class, () -> productService.getProductById(4L));
	}

	@Test
	void updateProduct_ShouldThrowProductNotFoundException() {
		ProductDTO productDTO = new ProductDTO("product 5", 40.0, new CategoryDTO("category 4"));
		assertThrows(ProductNotFoundException.class, () -> productService.updateProduct(productDTO, 5L));
	}
}

