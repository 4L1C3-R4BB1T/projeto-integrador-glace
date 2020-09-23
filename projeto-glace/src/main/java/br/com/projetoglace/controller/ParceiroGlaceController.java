//package br.com.projetoglace.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import br.com.projetoglace.model.ClienteGlace;
//import br.com.projetoglace.model.ParceiroGlace;
//import br.com.projetoglace.repository.ClienteGlaceRepository;
//
//@CrossOrigin
//@RestController
//@RequestMapping ("/parceiro")
//public class ParceiroGlaceController {
//
//		@Autowired
//		private ClienteGlaceRepository repository;
//		
//		//POST - insert
//		//PUT - Update
//		//GET - select
//		//Delete - Delete
//		
//		@GetMapping
//		public List<ClienteGlace> listar(){
//			return repository.findAll();
//		}
//		
//		@GetMapping("/{id}")
//		public ClienteGlace buscar(@PathVariable Long id) {
//			return repository.findById(id).orElse(null);
//		}
//		
//		@PostMapping
//		public void adicionar(@RequestBody ParceiroGlace parceiro) {
//			repository.saveAll(parceiro);
//		}
//		
//		@DeleteMapping("/{id}")
//		public void delete(@PathVariable Long id) {
//			
//			repository.deleteById(id);
//		}
//		
//		@PutMapping("/{id}")
//		public void atualizar(@PathVariable Long id, @RequestBody ParceiroGlace parceiro) {
//			ParceiroGlace parc = repository.findById(id).get();
//			
//			parc.setRazaoSocial(parceiro.getRazaoSocial());
//			parc.setCnpj(parceiro.getCnpj());
//			parc.setEmail(parceiro.getEmail());
//			parc.setTelefone(parceiro.getTelefone());
//			
//			
//			repository.save();
//	}
//	}
