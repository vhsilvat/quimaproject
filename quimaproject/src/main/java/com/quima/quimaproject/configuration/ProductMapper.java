package com.quima.quimaproject.configuration;

import com.quima.quimaproject.dto.ProductDTO;
import com.quima.quimaproject.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ProductMapper {

	ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);
	ProductDTO toProductDTO(Product product);
	Product toProduct(ProductDTO productDTO);
	default List<ProductDTO> toProductDTOs(List<Product> products) {
		return products.stream().map(this::toProductDTO).collect(Collectors.toList());
	}
}
