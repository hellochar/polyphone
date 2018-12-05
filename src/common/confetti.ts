// https://codepen.io/anon/pen/JMOQzE
const confettis: HTMLElement[] = [];
export function addConfetti() {
  let width = Math.random() * 8 * 2;
  let height = width * 0.4;
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
  const container = document.createElement("div");
  container.className = "confetti-container";
  container.style.top = `${Math.random() * -10}%`;
  container.style.left = `${Math.random() * 110 - 10}%`;

  const div = document.createElement("div");
  div.className = "confetti";
  div.style.backgroundColor = color;
  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
  div.style.transform = `rotate(${Math.random()*360}deg)`;

  container.appendChild(div);
  document.body.appendChild(container);

  confettis.push(container);
  setTimeout(() => {
      document.body.removeChild(container);
  }, 20000);
}