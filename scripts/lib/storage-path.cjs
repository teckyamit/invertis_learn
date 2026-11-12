const path = require('path');
exports.resourcePath = value => {
  const root=path.resolve(process.env.PRIVATE_STORAGE_PATH || 'storage/uploads');
  const result=path.resolve(root, value.replace(/^uploads\//,''));
  if(!result.startsWith(root+path.sep))throw Error('Invalid storage path');
  return result;
};
