export const trimString = (string: string, length = 35) =>
  string?.length > length ? string.substring(0, length) + '...' : string;
