package com.codecool.progresstracker.service;

import com.codecool.progresstracker.dao.ProjectDao;
import com.codecool.progresstracker.service.notifications.DailyGoalDeadlineCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;

@Component
@EnableScheduling
public class RepeatingNotificationsService {
    private final ProjectDao projectDao;

    @Autowired
    public RepeatingNotificationsService(ProjectDao projectDao){
        this.projectDao = projectDao;
    }

    @Scheduled(cron = "0 0 8 * * *", zone ="Europe/Budapest")//repeats every day at 0800
    public void scheduleFixedRateTask() throws ParseException {
        DailyGoalDeadlineCheckService dailyNotificationService = new DailyGoalDeadlineCheckService(projectDao);
        dailyNotificationService.sendOverDueNotifications();
        System.out.println("scheduled emails sent");
    }
}
