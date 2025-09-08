package com.loanorigination.service;

import com.loanorigination.dto.LoginRequest;
import com.loanorigination.dto.LoginResponse;
import com.loanorigination.dto.RegisterRequest;
import com.loanorigination.entity.User;
import com.loanorigination.entity.Member;
import com.loanorigination.repository.UserRepository;
import com.loanorigination.repository.MemberRepository;
import com.loanorigination.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse registerCustomer(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setIsNewUser(true);

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), "CUSTOMER");
        return new LoginResponse(token, "CUSTOMER", user.getUsername(), user.getIsNewUser());
    }

    public LoginResponse loginCustomer(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUsername(), "CUSTOMER");
        return new LoginResponse(token, "CUSTOMER", user.getUsername(), user.getIsNewUser());
    }

    public LoginResponse loginMember(LoginRequest loginRequest) {
        Optional<Member> memberOptional = memberRepository.findByUsername(loginRequest.getUsername());
        if (memberOptional.isEmpty()) {
            throw new RuntimeException("Member not found");
        }

        Member member = memberOptional.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), member.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(member.getUsername(), member.getRole().getRoleName());
        return new LoginResponse(token, member.getRole().getRoleName(), member.getUsername(), false);
    }
}
