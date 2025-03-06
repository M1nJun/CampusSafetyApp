package lawrence.config;

import lawrence.securities.JwtService;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Collections;
import java.util.Map;

public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;

    public JwtHandshakeInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // Extract token from query parameters (e.g., ws://server/ws?token=XYZ)
        String query = request.getURI().getQuery();
        String token = null;
        if (query != null && query.contains("token=")) {
            // Simple extraction; in production, handle edge cases and multiple parameters.
            token = query.split("token=")[1].split("&")[0];
        }

        if (token != null && jwtService.isValid(token)) {
            // Get the subject from the token and create an Authentication object.
            String subject = jwtService.getSubject(token);
            Authentication auth = new UsernamePasswordAuthenticationToken(subject, null, Collections.emptyList());
            attributes.put("user", auth);
            return true;
        }
        // Reject handshake if token is missing or invalid.
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        // No post-handshake action required.
    }
}
