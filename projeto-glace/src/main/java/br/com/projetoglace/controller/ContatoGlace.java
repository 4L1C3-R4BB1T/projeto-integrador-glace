package br.com.projetoglace.controller;

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

import java.util.List;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.repository.ContatoGlaceRepository;

public class ContatoGlace {

	@CrossOrigin
	@RestController
	@RequestMapping ("/cliente")
	public class ClienteController {

		@Autowired
		private ContatoGlaceRepository repository;
		
		//POST - insert
		//PUT - Update
		//GET - select
		//Delete - Delete
		
		@GetMapping
		public List<ClienteGlace> listar(){
			return repository.findAll();
		}
		
		@GetMapping("/{id}")
		public ClienteGlace buscar(@PathVariable Long id) {
			return repository.findById(id).orElse(null);
		}
		
		@PostMapping
		public void adicionar(@RequestBody ClienteGlace contact) {
			repository.save(contact);
		}
		
		@DeleteMapping("/{id}")
		public void delete(@PathVariable Long id) {
			
			repository.deleteById(id);
		}
		
		@PutMapping("/{id}")
		public void atualizar(@PathVariable Long id, @RequestBody ClienteGlace contact) {
			contact = repository.findById(id).get();
			
			contact.setNome(contact.getNome());
			contact.setSobrenome(contact.getSobrenome());
			contact.setDataNasc(contact.getDataNasc());
			contact.setCpf(contact.getCpf());
			contact.setRg(contact.getRg());
			contact.setEmail(contact.getEmail());
			contact.setTelefone(contact.getTelefone());
			
			
			repository.save(contact);
	}
	}
}
