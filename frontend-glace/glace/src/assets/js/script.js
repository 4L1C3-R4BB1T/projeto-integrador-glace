$(document).ready(() => {
  $('#tipoUser').change(() => {
    var tipo = $('#tipoUser option:selected').val();
    // console.log(tipo);
    if (tipo == 1) {
      $('#formAdmin').hide();
      $('#formUser').show();
    } else if (tipo == 2) {
      $('#formUser').hide();
      $('#formAdmin').show();
    }
  });
});