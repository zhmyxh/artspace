import { GET_DATA, VIEWS_FORMAT, TIME_FORMAT } from "./app_formatting.js"
import { Design, Rate } from "./classes.js"

const design_id = GET_DATA('id')

function placeDesign(design) {
    const cover = new Image()
    cover.src = design.cover

    const tags = design.tags

    const design_cover = document.getElementById('watch-design-cover')
    const design_light = document.getElementById('watch-design-light')

    const design_name = document.getElementById('watch-design-header')
    const design_bio = document.getElementById('watch-design-bio-text')

    const design_author_icon = document.getElementById('watch-design-author-icon')
    const design_author_name = document.getElementById('watch-design-author-name')
    const design_author_verification = document.getElementById('watch-design-user-verification-status')

    const design_tags = document.getElementById('watch-design-tags')
    const design_views = document.getElementById('watch-design-views')
    const design_date = document.getElementById('watch-design-date')

    const design_rate_profies = document.getElementById('profie-TOTAL')
    const design_rate_community = document.getElementById('community-TOTAL')

    if (design) {
        design_name.textContent = design.name
        if (design.bio) {
            design_bio.textContent = String(design.bio)
        } else {
            design_bio.textContent = 'Описания нет.'
        }

        design_author_icon.src = design.author.image
        design_author_name.textContent = design.author.username

        if (design.author.verify == true) {
            design_author_verification.innerHTML = `<div class="user-check-mark-mini icon"></div>`
        }

        design_cover.src = design.cover

        if (cover.width < 800) {
            design_cover.style.width = cover.width
        } else {
            design_cover.style.width = '100%'
            design_light.style.left = '0'
        }

        design_light.style.width = design_cover.style.width
        design_light.style.height = design_cover.style.height
        design_light.style.maxWidth = design_cover.style.maxWidth

        design_cover.onload = () => {
            const loader = document.getElementById('watch-design-cover-loading')
            design_light.src = design_cover.src
            loader.remove()
            design_cover.style.height = 'fit-content'
            design_light.style.height = 'fit-content'
        }

        tags.forEach(tag => {
            let tagElement = document.createElement('span')
            tagElement.classList.add('watch-design-tag')
            tagElement.textContent = tag
            design_tags.append(tagElement)
        })

        design_views.textContent = VIEWS_FORMAT(design.views) + ' просмотров'
        design_date.textContent = TIME_FORMAT(design.date) + '・'

        design_rate_profies.textContent = design.rate.profies
        design_rate_community.textContent = design.rate.community
    }
}

function loadDesign(id, name, cover, author, rate, date, tags, views, bio) {
    let design_watch = new Design(id, name, cover, author, rate, date, tags, views, bio)

    return design_watch
}

function watchDesign() {
    fetch('../json/designs.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            data.forEach(design => {
                if (design.id == design_id) {
                    const current_design = loadDesign(
                        design.id,
                        design.name,
                        design.cover,
                        design.author,
                        design.rate,
                        design.date,
                        design.tags,
                        design.views,
                        design.bio)
                    placeDesign(current_design)
                }
            })
        })
        .catch(error => {
            console.error(error)
        })
}

watchDesign()

// RATER

function createRate(id, design, author, rate) {
    const rateDesign = new Rate(id, design, author, rate)

    return rateDesign
}

let thisRate = createRate(
    1,
    14,
    'username',
    {
        T: null,
        V: null,
        D: null,
        C: null,
        OC: null,
        TI: null,
        TOTAL: null
    }
)

function rateDesign(T, V, D, C, OC, TI) {
    thisRate.rate.T = T
    thisRate.rate.V = V
    thisRate.rate.D = D
    thisRate.rate.C = C
    thisRate.rate.OC = OC
    thisRate.rate.TI = TI

    thisRate.rate.TOTAL = 0
    thisRate.rate.TOTAL = thisRate.totalCounter(thisRate.rate)
}

const total_rate = document.getElementById('watch-rater-total-rate')
const crits_rate = document.querySelectorAll('.watch-rate-crit')

rateDesign(1, 1, 1, 1, 1, 1)
total_rate.textContent = thisRate.rate.TOTAL

let T = null
let V = null
let D = null
let C = null

let OC = null
let TI = null

const rater = document.getElementById('watch-rater')
let rateOpen = true

const range_inputs = document.querySelectorAll('.watch-rater-range')
const rate_marks = document.querySelectorAll('.watch-rater-crit-mark')

let isRTL = document.documentElement.dir === 'rtl'

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value
    let percentage = (val - min) * 100 / (max - min)
    if (isRTL) {
        percentage = (max - val)
    }

    target.style.backgroundSize = percentage + '% 100%'
}

if (rateOpen == true) {
    range_inputs.forEach(input => {
        input.addEventListener('input', function () {
            handleInputChange
            rate_marks.forEach(rate => {
                let rate_id = (rate.id).slice(11)
                let input_id = (input.id).slice(17)
                if (rate_id == input_id) {
                    rate.textContent = input.value
                }

                switch (rate_id) {
                    case 'T':
                        T = Number(rate.textContent)
                        crits_rate.forEach(crit => {
                            let crit_id = (crit.id).slice(6)
                            if (crit_id == 'T') {
                                crit.textContent = String(T)
                            }
                        })
                        break

                    case 'V':
                        V = Number(rate.textContent)
                        crits_rate.forEach(crit => {
                            let crit_id = (crit.id).slice(6)
                            if (crit_id == 'V') {
                                crit.textContent = String(V)
                            }
                        })
                        break

                    case 'D':
                        D = Number(rate.textContent)
                        crits_rate.forEach(crit => {
                            let crit_id = (crit.id).slice(6)
                            if (crit_id == 'D') {
                                crit.textContent = String(D)
                            }
                        })
                        break

                    case 'C':
                        C = Number(rate.textContent)
                        crits_rate.forEach(crit => {
                            let crit_id = (crit.id).slice(6)
                            if (crit_id == 'C') {
                                crit.textContent = String(C)
                            }
                        })
                        break

                    case 'OC':
                        OC = Number(rate.textContent)
                        crits_rate.forEach(crit => {
                            let crit_id = (crit.id).slice(6)
                            if (crit_id == 'OC') {
                                crit.textContent = String(OC)
                            }
                        })
                        break

                    case 'TI':
                        TI = Number(rate.textContent)
                        crits_rate.forEach(crit => {
                            let crit_id = (crit.id).slice(6)
                            if (crit_id == 'TI') {
                                crit.textContent = String(TI)
                            }
                        })
                        break
                }

                rateDesign(T, V, D, C, OC, TI)
                total_rate.textContent = thisRate.rate.TOTAL
            })
        })
    })

    range_inputs.forEach(input => {
        input.addEventListener('input', handleInputChange)
    })
}

const rater_collapse_button = document.getElementById('rater-collapse-button')
const rater_collapse_icon = document.getElementById('rater-collapse-icon')
const rater_top_section = document.getElementById('watch-rater-top-section')

rater_collapse_button.addEventListener('click', function () {
    if (rateOpen) {
        rater_collapse_icon.style.transform = 'rotate(90deg)'
        rater.style.height = '8.3%'
        rateOpen = false
    } else {
        rater_collapse_icon.style.transform = 'rotate(-90deg)'
        rater.style.height = '100%'
        rateOpen = true
    }
})