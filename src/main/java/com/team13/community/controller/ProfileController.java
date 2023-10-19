package com.team13.community.controller;

import com.team13.community.model.Profile;
import com.team13.community.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/profiles")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @PostMapping
    public Profile createProfile(@RequestBody Profile profile) {
        return profileService.createProfile(profile);
    }

    @GetMapping("/{id}")
    public Optional<Profile> getProfile(@PathVariable Long id) {
        return profileService.getProfile(id);
    }

    @GetMapping("/test")
    public String test(){
        return "The profiles page test!";
    }
}
