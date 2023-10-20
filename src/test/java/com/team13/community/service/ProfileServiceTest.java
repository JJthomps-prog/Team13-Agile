package com.team13.community.service;

import com.team13.community.Repository.ProfileRepository;
import com.team13.community.model.Profile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class ProfileServiceTest {

    @Mock
    private ProfileRepository profileRepository;

    @InjectMocks
    private ProfileService profileService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateProfile() {
        Profile profile = new Profile(1L, "Test Business", "Business");
        when(profileRepository.save(any(Profile.class))).thenReturn(profile);

        Profile savedProfile = profileService.createProfile(profile);

        assertNotNull(savedProfile);
        assertEquals("Test Business", savedProfile.getName());
    }

    @Test
    public void testGetProfile() {
        Profile profile = new Profile(1L, "Test Business", "Business");
        when(profileRepository.findById(1L)).thenReturn(Optional.of(profile));

        Optional<Profile> retrievedProfile = profileService.getProfile(1L);

        assertTrue(retrievedProfile.isPresent());
        assertEquals("Test Business", retrievedProfile.get().getName());
    }
}
