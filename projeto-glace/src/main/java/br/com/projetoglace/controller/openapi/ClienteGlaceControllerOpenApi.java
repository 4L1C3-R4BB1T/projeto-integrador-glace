package br.com.projetoglace.controller.openapi;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.exception.config.Problem;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.request.ClienteGlaceRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Cliente Glace")
public interface ClienteGlaceControllerOpenApi {

	@ApiOperation("Cadastrar um cliente Glace")
	@ApiResponses({ @ApiResponse(code = 201, message = "Cliente Glace cadastrado", response = ClienteGlaceDTO.class) })	
	ResponseEntity<?> salvarCliente(
			@ApiParam(name = "corpo", value = "Representação de um novo cliente Glace", required = true)
			@Valid ClienteGlaceRequest clienteRequest);

	
	@ApiOperation(value = "Buscar todos os Clientes Glace", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar todos os clientes", response = ClienteGlaceDTO.class) })
	List<ClienteGlaceDTO> listarCliente();
	
	@ApiOperation(value = "Buscar Cliente pelo ID", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar Cliente Glace pelo ID", response = ClienteGlaceDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<ClienteGlace> buscarCliente(Long id);

	
	@ApiOperation(value = "Excluir Cliente Glace pelo ID", httpMethod = "DELETE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 204, message = "Cliente Glace excluído com sucesso", response = ClienteGlaceDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser excluído", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<ClienteGlace> excluirCliente(Long id);
	
	@ApiOperation(value = "Atualizar Cliente Glace pelo ID", httpMethod = "PUT", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 200, message = "Cliente atualizado com sucesso.", response = ClienteGlaceDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser atualizado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<?> atualizarCliente(
			@ApiParam(name = "corpo", value = "Representação de um novo cliente", required = true) @Valid ClienteGlace clienteGlace,
			Long id);
}
