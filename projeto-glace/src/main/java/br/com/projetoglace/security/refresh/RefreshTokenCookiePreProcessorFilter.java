package br.com.projetoglace.security.refresh;

import java.io.IOException;
import java.util.stream.Stream;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RefreshTokenCookiePreProcessorFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	    throws IOException, ServletException {

	  HttpServletRequest req = (HttpServletRequest) request;

	  if ("/oauth/token".equalsIgnoreCase(req.getRequestURI())
	      && "refresh_token".equals(req.getParameter("grant_type"))
	      && req.getCookies() != null) {

	    String refreshToken = Stream.of(req.getCookies())
	            .filter(cookie -> "refreshToken".equals(cookie.getName()))
	            .findFirst()
	            .map(cookie -> cookie.getValue())
	            .orElse(null);

	    req = new MyServletRequestWrapper(req, refreshToken);
	  }

	  chain.doFilter(req, response);
	}
	
	@Override
	public void destroy() {
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}
	
	

}