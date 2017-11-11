
import toTreeString from './tree';
import toPlainString from './plain';


const renderers = {
  tree: toTreeString,
  plain: toPlainString,
};

export default outputFormat => renderers[outputFormat];
