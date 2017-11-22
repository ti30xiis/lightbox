const ELEMENTS = {
  BODY: document.querySelector('body'),
  buttons: {
    PREV: document.getElementById('prev-button'),
    NEXT: document.getElementById('next-button')
  },
  LIGHTBOX: {
    CONTAINER: document.getElementById('lightbox-container'),
    DESCRIPTION: document.getElementById('lightbox-description'),
    IMG: document.getElementById('lightbox-image'),
  },
  THUMBNAIL: {
    CONTAINER: document.getElementById('thumbnail-container')
  }
};

let thumbnailList = [];
let curIndex = -1;

function run() {
  let url = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=a7f536df55dd70149abf0ebcf8fafbec&format=json&hermes=1&hermesClient=1&reqId=eaad07ec&nojsoncallback=1';

  let httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', url);
  httpRequest.send();

  httpRequest.addEventListener('readystatechange', processRequest, false);
}

run();

function buildDom() {
  let domService = new DomUtilityService();
  let docFrag = domService.createDocumentFragment(thumbnailList);
  ELEMENTS.THUMBNAIL.CONTAINER.appendChild(docFrag);

  ELEMENTS.THUMBNAIL.CONTAINER.addEventListener('click', openLightbox);
  ELEMENTS.buttons.PREV.addEventListener('click', prevImage);
  ELEMENTS.buttons.NEXT.addEventListener('click', nextImage);
  document.getElementById('exit-button').addEventListener('click', closeLightbox);
}

function processRequest() {
  let httpRequest = this;
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      let photoResults = JSON.parse(httpRequest.responseText).photos.photo;
      for (let i = 0; i < photoResults.length; i++) { //
        let result = photoResults[i];
        let url = `https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg`;
        thumbnailList.push({src: url, title: result.title, index: i});
      }
      buildDom();
    }
  }
}

function openLightbox(e) {
  if (e.target.tagName === 'IMG') {
    ELEMENTS.LIGHTBOX.CONTAINER.classList.toggle('isOpen');
    ELEMENTS.BODY.classList.toggle('isOpen');
    ELEMENTS.LIGHTBOX.IMG.src = e.target.src;

    curIndex = Number.parseInt(e.target.dataset.index);
    let image = thumbnailList[curIndex];
    ELEMENTS.LIGHTBOX.DESCRIPTION.innerHTML = image.title;

    if (curIndex === 0) {
      toggleDisableButton(ELEMENTS.buttons.PREV, true);
    } else {
      toggleDisableButton(ELEMENTS.buttons.PREV, false);
    }
    if(curIndex + 1 === thumbnailList.length) {
      toggleDisableButton(ELEMENTS.buttons.NEXT, true);
    } else {
      toggleDisableButton(ELEMENTS.buttons.NEXT, false);
    }
  }
}

function closeLightbox(e) {
  ELEMENTS.LIGHTBOX.CONTAINER.classList.toggle('isOpen');
  ELEMENTS.BODY.classList.toggle('isOpen');
}

function nextImage() {
  let hasNextImage = curIndex + 1 < thumbnailList.length;
  if (hasNextImage) {
    curIndex += 1;
    let image = thumbnailList[curIndex];
    ELEMENTS.LIGHTBOX.IMG.src = image.src;
    ELEMENTS.LIGHTBOX.DESCRIPTION.innerHTML = image.title;

    let hasPrevDisabled = ELEMENTS.buttons.PREV.disabled;
    if (hasPrevDisabled) {
      toggleDisableButton(ELEMENTS.buttons.PREV, false);
    }
  } 
  
  if(curIndex + 1 === thumbnailList.length) {
    toggleDisableButton(ELEMENTS.buttons.NEXT, true);
  }
}

function prevImage() {
  if (curIndex > 0) {
    curIndex -= 1;
    let image = thumbnailList[curIndex];
    ELEMENTS.LIGHTBOX.IMG.src = image.src;
    ELEMENTS.LIGHTBOX.DESCRIPTION.innerHTML = image.title;

    let hasNextDisabled = ELEMENTS.buttons.NEXT.disabled;
    if (hasNextDisabled) {
      toggleDisableButton(ELEMENTS.buttons.NEXT, false);
    }
  } 
  
  if (curIndex === 0) {
    toggleDisableButton(ELEMENTS.buttons.PREV, true);
  }
}

function toggleDisableButton(element, bool) {
  element.disabled = bool;
}