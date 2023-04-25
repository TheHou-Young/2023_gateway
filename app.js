const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { loadEnv } = require('./config/env')
const connectDB = require('./config/db')
const { errorConfig, notExistConfig } = require("./middlewares/error/index");
const healthRouter = require("./routes/consul");
const { getConsul } = require("./middlewares/consul/index");
const { apiProxy } = require("./middlewares/proxy/index");
const checktoken = require("./middlewares/checktoken/index");
const {getServiceIP} = require("./utils/ip/index")

// 测试一下token的使用
// const { createAccessToken } = require("./utils/jwt/index");
// const token = createAccessToken({ account: 123456789, role_id: 1234 });
// console.log(token);

const app = express();
const consul = getConsul();// 初始化consul客户端并注册自己的服务

loadEnv() // 加载env环境
connectDB() // 连接数据库

app.use(logger("dev"));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/health", healthRouter);
app.use(checktoken); // 检查token有效性

getServiceIP(consul)// 获取目标服务的IP
app.use(apiProxy);// 将对应请求转发到目标服务

app.use(errorConfig); // 404
app.use(notExistConfig); // 500

module.exports = app;
