// componente que crea un dialogo para mostrar los resultados /////////
/// de la consulta por coordenadas realizada a cada capa ///////////////
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import generatePDF from './generatePDF'; 

// Estilo personalizado para la primera columna
const StyledTableCell = styled(TableCell)({
    backgroundColor: '#f5f7f5',
    fontWeight: 'bold',
});
const StyledTableCell2 = styled(TableCell)({
    backgroundColor: '#e3f9e4',
    fontWeight: 'normal',
});

const DialogoResultado = ({ openD, handleCloseD, datos, punto }) => {
    // Verifica el valor del atributo Suelo para determinar qué datos mostrar
    const isRural = datos.Suelo === 'RURAL';

    const dataToShow = isRural ? {
      Suelo: datos.Suelo,
      Corregimiento: datos.Corregimiento,
      Actividad: datos.Actividad,
      Tipo: datos.Tipo,
      Subtipo: datos.Subtipo,
      UsoPrincipal: datos.UsoPrincipal,
      
  } : {
    Suelo: datos.Suelo,
    Uso: datos.Uso,
    Tratamiento: datos.Tratamiento,
    Modalidad: datos.Modalidad,
    Comuna: datos.Comuna,
    Udp: datos.Udp,
  };

    return (
      <Dialog open={openD} onClose={handleCloseD}>
          <DialogTitle>Resultados de la Consulta</DialogTitle>
          <DialogContent>
              <Table>
                  <TableBody>
                    <TableRow>
                          <StyledTableCell>Clase de Suelo</StyledTableCell>
                          <StyledTableCell2>{dataToShow.Suelo ? dataToShow.Suelo : 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                      {isRural ? (
                          <>
                              <TableRow>
                    <StyledTableCell>Corregimiento</StyledTableCell>
                    <StyledTableCell2>{dataToShow.Corregimiento || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Actividad</StyledTableCell>
                      <StyledTableCell2>{dataToShow.Actividad || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Tipo</StyledTableCell>
                      <StyledTableCell2>{dataToShow.Tipo || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Subtipo</StyledTableCell>
                      <StyledTableCell2>{dataToShow.Subtipo || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Uso Principal</StyledTableCell>
                      <StyledTableCell2>{dataToShow.UsoPrincipal || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    </>
                    ) : (
                    <>
                    <TableRow>
                      <StyledTableCell>Uso</StyledTableCell>
                      <StyledTableCell2>{dataToShow.Uso || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Tratamiento Urbanistico</StyledTableCell>
                      <StyledTableCell2>{dataToShow.Tratamiento || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Modalidad</StyledTableCell>
                      <StyledTableCell2>{dataToShow.Modalidad || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Comuna</StyledTableCell>
                      <StyledTableCell2>{dataToShow.Comuna || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>UDP</StyledTableCell>
                      <StyledTableCell2>{dataToShow.Udp || 'No se encontraron datos.'}</StyledTableCell2>
                    </TableRow>
                    </>
                    )}
                </TableBody>
              </Table>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseD} variant="outlined" color="primary">
                  Cerrar
              </Button>
              <Button onClick={() => generatePDF(dataToShow, punto)} variant="outlined" color="primary">
                  Exportar PDF
              </Button>
          </DialogActions>
      </Dialog>
    );
};

export default DialogoResultado;

