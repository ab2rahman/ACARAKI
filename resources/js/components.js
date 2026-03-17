import { tns } from "tiny-slider";

var slider = tns({
  container: '.knowledge-slider',
  items: 4,
  loop: false,
  fixedWidth: 260,
  gutter: 20,
});

var logoSlider = tns({
  container: '.logo-slider',
  items: 4,
  fixedWidth: 260,
  gutter: 20,
  loop: false,
});

var sliderTag = tns({
  container: '.tag-container',
  items: 5,
  loop: false,
  fixedWidth: 260,
  gutter: 20,
});

console.log('masuklu')
