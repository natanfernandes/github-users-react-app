/**
 * método que verifica se um obj tem uma propriedade e se ela é valida
 */
export function hasValidProperty(object, property) {
  if (object && object[property]) {
    return object[property];
  }
  return null;
}

/**
 * método que verifica se um obj tem uma propriedade(number) e se ela é valida
 */
export function hasValidNumberProperty(object, property) {
  if (object && object[property]) {
    return object[property];
  }
  return 0;
}
