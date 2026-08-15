/* ==========================================================================
   Real Google reviews for Frosty Haven — content supplied by the shop owner.
   Text, names and star ratings are not invented; truncated ("…More") source
   reviews keep their trailing ellipsis instead of guessed wording.
   ========================================================================== */
(() => {
  const FIVE_STARS = true;

  // Strongest, complete reviews — shown in the auto-scrolling featured carousel.
  const featuredReviews = [
    {
      name: 'Zena Fareen',
      age: '9 months ago',
      stars: FIVE_STARS,
      text: "Five Stars! Frosty Haven is an amazing spot for a treat. Their desserts are not only beautifully presented (seriously, they are photo-worthy!) but also taste incredible. The soft serve is creamy, and they have so many creative, delicious topping combinations. A must-try—I'll definitely be back!",
    },
    {
      name: 'Jenny B.',
      age: '2 months ago',
      stars: FIVE_STARS,
      text: 'Great ice cream with fantastic flavors and friendly staff. Creamy, and delicious soft serve with pistachio sauce. Highly recommend!!',
    },
    {
      name: 'Ayla Duffy',
      age: '5 months ago',
      stars: FIVE_STARS,
      text: "I loved this place, reasonable pricing compared to other places similar. The staff are so friendly and kind and were the best part :) 10/10 will be coming here again (p.s the açai goes so well with Nutella 😉)",
    },
    {
      name: 'Vivian De Almeida',
      age: '3 months ago',
      stars: FIVE_STARS,
      text: "Frosty Haven has delicious desserts! I especially love the Açaí because it reminds me of Açaí from Hawaii and Brazil. The thickshakes are actually thick😊 Each item I've eaten has been unforgettable. The owners of the dessert shop are attentive, kind, and great conversationalists. Recommend it 10/10",
    },
    {
      name: 'Ayana Sue',
      age: 'a month ago',
      stars: FIVE_STARS,
      text: "I've tried juice up in Wellington and they are nowhere near as nice as this place. The acai flavour is very strong and really nice. 10/10 would reccomend. Owners are lovely",
    },
    {
      name: 'Racheal Millar',
      age: '7 months ago',
      stars: FIVE_STARS,
      text: "A friend recommended this place for our girls' night out, and wow. The loaded brownie was absolutely divine and left me speechless. It's officially my new favourite dessert spot.",
    },
    {
      name: 'Chantelle Cundy',
      age: '3 weeks ago',
      stars: FIVE_STARS,
      text: "Honestly the best dessert we've ever had, will keep coming back and recommending to everyone we know. Perfect combo, crunch and flavour, the owner is so lovely and kind also! They stayed open later just for us and insisted to stay and eat amazing! 100 out of 10 thank you guys!",
    },
    {
      name: 'bailey woodman',
      age: 'a month ago',
      stars: FIVE_STARS,
      text: 'My partner and I went last night and tried some of the Croffles. I had Biscoff and he had the Pistachio. Both were amazing, 10/10. The service was quick and the croffle itself was crunchy and filling. I would recommend to anyone wanting a late night dessert to go try it out. Also the owners were super nice to talk to.',
    },
    {
      name: 'Amelia Chappell',
      age: '2 weeks ago',
      stars: FIVE_STARS,
      text: 'Lots of great dessert options and a lot of them are very reasonably priced. We tried a Biscoff Flurr, a Pistachio Flurr, Cookie with biscoff toppings, Strawberry thickshake, and vanilla soft serve with sprinkles. Everyone was happy with their choices. They were a bit rich by the end, but otherwise very happy and would visit again!',
    },
    {
      name: 'Talitha Mao-Adams',
      age: 'a month ago',
      stars: FIVE_STARS,
      text: 'I love the flavours here and the Acai is the best! The owners are very friendly and accommodating- only danger to my wallet.',
    },
  ];

  // The rest of the real reviews supplied — shown when "See More Reviews" is opened.
  const moreReviews = [
    {
      name: 'Dyani Verney',
      age: '5 months ago',
      stars: FIVE_STARS,
      text: "The owners are so lovely every time I go in, they help with me choosing something different because everything I've tried is delicious! From the Acai, to the vanilla frosty flurrs, loaded brownie & loaded cookie & my personal fav the …",
    },
    {
      name: 'Ryan Lochore',
      age: '5 months ago',
      stars: FIVE_STARS,
      text: 'Came here tonight for the first time and have to say the service was amazing very polite and the food was DELICIOUS! Me and my Partner came and tried some thick shakes and a loaded brownie and cheesecake, we were served the food almost …',
    },
    {
      name: 'Shontelle Wihare',
      age: '5 months ago',
      stars: FIVE_STARS,
      text: 'Desserts and Milkshakes are amazing!! Such friendly service as well!! Definitely recommend the brownie with pistachio sauce!! My fav shop when I have a sweet tooth!!',
    },
    {
      name: 'Mamaray',
      age: '5 months ago',
      stars: FIVE_STARS,
      text: 'Excellent customer service. Lovely people. And omg the biscoff flurr.. amazing. I need to come back',
    },
    {
      name: 'jordan leota',
      age: '7 months ago',
      stars: FIVE_STARS,
      text: "Oh my golly gosh 🔥🤣 you NEED to try the pistachio ice cream and chocolate brownie at Frosty Haven!!! 🤤 It's like a match made in heaven! The pistachio ice cream is creamy and rich with just the right amount of nutty flavour and the …",
    },
    {
      name: 'Maggie Olsen',
      age: '6 months ago',
      stars: FIVE_STARS,
      text: 'Genuinely tasty ice cream! Very creamy (the vanilla) and enjoyable to eat (both vanilla and acai). Also really liked the pistachio sauce. Lots of toppings, which while not personally my fave, I know many people will love. The portion size …',
    },
    {
      name: 'Amanda Philpott',
      age: '3 months ago',
      stars: FIVE_STARS,
      text: "Such a lovely little family owned business! Ive been in a couple times and they're always so friendly and happy to answer …",
    },
    {
      name: 'Shontelle Rose Peeti',
      age: '8 months ago',
      stars: FIVE_STARS,
      text: 'We had the cookie with soft serve, Dubai sauce and crushed flake so yum absolutely loved it and the service was exceptional 👌',
    },
    {
      name: 'kaihoe apiata',
      age: '8 months ago',
      stars: FIVE_STARS,
      text: 'Went in their and tried there haven shake i got the mixed berry protein shake and it was yum! Lovely people and the acai that I bought after because my family were making it look good was DELICIOUS! It was cheaper than auckland and more …',
    },
    {
      name: 'libby sheppard',
      age: '2 months ago',
      stars: FIVE_STARS,
      text: 'Sooo yummy, I had the Nutella Flurr and it was so good. I would so come here again with some friends and the prices are so reasonable',
    },
    {
      name: 'Carlo Joshua Abu',
      age: '3 months ago',
      stars: FIVE_STARS,
      text: 'Quality food and the worker was very friendly. We ordered the new croffle pancake and it was delicious!',
    },
    {
      name: 'japman sidhu',
      age: '3 months ago',
      stars: FIVE_STARS,
      text: 'Quality food and service. We had the biscoff and pistachio croffle. 💯',
    },
    {
      name: 'ThreeHunna 751',
      age: '6 months ago',
      stars: FIVE_STARS,
      text: 'Best ice cream and brownies ive ever had. Definitely coming here more.',
    },
    {
      name: 'Courtney Millar',
      age: '9 months ago',
      stars: false,
      text: 'ordered a regular acai bowl and while it was yummy, it was definitely on the expensive side. It ended up costing $18 total just for one sauce and one topping, the sauce was an extra $3 and the topping was $1',
    },
    {
      name: 'Whatever Yousay',
      age: '5 months ago',
      stars: false,
      text: 'Not enjoyable to eat when everything is dripping out of the cup makes a big mess melts quick. Well and truly over priced',
    },
    {
      name: 'Jess Sunnex',
      age: '6 months ago',
      stars: FIVE_STARS,
      text: 'It was really nice here. Friendly service, and great atmosphere. The drink was really nice and the flurr was great also.',
    },
    {
      name: 'Shayna Poaneki',
      age: '6 months ago',
      stars: FIVE_STARS,
      text: 'Loved this spot, exceptional cheese cake and brownie combo.',
    },
    {
      name: 'Livvy',
      age: '9 months ago',
      stars: FIVE_STARS,
      text: "Cheesecake was delicious, strawberry's and passion fruit topping! The base is lose crumble and the cheesecake filling is light and fluffy!",
    },
    {
      name: 'Wazarat Jafari',
      age: '9 months ago',
      stars: FIVE_STARS,
      text: 'Yummy yummy worth trying it!!',
    },
    {
      name: 'Joshua',
      age: '7 months ago',
      stars: FIVE_STARS,
      text: 'Great experience! The cheesecake was so yum. Highly recommend💯',
    },
    {
      name: 'Patrick Wallace',
      age: 'a month ago',
      stars: FIVE_STARS,
      text: 'Very good. Nice tidy shop staff were good.',
    },
    {
      name: 'Steph Anie',
      age: '6 months ago',
      stars: FIVE_STARS,
      text: 'Incredible. The owners are friendly and super helpful!',
    },
    {
      name: 'Julian Eĺliott',
      age: '4 months ago',
      stars: FIVE_STARS,
      text: 'My grandkids loved it popping candy amazing',
    },
    {
      name: 'Libby Bird',
      age: '3 months ago',
      stars: FIVE_STARS,
      text: 'Delicious, got the frosty flurr with Biscoff',
    },
    {
      name: 'jared hope',
      age: '5 months ago',
      stars: FIVE_STARS,
      text: 'So yummy and very friendly and quick services',
    },
    {
      name: 'Goofy Ahhh',
      age: '8 months ago',
      stars: FIVE_STARS,
      text: 'So yummy, very nice owners. SO WORTH IT AND FULLING!!',
    },
    {
      name: 'rose singh',
      age: '9 months ago',
      stars: FIVE_STARS,
      text: 'Very nice and delicious\nService very friendly and helpful\nWill see you again',
    },
    {
      name: 'Sophie B',
      age: '9 months ago',
      stars: FIVE_STARS,
      text: 'Definitely a new favorite 😋',
    },
    {
      name: 'James Nadine',
      age: '6 months ago',
      stars: FIVE_STARS,
      text: 'Amazing service and Yumm!',
    },
    {
      name: 'Julian Powell',
      age: '5 months ago',
      stars: FIVE_STARS,
      text: 'Great ice creams',
    },
    {
      name: 'Bodie Erkens',
      age: '6 months ago',
      stars: FIVE_STARS,
      text: 'A definite must for anyone..',
    },
    {
      name: 'Talia Hingston',
      age: '6 months ago',
      stars: FIVE_STARS,
      text: 'Love this place!',
    },
    {
      name: 'VJ Woollett',
      age: 'a week ago',
      stars: FIVE_STARS,
      text: 'Absolutely delicious. And wonderful friendly service. We will be back.',
    },
    {
      name: 'Courtney Thompson',
      age: '3 weeks ago',
      stars: FIVE_STARS,
      text: "Super yummy treat. Lots of great options to suit every sweet tooth. Loved the warm brownie and ice cream. Will be back to try other things in future. Not a lot of seating inside, but it wasn't busy when we popped in. Friendly service, staff were helpful with my questions",
    },
    {
      name: 'Palmy NBJ',
      age: '4 weeks ago',
      stars: FIVE_STARS,
      text: 'Very cute place with attentive owners. Priced fairly too. We loved the dessert nachos 😋',
    },
    {
      name: 'Eli',
      age: 'a month ago',
      stars: FIVE_STARS,
      text: 'Love it',
    },
    {
      name: 'cheyenne potter',
      age: 'a month ago',
      stars: FIVE_STARS,
      text: 'Biscoff waffle is elite. Friendly staff. Definitely recommend and pricing is on the cheaper to standard price range.',
    },
    {
      name: 'Rania Elgharably',
      age: 'a month ago',
      stars: FIVE_STARS,
      text: 'The açaí is delicious 😋',
    },
    {
      name: 'Annabelle Rankine',
      age: '7 months ago',
      stars: false,
      text: "Service wasn't great and the pricing for the sauces compared to quality was shocking. I've had a lot of açai bowls and the sauces are usually thick and full of flavour. These were not and at $3 a sauce was astronomical. Auckland has far better açai options and they should take a page out of their book.",
    },
  ].filter((review) => !review.hidden);

  function buildCard(review) {
    const article = document.createElement('article');
    article.className = 'fr-card';

    if (review.stars) {
      const stars = document.createElement('div');
      stars.className = 'fr-stars';
      stars.setAttribute('aria-hidden', 'true');
      stars.textContent = '★★★★★';
      article.appendChild(stars);
    }

    const text = document.createElement('p');
    text.className = 'fr-text';
    text.textContent = review.text;
    article.appendChild(text);

    const meta = document.createElement('div');
    meta.className = 'fr-meta';

    const name = document.createElement('span');
    name.className = 'fr-name';
    name.textContent = review.name;
    meta.appendChild(name);

    const sub = document.createElement('span');
    sub.className = 'fr-sub';
    const badge = document.createElement('span');
    badge.className = 'fr-g-badge';
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = 'G';
    sub.appendChild(badge);
    sub.appendChild(document.createTextNode(`Google Review · ${review.age}`));
    meta.appendChild(sub);

    article.appendChild(meta);
    return article;
  }

  // ---- Featured carousel: render, duplicate once, auto-scroll seamlessly ----
  const carousel = document.getElementById('frCarousel');
  const track = document.getElementById('frTrack');

  if (carousel && track) {
    featuredReviews.forEach((review) => track.appendChild(buildCard(review)));
    featuredReviews.forEach((review) => {
      const clone = buildCard(review);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let setWidth = 0;
    let paused = false;
    let rafId = null;

    function measure() {
      setWidth = track.scrollWidth / 2;
    }

    function step() {
      if (!paused && setWidth > 0) {
        carousel.scrollLeft += 0.5;
        if (carousel.scrollLeft >= setWidth) {
          carousel.scrollLeft -= setWidth;
        }
      }
      rafId = requestAnimationFrame(step);
    }

    window.addEventListener('load', measure);
    window.addEventListener('resize', measure);
    measure();

    if (!reduceMotion) {
      carousel.addEventListener('mouseenter', () => { paused = true; });
      carousel.addEventListener('mouseleave', () => { paused = false; });
      carousel.addEventListener('touchstart', () => { paused = true; }, { passive: true });
      carousel.addEventListener('touchend', () => {
        setTimeout(() => { paused = false; }, 1500);
      }, { passive: true });
      carousel.addEventListener('pointerdown', () => { paused = true; });
      window.addEventListener('pointerup', () => {
        setTimeout(() => { paused = false; }, 1500);
      });
      rafId = requestAnimationFrame(step);
    }
  }

  // ---- See More Reviews: render remaining cards + smooth expand/collapse ----
  const moreGrid = document.getElementById('frMoreGrid');
  const moreToggle = document.getElementById('frMoreToggle');
  const moreCollapse = document.getElementById('frMoreCollapse');

  if (moreGrid && moreToggle && moreCollapse) {
    moreReviews.forEach((review) => moreGrid.appendChild(buildCard(review)));

    moreToggle.addEventListener('click', () => {
      const expanded = moreToggle.getAttribute('aria-expanded') === 'true';
      moreToggle.setAttribute('aria-expanded', String(!expanded));
      moreCollapse.classList.toggle('is-open', !expanded);
      moreToggle.childNodes[0].textContent = !expanded ? 'Show Fewer Reviews ' : 'See More Reviews ';
    });
  }
})();
