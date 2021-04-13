start();

function start() {
  renderMoviesList();
}

function renderMoviesList() {
  let request = axios.get(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes"
  );

  request.then(renderMovies);
  request.catch(reload);
}

function renderMovies(response) {
  const moviesList = response.data;

  console.log(response.data);
  moviesList.forEach((movie) => {
    let movieHtml = `<div class="movie">
          <img
            src="${movie.imagem}"
          />
          <div class="title">${movie.titulo}</div>
          <button onclick="buy(${movie.id})">
            Comprar
            <ion-icon name="cart-outline"></ion-icon>
          </button>
        </div>`;

    document.querySelector(".movies").innerHTML += movieHtml;
  });
}

function reload() {
  location.reload();
}

function buy(movieId) {
  let name = prompt("Qual o seu nome?");
  let reserves = parseInt(prompt("Quantos assentos?"));

  let data = {
    nome: name,
    quantidade: reserves,
  };
  let request = axios.post(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${movieId}/ingresso`,
    data
  );

  request.then(() => {
    alert("Ingressos comprados com sucesso!");
  });

  request.catch(() => {
    alert("Algo deu errado. Tente novamente mais tarde");
  });
}
