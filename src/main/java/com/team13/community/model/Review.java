package com.team13.community.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import javax.xml.crypto.Data;
import java.util.Date;

@Table("reviews")
public record Review(
        @Id Long id,
        Long profileId,
        Long userId,
        Integer rating,
        String comment,
        Date dateCreated
) {

    public Date getDateCreated() {
        return dateCreated;
    }
}
