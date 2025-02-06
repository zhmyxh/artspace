import { FORMAT_APPLY, VIEWS_FORMAT, IMAGE_RESIZE, QUALITY, POPUP_WINDOW, GET_DATA } from "./app_formatting.js"
import { Design, Review } from "./classes.js"

const designs_block = document.getElementById('designs-block')
const reviews_block = document.getElementById('reviews-block')

const watch_review_block = document.getElementById('watch-reviews')

function clearDesignsArea() {
  const design_post_for_remove = document.querySelectorAll('.design-post')
  design_post_for_remove.forEach(element => {
    element.remove()
  })
}

function createDesign(id, name, cover, author, date, rate, tags, views) {
  let design_post = new Design(id, name, cover, author, date, rate, tags, views)

  return design_post
}

function createReview(id, text, name, design, author, date, rate) {
  let review_post = new Review(id, text, name, design, author, date, rate)

  return review_post
}

function appendDesign(id, name, cover, author, date, rate, tags, views) {
  let design_post_create = document.createElement('div')

  let user_verification
  if (author.verify) {
    user_verification = '<div class="user-check-mark-mini icon"></div>'
  } else {
    user_verification = ''
  }

  let viewsF = views
  viewsF = VIEWS_FORMAT(viewsF)

  let checkLength = 0
  let max_tags = 0

  tags.forEach(tag => {
    checkLength += tag.length
  })

  if (checkLength > 26) {
    max_tags = 2
  } else {
    max_tags = 4
  }

  let tagBlocks = `<div class="design-tags display-flex align-center">`
  if (tags.length >= 1) {
    tags.forEach((tag, index) => {
      if (index < max_tags) {
        if (tag.length < 7) {
          tagBlocks += `<span class="design-tag">${tag}</span>`
        } else {
          let tagLength = tag.length - 7
          tag = tag.slice(0, -tagLength)
          tagBlocks += `<span class="design-tag">${tag}...</span>`
        }
      }
    })

    let length = tags.length
    if (length >= max_tags) {
      length -= max_tags
      tagBlocks += `<span class="design-tag">ещё ` + length + `</span>`
    }
    tagBlocks += `</div></div></div>`
  } else {
    tagBlocks = ``
  }

  design_post_create.classList.add('design-post')
  design_post_create.id = 'post_id#' + id
  design_post_create.innerHTML = `
              <a class="empty-link design-cover-link" href="watch.html?id=${id}&author=${author.username}">
              <div class="design-cover display-flex">
              <img class="design-cover-image" loading="lazy" src="${cover}"/>
              </div></a>
              <div class="design-data display-flex flex-column">
              <div class="design-info display-flex jc-space-between">
              <div class="design-header display-flex">
              <div class="design-author display-flex align-items jc-center">
              <img class="design-author-icon" src="${author.image}"/>
              </div>
              <div class="design-info-text display-flex flex-column jc-center">
              <span class="design-name">${name}</span>
              <a class="empty-link" href=""><div class="design-author-block display-flex">
              <span class="design-author-name">${author.username}</span>
              <div class="design-user-verification-status display-flex align-items">${user_verification}</div></div></a>
              </div></div>
              <div class="design-rate-block display-flex align-items jc-space-between">
              <div class="design-rate design-rate-by-profies display-flex align-items jc-center">
              <span class="design-rate-text">${rate.profies}</span></div>
              <div class="design-rate design-rate-by-community display-flex align-items jc-center">
              <span class="design-rate-text">${rate.community}</span>
              </div></div></div>
              <div class="design-views display-flex align-items">
              <span class="design-views-text">${viewsF} просмотров</span>
              </div>
              ${tagBlocks}`

  return design_post_create
}

