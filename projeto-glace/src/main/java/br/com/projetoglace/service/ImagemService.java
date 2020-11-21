package br.com.projetoglace.service;

import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.projetoglace.dto.ImagemDTO;
import br.com.projetoglace.exception.ImagemNaoEncontradaException;
import br.com.projetoglace.mapper.ImagemMapper;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.Imagem;
import br.com.projetoglace.repository.ImagemRepository;
import br.com.projetoglace.request.ImagemRequest;

@Service
public class ImagemService {
	@Autowired
	private ImagemRepository repository;
	@Autowired
	private ImagemMapper mapper;
	
	@Autowired
	private S3FotoStorageService s3FotoStorageService;
	
	@Transactional
	public ImagemDTO salvar(ImagemRequest imagemRequest) {
		
		MultipartFile arquivo = imagemRequest.getImagem();
		
		String nomeArquivo = UUID.randomUUID().toString()
				+ "_" + arquivo.getOriginalFilename();	
		
		Imagem imagem = mapper.requestToModel(imagemRequest);
		
		imagem.setNomeArquivo(nomeArquivo);
		imagem.setNomeArquivoCompleto(nomeArquivo);
		imagem.setNomeArquivo(arquivo.getOriginalFilename());
		imagem.setContentType(arquivo.getContentType());
		imagem.setTamanho(arquivo.getSize());		
	  	
		URL url = s3FotoStorageService.armazenar(arquivo, nomeArquivo);
	  	imagem.setUrl(url);
	   
	  	return mapper.modelToDTO( repository.save(imagem) );	
	}

	@Transactional
	public void excluir(Long id) {

		Imagem imagem = repository.findById(id).get();
		
		s3FotoStorageService.remover(imagem.getNomeArquivoCompleto());
		
		try {
			repository.deleteById(id);
			repository.flush();
		}catch( EmptyResultDataAccessException e) {
			throw new ImagemNaoEncontradaException(id);
		}
	}
			public Optional<ClienteGlace> buscar(Long id) {
				return Optional.empty();
			}
	

		public List<ImagemDTO> listar() {
			
			return repository.findAll()
					.stream()
					.map(cli -> mapper.modelToDTO(cli))
					.collect(Collectors.toList());	
		}

	}
