
function generateTable() {
    const tableContainer = document.getElementById("index-body-container");
    const table = document.createElement("table");
    table.setAttribute("id", "table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    thead.innerHTML = `
            <tr>
                <th>Categoria</th>
                <th>Detalhe</th>
                <th>Ativo</th>
                <th>Área</th>
                <th>Funcionário</th>
                <th>Estado</th>
                <th>Ações</th>
            </tr>
        `;
    tbody.setAttribute("id", "table-body");
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

// Chama a função para gerar a tabela quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
    generateTable();

    document.getElementById("index-input").addEventListener("input", function () {
        const query = this.value.trim();
        filterTableByDetail(query);
    });

    document.getElementById("table-body").addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("edit-button")) {
            const data = {
                category: target.parentNode.parentNode.querySelector("td:nth-child(1)").textContent,
                detail: target.parentNode.parentNode.querySelector("td:nth-child(2)").textContent,
                employee: target.parentNode.parentNode.querySelector("td:nth-child(5)").textContent,
                state: target.parentNode.parentNode.querySelector("td:nth-child(6)").textContent
            }
            openForm(data);
        } else if (target.classList.contains("deactivate-button")) {
            const activeCell = target.parentNode.parentNode.querySelector("td:nth-child(3)");

            if (activeCell.textContent === "Sim") {
                activeCell.textContent = "Não";
                target.className = "reactivate-button";
                target.textContent = "Reativar";
                alert("O patrimônio foi inativado.");
            }
        } else if (target.classList.contains("reactivate-button")) {
            const activeCell = target.parentNode.parentNode.querySelector("td:nth-child(3)");

            if (activeCell.textContent === "Não") {
                activeCell.textContent = "Sim";
                target.className = "deactivate-button";
                target.textContent = "Inativar";
                alert("O patrimônio foi reativado.");
            }
        }
    });

    fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            fillTable(data.areas);
        })
        .catch(error => {
            console.error("Erro ao carregar o JSON: ", error);
        });
});

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", jsonFile, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == 200) {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function filterTableByDetail(query) {
    const rows = document.querySelectorAll("#table-body tr");
    rows.forEach(row => {
        const detailCell = row.querySelector("td:nth-child(2)"); // Segundo TD contém o detalhe do patrimônio
        const detail = detailCell.textContent.trim().toLowerCase();
        if (detail.includes(query.toLowerCase())) {
            row.style.display = ""; // Exibe a linha se o detalhe do patrimônio corresponder à pesquisa
        } else {
            row.style.display = "none"; // Oculta a linha se o detalhe do patrimônio não corresponder à pesquisa
        }
    });
}

function fillTable(areas) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Limpa o conteúdo anterior

    areas.forEach(area => {
        area.patrimonies.forEach(patrimony => {
            const queryParam = getQueryParam();
            if (queryParam == area.name.toLowerCase() || queryParam == null) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${patrimony.category}</td>
                    <td>${patrimony.detail}</td>
                    <td>${patrimony.active ? "Sim" : "Não"}</td>
                    <td>${area.name}</td>
                    <td>${patrimony.employee}</td>
                    <td>${patrimony.state}</td>
                    <td>
                        <button class="edit-button">Editar</button>
                        <button class="${patrimony.active ? 'deactivate-button' : 'reactivate-button'}">${patrimony.active ? "Inativar" : "Reativar"}</button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        });
    });
}

function getQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('area');
}

function openForm(data) {
    document.querySelector("#edit-form-container").style.display = "block";
    document.querySelector("#category-input").value = data.category;
    document.querySelector("#detail-input").value = data.detail
    document.querySelector("#employee-input").value = data.employee;
    document.querySelector("#state-input").value = data.state;

    document.querySelector("#save-button").addEventListener("click", function () {
        
    })
}