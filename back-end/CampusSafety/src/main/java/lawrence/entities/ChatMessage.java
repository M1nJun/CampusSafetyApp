package lawrence.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lawrence.dtos.ChatMessageDTO;

@Entity
@Table(name = "ChatMessage")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chatMessageID;
    @ManyToOne
    @JoinColumn(name = "senderID")
    private User sender;
    @ManyToOne
    @JoinColumn(name = "receiverID")
    private User receiver;
    private String messageContent;
    private LocalDateTime messageTimestamp;

    public ChatMessage() {
        this.messageTimestamp = LocalDateTime.now();
    }

    public ChatMessage(ChatMessageDTO core, User sender, User receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.messageContent = core.getMessageContent();
        this.messageTimestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public Integer getChatMessageID() { return chatMessageID; }
    public void setChatMessageID(Integer chatMessageID) { this.chatMessageID = chatMessageID; }

    public User getSender() { return sender; }
    public void setSender(User sender) { this.sender = sender; }

    public User getReceiver() { return receiver; }
    public void setReceiver(User receiver) { this.receiver = receiver; }

    public String getMessageContent() { return messageContent; }
    public void setMessageContent(String messageContent) { this.messageContent = messageContent; }

    public LocalDateTime getMessageTimestamp() { return messageTimestamp; }
    public void setMessageTimestamp(LocalDateTime messageTimestamp) { this.messageTimestamp = messageTimestamp; }
}

