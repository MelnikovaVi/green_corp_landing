/* Анимация в разделе features__feedback увеличивающая число клиентов от 0 до 5000+ */
const INCREASE_NUMBER_ANIMATION_SPEED = 50;
function increaseNumberAnimationStep(i, element, endNumber) {
    if (i<= endNumber) {
        if (i === endNumber) {
            element.innerText = i + '+';
          } else {
            element.innerText = i;
          }
          i+=100;

        setTimeout(function() {
            increaseNumberAnimationStep (i, element, endNumber);
        }, INCREASE_NUMBER_ANIMATION_SPEED);
    }
  }

  function initIncreaseNumberAnimation() {
    const element =  document.querySelector(".features__clients-count");
    increaseNumberAnimationStep(0, element, 5000)
  }
  
  /* Анимация в разделе form, которая при выборе "примерный бюджет" значение "другое" добавляет доп строку и удаляет её, если "другое" не выбрано */
  
  document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
    if (event.target.value === 'other') {
      const formContainer = document.createElement("div");
      formContainer.classList.add("form__group", "form__other-input");
      const input = document.createElement("input");
      input.setAttribute("placeholder", "Введите ваш вариант");
      input.setAttribute("type", "text");
      formContainer.appendChild(input);
      document.querySelector("form").insertBefore(formContainer, document.querySelector('.form__submit'));
    }
    
    const otherInput = document.querySelector(".form__other-input");
    if (event.target.value !== 'other' && Boolean(otherInput)) {
      document.querySelector("#form form").removeChild(otherInput);
    }
  });
  
  /* Колбек-функция, которая будет вызываться при изменении скролла */
  
  let animationInited = false;
  function updateScroll() {
    if (window.scrollY > 0) {
      document.querySelector("header").classList.add("header__scrolled");
    } else {
      document.querySelector("header.header__scrolled").classList.remove("header__scrolled");
    }
    /* Запускает анимацию о клиентах в разделе features__feedback, когда скролл доходит до этого раздела */
    let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
    let windowBottomPosition = window.scrollY + window.innerHeight;
    if (windowBottomPosition >= countElementPosition && !animationInited) {
      animationInited = true;
      initIncreaseNumberAnimation()
    }
  }
  window.addEventListener("scroll", updateScroll);
  

  /* Плавный скролл по ссылкам */
  function addSmoothScroll(link) {
    link.addEventListener("click", onLinkClick);
  }
  // Обработчик клика
  function onLinkClick(event) {
    event.preventDefault();
    document.querySelector(event.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  };
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    addSmoothScroll(link);
  });
  addSmoothScroll(document.querySelector(".more-button"));