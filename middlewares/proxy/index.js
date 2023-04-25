const { createProxyMiddleware } = require('http-proxy-middleware');
const { redisClient } = require("../../config/db/redis")

const assign = (object, account, role_id) => ({
    ...object,
    my_account: account,
    my_role_id: role_id,
  });

async function createServiceProxy(url, serviceName){
    const proxy = createProxyMiddleware(`/${serviceName}`, {
        target: url,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/service_one': '',
          '^/service_two': ''
        },
        onProxyReq: (proxyReq, req, res) => {
            if (req.my_account && req.my_role_id) {
                proxyReq.setHeader('Account', req.my_account);
                proxyReq.setHeader('Role_id', req.my_role_id);
              }
          }
      });
    return proxy;
}

async function apiProxy (req, res, next) {
  const serviceName = req.path.split("/")[1];
  if (!serviceName) {
    return next();
  }
  // const urls = await consul.getServiceURL(serviceName)
  const url = await redisClient.get(serviceName)
  console.log("2222" + url);
  const proxy = await createServiceProxy(url, serviceName);
  if (!proxy) {
    return res.status(404).send(`No such service: ${serviceName}`);
  }
  return proxy(req, res, next);
}

module.exports = {
    createServiceProxy,
    apiProxy,
}