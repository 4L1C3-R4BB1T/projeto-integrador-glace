package br.com.projetoglace.controller.openapi;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PathVariable;

import br.com.projetoglace.exception.config.Problem;
import br.com.projetoglace.model.Acessibilidade;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags= "Controler de Acessibilidade")
public interface AcessibilidadeControllerOpenApi {

	@ApiOperation("Cadastrar uma acessibilidade Glace")
	@ApiResponses({ @ApiResponse(code = 201, message = "Acessibilidade cadastrada", response = Acessibilidade.class) })
	void salvar(@ApiParam
			(name = "corpo", value = "Representação de uma nova acessibilidade", required = true)
			@Valid Acessibilidade acessibilidade);
	
	@ApiOperation(value = "Buscar todas as Acessibiliades Glace", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar todas as acessibilidades", response = Acessibilidade.class) })
	List<Acessibilidade> listarAcessibilidade();
	
	@ApiOperation(value = "Buscar Acessibiliade pelo ID", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar Acessibilidade pelo ID", response = Acessibilidade.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	List<Acessibilidade> buscarAcessibilidade(@PathVariable Long id);
}
