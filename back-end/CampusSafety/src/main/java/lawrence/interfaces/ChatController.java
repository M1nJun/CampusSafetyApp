package lawrence.interfaces;

import lawrence.dtos.ChatMessageDTO;
import lawrence.entities.ChatMessage;
import lawrence.entities.User;
import lawrence.repositories.ChatMessageRepository;
import lawrence.repositories.UserRepository;
import lawrence.securities.CampusSafetyUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import java.security.Principal;
import java.util.*;

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

    // ----- HTTP Endpoints -----

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

//        // Send message to the recipient's private queue
//        messagingTemplate.convertAndSendToUser(
//                core.getReceiverID(),
//                "/queue/messages",
//                new ChatMessageDTO(chatMessage)
//        );

        return ResponseEntity.ok("Message sent successfully.");
    }

    @GetMapping("/history")
    public ResponseEntity<Map<String, Object>> getChatHistory(Authentication authentication, @RequestParam String receiverID) {
        // Get sender UUID from authentication
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID senderID = UUID.fromString(details.getUsername());

        // Fetch users
        User sender = userRepository.findById(senderID).orElse(null);
        User receiver = userRepository.findById(UUID.fromString(receiverID)).orElse(null);

        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid sender or receiver ID."));
        }

        // Fetch messages (assuming your repository method returns a list of ChatMessageDTO)
        List<ChatMessageDTO> messages = chatMessageRepository.findChatHistory(sender, receiver);

        // Structure the response
        Map<String, Object> response = new HashMap<>();
        response.put("chatWith", receiver.getFirstname() + " " + receiver.getLastname());
        response.put("chatWithID", receiverID);
        response.put("myName", sender.getFirstname() + " " + sender.getLastname());
        response.put("myID", senderID.toString());
        response.put("messages", messages);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<Map<String, String>>> getAllConversations(Authentication authentication) {
        CampusSafetyUserDetails details = (CampusSafetyUserDetails) authentication.getPrincipal();
        UUID senderID = UUID.fromString(details.getUsername());

        // Find all unique users the sender has chatted with
        List<User> chatPartners = chatMessageRepository.findChatPartners(senderID);

        // Convert to a response format
        List<Map<String, String>> conversations = new ArrayList<>();
        for (User user : chatPartners) {
            Map<String, String> chatPartnerInfo = new HashMap<>();
            chatPartnerInfo.put("userID", user.getUserID().toString());
            chatPartnerInfo.put("username", user.getFirstname() + " " + user.getLastname());
            conversations.add(chatPartnerInfo);
        }

        return ResponseEntity.ok(conversations);
    }

    // ----- WebSocket Endpoint -----

    /**
     * Handles a real‑time chat message sent via WebSocket.
     * This method is mapped to /app/chat/{receiverId} (using your WebSocketConfig's /app prefix).
     */
//    @MessageMapping("/chat/{receiverId}")
//    public void sendPrivateMessageWs(@Payload ChatMessageDTO chatMessageDTO,
//                                     @DestinationVariable String receiverId,
//                                     Principal principal) {
//        // Retrieve sender information from the authenticated principal.
//        // Assuming the principal name is the sender's UUID as a string.
//        UUID senderID = UUID.fromString(principal.getName());
//
//        Optional<User> senderOpt = userRepository.findById(senderID);
//        Optional<User> receiverOpt = userRepository.findById(UUID.fromString(receiverId));
//
//        if (senderOpt.isEmpty() || receiverOpt.isEmpty()) {
//            // Optionally log the error or notify the sender
//            return;
//        }
//
//        User sender = senderOpt.get();
//        User receiver = receiverOpt.get();
//
//        // Update the DTO with the correct sender and receiver IDs
//        chatMessageDTO.setSenderID(senderID.toString());
//        chatMessageDTO.setReceiverID(receiverId);
//
//        // Create and persist the chat message using the entity constructor
//        ChatMessage chatMessage = new ChatMessage(chatMessageDTO, sender, receiver);
//        chatMessageRepository.save(chatMessage);
//
//        // Convert to DTO (with timestamp and messageID filled) and send to the recipient's queue
//        messagingTemplate.convertAndSendToUser(
//                receiverId,
//                "/queue/messages",
//                new ChatMessageDTO(chatMessage)
//        );
//    }
}
