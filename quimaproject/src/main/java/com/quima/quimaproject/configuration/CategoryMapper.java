package com.quima.quimaproject.configuration;

import com.quima.quimaproject.dto.CategoryDTO;
import com.quima.quimaproject.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper {

	CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);
	CategoryDTO toCategoryDTO(Category category);
	Category toCategory(CategoryDTO categoryDTO);
}
