const data = [
  {
    place:'Switzerland Alps',
    title:'SAINT',
    title2:'ANTONIEN',
    description:'Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It\'s a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.',
    image:'https://assets.codepen.io/3685267/timed-cards-1.jpg'
},
{
  place:'Shanghai - China',
  title:'JIN MAO',
  title2:'TOWER',
  description:"Jin Mao Tower in Shanghai is a modern architectural icon, combining traditional Chinese design with contemporary style. One of the city's tallest buildings, it offers stunning panoramic views and a unique spiraling structure that defines the skyline.",
  image:'SG.jpg'
},
{
    place:'Japan Alps',
    title:'NANGANO',
    title2:'PREFECTURE',
    description:'Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country\'s best powder.',
    image:'https://assets.codepen.io/3685267/timed-cards-2.jpg'
},
{
    place:'Sahara Desert - Morocco',
    title:'MARRAKECH',
    title2:'MEROUGA',
    description:'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.',
    image:'https://assets.codepen.io/3685267/timed-cards-3.jpg'
},
{
    place:'Sierra Nevada - USA',
    title:'YOSEMITE',
    title2:'NATIONAL PARAK',
    description:'Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.',
    image:'https://assets.codepen.io/3685267/timed-cards-4.jpg'
},
{
    place:'Peru - South America',
    title:'COLCA',
    title2:'CANYON',
    description:"Colca Canyon in Peru is one of the world's deepest canyons, known for its stunning landscapes, terraced fields, and traditional villages. It's a great spot for hiking, bird-watching, especially for the Andean condor, and enjoying serene hot springs, offering a mix of adventure and relaxation.",
    image:'peru.jpg'
},
{
  place:'Bali - Indonesia',
  title:'MOUNT',
  title2:'BATUR',
  description:"Mount Batur, an active volcano in Bali, Indonesia, offers stunning sunrise views. Standing at 1,717 meters, it's a popular hiking spot. Visitors can explore its black lava fields and enjoy nearby hot springs while learning about its cultural significance in Balinese tradition.",
  image:'bali.jpg'
},
{
place:'Bangalore - India',
title:'ROYAL',
title2:'PALACE',
description:"Bangalore Palace is a stunning Tudor-style palace in India. It was built by the Wodeyar dynasty and features intricate architecture and lavish interiors. Visitors can explore the palace's grand halls, ornate bedrooms, and courtyards to learn about the region's cultural heritage.",
image:'blr.jpg'
},
{
  place:'Amazon - Brazil',
  title:'RAIN',
  title2:'FOREST',
  description:"The Amazon Rainforest, the world's largest tropical forest, is renowned for its rich biodiversity. Visitors can explore its dense canopy and wildlife while learning about its vital role in the environment and local cultures.",
  image:'amz.jpg'
  },
];

const _ = (id) => document.getElementById(id);

const cards = data.map((i, index) => `
  <div class="card" id="card${index}" style="background-image:url(${i.image})"></div>
`).join('');

const cardContents = data.map((i, index) => `
  <div class="card-content" id="card-content-${index}">
    <div class="content-start"></div>
    <div class="content-place">${i.place}</div>
    <div class="content-title-1">${i.title}</div>
    <div class="content-title-2">${i.title2}</div>
  </div>
`).join('');

const slideNumbers = data.map((_, index) => `
  <div class="item" id="slide-item-${index}">${index + 1}</div>
`).join('');

_('demo').innerHTML = cards + cardContents;
_('slide-numbers').innerHTML = slideNumbers;

const range = (n) => Array(n).fill(0).map((i, j) => i + j);

const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}

function getCardContent(index) {
  return `#card-content-${index}`;
}

function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = range(data.length);
let detailsEven = true;
let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });

  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
  return new Promise((resolve) => {
    order.push(order.shift());
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

if (typeof gsap !== 'undefined') {
  function handleMenuClick(event) {
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));

    const clickedItem = event.target;
    clickedItem.classList.add('active');

    gsap.fromTo(clickedItem, 
      { scale: 1 }, 
      { scale: 1.1, duration: 0.3, ease: "power2.out" }
    );
  }

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', handleMenuClick);
  });
}

 // Select the element with class 'contain'
 let contain = document.querySelector('.contain');

 // Attach a function to redirect when the container is clicked
 contain.addEventListener('click', () => {
  window.open("DESTINATION/earth.html", "_blank"); 
 });

 // Select the nested element with class 'calender'
 let calendar = document.querySelector('.calender');

 // Attach a function to open a new tab when the nested element is clicked
 calendar.addEventListener('click', () => {
   window.open("HOLIDAYS/calender.html", "_blank"); // Opens 'earth.html' in a new tab
 });

start();
