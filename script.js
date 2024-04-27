document.addEventListener("DOMContentLoaded", function () {
  const jsonFile = "./data.json";

  // Função para carregar os dados do JSON
  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", jsonFile, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == 200) {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  function createAreaCards(areas) {
    const areaCardsContainer = document.getElementById("area-cards-container");

    areas.forEach(area => {
      const areaCard = document.createElement("div");
      areaCard.classList.add("area-card");

      const title = document.createElement("p");
      title.classList.add("area-card-title");
      title.innerHTML = `<b>${area.name}</b>`;
      areaCard.appendChild(title);

      const peopleQuantity = document.createElement("p");
      peopleQuantity.classList.add("area-card-number-people");
      peopleQuantity.innerHTML = `Quantidade de pessoas: <b>${area.people_quantity}</b>`;
      areaCard.appendChild(peopleQuantity);

      const patrimonyQuantity = document.createElement("p");
      patrimonyQuantity.classList.add("area-card-number-patrimony");
      patrimonyQuantity.innerHTML = `Quantidade de patrimônios: <b>${area.patrimony_quantity}</b>`;
      areaCard.appendChild(patrimonyQuantity);

      const button = document.createElement("button");
      button.classList.add("area-card-btn");
      button.innerHTML = "<b>VER PATRIMÔNIOS</b>";
      button.onclick = function () {
        window.location.href = `patrimonies.html?area=${area.name.toLowerCase()}`;
      };
      areaCard.appendChild(button);

      areaCardsContainer.appendChild(areaCard);
    });
  }

  fetch("https://api.prodemge.gov.br/areas")
    .then(response => {
      return response.json();
    })
    .catch(error => {
      loadJSON(function (response) {
        const areas = JSON.parse(response).areas;
        createAreaCards(areas);
      });
    });

});
