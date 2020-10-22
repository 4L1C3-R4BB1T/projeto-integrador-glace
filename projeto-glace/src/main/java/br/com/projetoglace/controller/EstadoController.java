package br.com.projetoglace.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.controller.openapi.EstadoControllerOpenApi;
import br.com.projetoglace.model.Cidade;
import br.com.projetoglace.model.Estado;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.security.permissões.CheckSecurity;

@CrossOrigin 
@RestController
@RequestMapping ("/estado")
public class EstadoController implements EstadoControllerOpenApi {

	@Autowired
	private EstadoRepository repository;
	
	@Override
	@PostMapping
	public void salvar(@RequestBody Estado estado) {
		repository.save(estado);
	}
	
	@CheckSecurity.Estado.ListarEstados
	@Override
	@GetMapping()
	public List<Estado> listar(){
		return repository.findAll();
	}
	
	@CheckSecurity.Estado.ListarCidadesPorEstado
	@Override
	@GetMapping("/{id}/cidades")
	public List<Cidade> listarCidadesPorEstado(@PathVariable Long id){
		return repository.buscarCidades(id);
	}
	
}