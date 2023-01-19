// добавляем динамические данные с сервера

let main = document.querySelector("main");

// cats.forEach(function(cat) {
//     let card = `<div class="${cat.favourite ? "card like" : "card"}" style="background-image: url(${cat.img_link})">
//         <span>${cat.name}</span>
//     </div>`;
//     main.innerHTML += card 
// });

const updCards = function(data) {
    main.innerHTML = "";
    data.forEach(function(cat) {
        if(cat.id) {
            let card = `<div class="${cat.favourite ? "card like" : "card"}" style="background-image: url(${cat.img_link || "/img/cat.jpeg"})">
                <span>${cat.name}</span>
            </div>`;
            main.innerHTML += card;
        }
    });
    let cards = document.querySelectorAll(".card");
    for (i = 0; i < cards.length; i++) {
        const width = cards[i].offsetWidth;
        cards[i].style.height = width * 0.6 + "px";
    }
};

// let cards = document.querySelectorAll(".card");
// for (i = 0; i < cards.length; i++) {
//     const width = cards[i].offsetWidth;
//     cards[i].style.height = width * 0.6 + "px";
// }




// работает с popup окном

let addBtn = document.querySelector("#add");
let popupForm = document.querySelector("#popup-form");
let closePopupForm = document.querySelector(".popup-close");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!popupForm.classList.contains("acrive")) {
        popupForm.classList.add("active");
        popupForm.parentElement.classList.add("active");
    }
});

closePopupForm.addEventListener("click", () => {
    popupForm.classList.remove("active");
    popupForm.parentElement.classList.remove("active");
});

// создаем экземпляр класса, для формы и добавление котика

const api = new Api("qwaniii");


const getCats = function(api) {
    api.getCats()
        .then(res => res.json())
        .then(data => {
            if (data.message === "ok") {
                updCards(data.data)
            }
        })
}

getCats(api);

let form = document.forms[0];

form.img_link.addEventListener("change", (e) => {
    form.firstElementChild.style.backgroundImage = `url(${e.target.value})`
});

form.img_link.addEventListener("input", (e) => {
    form.firstElementChild.style.backgroundImage = `url(${e.target.value})`
});


form.addEventListener("submit", e => {
    e.preventDefault();
    let body = {};
    for (let i = 0; i  < form.elements.length; i++) {
        let inp = form.elements[i];
        if (inp.type === "checkbox") {
            body[inp.name] = inp.checked;            
        } else if (inp.name && inp.value) {
            if (inp.type === "number") {
                body[inp.name] = +inp.value
            } else {
                body[inp.name] = inp.value
            }
        }
    }
    console.log(body);
    api.addCat(body)
        .then(res => res.json())
        .then(data => {
            if (data.message === "ok") {
                form.reset();
                closePopupForm.click();
            } else {
                console.log(data);
            }
        })
    
});





