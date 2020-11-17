package br.com.projetoglace.controller.openapi;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;

import br.com.projetoglace.dto.EstabelecimentoDTO;
import br.com.projetoglace.exception.config.Problem;
import br.com.projetoglace.filtro.EstabelecimentoFiltro;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.request.EstabelecimentoGlaceRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Estabelecimento")
public interface EstabelecimentoControllerOpenApi {
	
	@ApiOperation(value = "Buscar todos os Estabelecimentos Glace", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar todos os estabelecimentos", response = EstabelecimentoGlace.class) })
	List<EstabelecimentoGlace> listarEstabelecimentos(EstabelecimentoFiltro filtro);
	
	@ApiOperation("Cadastrar um Estabelecimento Glace")
	@ApiResponses({ @ApiResponse(code = 201, message = "Estabelecimento Glace cadastrado", response = EstabelecimentoDTO.class) })	
	ResponseEntity<?> salvar(
			@ApiParam(name = "corpo", value = "Representação de um novo Estabelecimento Glace", required = true)
			@Valid EstabelecimentoGlaceRequest estabelecimentoRequest);
	
	@ApiOperation(value = "Buscar Estabelecimento pelo ID", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar Estabelecimento pelo ID", response = EstabelecimentoDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<EstabelecimentoGlace> buscarEstabelecimento(Long id);
	
}
