package br.com.projetoglace.controller;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.controller.openapi.UsuarioADMGlaceControllerOpenApi;
import br.com.projetoglace.dto.UsuarioADMGlaceDTO;
import br.com.projetoglace.model.UsuarioADMGlace;
import br.com.projetoglace.request.UsuarioADMGlaceRequest;
import br.com.projetoglace.service.UsuarioADMGlaceService;


@CrossOrigin
@RestController
@RequestMapping ("/usuarioADM")
public class UsuarioADMGlaceController implements UsuarioADMGlaceControllerOpenApi {
	
	
	@Autowired
	private UsuarioADMGlaceService serviceUsuario;
	
		
	//USUARIO ADMINISTRATIVO
	@Override
	@PostMapping
	public ResponseEntity<?> salvarUsuario (@RequestBody UsuarioADMGlaceRequest usuarioAdmRequest) {
		try {
			UsuarioADMGlaceDTO usuarioDTO = serviceUsuario.salvarUsuario(usuarioAdmRequest);			
			return ResponseEntity.status(HttpStatus.CREATED).body(usuarioDTO);
		
		}catch(Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

	@Override
	@PutMapping("/{id}")
	public ResponseEntity<?> atualizarUsuario (@RequestBody UsuarioADMGlace usuario, @PathVariable Long id) {
		UsuarioADMGlace usuarioAtual = serviceUsuario.buscarUsuario(id).orElse(null);
		if (usuarioAtual != null) {
			BeanUtils.copyProperties(usuario, usuarioAtual, "id");
			serviceUsuario.atualizarUsuario(usuarioAtual);
			return ResponseEntity.ok(usuarioAtual);
		}	
		return ResponseEntity.notFound().build();
	}

	@Override
	public ResponseEntity<UsuarioADMGlace> excluirUsuario(@PathVariable Long id) {
		try {
			serviceUsuario.excluirUsuario(id);	
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
		
	}

	@Override
	@GetMapping ("/{id}")
	public ResponseEntity<UsuarioADMGlace> buscarUsuario(@PathVariable Long id) {
		Optional<UsuarioADMGlace> usuario = serviceUsuario.buscarUsuario(id);
		if (usuario.isPresent()) {
			return ResponseEntity.ok(usuario.get());
		}
		return ResponseEntity.notFound().build();
	}
	}
