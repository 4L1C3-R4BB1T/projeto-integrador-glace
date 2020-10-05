package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.dto.ClienteGlaceResumoDTO;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.request.ClienteGlaceRequest;
import br.com.projetoglace.service.ClienteGlaceService;

@CrossOrigin
@RestController
@RequestMapping ("/cliente")
public class ClienteGlaceController {

		@Autowired
		private ClienteGlaceService service;
		
		@PostMapping
		public ResponseEntity<?> salvar(@RequestBody @Valid ClienteGlaceRequest clienteRequest) {	
			try {
				
				ClienteGlaceDTO clienteDTO = service.salvar(clienteRequest);			
				return ResponseEntity.status(HttpStatus.CREATED).body(clienteDTO);
			
			}catch(Exception ex) {
				return ResponseEntity.badRequest().body(ex.getMessage());
			}		
		}
		
		@GetMapping("/resumo")
		public List<ClienteGlaceResumoDTO> listarResumo(){
			return service.listarResumo();
		}
		
		@GetMapping
		public List<ClienteGlaceDTO> listar(){
			return service.listar();
		}
	//	
//		@GetMapping("/sobrenome/{sobrenome}")
//		public List<ClienteGlace> retornar(@PathVariable String sobrenome){
//			
//			return repository.findBySobrenome(sobrenome);
//		}
	//	
////		@GetMapping("/nome/{nome}")
////		public List<ClienteGlace> trazerPeloNome(@PathVariable String nome){
////			return repository.buscarPorNome(nome);
////		}
	//	
////		@GetMapping("/nome/{nome}")
////		public List<ClienteGlace> trazerPeloNome(@PathVariable String nome){
////			return repository.findByNome(nome);
////		}
	//	
////		@GetMapping("/date")
////		public List<ClienteGlace> trazerMaiores(){
	////	
////		    LocalDate data = LocalDate.now().plusYears(-18);
////		    return repository.buscarMaiores(data);
////		}
	//	
		@GetMapping("/{id}")
		public ResponseEntity<ClienteGlace> buscar(@PathVariable Long id) {
			
			Optional<ClienteGlace> cliente = service.buscar(id);
			
			if (cliente.isPresent()) {
				return ResponseEntity.ok(cliente.get());
			}
			
			return ResponseEntity.notFound().build();
		
		}
		
		
//		@GetMapping("/{id}/telefones")
//		public List<Telefone> buscarTelefones(@PathVariable Long id) {
//			return service.buscarTelefones(id);
//		}
		
		@DeleteMapping("/{id}")
		public ResponseEntity<ClienteGlace> excluir(@PathVariable Long id) {
			try {
				service.excluir(id);	
				return ResponseEntity.noContent().build();
				
			} catch (Exception e) {
				return ResponseEntity.notFound().build();
			}
				
//			} catch (Exception e) {
//				return ResponseEntity.status(HttpStatus.CONFLICT).build();
//			}
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<?> atualizar(@RequestBody @Valid ClienteGlace cliente, @PathVariable Long id) {
			
			ClienteGlace clienteAtual = service.buscar(id).orElse(null);
			
			if (clienteAtual != null) {
				BeanUtils.copyProperties(cliente, clienteAtual, "id");
				
				service.atualizar(clienteAtual, id);
				return ResponseEntity.ok(clienteAtual);
			}	
				
			return ResponseEntity.notFound().build();
		}

		
	}
		
		//POST - insert
		//PUT - Update
		//GET - select
		//Delete - Delete
//		@PostMapping
//		public void salvar(@RequestBody @Valid ClienteGlace cliente) {
//			service.salvar(cliente);
//		}
//		
//		@GetMapping("/{id}")
//		public Optional<ClienteGlace> buscar(@PathVariable Long id) {
//			return service.buscar(id);
//		}
//		
//		@GetMapping
//		public List<ClienteGlace> listar(){
//			return service.listar();
//		}
////		
////		@GetMapping("/{id}/email")
////		public List<ClienteGlace> buscarEmail(@PathVariable Long id) {
////			return service.buscarEmail(id);
////		}
////		
//		@DeleteMapping("/{id}")
//		public void excluir(@PathVariable Long id) {
//			service.excluir(id);
//		}
//		
//		@PutMapping("/{id}")
//		public void atualizar(@PathVariable Long id, @RequestBody @Valid ClienteGlace cliente) {
//		service.atualizar(cliente, id);
//			
//	}
//}
