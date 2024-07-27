package lawrence.dtos;

import lawrence.entities.Request;

import java.time.LocalDateTime;

public class RequestDTO {
    private int requestID;
    private String requester;
    private String receiver;
    private LocalDateTime requestDate;
    private LocalDateTime lastModifiedDate;
    private String requestType;
    private String requestTitle;
    private String comment;
    private String requestStatus;
    private Boolean reserved;
    private LocalDateTime reservationDue;

    public RequestDTO() {}

    public RequestDTO(Request core) {
        requestID = core.getRequestID().intValue();
        requester = core.getRequester().getUserID().toString();
        receiver = core.getReceiver().getUserID().toString();
        requestDate = core.getRequestDate();
        lastModifiedDate = core.getLastModifiedDate();
        requestType = core.getRequestType();
        requestTitle = core.getRequestTitle();
        comment = core.getComment();
        requestStatus = core.getRequestStatus();
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }

    public String getRequestTitle() {
        return requestTitle;
    }

    public void setRequestTitle(String requestTitle) {
        this.requestTitle = requestTitle;
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
}