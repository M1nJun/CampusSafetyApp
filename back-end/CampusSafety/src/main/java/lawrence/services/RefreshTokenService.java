package lawrence.services;

import lawrence.entities.RefreshToken;
import lawrence.entities.User;
import lawrence.repositories.RefreshTokenRepository;
import lawrence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;
import java.time.Instant;

@Service
public class RefreshTokenService {

    RefreshTokenRepository refreshTokenRepository;

    UserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository rft,UserRepository ur) {
        this.refreshTokenRepository = rft;
        this.userRepository = ur;
    }

    public RefreshToken createRefreshToken(UUID userID) {
        // Fetch the user and handle the case where the user might not be found
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userID));

        // Calculate expiry for 3 months (in milliseconds)
//        long threeMonthsInMillis = 1000L * 60 * 60 * 24 * 90;
        long threeMonthsInMillis = 1000L * 30;


        // Create a new RefreshToken object
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user) // user is now not an Optional
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(threeMonthsInMillis)) // set expiry to 3 months
                .build();

        // Save and return the refresh token
        return refreshTokenRepository.save(refreshToken);
    }


    public Optional<RefreshToken> findByToken(String token){
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpiryDate().compareTo(Instant.now())<0){
            refreshTokenRepository.delete(token);
//            throw new RuntimeException(token.getToken() + " Refresh token is expired. Please make a new login..!");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token expired. Please login again.");
        }
        return token;
    }

}