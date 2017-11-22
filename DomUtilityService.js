class DomUtilityService {
  constructor() { }

  createElement(tag, attributes) {
    let element = document.createElement(tag);
    for (let key in attributes) {
      element[key] = attributes[key];
    }
    return element;
  }

  createDocumentFragment(elementList) {
    let docFrag = document.createDocumentFragment();
    for (let i=0; i< elementList.length; i++) {
      let element = elementList[i];
      let divElement = this.createElement('div', {classList: 'thumbnail'});
      let nestedDivElement = this.createElement('div', {classList: 'thumbnail-container'});
      let newElement = this.createElement(
        'img',
        { src: element.src,
         alt: element.title,
         title: element.title,
         className: 'thumbnail-image'});
       newElement.setAttribute('data-index', element.index);

      nestedDivElement.appendChild(newElement);
      divElement.appendChild(nestedDivElement);
      docFrag.appendChild(divElement);
     };
    return docFrag;
  }
}