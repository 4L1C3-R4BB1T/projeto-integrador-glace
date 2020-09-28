package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.model.Cidade;
import br.com.projetoglace.model.Estabelecimento;
import br.com.projetoglace.model.Estado;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.EstabelecimentoRepository;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.service.ParceiroGlaceService;

@CrossOrigin
@RestController
@RequestMapping ("/estabelecimento")
public class EstabelecimentoController {
	
	@Autowired
	private EstabelecimentoRepository estabelecimentoRepository;
	
	@Autowired
	private EstadoRepository estadoReposity;
	
	@Autowired
	private CidadeRepository cidadeReposity;
	
	@Autowired
	private ParceiroGlaceService parceiroGlaceService; 
	
	@PostMapping("/{id}/parceiro")
	public void salvar(@PathVariable Long id, @RequestBody Estabelecimento estabelecimento) {
		
		Optional<ParceiroGlace> glace = parceiroGlaceService.buscar(id);
		ParceiroGlace parceiroGlace = glace.get();
		
		estabelecimento.setParceiroGlace(parceiroGlace);
		
		estadoReposity.save(estabelecimento.getEndereco().getCidade().getEstado());
		cidadeReposity.save(estabelecimento.getEndereco().getCidade());
		
		estabelecimentoRepository.save(estabelecimento);
	}
	
	@GetMapping("/estado")
	public List<Estado> listarEstados(){
		return estadoReposity.findAll();
	}
	
	@GetMapping("/cidade/{id}")
	public List<Cidade> listarCidades(@PathVariable Long id){
		return cidadeReposity.bucarCidades(id);
	}
}
