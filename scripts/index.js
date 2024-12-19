const buttonText =
    document.documentElement.scrollWidth < 768 ? "Бесплатная консультация" : "Получить бесплатную консультацию";

const selectorBtnConsult = "#promo .button";
const selectorBtnPrice = "#service-section .button";
const selectorBtnContacts = "#contacts-section .button";

let isContactsSection = false;

const appText = {
    btnConsul:
        document.documentElement.scrollWidth < 768 ? "Бесплатная консультация" : "Получить бесплатную консультацию",
    btnPrice: "Расчитать стоимость",
    answerConsult: "Наш специалист свяжется с вами в ближайшее время",
    answerPrice: "Наш специалист свяжется с вами в ближайшее время, чтобы расчитать стоимость услуг",
};

window.addEventListener("resize", main, false);

accordion();
main();
getYandexMaps();

function accordion() {
    const accordion = document.querySelectorAll(".accordion .item");
    const accordionTitle = document.querySelectorAll(".accordion .item > .title");
    accordion.forEach((item) => item.classList.add("close"));
    accordionTitle.forEach((item, i) => item.addEventListener("click", () => accordion[i].classList.toggle("close")));
}

function main() {
    const btnsConsult = document.querySelectorAll(selectorBtnConsult);
    const btnsPrice = document.querySelectorAll(selectorBtnPrice);
    const btnContacts = document.querySelectorAll(selectorBtnContacts);

    btnService(btnsConsult, appText.answerConsult, appText.btnConsul);
    btnService(btnsPrice, appText.answerPrice, appText.btnPrice);
    btnService(btnContacts, appText.answerConsult, appText.btnConsul, true);
}

function btnService(btns, answer, title, isFormModalSkipping = false) {
    isContactsSection = isFormModalSkipping;
    btns.forEach((item) => (item.innerText = title));
    btns.forEach((item) => {
        item.addEventListener("click", () => (isFormModalSkipping ? showModalOk(answer) : showModal(answer, title)));
    });
}

function showModal(msg, btnLabel) {
    document.getElementById("modal").innerHTML = modalForm(msg, btnLabel);
    document.querySelector(".cancel").addEventListener("click", closeModal);

    // const okBtn = document.getElementById("ok");
    // okBtn.disabled = true;
    okBtn.addEventListener("click", () => showModalOk(msg));

    const modalFormInput = {
        uName: document.querySelector("#modal #name"),
        uEmail: document.querySelector("#modal #email"),
        uPhone: document.querySelector("#modal #phone"),
    };

    Object.entries(modalFormInput).forEach((item) =>
        item[1].addEventListener("blur", () => checkForm(item[0], item[1]))
    );
}

function checkForm(key, item) {
    // const formLocationSelector = isContactsSection ? "#contacts-section" : "#modal";
    switch (key) {
        case "uName":
            setStatus(item, item.value.length);
            break;

        case "uEmail":
            setStatus(item, item.value.includes("@"));
            break;

        case "uPhone":
            setStatus(item, item.value.length == 11);
            break;
    }
}

function setStatus(item, status) {
    item.classList.remove("error");
    item.classList.remove("success");
    item.classList.add(status ? "success" : "error");
}

function showModalOk(msg) {
    document.getElementById("modal").innerHTML = modalOk(msg);
    document.getElementsByClassName("cancel")[0].addEventListener("click", closeModal);
}

function closeModal() {
    document.getElementById("modal").innerHTML = "";
}

function modalForm(msg, btnLabel) {
    return `<div class="modal">
            <div class="content">
                <button class="cancel"></button>
                <h2 class="title_2">Заполните форму</h2>
                <p class="p">${msg}</p>

                <div class="form">
                    <label for="name" class="label">
                        Ваше имя:
                    </label>
                    <input type="text" id="name" name="name" placeholder="Данные" required class="input" />

                    <label for="email" class="label">
                        Email:
                    </label>
                    <input type="email" id="email" name="email" placeholder="Ввод" required class="input" />

                    <label for="phone" class="label">
                        Телефон:
                    </label>
                    <input type="text" id="phone" name="message" placeholder="Ввод" required class="input" />

                    <button type="submit" class="button primary" id="ok" >
                        ${btnLabel}
                    </button>
                </div>

                <p class="agreement">
                    Нажимая на&nbsp;кнопку, я&nbsp;даю согласие на
                    <a href="#" target="_blank">
                        обработку своих персональных данных
                    </a>
                    и&nbsp;на&nbsp;
                    <a href="#" target="_blank">
                        информационную рассылку
                    </a>
                    в&nbsp;соответствии с&nbsp;
                    <a href="#" target="_blank">
                        Политикой
                    </a>
                </p>
            </div>
        </div>`;
}

function modalOk(msg) {
    return `
        <div class="modal">
            <div class="content">
                <button class="cancel"></button>
                <h2 class="title_2">Ваша заявка принята</h2>
                <p class="p">${msg}</p>
                <div class="modal-ok"></div>
            </div>
        </div>
`;
}

function getYandexMaps() {
    const coorinates = [43.129006, 131.933248];
    const ymaps = window.ymaps;
    ymaps.ready(init);

    function init() {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        var myMap = new ymaps.Map("map", {
            center: coorinates,
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 17,
        });
        var rossPlacemark = new ymaps.Placemark(
            coorinates,
            {},
            {
                iconLayout: "default#image",
                iconImageHref: "/ross/img/map-marker.svg",
                iconImageSize: [59, 76],
                iconImageOffset: [-25, -76],
            }
        );
        myMap.geoObjects.add(rossPlacemark);
    }
}
