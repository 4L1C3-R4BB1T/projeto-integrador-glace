package br.com.projetoglace.controller.openapi;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.dto.ReservaDTO;
import br.com.projetoglace.exception.config.Problem;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.Reserva;
import br.com.projetoglace.request.ReservaRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Reserva")
public interface ReservaControllerOpenApi {

	@ApiOperation("Cadastrar reserva")
	@ApiResponses({ @ApiResponse(code = 201, message = "Reserva cadastrada", response = ReservaDTO.class) })	
	ResponseEntity<?> salvarReserva(
			@ApiParam(name = "corpo", value = "Representação de uma reserva", required = true)
			@Valid ReservaRequest reservaRequest);
	
	@ApiOperation(value = "Buscar todas as reservas", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar todas as reservas", response = ReservaDTO.class) })
	List<Reserva> listarReserva();
	
	@ApiOperation(value = "Busca reservas por cliente", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar reservas pelo ID do cliente", response = ReservaDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	List<Reserva> listarReservaPorCliente(Long id);
	
	@ApiOperation(value = "Busca reservas por Estabelecimento", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar reservas pelo ID do estabelecimento", response = ReservaDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	List<Reserva> listarReservaPorEstabelecimento(Long id);
	
	@ApiOperation(value = "Excluir reserva pelo ID", httpMethod = "DELETE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 204, message = "Reserva excluída com sucesso", response = ReservaDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser excluído", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<Reserva> excluirReserva(Long id);
	
	@ApiOperation(value = "Atualizar reserva Glace pelo ID", httpMethod = "PUT", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiResponses({ @ApiResponse(code = 200, message = "Reserva atualizado com sucesso.", response = ReservaDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "Id a ser atualizado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<?> atualizarRezerva(
			@ApiParam(name = "corpo", value = "Representação de um novo reserva", required = true) @Valid Reserva reserva,
			Long id);

	@ApiOperation(value = "Busca reservas por id", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 200, message = "Buscar reservas pelo ID do estabelecimento", response = ReservaDTO.class),
			@ApiResponse(code = 404, message = "O recurso não foi encontrado", response = Problem.class) })
	@ApiImplicitParam(name = "id", value = "ID a ser buscado", required = true, dataType = "int", paramType = "path", example = "1")
	ResponseEntity<Reserva> listarReserva(Long id);

}
