package br.com.projetoglace.security.permissões;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

public @interface CheckSecurity {

	// Permissões Cliente
	public @interface Cliente {

		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('CG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeEditarPerfil {
		}

		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('CG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeExcluirPerfil {
		}	
		
	}
	
	// Permissões Parceiro
	public @interface Parceiro { 
		
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('PG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeEditarPerfil {
		}
					
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('PG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeExcluirPerfil {
		}	
		
	}
	
}