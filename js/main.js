import galleryItems from './gallery-items.js';

//Створення і рендер розмітки по масиву даних за наданим шаблоном.
const galleryRef = document.querySelector('.js-gallery');

const cloneArrayGalleryItems = [...galleryItems];
console.log(cloneArrayGalleryItems);

const createList = cloneArrayGalleryItems.map(cloneArrayGalleryItem => {
  const createLi = document.createElement('li');
  createLi.classList.add('gallery__item');

  const createLink = document.createElement('a');
  createLink.classList.add('gallery__link');
  createLink.href = cloneArrayGalleryItem.preview;
  createLi.append(createLink);

  const createImg = document.createElement('img');
  createImg.classList.add('gallery__image');
  createImg.src = cloneArrayGalleryItem.preview;
  createImg.dataset.source = cloneArrayGalleryItem.original;
  createImg.alt = cloneArrayGalleryItem.description;
  createLink.append(createImg);

  return createLi;
});

galleryRef.append(...createList);
console.log(createList);
//Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.
//Відкриття модального вікна при натисканні на елементі галереї.
//Підміна значення атрибута src елемента img.lightbox__image
const jsLightBoxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
console.dir(jsLightBoxRef);
console.dir(lightboxImageRef);

galleryRef.addEventListener('click', onTakePicture);

function onTakePicture(e) {
  e.preventDefault();
  jsLightBoxRef.classList.add('is-open');
  lightboxImageRef.src = e.target.dataset.source;
  lightboxImageRef.alt = e.target.alt;
}

//Закриття модального вікна при натисканні на кнопку button[data-action=""close-lightbox"]
//Очищення значення атрибута src елемента img.lightbox__image. Це необхідно   для того,
//щоб при наступному відкритті модального вікна, поки вантажиться   зображення, ми не бачили попереднє.
const closeBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);

closeBtnRef.addEventListener('click', onCloseButton);
function onCloseButton(e) {
  jsLightBoxRef.classList.remove('is-open');
  lightboxImageRef.src = '#';
  lightboxImageRef.alt = '';
}

//Закриття модального вікна при натисканні на div.lightbox__overlay.
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

lightboxOverlayRef.addEventListener('click', onCloseOverlay);

function onCloseOverlay(e) {
  jsLightBoxRef.classList.remove('is-open');
}

//Закриття модального вікна після натискання клавіші ESC.

window.addEventListener('keydown', onCloseEscape);
function onCloseEscape(e) {
  if (e.code === 'Escape' && jsLightBoxRef.classList.contains('is-open')) {
    jsLightBoxRef.classList.remove('is-open');
  }
}

//Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво"   і "вправо".
window.addEventListener('keydown', onTakeSibling);

console.log(lightboxImageRef.src);

function onTakeSibling(e) {
  let indexImage = 0;

  cloneArrayGalleryItems.find(cloneArrayGalleryItem => {
    if (lightboxImageRef.src === cloneArrayGalleryItem.original) {
      indexImage = cloneArrayGalleryItems.indexOf(cloneArrayGalleryItem);
      console.log(indexImage);

      return indexImage;
    }
  });

  if (e.code === 'ArrowLeft' && jsLightBoxRef.classList.contains('is-open')) {
    lightboxImageRef.src = cloneArrayGalleryItems[indexImage - 1].original;
  }
  if (e.code === 'ArrowRight' && jsLightBoxRef.classList.contains('is-open')) {
    lightboxImageRef.src = cloneArrayGalleryItems[indexImage + 1].original;
  }
}
