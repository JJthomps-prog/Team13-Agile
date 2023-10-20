package com.team13.community.controller;

import com.team13.community.model.Review;
import com.team13.community.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public Review submitReview(@RequestBody Review review) {
        return reviewService.submitReview(review);
    }

    @GetMapping("/profile/{profileId}")
    public List<Review> getReviewsForProfile(@PathVariable Long profileId) {
        return reviewService.getReviewsForProfile(profileId);
    }

    @GetMapping("/test")
    public String test() {
        return "The reviews page test!";
    }
}
