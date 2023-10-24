package com.team13.community.service;

import com.team13.community.repository.ProfileRepository;
import com.team13.community.model.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Optional<Profile> getProfile(Long id) {
        return profileRepository.findById(id);
    }

}
