const { verifyJwt } = require("../../utils/jwt/index");

const assign = (object, account, role_id) => ({
  ...object,
  my_account: account,
  my_role_id: role_id,
});

const checktoken = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (!token) {
    // TODO——为不需要鉴权的接口设置白名单
    next()
    return //res.status(401).send('Missing authorization header');
  }
  try {
    const {account, role_id} = verifyJwt(token);
    console.log(account)
    console.log(role_id)
    // req.body = assign(req.body, account, role_id);
    // req.query = assign(req.query, account, role_id);
    req.my_account = account;
    req.my_role_id = role_id;
    next();
  } catch (error) {
    return res.json({ msg: "token已经过期，请重新登录", code: 401 });
  }
};

module.exports = checktoken;
