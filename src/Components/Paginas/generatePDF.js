////componente para generar un pdf con los resultados de la consulta//////
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (data) => {
  // Crea una nueva instancia de jsPDF
  const doc = new jsPDF();

  // Agrega un título
  doc.text('Resultados de la Consulta', 20, 20);

  // Define las columnas y filas para la tabla
  const columns = ['Atributo', 'Valor'];
  const rows = [];

  // Convierte el JSON a un formato que jspdf-autotable pueda usar
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      rows.push([key, data[key]]);
    }
  }
  
  // Agrega la tabla al documento
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 30,
  });

  // Guarda el PDF
  doc.save('resultados_consulta.pdf');
};
export default generatePDF