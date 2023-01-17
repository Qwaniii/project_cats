let main = document.querySelector("main");
cats.forEach(function(cat) {
    let card = `<div class="${cat.favourite ? "card like" : "card"}" style="background-image: url(${cat.img_link})">
        <span>${cat.name}</span>
    </div>`;
    main.innerHTML += card 
});

let cards = document.querySelectorAll(".card");
for (i = 0; i < cards.length; i++) {
    const width = cards[i].offsetWidth;
    cards[i].style.height = width * 0.6 + "px";
}