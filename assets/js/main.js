// lenis
// const lenis = new Lenis()

const lenis = new Lenis({
  speed: 800,
  offset: 50,
  duration: 1.2,
  easing: (t => Math.min(1, 1.001 - Math.pow(2, -9 * t))),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? false : true,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

if (window.matchMedia("(min-width: 992px)").matches) {

  lenis.on('scroll', (e) => {
      //   console.log(e)
  })

  function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf);
}



// menu function
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    
    // Check if the scroll position is greater than 50px
    if (window.scrollY > 50) {
      header.classList.add('scrolled'); // Add the 'scrolled' class
    } else {
      header.classList.remove('scrolled'); // Remove the 'scrolled' class
    }
  });


const getBtn = document.querySelector('.mob-btn');
// console.log(getBtn);
getBtn.addEventListener('click', e => {
    document.querySelector('body').classList.toggle('show-menu');
})


const getDropDown = document.getElementsByClassName('main-nav');
for ( div of getDropDown){
    var selectLi = div.getElementsByTagName('li');
    for ( li of selectLi){
       if (li.contains(li.querySelector('ul'))) {
        li.classList.add('submenu');
        li.innerHTML += "<i></i>";
        }
    }
}

const getDropDownClick = document.querySelectorAll('.main-nav i');
getDropDownClick.forEach((item) => {
    item.addEventListener('click', e => {
        e.target.parentNode.classList.toggle('open');
    })
})



//########### swiper slider js___________________________________________________
const mySwiper_prop_img = new Swiper('.prop-img-slider', {
    effect: 'fade',
    speed: 1000,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop:true,
    autoplay: {
        delay: 8000,
        // disableOnInteraction: false
    },
    navigation: {
		nextEl: ".swiper-banner-button-next",
		prevEl: ".swiper-banner-button-prev"
	},
    pagination: {
        el: '.elements',
        clickable: true,
        type:"fraction",
        renderBullet: function (index, className) {
            return '<div class="' + className + '">' + (index+1) + 
            '</div>';
        },
    }
  
});

 /* gallery Sec */
 var $swiperSelector = $('.swiper-container');

 $swiperSelector.each(function(index) {
 var $this = $(this);
 $this.addClass("swiper-slider-" + index);
 
 var dragSize = $this.data('drag-size') ? $this.data('drag-size') : 'auto';
 var freeMode = $this.data('free-mode') ? $this.data('free-mode') : false;
 var loop = $this.data('loop') ? $this.data('loop') : false;

 var swiper = new Swiper(".swiper-slider-" + index, {
     direction: "horizontal",
     loop: loop,
     freeMode: freeMode,
     slidesPerView: 2.15,
     spaceBetween: 15,
     breakpoints: {
         992: {
         slidesPerView: 3,
         spaceBetween: 25
         },
         480: {
         slidesPerView: 2,
             spaceBetween: 20
         },
         0: {
            slidesPerView: 1.5,
                spaceBetween: 20
            }

     },
     navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev"
     },
     scrollbar: {
         el: ".swiper-scrollbar",
         draggable: true,
         dragSize: dragSize
     }
 });
 });
 /* gallery ends*/

//  testimonial 
var homeBannerSwiper = new Swiper(".testimon-slider", {
    slidesPerView: 1,
    lazy: true,
    loop: true,
    speed: 800,
    effect: "fade",
    pagination: {
      el: ".testimon-slider-pagination",
      clickable: true,
    },
    navigation: false,
    // mousewheel: true,
    autoplay: {
        speed: 550,
        delay: 10000,
    disableOnInteraction: false,
    },
});

//########### swiper slider end js___________________________________________________



// home service acccordion
document.addEventListener("DOMContentLoaded", function () {
    const dreamAccordion = document.querySelector("#dreamAccordion");
    
    const list = dreamAccordion.querySelectorAll(".accordion-item");
    let img_div = document.querySelector(".dream-home-wrap .img-wrap img");
    
    list[0].classList.add("active");
    let img = list[0].children[0].children[0].getAttribute("data-img");
    img_div.src = img;
    
    list.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            if (!el.classList.contains('active')) {
                list.forEach((item) => item.classList.remove("active"));
                el.classList.add("active");
                let img = el.children[0].children[0].getAttribute("data-img");
                console.log(img);
                img_div.classList.add("active");
                img_div.src = img;
                setTimeout(() => {
                    img_div.classList.remove("active");
                }, 200);
            }
        });
    });
  });


 // about section counting
 document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  function countUp(element, endValue) {
    const currentCount = { value: 0 };

    gsap.to(currentCount, {
      duration: 3,
      value: parseInt(endValue, 10),
      onUpdate: () => {
        element.innerText = Math.ceil(currentCount.value) + '+';
      },
      ease: "power3.out"
    });
  }

  gsap.utils.toArray('.count-wrapper').forEach((count) => {
    const countNo = count.querySelector(".count-text");
    const endValue = countNo.getAttribute('data-count');

    ScrollTrigger.create({
      trigger: '.about',
      start: "top 45%",
      onEnter: () => {
        countUp(countNo, endValue);
      }
    });
  });
});


//   home fade up animation gsap
document.addEventListener("DOMContentLoaded", function () {

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".text, .big-text", {
    backgroundPositionX: "0%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".text",
      scrub: 1,
      start: "top 95%",
      end: "bottom 30%",
   }
    });

  var tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
          document.body.classList.remove('loader-on');
          const bannerVideo = document.querySelector('.banner video');
          bannerVideo.autoplay = true;
          bannerVideo.load();
          document.querySelector('.home-page').classList.add('loader-off');
          headerScroll();
      }
  });
  tl.to('.loader', {
      top: '-120%',
      duration: 1.5,
      ease: "bryEase",
  });

  tl.to('.home-page', {
      y: 0,
      duration: 1,
      ease: "bryEase",
  }, '<');

  tl.to('.home-header', {
    y: 0,
    duration: 1.2,
    opacity: 1,
    delay: 0.8,
    ease: "bryEase",
}, '<');


    const aboutWrappers = document.querySelectorAll(".parentWrapSection");
  
    aboutWrappers.forEach((wrapper) => {
      const sectionStagger = wrapper.querySelectorAll(".fade-stagger");
  
      // Animate fade-stagger elements
      gsap.fromTo(
        sectionStagger,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    });

    const sectionWrapper = document.querySelectorAll(".parallaxWrap");

    sectionWrapper.forEach((wrapper) => {
      const blockImages = wrapper.querySelectorAll(".parallaxImage");
  
      blockImages.forEach((parallaxImage) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: parallaxImage,
            start: "top 90%",
            end: "top top",
            scrub: true,
          },
        }).fromTo(
          parallaxImage,
          {
            yPercent: -6,
            ease: "none",
          },
          {
            yPercent: 6,
            ease: "none",
          }
        );
      });
    });
  
    // Normal fade
    const fadeWrappers = gsap.utils.toArray(".fadeUp");
    fadeWrappers.forEach((wrapper) => {
      gsap.fromTo(
        wrapper,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 100%",
            end: "bottom 80%",
          },
        }
      );
    });
  });
  
