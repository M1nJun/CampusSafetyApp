package lawrence.dtos;

import lawrence.entities.Request;

import java.time.LocalDateTime;

public class RequestDTO {
    private int requestID;
    private String requester;
    private String receiver;
    private String receiverName;
    private LocalDateTime requestDate;
    private LocalDateTime lastModifiedDate;
    private String requestType;
    private String requestSubject;
    private String location;
    private String destination;
    private String message;
    private String requestStatus;
    private String cancellationDetails;
    private Boolean reserved;
    private LocalDateTime reservationDue;

    public RequestDTO() {}

    public RequestDTO(Request core) {
        requestID = core.getRequestID().intValue();
        requester = core.getRequester().getUserID().toString();
        receiver = (core.getReceiver() != null) ? core.getReceiver().getUserID().toString() : null;
        receiverName = (core.getReceiverName() != null) ? core.getReceiverName() : null;
        requestDate = core.getRequestDate();
        lastModifiedDate = core.getLastModifiedDate();
        requestType = core.getRequestType();
        requestSubject = core.getRequestSubject();
        message = core.getMessage();
        location = core.getLocation();
        destination = core.getDestination();
        requestStatus = core.getRequestStatus();
        cancellationDetails = core.getCancellationDetails();
        reserved = core.getReserved();
        reservationDue = core.getReservationDue();
    }

    public int getRequestID() {
        return requestID;
    }

    public void setRequestID(int requestID) {
        this.requestID = requestID;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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