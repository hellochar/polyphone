// https://codepen.io/anon/pen/JMOQzE
export function addConfetti(el: HTMLElement) {
  let width = Math.random() * 8 * 10;
  let height = width * 0.4 * 10;
  let colourIdx = Math.ceil(Math.random() * 4);
  let color = "green";
  switch(colourIdx) {
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "blue";
      break;
    case 3:
      color = "red";
      break;
    default:
      color = "green";
  }
  const rect = el.getBoundingClientRect();

  const div = el.ownerDocument!.createElement("div");
  div.classList.add("confetti");
  div.style.backgroundColor = color;
  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
  div.style.position = `absolute`;
  div.style.top = `${rect.top + rect.height / 2}px`;
  div.style.left = `${rect.left + rect.width / 2}px`;
  div.style.opacity = "1";
  div.style.transform = `rotate(${Math.random()*360}deg)`;

  el.ownerDocument!.body.appendChild(div);
//   setTimeout(() => {
//     div.remove();
//   }, 1000);
}
