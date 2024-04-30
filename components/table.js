document.addEventListener("DOMContentLoaded", function () {
    const formEdicao = document.getElementById('form-edicao');
    const tbody = document.querySelector('tbody');
    const background = document.getElementById('form-container');

    const urlParams = new URLSearchParams(window.location.search);
    const areaParam = urlParams.get('area');

    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            function adicionarLinha(id, categoria, detalhe, ativo, funcionario, estado) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${categoria}</td>
                    <td>${detalhe}</td>
                    <td>${ativo ? 'Sim' : 'Não'}</td>
                    <td>${funcionario}</td>
                    <td>${estado}</td>
                    <td>
                        <button class="edit-button" data-patrimonio-id="${id}">Editar</button>
                        <button class="${ativo ? 'deactivate-button' : 'reactivate-button'}">${ativo ? 'Desativar' : 'Reativar'}</button>
                    </td>
                `;
                tbody.appendChild(tr);
            }

            data.areas.forEach(area => {
                if (!areaParam || area.name.toLowerCase() === areaParam.toLowerCase()) {
                    area.patrimonies.forEach(patrimonio => {
                        adicionarLinha(
                            patrimonio.id,
                            patrimonio.category,
                            patrimonio.detail,
                            patrimonio.active,
                            patrimonio.employee,
                            patrimonio.state
                        );
                    });
                }
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));

    tbody.addEventListener('click', function (event) {
        const target = event.target;
        const row = target.closest('tr');

        if (target.classList.contains('edit-button')) {
            const patrimonioId = target.dataset.patrimonioId;
            const categoria = row.querySelector('td:nth-child(1)').textContent.trim();
            const detalhe = row.querySelector('td:nth-child(2)').textContent.trim();
            const ativo = row.querySelector('td:nth-child(3)').textContent.trim() === 'Sim';
            const funcionario = row.querySelector('td:nth-child(4)').textContent.trim();
            const estado = row.querySelector('td:nth-child(5)').textContent.trim();

            document.getElementById('edit-patrimonio-id').value = patrimonioId;
            document.getElementById('edit-categoria').value = categoria;
            document.getElementById('edit-detalhe').value = detalhe;
            document.getElementById('edit-ativo').checked = ativo;
            document.getElementById('edit-funcionario').value = funcionario;
            document.getElementById('edit-estado').value = estado;

            formEdicao.style.display = 'block';
            background.style.display = 'block';
        } else if (target.classList.contains('deactivate-button') || target.classList.contains('reactivate-button')) {
            const ativo = row.querySelector('td:nth-child(3)');
            ativo.textContent = ativo.textContent === 'Sim' ? 'Não' : 'Sim';
            target.textContent = ativo.textContent === 'Sim' ? 'Desativar' : 'Reativar';
            target.className = ativo.textContent === 'Sim' ? 'deactivate-button' : 'reactivate-button';
            const patrimonioId = target.parentElement.querySelector('.edit-button').dataset.patrimonioId;
            editarPatrimonio(patrimonioId, ativo.textContent === 'Sim', ativo.parentElement.querySelector('td:nth-child(1)').textContent.trim(), ativo.parentElement.querySelector('td:nth-child(2)').textContent.trim(), ativo.parentElement.querySelector('td:nth-child(4)').textContent.trim(), ativo.parentElement.querySelector('td:nth-child(5)').textContent.trim());
        }
    });

    formEdicao.addEventListener('submit', function (event) {
        event.preventDefault();

        const patrimonioId = document.getElementById('edit-patrimonio-id').value;
        const categoria = document.getElementById('edit-categoria').value;
        const detalhe = document.getElementById('edit-detalhe').value;
        const ativo = document.getElementById('edit-ativo').checked;
        const funcionario = document.getElementById('edit-funcionario').value;
        const estado = document.getElementById('edit-estado').value;

        editarPatrimonio(patrimonioId, ativo, categoria, detalhe, funcionario, estado);

        formEdicao.style.display = 'none';
        background.style.display = 'none';
        formEdicao.reset();
    });

    document.getElementById('cancelar-edicao').addEventListener('click', function () {
        formEdicao.style.display = 'none';
        background.style.display = 'none';
        formEdicao.reset();
    });

    function editarPatrimonio(id, ativo, categoria, detalhe, funcionario, estado) {
        Array.from(tbody.children).forEach(row => {
            const rowPatrimonioId = row.querySelector('.edit-button').dataset.patrimonioId;
            if (rowPatrimonioId === id) {
                row.querySelector('td:nth-child(1)').textContent = categoria;
                row.querySelector('td:nth-child(2)').textContent = detalhe;
                row.querySelector('td:nth-child(3)').textContent = ativo ? 'Sim' : 'Não';
                row.querySelector('td:nth-child(4)').textContent = funcionario;
                row.querySelector('td:nth-child(5)').textContent = estado;
            }
        });
    }

    const indexInput = document.getElementById('index-input');
    indexInput.addEventListener('input', function () {
        const searchTerm = indexInput.value.trim().toLowerCase();
        Array.from(tbody.children).forEach(row => {
            const detalhe = row.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
            if (detalhe.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
