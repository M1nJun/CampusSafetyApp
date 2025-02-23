package lawrence.interfaces;

import lawrence.dtos.ChatMessageDTO;
import lawrence.entities.ChatMessage;
import lawrence.entities.User;
import lawrence.repositories.ChatMessageRepository;
import lawrence.repositories.UserRepository;
import lawrence.securities.CampusSafetyUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping("/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/sendMessage")
    public ResponseEntity<String> sendMessage(Authentication authentication, @RequestBody ChatMessageDTO core) {
        // Get sender UUID from authentication
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID senderID = UUID.fromString(details.getUsername());

        // Find sender and receiver in the database
        Optional<User> sender = userRepository.findById(senderID);
        Optional<User> receiver = userRepository.findById(UUID.fromString(core.getReceiverID()));

        if (sender.isEmpty() || receiver.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid sender or receiver ID.");
        }

        // Create and save chat message
        ChatMessage chatMessage = new ChatMessage(core, sender.get(), receiver.get());
        chatMessageRepository.save(chatMessage);

        // Send message to the recipient's private queue
        messagingTemplate.convertAndSendToUser(
                core.getReceiverID(),
                "/queue/messages",
                new ChatMessageDTO(chatMessage)
        );

        return ResponseEntity.ok("Message sent successfully.");
    }

    @GetMapping("/history")
    @ResponseBody
    public ResponseEntity<List<ChatMessageDTO>> getChatHistory(Authentication authentication, @RequestParam String receiverID) {
        // Get sender UUID from authentication
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID senderID = UUID.fromString(details.getUsername());

        // Fetch users
        User sender = userRepository.findById(senderID).orElse(null);
        User receiver = userRepository.findById(UUID.fromString(receiverID)).orElse(null);

        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body(List.of());
        }

        List<ChatMessageDTO> chatHistory = chatMessageRepository.findChatHistory(sender, receiver);
        return ResponseEntity.ok(chatHistory);
    }
}
