package br.com.projetoglace.controller.openapi;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import br.com.projetoglace.dto.UsuarioADMGlaceDTO;
import br.com.projetoglace.exception.config.Problem;
import br.com.projetoglace.model.UsuarioADMGlace;
import br.com.projetoglace.request.UsuarioADMGlaceRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller Administrativo")
public interface UsuarioADMGlaceControllerOpenApi {
	
	@ApiOperation("Cadastrar um usuario Glace")
	@ApiResponses({ @ApiResponse(code = 201, message = "usurio Glace cadastrado", response = UsuarioADMGlaceDTO.class) })	
	ResponseEntity<?> salvarUsuario (
			@ApiParam(name = "corpo", value = "Representação de um novo usuario Glace", required = true)
			@Valid UsuarioADMGlaceRequest usuarioAdmRequest);		
	
	
	@ApiOperation(value = "Atualizar Usuario Glace pelo ID", httpMethod = "PUT", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 200, message = "Usuario atualizado com sucesso.", response = UsuarioADMGlaceDTO.class),
	@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser atualizado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<?> atualizarUsuario(
			@ApiParam(name = "corpo", value = "Representação de um novo Usuario", required = true) 
			@Valid UsuarioADMGlace usuarioADMGlace, Long id);
	
	@ApiOperation(value = "Excluir Usuario Glace pelo ID", httpMethod = "DELETE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 204, message = "Usuario Glace excluído com sucesso", response = UsuarioADMGlaceDTO.class),
	@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser excluído", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<UsuarioADMGlace> excluirUsuario(Long id);
	
	@ApiOperation(value = "Buscar usuario pelo ID", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar usuario Glace pelo ID", response = UsuarioADMGlaceDTO.class),
	@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<UsuarioADMGlace> buscarUsuario(Long id);
	
	
}
