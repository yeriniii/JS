// HTML에서 해당 ID를 가진 엘리먼트를 가져옵니다.
const movieContainer = document.getElementById("movie-container");

// 영화 정보를 받아와서 카드를 생성하는 함수를 정의합니다.
const createCard = (movie) => {
  const { id, title, overview, poster_path, vote_average } = movie;

  // 필요한 엘리먼트들을 생성합니다.
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  const image = document.createElement("img");
  const titleElement = document.createElement("h2");
  const overviewElement = document.createElement("p");
  const voteAverageElement = document.createElement("p");

  // 각 엘리먼트에 클래스를 부여합니다.
  card.className = "card";
  cardBody.className = "card-body";
  image.className = "card-img";
  titleElement.className = "card-title";
  overviewElement.className = "card-overview";
  voteAverageElement.className = "card-voteAverage";

  // 이미지 소스를 설정합니다.
  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

  // 각 엘리먼트에 텍스트 내용을 설정합니다.
  titleElement.textContent = title;
  overviewElement.textContent = overview;
  voteAverageElement.textContent = `평점: ${vote_average}`;

  // 생성한 엘리먼트들을 조립합니다.
  card.appendChild(image);
  card.appendChild(cardBody);
  cardBody.appendChild(titleElement);
  cardBody.appendChild(overviewElement);
  cardBody.appendChild(voteAverageElement);

  card.id = id; //card라는 html엘리먼트에 id 속성추가->고유한 ID부여

  return card;
};
const input = document.querySelector("#input");
const searchbutton = document.querySelector("#submit");

const displayMovies=movies=>{
  movieContainer.innerHTML=""; //기존 화면의 영화 카드는 삭제

  movies.forEach((movie) => {
    const movieCard = createCard(movie);
    movieContainer.appendChild(movieCard);
    movieCard.addEventListener("click", () => {
      const movieID = movieCard.id;
      alert(`id: ${movieID}`);
    });
  });
};

const searchmovietitle = () => { //제목 검색 함수
  const movietitle = input.value.toLowerCase(); // 입력된 검색어 소문자로 변환
  const filtermovies = movie.filter((search) => //movie 배열에서 검색어를 포함하는 영화 필터링
    search.title.toLowerCase().includes(movietitle));
  displayMovies(filtermovies);
};

searchbutton.addEventListener("click", searchmovietitle);

// API 요청을 보내고 응답 데이터를 처리합니다.
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjRkY2E3YzRhYjRjOGY3Zjc5NjA0ZWRkNTQwMjE2NiIsInN1YiI6IjY1OTNiNzljZWJiOTlkNWUxN2EwMTRlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BzYyp6rUTuS2MYX8KCIEgGrkns1anoyP2yhoqvkXv-Q",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    // 각 영화에 대해 createCard 함수를 호출하여 카드를 생성하고
    // movieContainer에 추가합니다.
    movie = data.results;
    displayMovies(movie);
  })
  .catch((err) => console.error(err));
