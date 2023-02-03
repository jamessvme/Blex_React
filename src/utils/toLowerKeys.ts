export function toLowerKeys(obj: any) {
  return Object.keys(obj).reduce((accumulator, key) => {
    (accumulator as any)[lowerFirstLetter(key)] = obj[key];
    return accumulator;
  }, {});
}

function lowerFirstLetter(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
