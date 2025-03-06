package lawrence.repositories;

import lawrence.entities.ChatMessage;
import lawrence.dtos.ChatMessageDTO;
import lawrence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    
    @Query("SELECT new lawrence.dtos.ChatMessageDTO(c) " +
           "FROM ChatMessage c WHERE (c.sender = ?1 AND c.receiver = ?2) " +
           "OR (c.sender = ?2 AND c.receiver = ?1) " +
           "ORDER BY c.messageTimestamp ASC")
    List<ChatMessageDTO> findChatHistory(User sender, User receiver);

    @Query("SELECT DISTINCT c.sender FROM ChatMessage c WHERE c.receiver.userID = :userID " +
            "UNION " +
            "SELECT DISTINCT c.receiver FROM ChatMessage c WHERE c.sender.userID = :userID")
    List<User> findChatPartners(@Param("userID") UUID userID);


}
