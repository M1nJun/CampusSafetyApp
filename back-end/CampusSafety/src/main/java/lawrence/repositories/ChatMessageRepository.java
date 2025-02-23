package lawrence.repositories;

import lawrence.entities.ChatMessage;
import lawrence.dtos.ChatMessageDTO;
import lawrence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    
    @Query("SELECT new lawrence.dtos.ChatMessageDTO(c) " +
           "FROM ChatMessage c WHERE (c.sender = ?1 AND c.receiver = ?2) " +
           "OR (c.sender = ?2 AND c.receiver = ?1) " +
           "ORDER BY c.messageTimestamp ASC")
    List<ChatMessageDTO> findChatHistory(User sender, User receiver);
}
