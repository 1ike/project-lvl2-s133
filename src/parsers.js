import yamlParser from 'js-yaml';
import ini from 'ini';


export default {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  yml: yamlParser.safeLoad,
  ini: ini.decode,
};
