const os = require('os')
const { redisClient } = require("../../config/db/redis")

// 获取本服务所在IP
const getIPAddress = () => {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

// TODO——通过循环获取所有服务的IP并写入redis中
// const serviceName1 = "service_one"
const serviceName2 = "user_manage"

// 获取目标服务的IP并存放到redis中
async function getServiceIP (consul) {
  // const url1 = await consul.getServiceURL(serviceName1)
  const url2 = await consul.getServiceURL(serviceName2)
  // console.log("1111" + url)
  // redisClient.set(serviceName1, url1)
  redisClient.set(serviceName2, url2)

}

module.exports = { getIPAddress, getServiceIP }
