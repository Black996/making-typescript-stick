import fetch, { RequestInit, Response } from "node-fetch";

class SelectorResult {
  #element: Element;

  constructor(element: Element){
    this.#element = element;
  }

  html(content: string){
    this.#element.innerHTML = content;
    return this;
  }

  hide(){
    const el = this.#element as HTMLElement;
    el.style.visibility = 'hidden';
  }

  show(){
    const el = this.#element as HTMLElement;
    el.style.visibility = 'visible';
  }

  on<T extends keyof HTMLElementEventMap>(eventName: T,
     eventHandler: (evt: HTMLElementEventMap[T]) => void) {
    const el = this.#element as HTMLElement;
    el.addEventListener(eventName, eventHandler);
  }



}

function $(selector: string) {
  const el = document.querySelector(selector) as HTMLElement;
  return new SelectorResult(el );
}

namespace $ {
  export function ajax<T extends Response>(
    configs: { url: string, successCb: (data: T) => void, options: RequestInit }
    ): Promise<void> {
      return fetch(configs.url,configs.options).then((res)=>res.json()).then(configs.successCb);
  }
}

export default $;
