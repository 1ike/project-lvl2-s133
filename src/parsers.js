import yamlParser from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  yml: yamlParser.safeLoad,
  ini: ini.decode,
};

const formats = Object.keys(parsers);

export default (format) => {
  const iter = (current, ...rest) => {
    if (current === format) {
      return parsers[format];
    }

    return iter(...rest);
  };

  return iter(...formats);
};
