const BACKEND_CODE = {
  OK: 200,
  CODE_ERROR: 400,
  BUSINESS_ERROR: 10001,
};

const MESSAGE = {
  [BACKEND_CODE.OK]: "成功",
};

const REDIS_DB = {
  login: 0,
  permission: 1,
};
// consul 客户端以及本服务的相关配置
const CONSUL = {
  HOST: "127.0.0.1",
  HOST_PORT: 8500,
  SERVICE_NAME: "gateway",
  SERVICE_PORT: 3001,
};

module.exports = {
  BACKEND_CODE,
  MESSAGE,
  REDIS_DB,
  CONSUL,
};
