package br.com.projetoglace.security.permissões;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

public @interface CheckSecurity {

	public @interface Cliente {

		// DH01
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('DH01')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeEditar {
		}

		// DH02
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('DH02')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeConsultar {
		}	
	}
	
	
	public @interface Estado {

		// DH02
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('DH02')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface ListarEstados {
		}	
		
		// DH03
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('DH02')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface ListarCidadesPorEstado {
		}	
	}
	
}