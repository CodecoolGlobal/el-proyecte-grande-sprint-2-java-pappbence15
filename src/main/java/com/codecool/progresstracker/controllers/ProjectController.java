package com.codecool.progresstracker.controllers;

import com.codecool.progresstracker.dao.ProjectDao;
import com.codecool.progresstracker.model.Project;
import com.codecool.progresstracker.service.RepeatingNotificationsService;
import com.codecool.progresstracker.model.User;
import com.codecool.progresstracker.model.UserType;
import com.codecool.progresstracker.service.notifications.DailyGoalDeadlineCheckService;
import com.codecool.progresstracker.service.ProjectService;
import com.codecool.progresstracker.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.util.List;

@Controller
public class ProjectController {
    private final UserService userService;
    private final ProjectService projectService;
    private final ProjectDao projectDao;

    @Autowired
    public ProjectController(UserService userService, ProjectService projectService, ProjectDao projectDao) {
        this.userService = userService;
        this.projectService = projectService;
        this.projectDao = projectDao;
    }

    @ResponseBody
    @GetMapping("/admin/projects")
    public ResponseEntity<?> adminProjectsView() throws ParseException {
        //RepeatingNotificationsService rep= new RepeatingNotificationsService(projectDao); //Working piece of art
        User user = userService.getLoggedInUser();
        UserType userType = user.getUserType();

        if(userType.equals(UserType.ADMIN)){
            return new ResponseEntity<>(projectService.getProjectsByAdmin(user), HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Unauthorized: you are not logged in as an admin", HttpStatus.UNAUTHORIZED);
        }
    }

    @ResponseBody
    @GetMapping("/owner/projects")
    public ResponseEntity<?> ownerProjectsView(){
        User user = userService.getLoggedInUser();
        UserType userType = user.getUserType();
        if(userType.equals(UserType.PROJECT_OWNER)){
            List<Project> projects = projectService.getProjectsByOwner(user);
            return new ResponseEntity<>(projects, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Unauthorized: you are not logged in as a project owner", HttpStatus.UNAUTHORIZED);        }
    }
}
