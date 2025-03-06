package lawrence.config;

import lawrence.securities.JwtService;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Collections;
import java.util.List;

public class WebSocketAuthChannelInterceptor implements ChannelInterceptor {

    private final JwtService jwtService;

    public WebSocketAuthChannelInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            // Retrieve token from the CONNECT headers (if not already processed by the handshake)
            List<String> tokenList = accessor.getNativeHeader("token");
            String token = (tokenList != null && !tokenList.isEmpty()) ? tokenList.get(0) : null;
            if (token != null && jwtService.isValid(token)) {
                String subject = jwtService.getSubject(token);
                Authentication auth = new UsernamePasswordAuthenticationToken(subject, null, Collections.emptyList());
                accessor.setUser(auth);
            }
        }
        return message;
    }
}
