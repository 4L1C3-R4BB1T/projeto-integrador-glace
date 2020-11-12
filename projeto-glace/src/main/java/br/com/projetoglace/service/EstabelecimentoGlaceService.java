package br.com.projetoglace.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.EstabelecimentoDTO;
import br.com.projetoglace.email.EnvioEmailService;
import br.com.projetoglace.mapper.EstabelecimentoGlaceMapper;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.EstabelecimentoRepository;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.request.EstabelecimentoGlaceRequest;

@Service
public class EstabelecimentoGlaceService {

	@Autowired
	private EstabelecimentoRepository repository;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Autowired
	private EstabelecimentoGlaceMapper mapper;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	EnvioEmailService envioMensagem;
	
	@Transactional
	public EstabelecimentoDTO salvar(EstabelecimentoGlaceRequest estabelecimentoRequest) {
		

		EstabelecimentoGlace estabelecimentoGlace = new EstabelecimentoGlace();
		
		estabelecimentoGlace = mapper.requestToModel(estabelecimentoRequest);
		estabelecimentoGlace.setSenha(passwordEncoder.encode(estabelecimentoRequest.getSenha()));
		
		if(estabelecimentoGlace.getEndereco().getCidade().getId() == null) {
			estadoRepository.save(estabelecimentoGlace.getEndereco().getCidade().getEstado());
		    cidadeRepository.save(estabelecimentoGlace.getEndereco().getCidade());
		}
		

	    return mapper.modelToDTO(repository.save(estabelecimentoGlace));		
	}
	
	public List<EstabelecimentoGlace> listar() {
		return repository.findAll();
	}
	
}
