const container = document.querySelector('.container');
let images = [];
let imagesLoaded = 0;
let allImagesLoaded = false;
var tl = gsap.timeline({ paused: true });

const imageSrcs = [];
for (let i = 0; i <= 24; i++) {
  const num = i < 10 ? `0${i}` : i;
  imageSrcs.push(`./img/IDWEEK_home_to_welcome_rendered_000${num}.jpg`);
}

function preloadImages(srcs, imgs, callback) {
  let img;
  let remaining = srcs.length;
  for (let i = 0; i < srcs.length; i++) {
    img = new Image();
    img.onload = function() {
      --remaining;
      console.log('Loading images...' + remaining)
      if (remaining <= 0) {
        callback();
      }
    };
    img.src = srcs[i];
    imgs.push(img);
  }
}

preloadImages(imageSrcs, images, onImagesLoaded);

function onImagesLoaded () {
  images.forEach(image => $(container).append(image))
  const $images = $(container).children();
  const fps = 24;
  const duration = 1 / fps;

  tl
    .staggerTo($images, 0, { visibility: 'visible' }, duration)
    .set({}, {}, "+="+duration);

  $(document).ready(function () {
    $('#play').click(function () { tl.play(); });
    $('#pause').click(function () { tl.pause(); });
    $('#resume').click(function () { tl.resume(); });
    $('#reverse').click(function () { tl.reverse(); });
    $('#restart').click(function () { tl.restart(); });
  });
}
