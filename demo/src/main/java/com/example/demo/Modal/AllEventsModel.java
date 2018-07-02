package com.example.demo.Modal;

import java.util.List;

public class AllEventsModel {

    private List<EventModal> allEvents;

    public AllEventsModel() {
    }

    public List<EventModal> getAllEvents() {
        return allEvents;
    }

    public void setAllEvents(List<EventModal> allEvents) {
        this.allEvents = allEvents;
    }
}
