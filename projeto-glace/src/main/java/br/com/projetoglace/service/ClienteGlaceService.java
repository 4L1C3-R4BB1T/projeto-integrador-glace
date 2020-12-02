package br.com.projetoglace.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.email.EnvioEmailService;
import br.com.projetoglace.email.Mensagem;
import br.com.projetoglace.exception.ClienteNaoEncontradoException;
import br.com.projetoglace.mapper.ClienteGlaceMapper;
import br.com.projetoglace.model.Cidade;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.Estado;
import br.com.projetoglace.model.Grupo;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.ClienteGlaceRepository;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.repository.GrupoRepository;
import br.com.projetoglace.request.ClienteGlaceRequest;

@Service
public class ClienteGlaceService {

	@Autowired
	private ClienteGlaceRepository repository;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	@Autowired
	private GrupoRepository grupoRepository;
	
	@Autowired
	private ClienteGlaceMapper mapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	EnvioEmailService envioMensagem;
	
	@Transactional
	public ClienteGlaceDTO salvarCliente(ClienteGlaceRequest clienteRequest) {
		
		ClienteGlace cliente = new ClienteGlace();
		
	    cliente = mapper.requestToModel(clienteRequest);
		cliente.setSenha(passwordEncoder.encode(clienteRequest.getSenha()));
		
		if(cliente.getEndereco().getCidade().getId() == null) {
			
//			estadoRepository.findById(cliente.getEndereco().getCidade().getEstado().getId());
//			cidadeRepository.findById(cliente.getEndereco().getCidade().getId());
			
			estadoRepository.save(cliente.getEndereco().getCidade().getEstado());
		    cidadeRepository.save(cliente.getEndereco().getCidade());
		}
		Grupo grupo = grupoRepository.findById(2L).get();
		Set<Grupo> grupos = new HashSet<>();
	    grupos.add(grupo);
	    cliente.setGrupos(grupos);
	    repository.save(cliente);

	    return mapper.modelToDTO(repository.save(cliente));		
	}
	
	@Transactional
	public void atualizarCliente(ClienteGlace cliente) {
		
		Optional<Cidade> cidade = cidadeRepository.findById(cliente.getEndereco().getCidade().getId()); 
		
//			Mensagem mensagem = Mensagem.builder()
//				.assunto(cliente.getNome()+ "Cliente Atualizado")
//				.corpo("cliente-atualizado.html")
//				.variavel("cliente",cliente)
//				.variavel("cidade",cidade.get().getNome())
//				.variavel("estado",cidade.get().getEstado().getNome())
//				.destinatario(cliente.getEmail())
//				.build();
//			envioMensagem.enviar(mensagem);
				
		repository.save(cliente);		
	}
	
	public Optional<ClienteGlace> buscarCliente(Long id) {
		return repository.findById(id);
	}
	
	@Transactional
	public void excluirCliente(Long id) {
		try {
			repository.deleteById(id);
			repository.flush();
		} catch (EmptyResultDataAccessException e) {
			throw new ClienteNaoEncontradoException(id);
		};			
	}
	
	public List<ClienteGlaceDTO> listarCliente() {	
		return repository.findAll()
				.stream()
				.map(cli -> mapper.modelToDTO(cli))
				.collect(Collectors.toList());	
	}

	public Estado salvarEstado(Estado estado) {
		return estadoRepository.save(estado);
	}
	
}
