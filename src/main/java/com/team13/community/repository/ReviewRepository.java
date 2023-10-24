package com.team13.community.repository;

import com.team13.community.model.Review;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {
    List<Review> findByProfileId(Long profileId);
}
