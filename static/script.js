const containers = document.querySelectorAll('.container-sub')

const days = document.querySelector('.days')
const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')

const getRemainSeconds = () => {
  const targetDate = window.targetDate
  if (!targetDate) {
    return 3601
  }
  try {
    const timezone = -(new Date().getTimezoneOffset() / 60)
    const targetTime = new Date(targetDate).getTime() - timezone * 60 * 60 * 1000
    const now = new Date().getTime()
    const seconds = Math.floor((targetTime - now) / 1000) + 1
    if (seconds < 0) {
      return 1
    }
    return Math.floor((targetTime - now) / 1000) + 1
  } catch (e) {
    return 3601
  }
}

let remainSeconds = getRemainSeconds()
const times = [{}, {}, {}, {}]

function countDown() {
  remainSeconds -= 1

  if (remainSeconds < 1) {
    return
  }

  const second = Math.floor(remainSeconds % 60)
  times[3].front = second
  times[3].back = (second === 0 ? 59 : second - 1)

  const m1 = Math.floor(remainSeconds / 60 % 60)
  times[2].front = m1
  times[2].back = (m1 === 0 ? 59 : m1 - 1)

  const h1 = Math.floor(remainSeconds / 3600 % 24)
  times[1].front = h1
  times[1].back = (h1 === 0 ? 23 : h1 - 1)

  const d1 = Math.floor(remainSeconds / 86400 / 24)
  times[0].front = d1
  times[0].back = (d1 === 0 ? 0 : d1 - 1)

  let i = 0
  containers.forEach(container => {
    const clock = container.querySelector('.clock')

    const front = container.querySelector('.front')
    const back = container.querySelector('.back')

    const frontTime = String(times[i].front).padStart(2, '0')
    const backTime = String(times[i].back).padStart(2, '0')

    clock.dataset.before = frontTime
    clock.dataset.after = backTime
    front.textContent = frontTime
    back.textContent = backTime

    container.addEventListener('animationend', () => {
      container.classList.remove('flip')
      front.textContent = back.textContent
      clock.dataset.before = clock.dataset.after
    }, { once: true })

    i++
  })

  seconds.parentElement.classList.add('flip')

  if (seconds.dataset.before == '00') {
    minutes.parentElement.classList.add('flip')
  }
  if (seconds.dataset.before == '00' && minutes.dataset.before == '00') {
    hours.parentElement.classList.add('flip')
  }
  if (seconds.dataset.before == '00' && minutes.dataset.before == '00' && hours.dataset.before == '00') {
    days.parentElement.classList.add('flip')
  }
}

countDown()

setInterval(countDown, 1000)