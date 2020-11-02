package br.com.projetoglace.security.permissões;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

public @interface CheckSecurity {
	
	// Controle de acesso do controller UsuarioADMGlace
	public @interface UsuarioADM {
		
		// Permissão apenas de usuario administrativo
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('UG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeEditarPerfilAdm {
		}
		
		// Permissão apenas de usuario administrativo
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('UG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeVerPerfilAdm {
		}
		
		// Permissão apenas de usuario administrativo
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('UG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeExcluirPerfilAdm {
		}

	}

	// Controle de acesso do controller ClienteGlace
	public @interface Cliente {

		// Permissão de cliente e usuario administrativo
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('CG')" + "or hasAuthority('UG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeEditarPerfilCliente {
		}

		// Permissão de cliente e usuario administrativo
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('CG')" + "or hasAuthority('UG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeExcluirPerfilCliente {
		}	
		
	}
	
	// Controle de acesso do controller ParceiroGlace
	public @interface Parceiro { 
		
		// Permissão de parceiro e usuario administrativo
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('PG')" + "or hasAuthority('UG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeEditarPerfilParceiro {
		}
				
		// Permissão de parceiro e usuario administrativo
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('PG')" + "or hasAuthority('UG')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeExcluirPerfilParceiro {
		}	
		
	}
	
}