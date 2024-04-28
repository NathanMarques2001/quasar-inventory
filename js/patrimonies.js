document.addEventListener("DOMContentLoaded", function () {
    const jsonFile = "../data.json";

    // Função para carregar os dados do JSON
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

    // Evento de input para o campo de pesquisa
    document.getElementById("index-input").addEventListener("input", function () {
        const query = this.value.trim();
        filterTableByDetail(query);
    });

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
        const urlParams = new URLSearchParams(window.location.search);
        const paramValue = urlParams.get('area');
        console.log(paramValue)

        areas.forEach(area => {
            area.patrimonies.forEach(patrimony => {
                if (area.name.toLowerCase() == paramValue) {
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

    document.getElementById("table-body").addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("edit-button")) {
            alert("Editado!");
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


    // Carregar os dados das áreas
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            fillTable(data.areas);
        })
        .catch(error => {
            console.error("Erro ao carregar o JSON: ", error);
        });
});
