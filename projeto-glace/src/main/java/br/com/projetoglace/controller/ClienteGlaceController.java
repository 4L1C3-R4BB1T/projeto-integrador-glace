package br.com.projetoglace.controller;

import java.util.List;

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
import br.com.projetoglace.repository.ClienteGlaceRepository;

public class ClienteGlaceController {

	@CrossOrigin
	@RestController
	@RequestMapping ("/cliente")
	public class ClienteController {

		@Autowired
		private ClienteGlaceRepository repository;
		
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
		public void adicionar(@RequestBody ClienteGlace cliente) {
			repository.save(cliente);
		}
		
		@DeleteMapping("/{id}")
		public void delete(@PathVariable Long id) {
			
			repository.deleteById(id);
		}
		
		@PutMapping("/{id}")
		public void atualizar(@PathVariable Long id, @RequestBody ClienteGlace cliente 	) {
			ClienteGlace cl = repository.findById(id).get();
			
			cl.setNome(cliente.getNome());
			cl.setSobrenome(cliente.getSobrenome());
			cl.setDataNasc(cliente.getDataNasc());
			cl.setCpf(cliente.getCpf());
			cl.setEmail(cliente.getEmail());
			cl.setTelefone(cliente.getTelefone());
			
			
			repository.save(cl);
	}
	}
}
