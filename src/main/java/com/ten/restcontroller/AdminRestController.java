package com.ten.restcontroller;

import com.ten.dto.UserDTO;
import com.ten.model.Role;
import com.ten.model.User;
import com.ten.service.RoleService;
import com.ten.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/rest")
public class AdminRestController {

    private final RoleService roleService;
    private final UserService userService;

    @Autowired
    public AdminRestController(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    /*@GetMapping(value = {"/"})
    public String redirectToLoginPage() {
        return "redirect:/login";
    }

    @GetMapping(value = {"/login"})
    public String showLoginPage() {
        return "login";
    }*/

    @GetMapping("/adminrest")
    public ResponseEntity<List<User>> getRestUsers() {
        //return new ResponseEntity<List<User>>(userService.listUser(), HttpStatus.OK);
        return ResponseEntity.ok(userService.listUser());
    }


//    @PostMapping(value = {"/admin"})//создание
//    public String addUser(@RequestParam("login") String login, @RequestParam("password") String password,
//                          @RequestParam(value = "role", required = false) String role) {
//        User user = new User(login, password, true);
//        user.setRoles(getRoles(role));
//        userService.insertUser(user);
//        return "redirect:/admin";
//    }


//    @PostMapping("/admin/create")
//    public ResponseEntity<Void> addUser(@RequestBody User user
//            ,  @RequestParam(value = "role", required = false) String role
//    ) {
//        //String role = null;
//        role = user.getRoles().iterator().next().getName();
//        user.setRoles(getRoles(role));
//        userService.insertUser(user);
//        return new ResponseEntity<Void>(HttpStatus.OK);//тут возращает на ерор педж
//    }

//    @PostMapping("/admin/create")
//    public ResponseEntity<Void> addUser(@RequestBody User user
//    ) {
//        //надо пыло понять что id приходит внутри юзера а не отедльно поэмту не рабоатл реквестпарам приходил налл
//        Long id = user.getId();
//        User newuser = new User(user.getLogin(), user.getPassword(), true );
//        newuser.setRoles((getRolesbyID(id)));
//        userService.insertUser(newuser);
//        return new ResponseEntity<Void>(HttpStatus.OK);//тут возращает на ерор педж Это послженее что работало
//    }


    @PostMapping("/admin/create")
    public void postAdd(@RequestBody UserDTO userDTO) {
        User newUser = new User();
        newUser.setLogin(userDTO.getLogin());
        newUser.setPassword(userDTO.getPassword());
        newUser.setRoles(getRolesbyID(userDTO.getRole()));
        userService.insertUser(newUser);
    }

    private Set<Role> getRolesbyID(Long id) {
        return roleService.getRolesbyID(id);

    }

    @PostMapping(value = {"/doUpdate"})
    ResponseEntity<Void> updateUser(@RequestBody UserDTO userDTO) {
        Long id = userDTO.getRole();
        User updatedUser = userService.selectUser(userDTO.getId());//не работаеть юзер гет айди продебжаить в зхроме почему гет айди идет по другим юзерам тоже
        updatedUser.setId(userDTO.getId());
        updatedUser.setLogin(userDTO.getLogin());
        updatedUser.setPassword(userDTO.getPassword());
        //Long[] role = user.getRoles();
        updatedUser.setRoles((getRolesbyID(id)));//тут приходит роль налл
        userService.insertUser(updatedUser);
        return new ResponseEntity<Void>(HttpStatus.OK);
        //return "redirect:/admin";
    }






//    @PostMapping(value = {"/doUpdate"})
//    ResponseEntity<Void> updateUser(@RequestBody User user) {
//        Long id = user.getRole();
//        User user1 = userService.selectUser(user.getId());//не работаеть юзер гет айди продебжаить в зхроме почему гет айди идет по другим юзерам тоже
//        user1.setId(user.getId());
//        user1.setLogin(user.getLogin());
//        user1.setPassword(user.getPassword());
//        //Long[] role = user.getRoles();
//        user1.setRoles((getRolesbyID(id)));//тут приходит роль налл
//        userService.insertUser(user1);
//        return new ResponseEntity<Void>(HttpStatus.OK);
//        //return "redirect:/admin";
//    }


//    @PostMapping(value = {"/doUpdate"})
//    ResponseEntity<Void> updateUser(@RequestBody User user) {
//
//
//        User user1 = userService.selectUser(user.getId());//не работаеть юзер гет айди продебжаить в зхроме почему гет айди идет по другим юзерам тоже
//        user1.setId(user.getId());
//        user1.setLogin(user.getLogin());
//        user1.setPassword(user.getPassword());
//
//        //String rolenew = String.valueOf(user.getRolesg());
//        Set<Role> roles = getRolesg(rolenew);
//        //role = user.getRoles().iterator().next().getName();
//        user.setRoles(getRolesg(rolenew));//тут приходит роль налл
//        userService.insertUser(user1);
//        return new ResponseEntity<Void>(HttpStatus.OK);
//        //return "redirect:/admin";
//    }





//    @PostMapping("/admin/create")
//    public ResponseEntity<Void> addUser(@RequestBody User user
//            ,  @RequestParam(value = "role", required = false) Role role
//    ) {
//        //String role = null;
//        //role = user.getRoles().iterator().next().getName();
//        user.setRoles(getRoles(role.getName()));
//        userService.insertUser(user);
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }


    @GetMapping(value = {"/admin/edit/{id}"})
    public ResponseEntity<User> editUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.selectUser(id));
    }





    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = {"/user"})
    public ModelAndView userPage() {
        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        String username = user.getName();
        ModelAndView model = new ModelAndView("user");
        model.addObject("user", user);
        return model;
    }



    private Set<Role> getRolesg(String role) {
        Set<Role> roles = new HashSet<>();
        switch (role) {
            case "admin":
                roles.add(roleService.getRoleById(1L));
                break;
            case "user":
                roles.add(roleService.getRoleById(2L));//вместо рольсервис будет юезер
                break;
            default:
                roles.add(roleService.getRoleById(2L));
                break;
        }
        return roles;
    }



    @GetMapping(value = "/error")
    public String accessDenied() {
        return "error";
    }
}


