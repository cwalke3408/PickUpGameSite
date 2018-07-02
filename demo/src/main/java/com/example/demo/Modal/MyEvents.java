package com.example.demo.Modal;

import java.util.ArrayList;
import java.util.List;

public class MyEvents {

    private EventModal[] events;
    private List<EventModal> AttendingEvents = new ArrayList<>();
    private List<EventModal> OwnEvents;

    public MyEvents() {
    }

    public EventModal[] getEvents() {
        return events;
    }

    public void setEvents(EventModal[] events) {
        this.events = events;
    }

    public List<EventModal> getAttendingEvents() {
        return AttendingEvents;
    }

    public void setAttendingEvents(ArrayList<EventModal> attendingEvents) {
        AttendingEvents = attendingEvents;
    }

    public List<EventModal> getOwnEvents() {
        return OwnEvents;
    }

    public void setOwnEvents(List<EventModal> ownEvents) {
        OwnEvents = ownEvents;
    }

    public void  addEventToAttending(EventModal eventModal){
        this.AttendingEvents.add(eventModal);
    }
}
