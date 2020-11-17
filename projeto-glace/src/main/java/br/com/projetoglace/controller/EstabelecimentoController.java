package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.controller.openapi.EstabelecimentoControllerOpenApi;
import br.com.projetoglace.dto.EstabelecimentoDTO;
import br.com.projetoglace.filtro.EstabelecimentoFiltro;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.request.EstabelecimentoGlaceRequest;
import br.com.projetoglace.service.EstabelecimentoGlaceService;

@CrossOrigin
@RestController
@RequestMapping("/estabelecimento")
public class EstabelecimentoController implements EstabelecimentoControllerOpenApi {
	
	@Autowired
	private EstabelecimentoGlaceService service;
	
	@Override
	@PostMapping
	public ResponseEntity<?> salvar(@RequestBody EstabelecimentoGlaceRequest estabelecimentoRequest) {	
		try {
			EstabelecimentoDTO estabelecimentoDTO = service.salvar(estabelecimentoRequest);			
			return ResponseEntity.status(HttpStatus.CREATED).body(estabelecimentoDTO);
		}catch(Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}		
	}
	
	@GetMapping()
	public List<EstabelecimentoGlace> listarEstabelecimentos(EstabelecimentoFiltro filtro){
		return service.listar(filtro);
	}
	
	@Override
	@GetMapping("/{id}")
	public ResponseEntity<EstabelecimentoGlace> buscarEstabelecimento(@PathVariable Long id) {
		Optional<EstabelecimentoGlace> estabelecimento = service.buscarEstabelecimento(id);
		if (estabelecimento.isPresent()) {
			return ResponseEntity.ok(estabelecimento.get());
		}
		return ResponseEntity.notFound().build();
	}
	
}