import { DOMWindow, JSDOM } from "jsdom";
import { rerender, mount, ForgoRenderArgs, setCustomEnv } from "../../../";

let window: DOMWindow;
let document: HTMLDocument;

function Component() {
  let counter = 0;

  return {
    render(props: any, args: ForgoRenderArgs) {
      function updateCounter() {
        counter++;
        rerender(args.element);
      }

      (window as any).myButton = {};

      return (
        <div>
          <button onclick={updateCounter} ref={(window as any).myButton}>
            Click me!
          </button>
          <p>Clicked {counter} times</p>
        </div>
      );
    },
  };
}

export function run(dom: JSDOM) {
  window = dom.window;
  document = window.document;
  setCustomEnv({ window, document });

  window.addEventListener("load", () => {
    mount(<Component />, document.getElementById("root"));
  });
}
