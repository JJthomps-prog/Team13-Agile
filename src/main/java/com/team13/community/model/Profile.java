package com.team13.community.model;

import org.springframework.data.annotation.Id;

public record Profile(
        @Id Long id,
        String name,
        String type,
        String description,
        String location
) {
}
