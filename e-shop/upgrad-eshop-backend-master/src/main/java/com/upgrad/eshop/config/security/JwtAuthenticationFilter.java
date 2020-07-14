package com.upgrad.eshop.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {


     static final String TOKEN_PREFIX = "Bearer ";
     static final String HEADER_STRING = "Authorization";


    @Autowired
    @Qualifier("UpgradUserDetailsService")
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        String username = null;
        String authToken = null;

        if (isTokenAttributeSetIn(header)) {
            authToken = getAuthTokenFromHeader(header);
            username = getUserNameFromToken(authToken);
        }

        if (isSecurityContextAuthenticationNotPresent(username))
            setSecurityContextAuthenticationIn(req, username, authToken);

        chain.doFilter(req, res);
    }

    private String getAuthTokenFromHeader(String header) {
        return header.replace(TOKEN_PREFIX,"");
    }

    private String getUserNameFromToken(String authToken) throws ServletException {

        try {
            return tokenProvider.getUsernameFromToken(authToken);
        } catch (Throwable e) {
            logger.error(e.getMessage(), e);
            throw new ServletException(e.getMessage());
        }

    }

    private boolean isTokenAttributeSetIn(String header) {
        return header != null && header.startsWith(TOKEN_PREFIX);
    }

    private void setSecurityContextAuthenticationIn(HttpServletRequest req, String username, String authToken) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (tokenProvider.validateToken(authToken, userDetails)) {
            UsernamePasswordAuthenticationToken authentication = tokenProvider.getAuthentication(authToken, SecurityContextHolder.getContext().getAuthentication(), userDetails);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
            logger.info("authenticated user " + username + ", setting security context");
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    private boolean isSecurityContextAuthenticationNotPresent(String username) {
        return username != null && SecurityContextHolder.getContext().getAuthentication() == null;
    }
}