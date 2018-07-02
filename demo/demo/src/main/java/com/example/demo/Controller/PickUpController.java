package com.example.demo.Controller;

import com.example.demo.Modal.*;
import com.example.demo.Service.PickUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PickUpController {

    @Autowired
    PickUpService pickUpService;

    @RequestMapping("/allPoints")
    public List<Point> pointController(){
        return pickUpService.pointService();
    }

    @CrossOrigin
//    @RequestMapping(name="/newUser", method = RequestMethod.POST)
    @PostMapping("/newUser")
    public Integer addingNewUser(@RequestBody UserInfoModel userInfoModel){
        return pickUpService.newUserService().addNewUser(userInfoModel);
    }


    @CrossOrigin
    @PostMapping("/login")
//    @RequestMapping(name="/login", method = RequestMethod.POST)
    public UserInfoModel loginCheck(@RequestBody LoginModel loginModel){
        return pickUpService.newUserService().checkLoginDao(loginModel);
    }

    @CrossOrigin
    @PostMapping("/addEvent")
    public MyEvents addingEvent(@RequestBody EventModal eventModal){
        return pickUpService.newUserService().addEvent(eventModal);
    }

    @CrossOrigin
    @PostMapping("/userEvents")
    public MyEvents myOwnEvents(@RequestBody UsernameModel usernameModel){
        return pickUpService.newUserService().myEventsOwn(usernameModel.getUsername());
    }

    @CrossOrigin
    @RequestMapping("/allEvents")
    public AllEventsModel allCurrentEvents(){
        return pickUpService.newUserService().allEvents();
    }

    @CrossOrigin
    @PostMapping("/attendEvent")
    public ArrayList<EventModal> addUserToEvent(@RequestBody UserAddAttending userAddAttending){
        System.out.println("Attend: " +userAddAttending.getUsername() + " " +userAddAttending.getId());
        return pickUpService.newUserService().addUserToEvent(userAddAttending.getUsername(), userAddAttending.getId());
    }

    @CrossOrigin
    @PostMapping("/cancelAttend")
    public ArrayList<EventModal> cancelAttendedEvent(@RequestBody UserAddAttending userAddAttending){
        return pickUpService.newUserService().cancelUserFromEvent(userAddAttending);
    }

    @CrossOrigin
    @PostMapping("/deleteEvent")
    public MyEvents deleteEvent(@RequestBody UserEventIdModal userEventIdModal){
        return pickUpService.newUserService().deleteEvent(userEventIdModal);
    }


}
