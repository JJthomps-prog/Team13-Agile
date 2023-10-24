package com.team13.community.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("users")
public record User(
        @Id Long id,
        String username,
        String password,
        boolean enabled,
        String firstName,
        String lastName,
        String email
) {
}
