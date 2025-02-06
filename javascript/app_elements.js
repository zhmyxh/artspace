import { USER_SESSION } from "./app_session.js"
import { POPUP_WINDOW } from "./app_formatting.js"

let device

if (window.innerWidth <= 1250) {
    device = 'm'
} else {
    device = 'c'
}

const menu_button = document.getElementById('menu-open-button')
let open = false

menu_button.addEventListener('click', function () {
    console.log(open)
    const pages_block = document.createElement('div')
    if (!open) {
        pages_block.id = 'navigation-pages'
        pages_block.classList = 'display-flex flex-column'
        pages_block.innerHTML = `
                            <div class="navigation-page-link">
                                <a class="navigation-link display-flex align-items" href="index.html">
                                <div class="icon" id="home-icon"></div>
                                <span class="navigation-page-link-text">Главная</span>
                                </a>
                            </div>
                            <div class="navigation-page-link">
                                <a class="navigation-link display-flex align-items" href="designs.html">
                                <div class="icon" id="design-icon"></div>
                                <span class="navigation-page-link-text">Дизайны</span>
                                </a>
                            </div>
                            <div class="navigation-page-link">
                                <a class="navigation-link display-flex align-items" href="reviews.html">
                                <div class="icon" id="review-icon"></div>
                                <span class="navigation-page-link-text">Рецензии</span>
                                </a>
                            </div>
                            <div class="line"></div>
                            <div class="navigation-page-link">
                                <a class="navigation-link display-flex align-items" href="rating.html">
                                <div class="icon" id="rating-icon"></div>
                                <span class="navigation-page-link-text">Рейтинг</span>
                                </a>
                            </div>
                            <div class="navigation-page-link">
                                <a class="navigation-link display-flex align-items" href="profies.html">
                                <div class="icon" id="profies-page-icon"></div>
                                <span class="navigation-page-link-text">Профи</span>
                                </a>
                            </div>`
        document.body.append(pages_block)
        setTimeout(function () {
            pages_block.style.left = '0'
        }, 1)
        open = true
    } else {
        const pages_block_d = document.getElementById('navigation-pages')
        pages_block_d.style.left = '-230px'
        setTimeout(function () {
            pages_block_d.remove()
        }, 200)
        open = false
    }
})

const navigation_profile = document.getElementById('navigation-profile')

function createProfileElements() {
    let profile_block = document.createElement('div')

    if (USER_SESSION) {
        profile_block.classList.add('display-flex', 'align-items', 'jc-center')
        profile_block.id = 'navigation-profile-button'

        profile_block.innerHTML = `<img id="navigation-profile-icon" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile image"/>`
        navigation_profile.append(profile_block)

    } else {
        profile_block.classList.add('default-button')
        profile_block.id = 'login-button'

        profile_block.innerHTML = `Войти`
        navigation_profile.append(profile_block)
    }
}

const footer = document.getElementById('footer')
footer.innerHTML = `
        <div id="footer-links" class="display-flex align-items jc-center flex-column">
        <a href="rules.html" class="footer-link">Правила</a>
        <a href="updates.html" class="footer-link">Обновления</a>
        <a href="policy-personal.html" class="footer-link">Пользовательское соглашение</a>
        <a href="https://t.me/artspacedesigns_bot" class="footer-link">Обратная связь: @artspacedesigns_bot</a>
        <div class="footer-social-link display-flex align-items jc-space-between" id="telegram-link">
        <img class="footer-social-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"/>
        <span class="footer-social-text">Telegram</span>
        </div>
        <span id="copyright-text">© 2025, ARTSPACE. All rights reserved.</span>
        </div>`

const telegram_link = document.getElementById('telegram-link')
telegram_link.addEventListener('click', function () {
    window.location.href = 'https://t.me/artspacedesigns'
})

createProfileElements()

// POPUP window

const popup_window_text_1 = `Особая система для оценивания дизайнов. Вы можете поставить оценку выбранной работе от 15 до 100 баллов.
                            Балл расчитывается по специальной формуле, которая в свою очередь состоит из нескольких критериев.`
POPUP_WINDOW('rater-info-icon', 'Рейтер', popup_window_text_1, { right: '20px', top: '20px' }, { width: '230px' })

POPUP_WINDOW(
    'watch-rater-public-button',
    null,
    'Перед публикацией вы сможете написать свою рецензию, и изменить свою оценку.',
    { right: '0', bottom: '25px' },
    { width: '230px' })