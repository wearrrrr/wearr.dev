

function timelineText() {
  let ml9 = document.querySelector('.ml9');
  ml9.style.display = "inline-block"
  let textWrapper = document.querySelector('.ml9 .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
  anime.timeline({loop: false})
  .add({
    targets: '.letter',
    scale: [0, 1],
    easing: 'spring(1, 90, 10, 0)',
    duration: 2500,
    delay: (el, i) => 45 * (i+1)
  })
}

document.addEventListener('astro:page-load', () => {
  let reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
  if (window.location.pathname == "/") {
    if (!reducedMotion) {
      timelineText();
    } else {
      let ml9 = document.querySelector('.ml9');
      ml9.style.display = "inline-block"
    }
  }
}, { once: true });