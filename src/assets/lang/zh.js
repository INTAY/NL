module.exports = {
    //顶部导航
    navbar: {
        personal_information: '个人信息',//个人信息
        logout: '退出',//退出
    },
    //首页
    home_title: {
        title: '首页'
    },
    home_placeholder: {
        startDate: '开始日期',
        endDate: '结束日期'
    },
    home_buttons: {
        button1: '导出数据',
        button2: '月',
        button3: '周',
        button4: '日',
        button5: '时',
    },
    home_select: '月',
    home_date_picker: {
        title: "选择统计时间段",
        start_date_placeholder: "开始日期",
        end_date_placeholder: "结束日期",
    },
    home_echarts: {
        name: "鉴权次数",
        type1:"折线图",
        type2:"柱状图",
        x_name:"时间",
        y_name:"鉴权次数",
    },

    //消息管理
    msg_title: {
        title: '消息管理',
        detailTitle: '消息详情',
    },
    msg_buttons: {
        button1: '搜索',//搜索
        button2: '重置',//重置
        button3: '全部',//全部
        button4: '已读',//已读
        button5: '未读',//未读
        button6: '删除',//删除
        input_placeholder: '请输入标题或内容',//搜索输入框提示语-请输入标题或内容
    },
    msg_table: {
        title: '标题',//标题
        content: '内容',//内容
        time: '时间',//时间
    },
    
    //角色管理
    role_manage_title: {
        title: '角色管理'
    },
    role_manage_buttons: {
        button1: '搜索',//搜索
        button2: '重置',//重置
        button3: '添加角色',//添加角色
        button4: '配置',//配置
        button5: '修改',//修改
        button6: '删除',//删除
        button7: '启用',//启用
        button8: '禁用',//禁用
    },
    role_manage_query: {
        input_title: '角色',//搜索输入框
        input_placeholder: '请输入角色编号或名称',//搜索输入框提示语
        select_title: '角色状态',//搜索选择框
        select_placeholder: '请选择角色状态',//搜索输入框提示语
        role_state_using: '启用中',//启用中
        role_state_disabled: '禁用中',//禁用中
        role_state_all: '全部',//全部
    },
    role_manage_table: {
        title_role_number: '角色编号',//角色编号
        title_role_name: '角色名称',//角色名称
        title_role_status: '角色状态',//角色状态
        title_note: '备注',//备注
        title_operation: '操作',//操作
        confirm_text: '确定要删除此角色吗?',//删除提示信息
        confirm_title: '删除角色',//删除提示标题-删除角色
        confirm_result: '删除角色成功',//删除提示结果-删除角色成功
        chooseRole: '请选择资源',//请选择资源
        role_notice:"角色名称不能为空"//角色名称输入空格提示
    },

    //角色管理-新增/修改
    role_add_title: {
        title: '新增角色',
        title2: '修改角色'
    },
    main_content: {
        input_title1: '角色名称',
        input_placeholder1: '请输入角色名称',//请输入角色名称
        input_rolename:'角色名称不能为空',//角色姓名不能为空
        input_title2: '角色备注',//角色备注
        input_placeholder2: '请输入备注信息',//请输入备注信息
        input_title3: '角色状态',//角色状态
        select_title1: '生效日期',//生效日期
        select_placeholder1: '请选择日期',//请选择日期
        select_title2: '失效日期',//失效日期
        select_placeholder2: '请选择日期',//请选择日期
        button_title: '合同有效期', //合同有效期
        button_name1: '提交', // 提交/确定
        button_name2: '取消', // 取消
    },

    //角色管理-配置
    role_configuration_title: {
        title: '角色配置',//角色配置
        title2: '配置列表',//配置列表
    },

    //用户管理
    user_manage_title: {
        title: '用户管理',
        title2: '用户详情'
    },
    user_manage_buttons: {
        button1: '搜索',//搜索
        button2: '重置',//重置
        button3: '添加用户',//添加角色
        button4: '查看',//查看
        button5: '修改',//修改
        button6: '删除',//删除
        button7: '启用',//启用
        button8: '禁用',//禁用
        button9: '重置密码',//重置密码
    },
    user_manage_query: {
        input_title: '用户',//搜索输入框-用户
        input_placeholder: '请输入用户ID，用户名或姓名',//搜索输入框提示语
        select_placeholder1: '请选择角色',//选择框提示语
        select_placeholder2: '请选择用户状态',//选择框提示语
        user_state_using: '使用中',//使用中
        user_state_disabled: '禁用中',//禁用中
    },
    user_manage_table: {
        user_id: '工号',//工号
        user_name: '用户名',//用户名称
        name: '姓名',//姓名
        phone_number: '手机号码',//手机号码
        creat_time: '创建时间',//角色creat_time
        user_state: '用户状态',//用户状态
        title_operation: '操作',//操作
        confirm_text: '确定删除此用户吗？',//删除提示信息
        confirm_title: '删除用户',//删除提示标题-删除用户
        confirm_result: '用户删除成功',//删除提示结果-删除用户成功
        user_name_notice:"用户姓名不能为空"//用户姓名输入空格提示
    },

    //用户管理-新增/修改
    user_add_title: {
        title: '添加用户',
        title2: '修改用户'
    },
    user_main_content: {
        input_title1: '用户名',
        input_placeholder1: '请输入用户名',//请输入用户名
        input_title2: '姓名',//角色备注
        input_placeholder2: '请输入姓名',//请输入备注信息
        sex: "性别",//性别
        sex_male: '男',//男
        sex_female: '女',//女
        user_status: "状态",//状态
        status_enable: '启用',//启用
        status_disable: '禁用',//禁用
        input_title3: '手机号码',//手机号码
        input_placeholder3: '请输入手机号码',//请输入手机号码
        input_title4: '邮箱',//邮箱
        input_placeholder4: '请输入邮箱',//请输入邮箱
        select_title1: '角色',//角色
        select_placeholder1: '请选择角色',//请选择角色
        input_title5: '备注',//角色备注
        input_placeholder5: '请输入备注信息',//请输入备注信息
        button_name1: '提交', // 提交/确定
        button_name2: '取消', // 取消
    },

    //登陆日志
    login_title: {
        title: '登陆日志'
    },
    login_buttons: {
        button1: '搜索',//搜索
        button2: '重置',//重置
    },
    login_query: {
        input_title: '日志',//搜索输入框-日志
        input_placeholder: '请输入用户名、姓名',//搜索输入框提示语-请输入用户名，姓名
        select_title: '操作时间',//搜索选择框-操作时间
        select_placeholder1: '开始日期',//选择框提示语-开始日期
        select_placeholder2: '结束日期',//选择框提示语-结束日期
        select_action_title: '行为',//搜索选择框-行为
        action_option1: '全部',//搜索行为下拉框选项
        action_option2: '登陆',//搜索行为下拉框选项
        action_option3: '退出',//搜索行为下拉框选项
    },
    login_table: {
        user_name: '用户名',//用户名
        name: '姓名',//姓名
        action: '行为',//行为
        time: '时间',//时间
    },

    //操作日志
    operation_title: {
        title: '操作日志'
    },
    operation_buttons: {
        button1: '搜索',//搜索
        button2: '重置',//重置
    },
    operation_query: {
        input_title: '日志',//搜索输入框-日志
        input_placeholder: '请输入用户名、姓名',//搜索输入框提示语-请输入用户名、姓名
        select_title: '操作时间',//搜索选择框-操作时间
        select_placeholder1: '开始日期',//选择框提示语-开始日期
        select_placeholder2: '结束日期',//选择框提示语-结束日期
        select_action_title: '操作类型',//搜索选择框-操作类型
        action_option1: '全部',      //搜索操作类型下拉框选项
        action_option2: '新增',      //搜索操作类型下拉框选项
        action_option3: '修改',      //搜索操作类型下拉框选项
        action_option4: '删除',      //搜索操作类型下拉框选项
        action_option5: '其他',      //搜索操作类型下拉框选项
    },
    operation_table: {
        user_name: '用户名',//用户名
        name: '姓名',//姓名
        time: '操作时间',//时间
        type: '操作类型',//操作类型
        description: '描述',//描述
    },

    //个人中心
    personal_title: {
        title: '个人信息'
    },
    personal_buttons: {
        button1: '修改',//修改
        button2: '提交',//提交
        button3: '取消',//取消
    },
    personal_content: {//个人中心
        user_avatar: '用户头像',//用户头像
        user_name: '用户名',//用户名
        role: '角色',//角色
        name: '姓名',//姓名
        sex: '性别',//性别
        mobile_phone: '手机号码',//手机号码
        email: '邮箱',//邮箱
        password: '密码',//密码

        //弹窗用
        sex_male: '男',//男
        sex_female: '女',//女
        current_mobile_phone: '当前手机号码',//当前手机号
        new_mobile_phone: '新手机号码',//新手机号
        current_email: '当前邮箱',//当前邮箱
        new_email: '新邮箱',//新邮箱
        current_login_password: '当前密码',//当前登陆密码
        new_login_password: '新密码',//新密码
        enter_again: '再次输入',//再次输入
        //修改弹窗标题
        modify_head_icon: '修改头像',//修改头像
        modify_name: '修改姓名',//修改姓名
        modify_sex: '修改性别',//修改性别
        modify_mobile_phone: '修改手机号',//修改手机号
        modify_Email: '修改邮箱',//修改邮箱
        modify_password: '修改密码',//修改密码
        current_email_notice: '当前邮箱输入不正确',//当前邮箱输入不正确
        current_phone_notice: '新手机号与当前手机号一致，无法修改'//新手机号与当前手机号一致，无法修改
    },
    personal_text: {
        enter_username: '请输入用户名',//请输入用户名
        enter_name: '请输入姓名',//请输入用户名
        enter_current_mobile_phone: '请输入当前手机号',//请输入当前手机号
        enter_new_mobile_phone: '请输入新手机号',//请输入新手机号
        current_email: '请输入当前邮箱',//请输入当前邮箱
        new_email: '请输入新邮箱',//请输入新邮箱
        current_password: '请输入当前密码',//请输入当前密码
        new_password: '请输入新密码',//请输入新密码
        enter_agin: '再次输入新密码',//请再次输入
    },
    //修改返回结果提示
    personal_placeholder: {
        dialog_placeholder1: '修改成功',//修改成功
        dialog_placeholder2: '头像上传成功',//头像上传成功
        dialog_placeholder3: '修改异常',//修改异常
        dialog_placeholder4: '头像上传异常',//修改异常
    },

    //设备管理
    device_manage_title: {
        title: '设备管理'
    },
    device_manage_buttons: {
        button1: '搜索',//搜索
        button2: '重置',//重置
        button3: '查看',//查看
        button4: '编辑',//编辑
        button5: '删除',//删除
    },
    device_manage_query: {
        input_title1: '设备',//搜索输入框
        input_placeholder1: '请输入设备ID或客户名称',//搜索输入框提示语
        input_title2: '注册时间',//搜索输入框
        input_placeholder2: '请选择注册时间',//搜索输入框提示语
    },
    device_manage_table: {
        title_device_id: '设备ID',//设备ID
        title_custname: '客户名称',//客户名称
        title_time: '注册时间',//注册时间
        title_times: '鉴权次数',//鉴权次数
        title_newtime: '最近鉴权时间',//最近鉴权时间
        title_operation: '操作',//操作
        confirm_text: '确认删除该设备？',//删除提示信息
        confirm_title: '删除设备',//删除提示标题-删除设备
        confirm_result: '删除设备成功',//删除提示结果-删除设备成功
    },

    //设备管理-查看
    device_view_title: {
        title: '查看设备'
    },
    device_view_buttons: {
        button1: '返回',//返回
    },
    device_view_form: {
        title_device_id: '设备ID',//设备ID
        title_times: '鉴权次数',//鉴权次数
        title_custname: '客户名称',//客户名称
        title_time: '设备注册时间',//设备注册时间
        title_newtime: '最近鉴权时间',//最近鉴权时间
        title_note: '备注',//备注
        title_success: '设备修改成功',//设备修改成功
    },

    //设备管理-编辑
    device_edit_title: {
        title: '编辑设备',
        title1: '请输入设备信息',
    },
    device_edit_buttons: {
        button1: '确定',//确定
        button2: '取消',//取消
    },
    device_edit_form: {
        title_device_id: '设备ID',//设备ID
        title_times: '鉴权次数',//鉴权次数
        title_custname: '客户名称',//客户名称
        title_note: '备注',//备注
    },

    //客户管理
    customer_manage_title: {
        title: '客户管理',
        title1: '查看号段',//查看号段
        title2: '号段',//号段
        title3: '已添加',//已添加
        title4: '暂无数据',//暂无数据
    },
    customer_manage_buttons: {
        button1: '搜索',//搜索
        button2: '重置',//重置
        button3: '添加客户',//添加客户
        button4: '导入设备',//导入设备
        button5: '查看',//查看
        button6: '修改',//修改
        button7: '删除',//删除
    },
    customer_manage_query: {
        input_title: '客户',//搜索输入框
        input_placeholder: '请输入客户姓名或联系方式',//搜索输入框提示语
    },
    customer_manage_table: {
        title_customer_name: '客户姓名',//客户姓名
        title_phone: '手机',//手机
        title_telephone: '固定电话',//固定电话
        title_number: '设备数量',//设备数量
        title_operation: '操作',//操作
        confirm_text: '确认删除该客户？',//删除提示信息
        confirm_title: '删除客户',//删除提示标题-删除客户
        confirm_result: '删除客户成功',//删除提示结果-删除客户成功
    },

    //客户管理-查看
    customer_view_title: {
        title: '查看客户'
    },
    customer_view_buttons: {
        button1: '返回',//返回
    },
    customer_view_form: {
        title_custname: '客户名称',//客户名称
        title_device_id: '设备ID号段',//设备ID号段
        title_industry: '所属行业',//所属行业
        title_concat: '联系人',//联系人
        title_phone: '手机号码',//手机号码
        title_telephone: '固定电话',//固定电话
        title_email: '邮箱',//邮箱
    },

    //客户管理-修改-添加
    customer_edit_title: {
        title1: '添加客户',
        title2: '修改客户'
    },
    customer_edit_buttons: {
        button1: '确定',//确定
        button2: '取消',//取消
        button3: '添加/编辑',//添加/编辑
        button4: '添加号段',//添加号段
    },
    customer_edit_query: {
        input_title: '已添加4个号段',
        input_placeholder: '至',
        input_placeholder1: '请输入1-20位数字或符号',
        input_placeholder2: '请输入1-20位字符',
        input_placeholder3: '请输入1-40位字符',
        input_placeholder4: '请输入起始号段',
        input_placeholder5: '请输入结束号段',
    },
    customer_edit_table: {
        title_segment: '号段',//号段
        title_top: '添加/编辑号段',//添加/编辑号段
    },

    //客户管理-导入设备
    customer_import_title: {
        title1: '导入设备',
        title2: '下载模板',
        title3: '导入',
    },
    customer_import_buttons: {
        button1: '确定',//确定
        button2: '取消',//取消
    },
    customer_import_table: {
        title_custname: '客户名称',//客户名称
        title_dev_start: '起始号段',//起始号段
        title_dev_end: '结束号段',//结束号段
        title_status: '导入状态',//导入状态
        title_explain: '说明',//说明
    },

    //系统管理
    system_manage_title: {
        title: '系统管理'
    },

    //通用部分内容
    loading:'加载中...',
    add_sucess: '添加成功',//添加成功
    change_sucess: '修改成功',//修改成功
    Configuration_sucess: '配置成功',//配置成功
    enter_required: '请输入必填项',//请输入必填项

    //验证提示信息
    rules: {
        enter_username: '请输入用户名',//请输入用户名
        Username_rules:'用户名必须包含字母和数字',//用户名必须包含字母和数字
        enter_name: '请输入姓名',//请输入姓名
        select_roles: '请选择角色',//请选择角色
        enter_current_password: '请输入密码',//请输入密码
        enter_again: '请再次输入密码',//请再次输入密码
        two_passwords: '两次输入密码不一致!',//两次输入密码不一致!
        reset_password:'确认重置该用户密码？',//确认重置该用户密码？
        reset_password_tip:'重置后密码为手机号码后6位',//重置后密码为手机号码后6位
        enter_phone: '请输入电话号码',//请输入电话号码
        enter_correct_custname: '客户名称可以只能由中文字母和数字组成',
        enter_correct_phone: '请输入正确的手机号码，且长度为6-20位',//请输入正确的电话号码
        enter_correct_telephone: '请输入正确的固定电话',//请输入正确的固定电话
        enter_email: '请输入邮箱',//请输入邮箱
        enter_correct_email: '请输入正确的邮箱地址',//请输入正确的邮箱地址
        select_role: '请选择角色',//请选择角色
        uploading_avatar:'上传头像格式错误',//上传头像格式错误
        avatars_size:'上传头像图片大小不能超过 200KB!',//上传头像图片大小不能超过 200KB!
        //长度及格式限制
        length_up_6_16:'长度应该是6至16 个字符',//长度应该是6至16 个字符
        length_up_16:'长度应该是16 个字符',//长度应该是16 个字符
        length_up_10:'长度最多10 个字符',//长度最多10 个字符
        length_up_20:'长度最多20 个字符',//长度最多20 个字符
        length_up_30:'长度最多30 个字符',//长度最多30 个字符
        length_up_40:'长度最多40 个字符',//长度最多40 个字符
        length_up_400:'长度最多400 个字符',//长度最多400 个字符
        username_up:'用户名5~30个字符，只能且必须同时包含字母和数字',//用户名5~30个字符，只能且必须同时包含字母和数字
        loading: '加载中...'//加载中
    },

    //路由
    router: {
        system_management: '系统管理', //系统管理
        login_log: '登录日志', //登录日志
        operation_log: '操作日志', //操作日志
        user_manage: '用户管理', //用户管理
        role_manage: '角色管理', //角色管理
        user_data: '个人信息', //个人信息
        msg_center: '消息管理', //消息管理
    },

    //成功提示
    sucess: {
        cust_download: '模板下载成功',//模板下载成功
        cust_import: '导入设备成功',//导入设备成功
        timeout:'该操作耗时较长，请耐心等待',//该操作耗时较长，请耐心等待
    }
}