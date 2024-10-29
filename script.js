const SHEETDB_URL = 'https://sheetdb.io/api/v1/v756xndp4xvm1';
let currentRowId = null;

async function fetchData() {
  try {
    const response = await fetch(SHEETDB_URL);
    const data = await response.json();
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach(row => {
      const rowElement = document.createElement('tr');
      
      ['Nome', 'Cargo', 'Telefone', 'Estado Civil', 'Ingresso', 'Niver', 'FP', 'FC', 'Quant de formandos', 'Disponível para novos formandos?'].forEach(field => {
        const cellElement = document.createElement('td');
        cellElement.textContent = row[field] || '';
        rowElement.appendChild(cellElement);
      });

      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.className = 'edit-btn';
      editButton.onclick = () => openEditForm(row);
      editCell.appendChild(editButton);
      rowElement.appendChild(editCell);

      tableBody.appendChild(rowElement);
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

function openEditForm(row) {
  currentRowId = row.id; // Assumindo que há um campo 'id' em cada linha de dados
  document.getElementById('editNome').value = row.Nome || '';
  document.getElementById('editCargo').value = row.Cargo || '';
  document.getElementById('editTelefone').value = row.Telefone || '';
  document.getElementById('editEstadoCivil').value = row["Estado Civil"] || '';
  document.getElementById('editIngresso').value = row.Ingresso || '';
  document.getElementById('editNiver').value = row.Niver || '';
  document.getElementById('editFP').value = row.FP || '';
  document.getElementById('editFC').value = row.FC || '';
  document.getElementById('editQuantFormandos').value = row['Quant de formandos'] || '';
  document.getElementById('editDisponivel').checked = row['Disponível para novos formandos?'] === 'Sim';
  document.getElementById('editForm').style.display = 'block';
}

async function updateRow() {
  if (!currentRowId) {
    console.error("ID da linha atual não encontrado!");
    return;
  }

  const updatedData = {
    Nome: document.getElementById('editNome').value,
    Cargo: document.getElementById('editCargo').value,
    Telefone: document.getElementById('editTelefone').value,
    "Estado Civil": document.getElementById('editEstadoCivil').value,
    Ingresso: document.getElementById('editIngresso').value,
    Niver: document.getElementById('editNiver').value,
    FP: document.getElementById('editFP').value,
    FC: document.getElementById('editFC').value,
    "Quant de formandos": document.getElementById('editQuantFormandos').value,
    "Disponível para novos formandos?": document.getElementById('editDisponivel').checked ? 'Sim' : 'Não'
  };

  try {
    const response = await fetch(`${SHEETDB_URL}/id/${currentRowId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });

    const result = await response.json();
    if (response.ok) {
      alert('Dados atualizados com sucesso!');
      document.getElementById('editForm').style.display = 'none';
      fetchData();
    } else {
      console.error("Erro ao atualizar:", result);
    }
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
  }
}

fetchData();
