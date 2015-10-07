export function isTab(e) {
  return e.keyCode === 9;
}

export function isEnter(e) {
  return e.keyCode === 13;
}

export function isBackspace(e) {
  return e.keyCode === 8;
}

export function direction(e) {
  switch (e.keyCode) {
  case 37:
    return { left: true };
  case 38:
    return { up: true };
  case 39:
    return { right: true };
  case 40:
    return { down: true };
  default:
    return {};
  }
}
