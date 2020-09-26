package br.com.projetoglace.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.repository.ParceiroGlaceRepositry;

@Service
public class ParceiroGlaceService {

	@Autowired
	private ParceiroGlaceRepositry repository;
	
	@Transactional
	public void salvar(ParceiroGlace cliente) {
		
		repository.save(cliente);
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
		
		parc.setRazaoSocial(parceiro.getRazaoSocial());
		parc.setCnpj(parceiro.getCnpj());
		parc.setEmail(parceiro.getEmail());
		parc.setTelefone(parceiro.getTelefone());
		parc.setEndereco(parceiro.getEndereco());
		parc.setSenha(parceiro.getSenha());
		
		
		repository.save(parc);
}
}
