// Header
// ===========================
const headerBtn = document.querySelector(".header__button");
const headerBg = document.querySelector(".header__bg");
const headerBtnHam = document.querySelector(".header__ham");
const headerNav = document.querySelector(".header__nav");

headerBtn.addEventListener("click", function () {
  headerBg.classList.toggle("expand-bg");
  headerBtnHam.classList.toggle("header__ham-close");
  headerBtnHam.classList.toggle("header__ham");
  headerNav.classList.toggle("show-nav");
});

const sendEmail = document.querySelectorAll(".send-email");
const emailAddress = document.querySelectorAll(".email-address");

for (let i = 0; i < sendEmail.length; i++) {
  sendEmail[i].addEventListener("click", function () {
    const part1 = "viktor.mauzer";
    const part2 = Math.pow(2, 6);
    const part3 = String.fromCharCode(part2);
    const part4 = "gmail.com";
    const address = part1 + part3 + part4;
    emailAddress[i].textContent = address;
    emailAddress[i].style.cssText = "opacity: 1;";
  });
}

// Slider
// ===========================
const sliders = document.querySelectorAll(".slider");

if (sliders != null) {
  sliders.forEach((slider) => {
    const slides = slider.getElementsByClassName("slide");
    const sliderIndicator = slider.querySelector(".slider__indicator");
    const nextBtn = slider.querySelector(".slider__next");
    const prevBtn = slider.querySelector(".slider__prev");
    const sliderContainer = slider.querySelector(".slider-container");

    let slideNumber = 1;
    let slideAmount = 0;
    let slideWidth = 0;

    // Add dots below slider
    // ==============================
    for (let j = 0; j < slides.length; j++) {
      sliderIndicator.insertAdjacentHTML(
        "beforeend",
        "<div class='slider__indicator-dot'>&nbsp;</div>"
      );
    }

    const sliderDots = slider.querySelectorAll(".slider__indicator-dot");

    const updateSliderIndicator = function (slideNumber) {
      sliderDots.forEach((sliderDot) => {
        sliderDot.classList.remove("slider__indicator-dot-selected");
      });

      sliderDots[slideNumber - 1].classList.add(
        "slider__indicator-dot-selected"
      );
    };

    updateSliderIndicator(1);

    // Slider logic
    // ==============================
    window.addEventListener("load", function () {
      const windowWidth = this.window.innerWidth;

      const measureSlideWidth = function () {
        slideWidth = sliderContainer.clientWidth / 10;
      };

      const updateSliderUI = function (slideAmount, slideNumber) {
        sliderContainer.style.cssText =
          "transform: translateX(-" +
          slideAmount +
          "rem); transition: all 0.5s;";

        updateSliderIndicator(slideNumber);
      };

      const nextSlide = function () {
        measureSlideWidth();

        if (slideNumber < slides.length) {
          slideAmount += slideWidth;
          slideNumber++;

          updateSliderUI(slideAmount, slideNumber);
        } else {
          slideAmount = 0;
          slideNumber = 1;

          updateSliderUI(slideAmount, slideNumber);
        }
      };

      const prevSlide = function () {
        measureSlideWidth();

        if (slideNumber > 1) {
          slideAmount -= slideWidth;
          slideNumber--;

          updateSliderUI(slideAmount, slideNumber);
        } else {
          slideNumber = slides.length;
          slideAmount = slideWidth * (slideNumber - 1);

          updateSliderUI(slideAmount, slideNumber);
        }
      };

      this.window.addEventListener("resize", function () {
        const windowWidthDelta = windowWidth - this.window.innerWidth;

        if (Math.abs(windowWidthDelta) > 5) {
          measureSlideWidth();
          slideAmount = 0;
          slideNumber = 1;
          updateSliderUI(slideAmount, slideNumber);
        }
      });

      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);

      // Touch gestures
      let touchStartX = 0;
      let touchEndX = 0;

      const handleGesture = function () {
        if (touchEndX < touchStartX - 50) {
          nextSlide();
        } else {
          sliderContainer.style.cssText =
            "transform: translateX(-" +
            slideAmount +
            "rem); transition: all 0.5s;";
        }
        if (touchEndX > touchStartX + 50) {
          prevSlide();
        } else {
          sliderContainer.style.cssText =
            "transform: translateX(-" +
            slideAmount +
            "rem); transition: all 0.5s;";
        }
      };

      slider.addEventListener(
        "touchstart",
        function (e) {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      slider.addEventListener(
        "touchend",
        function (e) {
          touchEndX = e.changedTouches[0].screenX;
          handleGesture();
        },
        { passive: true }
      );

      slider.addEventListener(
        "touchmove",
        function (e) {
          let swipeAmount =
            Math.abs(e.changedTouches[0].screenX - touchStartX) / 10;

          if (e.changedTouches[0].screenX < touchStartX) {
            sliderContainer.style.cssText =
              "transform: translateX(-" + (slideAmount + swipeAmount) + "rem);";
          } else {
            sliderContainer.style.cssText =
              "transform: translateX(-" + (slideAmount - swipeAmount) + "rem);";
          }
        },
        { passive: true }
      );
    });
  });
}

// Lazy Load Images
const imageTargets = document.querySelectorAll("img[data-src]");

if (imageTargets != null) {
  const loadImage = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  };

  const imageObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0.1,
    rootMargin: "200px",
  });

  imageTargets.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Lazy load Galleries
const galleryTargets = document.querySelectorAll(".gallery");

if (galleryTargets != null) {
  const loadGallery = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    const galleryItems = entry.target.querySelectorAll("img");

    galleryItems.forEach((galleryItem) => {
      galleryItem.src = galleryItem.dataset.src;

      galleryItem.addEventListener("load", function () {
        galleryItem.classList.remove("lazy-img");
      });
    });

    observer.unobserve(entry.target);
  };

  const galleryObserver = new IntersectionObserver(loadGallery, {
    root: null,
    threshold: 0.1,
    rootMargin: "200px",
  });

  galleryTargets.forEach((gallery) => {
    galleryObserver.observe(gallery);
  });
}
