const textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
.add({
  targets: '.letter',
  scale: [0, 1],
  easing: 'spring(1, 90, 10, 0)',
  duration: 2500,
  delay: (el, i) => 45 * (i+1)
})