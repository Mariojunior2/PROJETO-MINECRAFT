/*Ele faz o carrinho funcionar*/
let carousel = document.querySelector(".carousel");
let btns = document.querySelectorAll(".wrapper i");
let carouselChildren = [...carousel.children];
let wrapper = document.querySelector(".wrapper");

//Obter a largura do card
let cardWidth = carousel.querySelector(".card").offsetWidth;
let isDragging = false,
  startX,
  startScrollLeft,
  isAutoPlay = true,
  timeoutId;

//obter o numero de cards que podem caber no carrossel de uma so vez
let cardsPerView = Math.round(carousel.offsetWidth / cardWidth);

//inserir os ultimos cards copiados no inicio do carrossel para um deslocamento infinito
carouselChildren
  .slice(-cardsPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

//inserir alguns primeiros cards copiados no fim do carrossel para um deslocamento infinito
carouselChildren.slice(0, cardsPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    //if o id do button clicado for esquerdo, o carrossel desloca-se para a esquerda pela largura do card; else, desloca-se para a direita pela largura do card
    carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
  });
});

let dragStart = (e) => {
  isDragging = true;

  carousel.classList.add("dragging");

  //registo da posicao inicial do cursor e do deslocamento
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

let dragging = (e) => {
  //regressando aqui se o valor isDragging for falso
  if (!isDragging) return;

  //carrossel desloca-se de acordo com o cursor do mouse
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

let dragStop = () => {
  isDragging = false;

  carousel.classList.remove("dragging");
};

let infiniteScroll = () => {
    //se o carrossel estiver no inicio, desloque-se para o fim
    //caso contrario, o carrossel esta no fim, deslocar para o cursor de inicio
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 1 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

   //limpar o tempo limite e iniciar a reproducao automatica se o mouse n estiver sobre o carrossel
  clearTimeout(timeoutId);

};

carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);


wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

