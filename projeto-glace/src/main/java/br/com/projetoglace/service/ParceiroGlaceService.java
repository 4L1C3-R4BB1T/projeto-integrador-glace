package br.com.projetoglace.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.projetoglace.dto.ParceiroGlaceDTO;
import br.com.projetoglace.mapper.ParceiroGlaceMapper;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.repository.ParceiroGlaceRepositry;
import br.com.projetoglace.request.ParceiroGlaceRequest;

@Service
public class ParceiroGlaceService {

	@Autowired
	private ParceiroGlaceRepositry repository;
	@Autowired
	private ParceiroGlaceMapper mapper;
	
	@Transactional
	public ParceiroGlaceDTO salvar(ParceiroGlaceRequest request) {
		
		ParceiroGlace parceiro = mapper.dtoRequestToModel(request);
		return mapper.modelToDto(repository.save(parceiro));
	}
	
	public List<ParceiroGlace> listar() {
		return repository.findAll();
	}
	
	public Optional<ParceiroGlace> listar(Long id) {
		return repository.findById(id);
	}

	public Optional<ParceiroGlace> buscar(Long id) {
		return repository.findById(id);
	}
	
	@Transactional
	public void excluir(Long id) {
		repository.deleteById(id);
	}
	
	@Transactional
	public void atualizar(@PathVariable Long id, @RequestBody ParceiroGlace parceiro) {
		ParceiroGlace parc = repository.findById(id).get();
	
		parc.setEmail(parceiro.getEmail());
		parc.setTelefone(parceiro.getTelefone());
		parc.setSenha(parceiro.getSenha());
		parc.setCpf(parceiro.getCpf());
		parc.setDataNasc(parceiro.getDataNasc());
		parc.setSobrenome(parceiro.getSobrenome());
				
		repository.save(parc);
	}
}
