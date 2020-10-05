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
import br.com.projetoglace.dto.ParceiroGlaceDTO;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.request.ClienteGlaceRequest;
import br.com.projetoglace.request.ParceiroGlaceRequest;
import br.com.projetoglace.service.ClienteGlaceService;
import br.com.projetoglace.service.ParceiroGlaceService;


@CrossOrigin
@RestController
@RequestMapping ("/parceiro")
public class ParceiroGlaceController {

	@Autowired
	private ParceiroGlaceService service;
	
	@PostMapping
	public ResponseEntity<?> salvar(@RequestBody @Valid ParceiroGlaceRequest parceiroRequest) {	
		try {
			ParceiroGlaceDTO parceiroDTO = service.salvar(parceiroRequest);			
			return ResponseEntity.status(HttpStatus.CREATED).body(parceiroDTO);
		
		}catch(Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}		
	}
	
	@GetMapping
	public List<ParceiroGlaceDTO> listar(){
		return service.listar();
	}

	@GetMapping("/{id}")
	public ResponseEntity<ParceiroGlace> buscar(@PathVariable Long id) {
		Optional<ParceiroGlace> parceiro = service.buscar(id);
		if (parceiro.isPresent()) {
			return ResponseEntity.ok(parceiro.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ParceiroGlace> excluir(@PathVariable Long id) {
		try {
			service.excluir(id);	
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> atualizar(@RequestBody @Valid ParceiroGlace cliente, @PathVariable Long id) {
		ParceiroGlace parceiroAtual = service.buscar(id).orElse(null);
		if (parceiroAtual != null) {
			BeanUtils.copyProperties(cliente, parceiroAtual, "id");
			service.atualizar(parceiroAtual);
			return ResponseEntity.ok(parceiroAtual);
		}	
		return ResponseEntity.notFound().build();
	}
	
}
