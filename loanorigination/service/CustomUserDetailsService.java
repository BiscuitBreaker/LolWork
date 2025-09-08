package com.loanorigination.service;

import com.loanorigination.entity.User;
import com.loanorigination.entity.Member;
import com.loanorigination.repository.UserRepository;
import com.loanorigination.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // First check if it's a customer
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getUsername())
                    .password(user.getPasswordHash())
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_CUSTOMER")))
                    .build();
        }

        // Then check if it's a member (maker/checker)
        Optional<Member> memberOptional = memberRepository.findByUsername(username);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            String roleName = "ROLE_" + member.getRole().getRoleName().toUpperCase();
            return org.springframework.security.core.userdetails.User.builder()
                    .username(member.getUsername())
                    .password(member.getPasswordHash())
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority(roleName)))
                    .build();
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
