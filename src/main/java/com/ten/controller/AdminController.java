package com.ten.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.ten.model.Role;
import com.ten.model.User;
import com.ten.service.RoleService;
import com.ten.service.UserService;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller("/admin")
public class AdminController {

    private final RoleService roleService;
    private final UserService userService;

    @Autowired
    public AdminController(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @GetMapping(value = {"/"})
    public String redirectToLoginPage() {
        return "redirect:/login";
    }

    @GetMapping(value = {"/login"})
    public String showLoginPage() {
        return "login";
    }

    @GetMapping("/admin")
    public String adminPage(Model model) {

        /*User user = new User();
        model.addAttribute("user", user);
        List<User> listUsers = userService.listUser();
        model.addAttribute("users", listUsers);   в обычном контроллере мы отдаем только пустую хтмл старницу*/

        return "admin";
    }

    @PostMapping(value = {"/admin"})//создание
    public String addUser(@RequestParam("login") String login, @RequestParam("password") String password,
                          @RequestParam(value = "role", required = false) String role) {
        User user = new User(login, password, true);
        user.setRoles(getRoles(role));
        userService.insertUser(user);
        return "redirect:/admin";
    }

    @GetMapping(value = {"/admin/edit/{id}"})
    public ModelAndView editUser(@PathVariable("id") Long id) {
        ModelAndView model = new ModelAndView("edit");
        model.addObject("user", userService.selectUser(id));
        return model;
    }

    @RequestMapping(value = "/doUpdate", method = RequestMethod.POST)
    String updateUser(@Valid  @ModelAttribute("user")User user, @ModelAttribute("role") Role role) {
        User user1 = userService.selectUser(user.getId());
        user1.setId(user.getId());
        user1.setLogin(user.getLogin());
        user1.setPassword(user.getPassword());
        //user1.setRoles(user.getRoles());
        user1.setRoles(getRoles(role.getName()));
        userService.insertUser(user1);
        return "redirect:/admin";
    }

    @GetMapping(value = "/admin/delete/{id}")
    public String deleteUser(Model model, @PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @GetMapping(value = {"/user"})
    public ModelAndView userPage() {
        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        String username = user.getName();
        ModelAndView model = new ModelAndView("user");
        model.addObject("user", user);
        return model;
    }

    @GetMapping(value = "/error")
    public String accessDenied() {
        return "error";
    }

    private Set<Role> getRoles(String role) {
        Set<Role> roles = new HashSet<>();

        switch (role) {
            case "admin":
                roles.add(roleService.getRoleById(1L));
                break;
            case "user":
                roles.add(roleService.getRoleById(2L));
                break;
            case "admin, user":
                roles.add(roleService.getRoleById(1L));
                roles.add(roleService.getRoleById(2L));
                break;
            default:
                roles.add(roleService.getRoleById(2L));
                break;
        }

        return roles;
    }
}


