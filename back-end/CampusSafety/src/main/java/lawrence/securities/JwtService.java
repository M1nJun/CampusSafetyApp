package lawrence.securities;

import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;

/**
 * We use the jjwt library to create JWTs.
 *
 * More information about this library is available at
 * https://github.com/jwtk/jjwt
 */

@Service
public class JwtService {

    String secret = "MyNameIsMinJunLeeAndThisIsTheCampusSafetyApp0407!";
    SecretKey key = new SecretKeySpec(secret.getBytes(), "HmacSHA256");

    public boolean isValid(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getExpiration()
                    .after(new Date(System.currentTimeMillis()));
        } catch (Exception ex) {

        }
        return false;
    }

    public String getSubject(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String makeJwt(String userid) {
        return Jwts.builder()
                .subject(userid)
                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60))
                .signWith(key)
                .compact();
    }

}