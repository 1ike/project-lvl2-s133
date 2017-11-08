import yamlParser from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  yml: yamlParser.safeLoad,
  ini: ini.decode,
};

export default format => parsers[format];
