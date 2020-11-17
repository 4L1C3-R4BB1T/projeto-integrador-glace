package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.controller.openapi.ClienteGlaceControllerOpenApi;
import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.request.ClienteGlaceRequest;
import br.com.projetoglace.security.permissões.CheckSecurity;
import br.com.projetoglace.security.permissões.GlaceSecurity;
import br.com.projetoglace.service.ClienteGlaceService;

@CrossOrigin
@RestController
@RequestMapping ("/cliente")
public class ClienteGlaceController implements ClienteGlaceControllerOpenApi {

	@Autowired
	private ClienteGlaceService service;
	
	@Autowired 
	private GlaceSecurity glaceSecurity;
		
	@Override
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> salvarCliente(@RequestBody ClienteGlaceRequest clienteGlaceRequest) {	
		try {
			
			ClienteGlaceDTO clienteGlaceDTO = service.salvarCliente(clienteGlaceRequest);			
			return ResponseEntity.status(HttpStatus.CREATED).body(clienteGlaceDTO);
		
		}catch(Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}		
	}
		
	@Override
	@GetMapping
	public List<ClienteGlaceDTO> listarCliente(){
		return service.listarCliente();
	}

	
	@Override
	@GetMapping("/{id}")
	public ResponseEntity<ClienteGlace> buscarCliente(@PathVariable Long id) {
		Optional<ClienteGlace> cliente = service.buscarCliente(id);
		if (cliente.isPresent()) {
			return ResponseEntity.ok(cliente.get());
		}
		return ResponseEntity.notFound().build();
	}
		
	@GetMapping("/usuarioAdm")
	public ResponseEntity<ClienteGlace> buscarPorIdnoToken() {
		
		Long id = glaceSecurity.getUsuarioId();
		Optional<ClienteGlace> cliente = service.buscarCliente(id);
		if (cliente.isPresent()) {
			return ResponseEntity.ok(cliente.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@CheckSecurity.Cliente.PodeExcluirPerfilCliente
	@Override
	@DeleteMapping("/{id}")
	public ResponseEntity<ClienteGlace> excluirCliente(@PathVariable Long id) {
		try {
			service.excluirCliente(id);	
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
		
	@CheckSecurity.Cliente.PodeEditarPerfilCliente
	@Override
	@PutMapping("/{id}")
	public ResponseEntity<?> atualizarCliente(@RequestBody ClienteGlace cliente, @PathVariable Long id) {
		ClienteGlace clienteAtual = service.buscarCliente(id).orElse(null);
		if (clienteAtual != null) {
			BeanUtils.copyProperties(cliente, clienteAtual, "id");
			service.atualizarCliente(clienteAtual);
			return ResponseEntity.ok(clienteAtual);
		}	
		return ResponseEntity.notFound().build();
	}

}
