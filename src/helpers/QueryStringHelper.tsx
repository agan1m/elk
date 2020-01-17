export default function(params: Object) {
  let string = '?';
  for (let [key, value] of Object.entries(params)) {
    if (value > 0) {
      if (string === '?') {
        string += `${key}=${value}`;
      } else {
        string += `&${key}=${value}`;
      }
    }
  }
  return string;
}
