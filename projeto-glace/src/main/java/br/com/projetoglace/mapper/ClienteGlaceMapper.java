package br.com.projetoglace.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.dto.ClienteGlaceResumoDTO;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.request.ClienteGlaceRequest;


@Component
public class ClienteGlaceMapper {
	@Autowired
	private ModelMapper modelMapper;
	
	 public ClienteGlace requestToModel(ClienteGlaceRequest clienteRequest) {
	        return modelMapper.map(clienteRequest, ClienteGlace.class);
	    }
	    
	    public ClienteGlaceDTO modelToDTO(ClienteGlace cliente) {
	        return modelMapper.map(cliente, ClienteGlaceDTO.class);
	    }
	    
	    public ClienteGlaceResumoDTO modelToDtoResumo(ClienteGlace cliente) {
	        return modelMapper.map(cliente, ClienteGlaceResumoDTO.class);
	    }
	}