package br.com.projetoglace.controller.openapi;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import br.com.projetoglace.dto.EstabelecimentoDTO;
import br.com.projetoglace.filtro.EstabelecimentoFiltro;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.request.EstabelecimentoGlaceRequest;
import io.swagger.annotations.Api;
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
}
