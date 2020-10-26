package br.com.projetoglace.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.projetoglace.dto.UsuarioADMGlaceDTO;
import br.com.projetoglace.model.UsuarioADMGlace;
import br.com.projetoglace.request.UsuarioADMGlaceRequest;

@Component
public class UsuarioADMGlaceMapper {

	@Autowired
    private ModelMapper modelMapper;

    public UsuarioADMGlace requestToModel(UsuarioADMGlaceRequest usuarioAdmRequest) {
        return modelMapper.map(usuarioAdmRequest, UsuarioADMGlace.class);
    }
    
    public UsuarioADMGlaceDTO modelToDTO(UsuarioADMGlace usuarioAdmGlace) {
        return modelMapper.map(usuarioAdmGlace, UsuarioADMGlaceDTO.class);
    }

	}
