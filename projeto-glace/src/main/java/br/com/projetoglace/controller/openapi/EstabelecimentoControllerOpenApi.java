package br.com.projetoglace.controller.openapi;

import java.util.List;

import br.com.projetoglace.model.EstabelecimentoGlace;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Estabelecimento")
public interface EstabelecimentoControllerOpenApi {

	@ApiOperation(value = "Buscar todos os Estabelecimentos Glace", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar todos os estabelecimentos", response = EstabelecimentoGlace.class) })
	List<EstabelecimentoGlace> listarEstabelecimentos();
}