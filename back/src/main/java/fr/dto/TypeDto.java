package fr.dto;

import lombok.*;

@Getter
@Setter
public class TypeDto {
    private Integer id;
    private String name;
    private CategoryDto category;
}
