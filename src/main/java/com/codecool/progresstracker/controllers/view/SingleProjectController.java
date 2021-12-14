package com.codecool.progresstracker.controllers.view;

import com.codecool.progresstracker.model.Project;
import com.codecool.progresstracker.model.User;
import com.codecool.progresstracker.model.UserType;
import com.codecool.progresstracker.service.ProjectService;
import com.codecool.progresstracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpClientErrorException;

import java.util.UUID;

@Controller
public class SingleProjectController {
    private final UserService userService;
    private final ProjectService projectService;

    @Autowired
    public SingleProjectController(UserService userService, ProjectService projectService) {
        this.userService = userService;
        this.projectService = projectService;
    }

    @ResponseBody
    @GetMapping("/admin/project/{projectId}")
    public Project adminProjectPage(@PathVariable UUID projectId) throws Exception {
        Project project = projectService.getById(projectId);

        User user = userService.getLoggedInUser();
        UserType userType = user.getUserType();

        if (userType == UserType.ADMIN && project.getAdmins().contains(user)) {
            return project;
        } else {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED);
        }
    }

    @ResponseBody
    @GetMapping("/owner/project/{projectId}")
    public Project ownerProjectPage(@PathVariable UUID projectId) throws Exception {
        Project project = projectService.getById(projectId);

        User user = userService.getLoggedInUser();
        UserType userType = user.getUserType();

        if (userType == UserType.PROJECT_OWNER && project.getOwner().equals(user)){
            return project;
        } else {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED);
        }
    }
}
