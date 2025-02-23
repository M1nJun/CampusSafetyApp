package lawrence.dtos;

import java.time.LocalDateTime;
import lawrence.entities.ChatMessage;

public class ChatMessageDTO {
    private Integer chatMessageID;
    private String senderID; // UUID as a string
    private String receiverID;
    private String messageContent;
    private LocalDateTime messageTimestamp;

    public ChatMessageDTO() {
        this.messageTimestamp = LocalDateTime.now();
    }

    public ChatMessageDTO(ChatMessage core) {
        chatMessageID = core.getChatMessageID();
        senderID = core.getSender().getUserID().toString(); // Convert UUID to string
        receiverID = core.getReceiver().getUserID().toString();
        messageContent = core.getMessageContent();
        messageTimestamp = core.getMessageTimestamp();
    }

    // Getters and Setters
    public String getSenderID() { return senderID; }
    public void setSenderID(String senderID) { this.senderID = senderID; }

    public String getReceiverID() { return receiverID; }
    public void setReceiverID(String receiverID) { this.receiverID = receiverID; }

    public String getMessageContent() { return messageContent; }
    public void setMessageContent(String messageContent) { this.messageContent = messageContent; }

    public LocalDateTime getMessageTimestamp() { return messageTimestamp; }
    public void setMessageTimestamp(LocalDateTime messageTimestamp) { this.messageTimestamp = messageTimestamp; }
}

