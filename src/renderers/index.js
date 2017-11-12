
import toTreeString from './tree';
import toPlainString from './plain';
import toJSONString from './json';


const renderers = {
  tree: toTreeString,
  plain: toPlainString,
  json: toJSONString,
};

export default outputFormat => renderers[outputFormat];
