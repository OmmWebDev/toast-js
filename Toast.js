// Set some deafult settings
const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: 'top-right',
  text: 'Your Toast',
  color: 'black',
  backgroundColor: 'white'
}

// Create the Toast class
export default class Toast {
  #toastElm;
  #autoCloseTimeout;
  
  constructor(options){
    this.#toastElm = document.createElement('div');
    this.#toastElm.setAttribute('id', 'toast');

    this.upadate({...DEFAULT_OPTIONS, ...options});
    this.#toastElm.addEventListener('click', () => this.#toastElm.remove());

    // Adding all the styles
    addStyles();
  }

  // Set custom autoClose
  set autoClose(value){
    if(value === false) return;
    if(this.#autoCloseTimeout != null) clearTimeout(this.#autoCloseTimeout);
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }

  // Set custom position
  set position(value){
    const currentContainer = this.#toastElm.parentElement;
    const containerSelector = document.querySelector(`[data-position="${value}"]`);
    const container = containerSelector || createContainer(value);
    container.append(this.#toastElm);
    if(currentContainer === null || currentContainer.hasChildNodes()) return;
    else {currentContainer.remove()};
  }

  // Set custom text
  set text(value){
    this.#toastElm.textContent = value;
  }

  // Set color to the text
  set color(value){
    this.#toastElm.style.color = value;
  }

  // Set backgroundColor
  set backgroundColor(value){
    this.#toastElm.style.backgroundColor = value;
  }

  // Update the Toast
  upadate(options){
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    })
  }

  // Remove the Toast
  remove(){
    const container = this.#toastElm.parentElement;
    this.#toastElm.remove();
    if(container.hasChildNodes()) return;
    else {container.remove()};
  }
}

// Create the Toast container
const createContainer = (position) => {
  const container = document.createElement('div');
  container.setAttribute('id', 'toast-container');
  container.dataset.position = position;
  document.body.append(container);
  return container;
}

// const createToastLoader = () => {
//   const container = createContainer();
//   const toastLoader = document.createElement('div');
//   toastLoader.setAttribute('id', 'toast-loader');
//   container.append(toastLoader);

//   return toastLoader;
// }

const addStyles = () => {
  let styles = `
  #toast-container{
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    font-family: "Poppins", sans-serif;
  }
  #toast-container[data-position^='top-']{
    top: 0;
  }
  #toast-container[data-position^='bottom-']{
    bottom: 0;
  }
  #toast-container[data-position$='-left']{
    left: 0;
  }
  #toast-container[data-position$='-right']{
    right: 0;
  }
  #toast-container[data-position$='-center']{
    left: 50%;
    transform: translateX(-50%);
  }
  #toast{
    width: 250px;
    padding: 10px 5px;
    border: 1.5px solid black;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: 0.5s;
  }
  #toast::before{
    content: '\\00D7';
    position: absolute;
    font-size: 20px;
    color: black !important;
    right: 5px;
  }`;

  let styleElm = document.createElement('style');
  styleElm.innerHTML = styles;
  document.body.append(styleElm);
}