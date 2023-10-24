package com.team13.community.service;

import com.team13.community.repository.ReviewRepository;
import com.team13.community.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    /*
    public Review submitReview(Review review) {
        review.setDateCreated(new Date());
        return reviewRepository.save(review);
    }
    */
    public List<Review> getReviewsForProfile(Long profileId) {
        return reviewRepository.findByProfileId(profileId);
    }

}
