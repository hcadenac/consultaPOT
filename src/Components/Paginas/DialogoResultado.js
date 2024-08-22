// componente que crea un dialogo para mostrar los resultados /////////
/// de la cosnulta por cordenadas realizada a cada capa ///////////////ConsultaDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import generatePDF from './generatePDF'; 

// Estilo personalizado para la primera columna
const StyledTableCell = styled(TableCell)({
    backgroundColor: '#f5f7f5', // Color
    fontWeight: 'bold',
  });
  const StyledTableCell2 = styled(TableCell)({
    backgroundColor: '#e3f9e4', // Color
    fontWeight: 'normal',
  });

const DialogoResultado = ({ openD, handleCloseD, datos, punto }) => {
  console.log(punto)
  return (
    <Dialog open={openD} onClose={handleCloseD}>
      <DialogTitle>Resultados de la Consulta</DialogTitle>
      <DialogContent>
      <Table>
          <TableBody>
            <TableRow>
              <StyledTableCell>Clase de Suelo</StyledTableCell>
              <StyledTableCell2>{datos.Suelo ? datos.Suelo : 'No se encontraron datos.'}</StyledTableCell2>
            </TableRow>
            <TableRow>
              <StyledTableCell>Area de Actividad</StyledTableCell>
              <StyledTableCell2>{datos.Uso ? datos.Uso : 'No se encontraron datos.'}</StyledTableCell2>
            </TableRow>
            <TableRow>
              <StyledTableCell>Tratamiento Urbanistico</StyledTableCell>
              <StyledTableCell2>{datos.Tratamiento ? datos.Tratamiento : 'No se encontraron datos.'}</StyledTableCell2>
            </TableRow>
            <TableRow>
              <StyledTableCell>Modalidad</StyledTableCell>
              <StyledTableCell2>{datos.Modalidad ? datos.Modalidad : 'No se encontraron datos.'}</StyledTableCell2>
            </TableRow>
            <TableRow>
              <StyledTableCell>Comuna</StyledTableCell>
              <StyledTableCell2>{datos.Comuna ? datos.Comuna : 'No se encontraron datos.'}</StyledTableCell2>
            </TableRow>
            <TableRow>
              <StyledTableCell>UDP</StyledTableCell>
              <StyledTableCell2>{datos.Udp ? datos.Udp : 'No se encontraron datos.'}</StyledTableCell2>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseD} variant="outlined" color="primary">
          Cerrar
        </Button>
        <Button onClick={() => generatePDF(datos, punto)} variant="outlined" color="primary">
          Exporta PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogoResultado;
