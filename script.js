document.addEventListener('DOMContentLoaded', function() {
  const selectFuncionario = document.getElementById('edit-funcionario');

  fetch('../data.json')
  .then(response => response.json())
  .then(data => {
    data.areas.forEach(function(area) {
      area.employees.forEach(function(employee) {
        const option = document.createElement('option');
        option.value = employee.name; 
        option.textContent = employee.name;
        selectFuncionario.appendChild(option);
      });
    });
  });
});
