package com.example.demo.Dao;

import com.example.demo.Modal.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PickUpDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Point> getAPoint(){
        String SQL = "Select * FROM point";
        return jdbcTemplate.query(SQL, new BeanPropertyRowMapper<>(Point.class));
    }

    public Integer addNewUser(UserInfoModel userModel){
        String sqlSelect = "SELECT 1 FROM usermaster WHERE username = '"+ userModel.getUsername()+ "'";
        String checkEmail = "SELECT 2 FROM usermaster WHERE email = '"+ userModel.getEmail()+"'";

        List<CheckUserModel> m = jdbcTemplate.query(sqlSelect, new BeanPropertyRowMapper<>(CheckUserModel.class));
        List<CheckUserModel> n = jdbcTemplate.query(checkEmail, new BeanPropertyRowMapper<>(CheckUserModel.class));

        System.out.println("m: "+m.size() + " n: " + n.size());

        // Check if username and/or email already Exist in the database
        if(m.size() > 0 && n.size() > 0) {
            System.out.println("Username and Email already exist");
            return 3;
        }else if(m.size() > 0) {
            System.out.println("UserName already exist");
            return 1;
        } else if(n.size() > 0) {
            System.out.println("Email already exist");
            return 2;
        }

        System.out.println("Dao: "+ userModel.getUsername()+ " " +userModel.getPassword() + " "+ userModel.getEmail());
        String SQL = "INSERT into usermaster values(?,?,?,?,?,?)";
        jdbcTemplate.update(SQL,userModel.getId(), userModel.getUsername(), userModel.getPassword(), userModel.getUserdescription(), userModel.getPhotolink(), userModel.getEmail());

        return 0;
    }

    public UserInfoModel checkLoginDao(LoginModel loginModel){

        // SELECT id FROM usermaster WHERE username = 'abc' AND password = '123'
        String sql = "SELECT * FROM usermaster WHERE username = '"+ loginModel.getUsername()+ "' AND password = '" + loginModel.getPassword()+ "'";
        List<UserInfoModel> m = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserInfoModel.class));

        // Return 1 (VALID credentials)  Return 0 (INVALID credentials)
        if(m.size() == 1){
            return m.get(0);
        } else if(m.size() == 0){
            return null;
        }

        return null;

    }

    public Integer getUserId(String username){
        String sql = "SELECT id FROM usermaster WHERE username = '" +username+ "'";
        List<CheckUserModel> m = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(CheckUserModel.class));
        if (m.size() > 0) return m.get(0).getId();
        return -1;
    }


    public MyEvents addEvent(EventModal eventList){
        String sql = "INSERT INTO events values(?,?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql, eventList.getId(), eventList.getTitle(), eventList.getTimedate(), eventList.getDate(), eventList.getLocation(), eventList.getLat(), eventList.getLng(), eventList.getDescription(), eventList.getAuthor(), eventList.getCount());
        return myEventsOwn(eventList.getAuthor());

//        KeyHolder keyHolder = new GeneratedKeyHolder();
//        System.out.println(keyHolder.getKey());
//        int key = jdbcTemplate.update(
//                //sql, eventList.getId(), eventList.getTitle(), eventList.getTimedate(), eventList.getDate(), eventList.getLocation(), eventList.getLat(), eventList.getLng(), eventList.getDescription(), eventList.getAuthor(), eventList.getCount());
//                new PreparedStatementCreator() {
//                    @Override
//                    public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
//                        PreparedStatement ps = connection.prepareStatement(sql, new String[] {"id"});
//                        System.out.println(Statement.RETURN_GENERATED_KEYS);
//                        ps.setInt(1, Statement.RETURN_GENERATED_KEYS);
//                        ps.setString(2, eventList.getTitle());
//                        ps.setString(3, eventList.getTimedate());
//                        ps.setString(4, eventList.getDate());
//                        ps.setString(5, eventList.getLocation());
//                        ps.setString(6, eventList.getLat());
//                        ps.setString(7, eventList.getLng());
//                        ps.setString(8, eventList.getDescription());
//                        ps.setString(9, eventList.getAuthor());
//                        ps.setInt(10, eventList.getCount());
//
//                        return ps;
//                    }
//                },
//                keyHolder
//        );
//        System.out.println(keyHolder.getKey());
//        System.out.println(key);
//        return 1;
        //        SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
//
//        Integer userId = getUserId(eventList.getAuthor());
//        System.out.println("UserId: " + userId);
//
//        addAttending(new AttendingModal(userId, 1, eventList.getAuthor()));
    }

    public MyEvents myEventsOwn(String author){
        MyEvents userEvents = new MyEvents();

        String sql = "SELECT * FROM events WHERE author='"+author+"'";
        userEvents.setOwnEvents(jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EventModal.class)));

        int userId = getUserId(author);
        userEvents.setAttendingEvents(myEventsAttending(userId));

