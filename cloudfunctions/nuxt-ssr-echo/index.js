const cloud = require('@cloudbase/node-sdk');

// eslint-disable-next-line require-await
exports.main = async (event, context) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  return {
    event,
    envId: cloud.parseContext(context).namespace,
  };
};
