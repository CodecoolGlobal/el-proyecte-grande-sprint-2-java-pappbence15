package com.codecool.progresstracker.controllers.view;

import com.codecool.progresstracker.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class SketchyViewController {

    @GetMapping("/projectSketchyFeed")
    public String productPage(@RequestBody User user){
        return null;
    }
}
