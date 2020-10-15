package br.com.projetoglace.controller.openapi;

import java.util.List;

import javax.validation.Valid;

import br.com.projetoglace.exception.config.Problem;
import br.com.projetoglace.model.Cidade;
import br.com.projetoglace.model.Estado;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Estado")
public interface EstadoControllerOpenApi {
	@ApiOperation("Cadastrar um estado")
	@ApiResponses({ @ApiResponse(code = 201, message = "Estado cadastrado", response = Estado.class) })	
	public void salvar(
			@ApiParam(name = "corpo", value = "Representação de um novo estado", required = true)
			@Valid Estado estado);
	
	@ApiOperation(value = "Buscar todos os estados", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar todos os estados", response =Estado.class) })
	List<Estado> listar();
	
	@ApiOperation(value = "Busca cidade por estado", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar cidade pelo ID do estado", response = Estado.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	List<Cidade> listarCidadesPorEstado(Long id);
}

