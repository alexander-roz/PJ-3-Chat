package com.chat.controllers;

import com.chat.ChatApplication;
import com.chat.model.repositories.MessageEntityRepository;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController extends SpringBootServletInitializer {

    MessageEntityRepository messageEntityRepository;

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application)
    {
        return application.sources(ChatApplication.class);
    }

    @RequestMapping(value = "/")
    public String login(Model model)
    {
        return "login";
    }

    @RequestMapping(value = "/index")
    public String index(Model model){
//        if(messageEntityRepository.findAll().size() > 0){
//            ArrayList <MessageEntity> messages = new ArrayList<>(messageEntityRepository.findAll());
//            model.addAttribute("messages", messages);
//            model.addAttribute("messagesCount", messages.size());
//        }
        return "index";
    }
}
