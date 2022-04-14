/**
 * Returns a new object with each key-value pair remapped to a newKey-value
 * pair.
 *
 * @param object - the object to be remapped
 * @param toString - a function to generate a new key for each pair
 */
const remapObject = <R extends Object = Object>(
  object: Object,
  toString: (key: string) => string
): R =>
  Object.entries(object).reduce(
    (mapped, [key, value]) => ({ ...mapped, [toString(key)]: value }),
    {} as R
  )
export default remapObject
