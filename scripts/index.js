const selectorBtnConsult = "#promo .button";
const selectorBtnPrice = "#service-section .button";

const appText = {
    btnConsul:
        document.documentElement.scrollWidth < 768 ? "Бесплатная консультация" : "Получить бесплатную консультацию",
    btnPrice: "Расчитать стоимость",
    answerConsult: "Наш специалист свяжется с вами в ближайшее время",
    answerPrice: "Наш специалист свяжется с вами в ближайшее время, чтобы расчитать стоимость услуг",
};

const contactsForm = document.forms.contactsForm;

accordion();
main();
getYandexMaps();

function main() {
    const btnConsult = document.querySelectorAll(selectorBtnConsult);
    const btnsPrice = document.querySelectorAll(selectorBtnPrice);

    btnService(btnConsult, appText.answerConsult, appText.btnConsul);
    btnService(btnsPrice, appText.answerPrice, appText.btnPrice);

    contactsForm.okBtn.innerText = appText.btnConsul;
    formService(contactsForm);
}

function btnService(btns, answer, title) {
    btns.forEach((item) => (item.innerText = title));
    btns.forEach((item) => {
        item.addEventListener("click", () => showModal(answer, title));
    });
}

function showModal(msg, btnLabel) {
    document.getElementById("modal").innerHTML = modalForm(msg, btnLabel);
    document.querySelector(".cancel").addEventListener("click", closeModal);

    const form = document.forms.modalForm;
    formService(form);
}

function formService(form) {
    form.addEventListener("change", () => (form.okBtn.disabled = !form.checkValidity()));
    form.addEventListener("submit", (event) => sendData(event));
}

async function sendData(event) {
    event.preventDefault();

    try {
        const response = await fetch("/ross/script/send_email.php", {
            method: "POST",
            body: new FormData(event.target),
        });

        if (!response.ok) {
            console.log(response);

            showСonfirmation(`${response.status}: ${response.statusText}`, false);
            return;
        }

        showСonfirmation(form.okBtn.innerText === "Расчитать стоимость" ? appText.answerPrice : appText.answerConsult);
    } catch (error) {
        console.error(error);
        showСonfirmation(error, false);
    }
}

function showСonfirmation(msg, isOk = true) {
    document.getElementById("modal").innerHTML = confirmationModal(msg, isOk);
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

                <form name="modalForm" class="form">
                    <label for="uName" class="label">Ваше имя:</label>
                    <input name="uName" type="text" placeholder="Данные" required class="input" />

                    <label for="uEmail" class="label">Email:</label>
                    <input type="email" name="uEmail" placeholder="Ввод" required class="input" />

                    <label for="uPhone" class="label">Телефон:</label>
                    <input
                        name="uPhone"
                        type="tel"
                        placeholder="+7 000 000-00-00"
                        required
                        class="input"
                    />

                    <button name="okBtn" type="submit" class="button primary" disabled>
                        ${btnLabel}
                    </button>
                </form>

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

function confirmationModal(msg, isOk) {
    const title = isOk ? "Ваша заявка принята" : "¯&#92;_(ツ)_/¯";

    return `
        <div class="modal">
            <div class="content">
                <button class="cancel"></button>
                <h2 class="title_2">${title}</h2>
                <p class="p">${msg}</p>
                <div class="modal-ok"></div>
            </div>
        </div>
`;
}

function accordion() {
    const accordion = document.querySelectorAll(".accordion .item");
    const accordionTitle = document.querySelectorAll(".accordion .item > .title");
    accordion.forEach((item) => item.classList.add("close"));
    accordionTitle.forEach((item, i) => item.addEventListener("click", () => accordion[i].classList.toggle("close")));
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
        const pathPrefix = location.pathname.includes("ross") ? "/ross" : ".";
        var rossPlacemark = new ymaps.Placemark(
            coorinates,
            {},
            {
                iconLayout: "default#image",
                iconImageHref: `${pathPrefix}/img/map-marker.svg`,
                iconImageSize: [59, 76],
                iconImageOffset: [-25, -76],
            }
        );
        myMap.geoObjects.add(rossPlacemark);
    }
}