function appendReview(id, text, name, design, author, date, rate) {
  let review_post_create = document.createElement('div')

  let user_verification
  if (author.verify) {
    user_verification = '<div class="user-check-mark-mini icon"></div>'
  } else {
    user_verification = ''
  }

  let design_cover = new Image()
  let changed_cover
  design_cover.src = design.cover

  if (design_cover.height > design_cover.width) {
    changed_cover = `style="transform: rotate(90deg);"`
  } else {
    changed_cover = ``
  }

  design_cover = IMAGE_RESIZE(design_cover)

  let format_text = ''
  let text_length = text.length
  const max_letters = 250
  if (text_length > max_letters) {
    text_length -= max_letters
    format_text = text.slice(0, -text_length)
    format_text += '...<a href="" class="review-read-all-link">Читать полностью...</a>'
  }

  let review_design = ''

  if (design_id) {
    review_design = ''
  } else {
    review_design = `<div class="review-design display-flex flex-column">
              <a href="watch.html?id=${design.id}&author=${design.author}"><img class="review-design-cover" src="${design_cover.src}"/>
              </a>
              <div class="review-design-author">
              <span class="review-design-author-name">Дизайн от <a href="">${design.author}</a></span></div>
              </div>`
  }

  review_post_create.classList.add('review-post')
  review_post_create.id = 'review_id#' + id
  review_post_create.innerHTML = `
              <div class="review-info display-flex align-items">
              <div class="review-author display-flex align-items">
              <img class="design-author-icon" src="${author.image}"/>
              </div>
              <div class="review-info-section display-flex flex-column">
              <a href=""><div class="review-author-block display-flex align-items">
              <span class="review-author-name">${author.username}</span>
              <div class="design-user-verification-status display-flex align-items">
              ${user_verification}
              </div></div></a><span class="review-header">${name}</span>
              </div></div>
              <div class="review-content display-flex">
              <span class="review-text">${format_text}</span>
              </div>
              ${review_design}
              <div class="review-rate-block display-flex align-items jc-space-between">
              <span class="review-rate-header-text">Итоговая оценка: </span>
              <div class="review-rate-crits display-flex align-items jc-center">
              <div class="review-crits-for-rate display-flex align-items">
              <span class="review-crit">${rate.T}</span>
              <span class="review-crit">${rate.V}</span>
              <span class="review-crit">${rate.D}</span>
              <span class="review-crit">${rate.C}</span>
              <span class="review-crit review-crit-OC">${rate.OC}</span>
              <span class="review-crit review-crit-TI">${rate.TI}</span>
              </div>
              <span class="review-rate-total">${rate.total}</span>
              </div></div>`

  return review_post_create
}

function loadDesigns(filter) {
  fetch('../json/designs.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      const postsCount = data.length
      const max_posts = 5

      let posts = []
      designs_block.innerHTML = ''

      for (let i = 0; i < postsCount; i++) {
        posts.push(createDesign(data[i].id,
          data[i].name,
          data[i].cover,
          data[i].author,
          {
            profies: data[i].rate.profies,
            community: data[i].rate.community
          },
          data[i].date,
          data[i].tags,
          data[i].views
        ))
      }

      if (filter.condition == 'best-p') {
        posts.sort((a, b) => b.rate.profies - a.rate.profies)
      }

      if (filter.condition == 'best-c') {
        posts.sort((a, b) => b.rate.community - a.rate.community)
      }

      if (filter.condition == 'new') {
        posts.sort((a, b) => b.id - a.id)
      }

      if (filter.condition == 'old') {
        posts.sort((a, b) => a.id - b.id)
      }

      if (filter.condition == 'popular') {
        posts.sort((a, b) => b.views - a.views)
      }

      if (filter.name) {
        String(filter.name)
        posts = posts.filter(post => post.name.includes(filter.name))
      }

      if (filter.tags.length >= 1) {
        let tagsFilter = filter.tags
        posts = posts.filter(function (post) {
          let checkTags = tagsFilter.every(tag => post.tags.includes(tag))
          return checkTags
        })
      }

      posts.forEach(post => {
        designs_block.append(appendDesign(post.id, post.name, post.cover, post.author, post.date, post.rate, post.tags, post.views))
      })

      POPUP_WINDOW(
        '.design-rate-by-profies',
        'Оценка от профи',
        `Средняя оценка от профессиональных креаторов.`,
        { top: '-110px' },
        { width: '220px' })

      POPUP_WINDOW(
        '.design-rate-by-community',
        'Оценка от сообщества',
        `Средняя оценка от обычных пользователей.`,
        { top: '-110px' },
        { width: '220px' })
    })
    .catch(error => {
      console.error(error)
    })
}

