/**
 * @description A simple function that filters out a key from an object
 * @param key The  key in the object as a string to remove
 * @param obj The object to filter through
 * @returns
 */
export const omitKeyFromObject = (key: string, obj: object) =>
  Object.fromEntries(Object.entries(obj).filter((e) => e[0] != key))

//   source: https://stackoverflow.com/questions/43011742/how-to-omit-specific-properties-from-an-object-in-javascript/56773391#56773391
