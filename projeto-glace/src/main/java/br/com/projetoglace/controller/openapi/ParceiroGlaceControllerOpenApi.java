package br.com.projetoglace.controller.openapi;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import br.com.projetoglace.dto.EstabelecimentoDTO;
import br.com.projetoglace.dto.ParceiroGlaceDTO;
import br.com.projetoglace.exception.config.Problem;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.request.ParceiroGlaceRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Parceiro Glace")
public interface ParceiroGlaceControllerOpenApi {

	@ApiOperation("Cadastrar um Parceiro Glace")
	@ApiResponses({ @ApiResponse(code = 201, message = "Parceiro Glace cadastrado", response = ParceiroGlaceDTO.class) })	
	ResponseEntity<?> salvar(
			@ApiParam(name = "corpo", value = "Representação de um novo Parceiro Glace", required = true)
			@Valid ParceiroGlaceRequest parceiroRequest);

	
	@ApiOperation(value = "Buscar todos os Parceiro Glace", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar todos os Parceiros Glace", response = ParceiroGlaceDTO.class) })
	List<ParceiroGlaceDTO> listar();
	
	@ApiOperation(value = "Buscar Parceiro pelo ID", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar Parceiro Glace pelo ID", response = ParceiroGlaceDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<ParceiroGlace> buscar(Long id);

	@ApiOperation(value = "Excluir Parceiro Glace pelo ID", httpMethod = "DELETE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 204, message = "Parceiro Glace excluído com sucesso", response = ParceiroGlaceDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser excluído", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<ParceiroGlace> excluir(Long id);
	
	@ApiOperation(value = "Atualizar Parceiro Glace pelo ID", httpMethod = "PUT", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 200, message = "Parceiro atualizado com sucesso.", response = ParceiroGlaceDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser atualizado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<?> atualizar(
			@ApiParam(name = "corpo", value = "Representação de um novo Parceiro", required = true) @Valid ParceiroGlace parceiroGlace,
			Long id);

	@ApiOperation(value = "Buscar Estabelecimento pelo ID", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar Estabelecimento pelo ID", response = EstabelecimentoDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<List<EstabelecimentoGlace>> buscarEstabelecimentos(Long id);
}
