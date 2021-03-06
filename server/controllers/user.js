const userModel = require('../models/userModel.js');
const projectModel = require('../models/projectModel.js');

exports.searchuser = function* () {
  this.body = yield userModel.find({}, (err, res) => {
    if (err) return;
  });
};
exports.getUserList = function* () {
  this.body = yield userModel.find({}, (err, res) => {
    if (err) return;
  });
};
/**
 * 添加一个新用户
 */
exports.addUser = function* () {
  const user = this.request.body;
  let isRepeat = false;
  // 需要先判断一下是否存在相同的用户名
  const userList = yield userModel.find({}, (err, res) => {
    if (err) return;
    return res;
  });
  userList.forEach((item, index, array) => {
    if (item.name == user.name) {
      isRepeat = true;

      return;
    }
  })
  if (isRepeat) {
    this.body = '该名字的用户名已经存在，请重新申请';
  } else {
    let newUser = yield userModel(user).save();
    newUser.password = '****';
    this.body = newUser;
  }

};
/* 用户登录 */
exports.login = function* (ctx) {
  const body = this.request.body;
  let result = yield userModel.findOne(body, (err, res) => {
    console.log('登录接口返回');
    if (err) {
      return '登录失败';
    }
    if (res) {
      const user = res;
      return {
        name: user.name,
      };
    } else {
      return  '用户名或者密码有误';
    }
  });
  this.body = result;
};

