import yamlParser from 'js-yaml';
import ini from 'ini';
import getDiff from './diff';

export default {
  json: [JSON.parse, getDiff],
  yaml: [yamlParser.safeLoad, getDiff],
  yml: [yamlParser.safeLoad, getDiff],
  ini: [ini.decode, getDiff],
};
