import { parsers, formats } from './formats';

export default (format) => {
  const iter = (current, ...rest) => {
    if (current === format) {
      return parsers[format];
    }
    if (!current) {
      throw new Error(`Format "${format}" is not supported.`);
    }

    return iter(...rest);
  };

  return iter(...formats);
};
