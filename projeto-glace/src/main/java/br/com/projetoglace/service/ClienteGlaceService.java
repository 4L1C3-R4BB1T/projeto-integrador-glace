package br.com.projetoglace.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.repository.ClienteGlaceRepository;


@Service
public class ClienteGlaceService {
	@Autowired
	private ClienteGlaceRepository repository;
	
	@Transactional
	public void salvar(ClienteGlace cliente) {
		
		repository.save(cliente);
	}
	
	public List<ClienteGlace> listar() {
			
			return repository.findAll();
		}
	public Optional<ClienteGlace> listar(Long id) {
			
			return repository.findById(id);
		}

	public Optional<ClienteGlace> buscar(Long id) {
		return repository.findById(id);
	}
	
	@Transactional
	public void excluir(Long id) {
		repository.deleteById(id);
	}
	
	@Transactional
	public void atualizar (ClienteGlace cliente, Long id) {
		ClienteGlace cl = repository.findById(id).get();
		
		cl.setNome(cliente.getNome());
		cl.setSobrenome(cliente.getSobrenome());
		cl.setDataNasc(cliente.getDataNasc());
		cl.setCpf(cliente.getCpf());
		cl.setEmail(cliente.getEmail());
		cl.setTelefone(cliente.getTelefone());
		cl.setEndereco(cliente.getEndereco());
		cl.setSenha(cliente.getSenha());
		
		repository.save(cl);
}

}
