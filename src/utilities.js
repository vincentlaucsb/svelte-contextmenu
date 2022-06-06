export function createStyleString(style) {
  const ret = [];

  for (let key of Object.keys(style)) {
    ret.push(`${key}: ${style[key]};`);
  }

  return ret.join(' ');
}