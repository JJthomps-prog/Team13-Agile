package com.team13.community.Repository;

import com.team13.community.model.Profile;
import com.team13.community.model.Review;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {
    List<Review> findByProfileId(Long profileId);
}
