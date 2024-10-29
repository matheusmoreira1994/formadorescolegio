const SHEETDB_URL = 'https://sheetdb.io/api/v1/v756xndp4xvm1';

// Função para buscar dados e preencher a tabela
async function fetchData() {
  try {
    const response = await fetch(SHEETDB_URL);
    const data = await response.json();
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach(row => {
      const rowElement = document.createElement('tr');

      // Criação das células para cada campo
      ['ID', 'Nome', 'Cargo', 'Telefone', 'Estado Civil', 'Ingresso', 'Niver', 'FP', 'FC', 'Quant de formandos', 'Disponível para novos formandos?'].forEach(field => {
        const cellElement = document.createElement('td');
        cellElement.textContent = row[field] || '';
        rowElement.appendChild(cellElement);
      });

      tableBody.appendChild(rowElement);
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

// Carrega os dados ao iniciar
fetchData();
