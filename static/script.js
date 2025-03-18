const containers = document.querySelectorAll('.container-sub')

const days = document.querySelector('.days')
const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')

const getRemainSeconds = () => {
  const defaultSeconds = 3601
  const targetDate = window.targetDate
  console.log("Target date:", targetDate)
  if (!targetDate) {
    return defaultSeconds
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
    return defaultSeconds
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

  const minute = Math.floor(remainSeconds / 60 % 60)
  times[2].front = minute
  times[2].back = (minute === 0 ? 59 : minute - 1)

  const hour = Math.floor(remainSeconds / 3600 % 24)
  times[1].front = hour
  times[1].back = (hour === 0 ? 23 : hour - 1)

  const day = Math.floor(remainSeconds / 86400)
  times[0].front = day
  times[0].back = (day === 0 ? 0 : day - 1)

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