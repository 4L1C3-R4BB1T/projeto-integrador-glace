package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.service.ClienteGlaceService;

@CrossOrigin
@RestController
@RequestMapping ("/cliente")
public class ClienteGlaceController {

		@Autowired
		private ClienteGlaceService service;
		
		//POST - insert
		//PUT - Update
		//GET - select
		//Delete - Delete
		@PostMapping
		public void salvar(@RequestBody @Valid ClienteGlace cliente) {
			service.salvar(cliente);
		}
		
		@GetMapping("/{id}")
		public Optional<ClienteGlace> buscar(@PathVariable Long id) {
			return service.buscar(id);
		}
		
		@GetMapping
		public List<ClienteGlace> listar(){
			return service.listar();
		}
//		
//		@GetMapping("/{id}/email")
//		public List<ClienteGlace> buscarEmail(@PathVariable Long id) {
//			return service.buscarEmail(id);
//		}
//		
		@DeleteMapping("/{id}")
		public void excluir(@PathVariable Long id) {
			service.excluir(id);
		}
		
		@PutMapping("/{id}")
		public void atualizar(@PathVariable Long id, @RequestBody @Valid ClienteGlace cliente) {
		service.atualizar(cliente, id);
			
	}
}
