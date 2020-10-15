package br.com.projetoglace.controller.openapi;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import br.com.projetoglace.dto.ImagemDTO;
import br.com.projetoglace.exception.config.Problem;
import br.com.projetoglace.model.Imagem;
import br.com.projetoglace.request.ImagemRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Imagem")
public interface ImagemControllerOpenApi {

	@ApiOperation("Cadastrar uma foto")
	@ApiResponses({ @ApiResponse(code = 201, message = "Foto cadastrada", response = ImagemDTO.class) })	
	ImagemDTO salvar(
			@ApiParam(name = "corpo", value = "Representação de uma nova foto", required = true)
			@Valid ImagemRequest imagemRequest);

	@ApiOperation(value = "Buscar todas as Fotos", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar todas as fotos", response =ImagemDTO.class) })
	List<ImagemDTO> listar();
	
	@ApiOperation(value = "Buscar foto pelo ID do cliente", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar foto pelo ID do cliente", response = ImagemDTO.class),
			@ApiResponse(code = 404, message = "A foto não foi encontrada", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<Imagem> buscar(Long id);
	

	@ApiOperation(value = "Excluir foto pelo ID do cliente", httpMethod = "DELETE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 204, message = "Foto excluída com sucesso", response = ImagemDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser excluído", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<Imagem> excluir(Long id);
	
//	@ApiOperation(value = "Atualizar foto pelo ID do cliente", httpMethod = "PUT", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ApiResponses({ @ApiResponse(code = 200, message = "Foto atualizada com sucesso.", response = ImagemDTO.class),
//			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
//	@ApiImplicitParam(name = "id", value = "Id a ser atualizado", required = true, dataType = "int", paramType = "path", example = "1")
//	ResponseEntity<?> atualizar(
//			@ApiParam(name = "corpo", value = "Representação de uma nova foto", required = true) @Valid Imagem imagem,
//			Long id);
}
