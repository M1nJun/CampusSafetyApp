package lawrence.entities;

import jakarta.persistence.*;
import lawrence.dtos.RequestDTO;
import lawrence.entities.User;
import lawrence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

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
    private String receiverName;
    private LocalDateTime requestDate;
    private LocalDateTime lastModifiedDate;
    private String requestType;
    private String requestSubject;
    private String location;
    private String destination;
    private String message;
    private String requestStatus;
    private Boolean reserved;
    private LocalDateTime reservationDue;


    public Request() {}

    public Request(RequestDTO core) {
        receiverName = core.getReceiverName();
        requestDate = LocalDateTime.now();
        lastModifiedDate = this.requestDate;
        requestType = core.getRequestType();
        requestSubject = core.getRequestSubject();
        location = core.getLocation();
        destination = core.getDestination();
        message = core.getMessage();
        requestStatus = "pending";
        reserved = core.getReserved();
        reservationDue = core.getReservationDue();
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

    public void completeRequest() {
        this.requestStatus = "completed";
        this.lastModifiedDate = LocalDateTime.now();
    }

    public void cancelRequest() {
        this.requestStatus = "canceled";
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

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public String getRequestSubject() {
        return requestSubject;
    }

    public void setRequestSubject(String requestSubject) {
        this.requestSubject = requestSubject;
    }

    public Boolean getReserved() {
        return reserved;
    }

    public void setReserved(Boolean reserved) {
        this.reserved = reserved;
    }

    public LocalDateTime getReservationDue() {
        return reservationDue;
    }

    public void setReservationDue(LocalDateTime reservationDue) {
        this.reservationDue = reservationDue;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
