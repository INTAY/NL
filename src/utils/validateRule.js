const valiadteRule = {
  //验证密码位数
  validatePassword: (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error("密码不能小于6位"));
    } else {
      callback();
    }
  },
  
  //验证电话号码（座机和手机）
  validatePhone: (rule, value, callback) => {
    let reg1 = /(^1[2|3|4|5|6|7|8|9]\d{9}$)/; //手机号验证
    let reg2 = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/; //座机号验证
    if (!reg1.test(value) && !reg2.test(value)) {
      callback(
        new Error("电话号码格式不正确，如：13888888888 或 023-66666666")
      );
    } else {
      callback();
    }
  },

  //验证固定电话号码
  validateTel: (rule, value, callback) => {
    let reg = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/; //座机号验证
    if (!reg.test(value)) {
      callback(
        new Error("电话格式不正确，请输入带区号的固定电话，如：023-68686868")
      );
    } else {
      callback();
    }
  },

  //验证姓名为中文
  validateChineseName: (rule, value, callback) => {
    let reg = /^[\u4e00-\u9fa5]+$/; //汉字验证
    if (!reg.test(value)) {
      callback(new Error("姓名必须是中文"));
    } else {
      callback();
    }
  },

  //账号格式
  validateAccountFormat: (rule, value, callback) => {
    let reg = /^[0-9a-zA-Z]*$/; //数字+英文
    if (!reg.test(value)) {
      callback(new Error("输入格式不正确。如：TEST或test08"));
    } else {
      callback();
    }
  },

  //验证手机号码
  validateCellPhone: (rule, value, callback) => {
    let reg = /(^1[2|3|4|5|6|7|8|9]\d{9}$)/; //手机号验证
    if (!reg.test(value)) {
      callback(new Error("手机号码格式不正确"));
    } else {
      callback();
    }
  },

  //验证是否为货币型数值
  validateMoney: (rule, value, callback) => {
    let reg = /^\d+(?:\.\d{0,2})?$/;
    if (!reg.test(value) || value == 0) {
      callback(new Error("请输入正确的金额数值"));
    } else {
      callback();
    }
  },

  // 确认密码验证。(传入两个参数，1.this，2.表单值的名称字符串)
  validateConfirm: (that, formValName) => {
    return function (rule, value, callback) {
      if (value !== that[formValName].password) {
        callback(new Error("两次输入的密码不相同"));
      } else {
        callback();
      }
    }
  },

}


export default valiadteRule