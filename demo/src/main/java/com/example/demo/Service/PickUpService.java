package com.example.demo.Service;

import com.example.demo.Dao.PickUpDao;
import com.example.demo.Modal.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PickUpService {

    @Autowired
    PickUpDao pickUpDao;

    public List<Point> pointService(){
        return pickUpDao.getAPoint();
    }

    public PickUpDao newUserService(){
        return pickUpDao;
    }
}
