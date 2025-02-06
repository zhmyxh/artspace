// FORMATTING

export function FORMAT_APPLY() {
  const designNameChecker = document.querySelectorAll('.design-header-name')

  if (designNameChecker) {
    designNameChecker.forEach(element => {
      let text = element.textContent
      let checkNumber = null
      if (window.innerWidth <= 1250) {
        checkNumber = 15
      } else {
        checkNumber = 20
      }
      if (text.length > checkNumber) {
        let sliceText = text.length - checkNumber
        element.textContent = text.slice(0, -sliceText)
        element.textContent += "..."
      }
    })
  }
}

export function VIEWS_FORMAT(viewsF) {
  viewsF = String(viewsF)

  if (viewsF >= 10000) {
    if (viewsF < 100000) {
      let ten = viewsF.slice(0, -3)
      let other = viewsF.slice(2)
      if (other[0] == '0') {
        other = other.slice(0, -3)
        viewsF = ten
      } else {
        other = other.slice(0, -2)
        viewsF = ten + ',' + other
      }
      viewsF += ' тыс.'

      return viewsF
    }

    if (viewsF >= 100000 && viewsF < 1000000) {
      let hundred = viewsF.slice(0, -3)
      let other = viewsF.slice(3)
      if (other[0] == '0') {
        other = other.slice(0, -3)
        viewsF = hundred
      } else {
        other = other.slice(0, -2)
        viewsF = hundred + ',' + other
      }
      viewsF += ' тыс.'

      return viewsF
    }

    if (viewsF >= 1000000) {
      let million = viewsF.slice(0, -6)
      let other = viewsF.slice(1)
      if (other[0] == '0') {
        other = other.slice(0, -6)
        viewsF = million
      } else {
        other = other.slice(0, -5)
        viewsF = million + ',' + other
      }
      viewsF += ' млн.'

      return viewsF
    }
  } else {
    return viewsF
  }
}

export function IMAGE_RESIZE(imageArg) {
  const image = new Image()
  image.src = imageArg.src
  image.onload = () => {
    if (image.height > image.width) {
      imageArg.style.transform = "rotate(90deg)"
    }
  };

  imageArg.onerror = () => {
    console.error("Ошибка загрузки изображения:", imageArg.src)
  }

  return image
}

export function GET_DATA(key) {
  const url = new URL(window.location.href)
  return url.searchParams.get(key)
}

export function QUALITY(src) {
  let img = document.createElement('img')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  img.src = src

  canvas.width = img.width
  canvas.height = img.height

  ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2)
  ctx.drawImage(canvas, 0, 0, img.width, img.height)

  const lowQualityImage = canvas.toDataURL('image/jpeg', 0.3)

  img.src = lowQualityImage

  return img
}

export function TIME_FORMAT(dateString) {
  const [day, month, year] = dateString.split('.').map(Number)
  const inputDate = new Date(year, month - 1, day)
  const currentDate = new Date()

  const diffInMs = currentDate - inputDate
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  function declension(num, forms) {
    if (num % 10 === 1 && num % 100 !== 11) {
      return forms[0]
    } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
      return forms[1]
    } else {
      return forms[2]
    }
  }

  if (diffInDays < 1) {
    return 'сегодня'
  } else if (diffInDays === 1) {
    return 'вчера'
  } else if (diffInDays < 7) {
    return `${diffInDays} ${declension(diffInDays, ['день', 'дня', 'дней'])} назад`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} ${declension(weeks, ['неделя', 'недели', 'недель'])} назад`
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return `${months} ${declension(months, ['месяц', 'месяца', 'месяцев'])} назад`
  } else {
    const years = Math.floor(diffInDays / 365)
    return `${years} ${declension(years, ['год', 'года', 'лет'])} назад`
  }
}

export function POPUP_WINDOW(element, header, text, position, size) {
  let popup_window = document.createElement('div')
  let popup_header = document.createElement('span')
  let popup_text = document.createElement('span')

  popup_window.id = 'popup-window'
  popup_header.id = 'popup-window-header'
  popup_text.id = 'popup-window-text'

  if (header) {
    popup_header.textContent = header
    popup_window.append(popup_header)
  }

  if (text) {
    popup_text.textContent = text
    popup_window.append(popup_text)
  }

  if (position) {
    popup_window.style.top = position.top
    popup_window.style.bottom = position.bottom

    popup_window.style.left = position.left
    popup_window.style.right = position.right
  }

  if (size) {
    popup_window.style.width = size.width
    popup_window.style.height = size.height
  }

  if (element[0] == '.') {
    const target_element = document.querySelectorAll(element)
    if (target_element) {
      target_element.forEach(block => {
        block.addEventListener('mouseover', function () {
          block.append(popup_window)
          block.classList.add('popup-window-parent')
        })

        block.addEventListener('mouseleave', function () {
          popup_window.remove()
          block.classList.remove('popup-window-parent')
        })
      })
    }
  } else {
    const target_element = document.getElementById(element)

    if (target_element) {
      target_element.addEventListener('mouseover', function () {
        target_element.append(popup_window)
        target_element.classList.add('popup-window-parent')
      })

      target_element.addEventListener('mouseleave', function () {
        popup_window.remove()
        target_element.classList.remove('popup-window-parent')
      })
    }
  }
}