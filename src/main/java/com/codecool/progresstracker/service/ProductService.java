package com.codecool.progresstracker.service;

import com.codecool.progresstracker.dao.ProductDao;
import com.codecool.progresstracker.dao.UserDao;
import com.codecool.progresstracker.model.Product;
import com.codecool.progresstracker.model.User;
import com.codecool.progresstracker.model.UserStory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductDao productDao;
    private final UserDao userDao;
    private final UserService userService;

    @Autowired
    public ProductService(ProductDao productDao, UserDao userDao, UserService userService) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.userService = userService;
        addAProductWithTestUserAsAdmin();
    }


    public void addAProductWithTestUserAsAdmin(){
        User user = userService.getTestAdmin();
        List<User> adminList = new ArrayList<>();
        adminList.add(user);
        Product product = new Product("Building a house on Firefly Lane", null, adminList);
        productDao.add(product);
    }

    public List<Product> getProductsByAdmin(User admin){
        return productDao.getProductsByAdmin(admin);
    }

    public void updateUserStory(UserStory newUserStory, UUID userStoryId, UUID productId) throws Exception {
        Product pr = productDao.find(productId);
        List<UserStory> userStories = pr.getUserStories();
        UserStory us;
        for (UserStory userStory: userStories) {
            if(userStory.getId().equals(userStoryId)){
                us = userStory;
            }
        }
        us = newUserStory;
    }

    public void addNewUserStory(UserStory userStory, Product product) throws Exception {
        productDao.find(product.getId()).addNewUserStory(userStory);
    }
}