function loadReviews(filter) {
  fetch('../json/reviews.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      const reviewsCount = data.length
      const max_reviews = 5

      let reviews = []

      for (let i = 0; i < reviewsCount; i++) {
        reviews.push(createReview(data[i].id,
          data[i].text,
          data[i].name,
          data[i].design,
          data[i].author,
          data[i].date,
          data[i].rate
        ))
      }

      if (filter.name) {
        String(filter.name)
        reviews = reviews.filter(review => review.name.includes(filter.name))
      }

      if (filter.tags.length >= 1) {
        let tagsFilter = filter.tags
        reviews = reviews.filter(function (review) {
          let checkTags = tagsFilter.every(tag => review.design.tags.includes(tag))
          return checkTags
        })
      }

      if (filter.condition == 'new') {
        reviews.sort((a, b) => b.id - a.id)
      }

      if (filter.condition == 'old') {
        reviews.sort((a, b) => a.id - b.id)
      }

      if (filter.condition == 'only-profies') {
        reviews = reviews.filter(review => review.author.verify == true)
      }

      if (filter.condition == 'only-community') {
        reviews = reviews.filter(review => review.author.verify == false)
      }

      if (filter.condition == 'best') {
        reviews.sort((a, b) => b.rate.total - a.rate.total)
      }

      if (filter.for) {
        reviews = reviews.filter(review => review.design.id == design_id)

        watch_review_block.innerHTML = ''
        reviews.forEach(review => {
          watch_review_block.append(appendReview(review.id, review.text, review.name, review.design, review.author, review.date, review.rate))
        })
        if (watch_review_block.innerHTML == '') {
          const watch_bottom_section = document.getElementById('watch-bottom-section')
          watch_bottom_section.innerHTML = ''
          watch_bottom_section.remove()
        }
      } else {
        reviews_block.innerHTML = ''
        reviews.forEach(review => {
          reviews_block.append(appendReview(review.id, review.text, review.name, review.design, review.author, review.date, review.rate))
        })
      }
    })
    .catch(error => {
      console.error(error)
    })
}

let filters = {
  name: null,
  tags: [],
  condition: 'new',
  for: null
}

const design_id = GET_DATA('id')

if (design_id) {
  filters.for = 'design'
} else {
  filters.for = null
}

const filter_search_name = document.getElementById('filter-search')
const filter_tags = document.getElementById('filter-tags')
const filter_tags_section = document.getElementById('filter-tags-section')

const filter_select_button = document.getElementById('filter-select-button')
const filter_select_variants = document.querySelectorAll('.filter-select-input')
const filter_select_selected = document.getElementById('filter-selected-text')

const filter_select_block = document.getElementById('filters-select')

if (filter_search_name) {
  filter_search_name.addEventListener('input', function () {
    let search_name = filter_search_name.value
    filters.name = search_name

    if (designs_block) {
      loadDesigns(filters)
    }

    if (reviews_block) {
      loadReviews(filters)
    }
  })
}

if (filter_tags) {
  filter_tags.addEventListener('input', function () {
    let tags = []
    let filter_tags_string = filter_tags.value
    const words = filter_tags_string.split(',');

    tags = words
      .map(word => word.trim())
      .filter(word => word.startsWith('#') && word.length > 2)

    tags = tags.filter(function (item, pos) {
      return tags.indexOf(item) == pos
    })

    const newTagArray = tags.map(tag => tag.replace(/[^a-zA-Z0-9_]/g, ""));

    tags = newTagArray

    filters.tags = tags

    if (designs_block) {
      loadDesigns(filters)
    }

    if (reviews_block) {
      loadReviews(filters)
    }
  })
}

let listOpened

if (filter_select_button) {
  filter_select_button.addEventListener('click', function () {
    const list = document.getElementById('filters-select-list')
    const selectIcon = document.getElementById('filter-select-icon')

    if (listOpened) {
      list.classList.add('hidden')
      selectIcon.style.transform = 'rotate(90deg)'
      listOpened = false
    } else {
      list.classList.remove('hidden')
      selectIcon.style.transform = 'rotate(-90deg)'
      listOpened = true
    }
  })
}

if (filter_select_variants) {
  filter_select_variants.forEach(variant => {
    variant.addEventListener('input', function (element) {
      const filter_select_text = document.querySelectorAll('.filter-select-text')
      filter_select_text.forEach(label => {
        let labelFor = label.getAttribute('for')
        if (labelFor == variant.id) {
          filter_select_selected.textContent = 'Фильтр: ' + label.textContent
          filters.condition = variant.value
        }
      })

      if (designs_block) {
        loadDesigns(filters)
      }

      if (reviews_block) {
        loadReviews(filters)
      }
    })
  })
}

window.onload = function () {
  FORMAT_APPLY()
}

if (designs_block) {
  loadDesigns(filters)
}

if (reviews_block || watch_review_block) {
  loadReviews(filters)
}