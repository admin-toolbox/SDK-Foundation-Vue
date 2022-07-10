// Prevent scrolling on touch activity
let stopScrolling = false;

window.addEventListener("touchmove", handleTouchMove, {
  passive: false,
});

function handleTouchMove(e) {
  if (!stopScrolling) return;
  e.preventDefault();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onTouchStart() {
  stopScrolling = true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onTouchEnd() {
  stopScrolling = false;
}
