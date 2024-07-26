package lawrence.entities;

import jakarta.persistence.*;
import lawrence.dtos.RequestDTO;
import lawrence.entities.User;

import java.time.LocalDateTime;

@Entity
@Table(name="requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestID;
    @ManyToOne
    @JoinColumn(name="requesterID")
    private User requester;
    @ManyToOne
    @JoinColumn(name="receiverID")
    private User receiver;
    private LocalDateTime requestDate;
    private LocalDateTime lastModifiedDate;
    private String requestType;
    private String requestTitle;
    private String comment;
    private String requestStatus;

    public Request() {}

    public Request(RequestDTO core) {
        requestDate = LocalDateTime.now();
        lastModifiedDate = this.requestDate;
        requestType = core.getRequestType();
        comment = core.getComment();
        requestStatus = core.getRequestStatus();
    }

    @PrePersist
    protected void onCreate() {
        this.requestDate = LocalDateTime.now();
        this.lastModifiedDate = this.requestDate;
    }

    @PreUpdate
    protected void onUpdate() {
        this.lastModifiedDate = LocalDateTime.now();
    }

    // method to update the request status

    public void acceptRequest() {
        this.requestStatus = "accepted";
        this.lastModifiedDate = LocalDateTime.now();
    }

    public Integer getRequestID() {
        return requestID;
    }

    public void setRequestID(Integer requestID) {
        this.requestID = requestID;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }
}