//        String sql2 = "SELECT * FROM attending WHERE user_id = '" + userId +"'";
//        List<AttendingModal> n = jdbcTemplate.query(sql2, new BeanPropertyRowMapper<>(AttendingModal.class));
//        for(int i=0; i < n.size(); i++){
//            String sql3 = "SELECT * FROM events WHERE id = '" + n.get(i).getEvent_id()+ "'";
//            List<EventModal> userAttendingEvents = jdbcTemplate.query(sql3, new BeanPropertyRowMapper<>(EventModal.class));
//            userEvents.addEventToAttending(userAttendingEvents.get(0));
//        }

        return userEvents;
    }

    public ArrayList<EventModal> myEventsAttending(Integer userId){
        ArrayList<EventModal> whatUserAttending = new ArrayList<>();

        String sql2 = "SELECT * FROM attending WHERE user_id = '" + userId +"'";
        List<AttendingModal> n = jdbcTemplate.query(sql2, new BeanPropertyRowMapper<>(AttendingModal.class));
        for(int i=0; i < n.size(); i++){
            String sql3 = "SELECT * FROM events WHERE id = '" + n.get(i).getEvent_id()+ "'";
            List<EventModal> userAttendingEvents = jdbcTemplate.query(sql3, new BeanPropertyRowMapper<>(EventModal.class));
            whatUserAttending.add(userAttendingEvents.get(0));
        }

        return whatUserAttending;
    }

    public AllEventsModel allEvents(){
        AllEventsModel events = new AllEventsModel();
        String sql = "SELECT * FROM events";
        events.setAllEvents(jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EventModal.class)));

        return events;
    }

    public ArrayList<EventModal> addUserToEvent(String username, Integer event_id){
        // Search for userID
        int userId = getUserId(username);
        // Check Attending
        if(userId != -1 && !checkAlreadyAttending(userId, event_id)) {
            // Place in Attending if not in there/
            AttendingModal userCanAttend = new AttendingModal(userId, event_id);
            addAttending(userCanAttend);
            System.out.println("TRUE");
            return myEventsAttending(userId);
        }
        System.out.println("FALSE");

        return null;
    }

    // Return True User is already Attending an event
    public boolean checkAlreadyAttending(Integer user_id, Integer event_id){
        String sql = "SELECT * FROM attending WHERE user_id = '" +user_id+ "' AND event_id= '" +event_id+ "'";
        List<AttendingModal> m = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AttendingModal.class));
        if(m.size() > 0) return true;
        return false;
    }

    public void addAttending(AttendingModal attendingModal){
        String sql = "INSERT INTO attending values(?,?,?)";
        jdbcTemplate.update(sql, attendingModal.getUser_id(), attendingModal.getEvent_id(), attendingModal.getAuthor());
    }

    public ArrayList<EventModal> cancelUserFromEvent(UserAddAttending userAddAttending){
        int userID = getUserId(userAddAttending.getUsername());
        String sql = "DELETE from attending WHERE user_id= '" + userID +"' AND event_id = '" +userAddAttending.getId()+ "'";
        jdbcTemplate.update(sql);
        return myEventsAttending(userID);
    }

    public MyEvents deleteEvent(UserEventIdModal userEventIdModal){
        // Delete users from attending
        String sql = "DELETE from attending where event_id = ?";
        jdbcTemplate.update(sql, userEventIdModal.getId());
        // Delete event from event table
        String sql1 = "DELETE from events where id = ?";
        jdbcTemplate.update(sql1, userEventIdModal.getId());

        return myEventsOwn(userEventIdModal.getUsername());
    }
}

