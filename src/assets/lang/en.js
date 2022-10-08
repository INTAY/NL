module.exports = {
    //顶部导航
    navbar: {
        personal_information: 'Personal Information',//个人信息
        logout: 'Log Out',//个人信息
    },
    //首页
    home_title: {
        title: 'Home'
    },
    home_placeholder: {
        startDate: 'Start date',
        endDate: 'End date'
    },
    home_buttons: {
        button1: 'Export',
        button2: 'Month',
        button3: 'Week',
        button4: 'Day',
        button5: 'Hour',
    },
    home_select: 'Month',
    home_date_picker: {
        title: "Select statistical time period",
        start_date_placeholder: "Start Date",
        end_date_placeholder: "End Date",
    },
    home_echarts: {
        name: "Authentication Times",
        type1:"Line chart",
        type2:"Histogram",
        x_name:"Times",
        y_name:"Authentication Times",//鉴权次数
    },

    //消息管理
    msg_title: {
        title: 'Message Management',
        detailTitle: 'Message Detail',
    },
    msg_buttons: {
        button1: 'Search',//搜索
        button2: 'Reset',//重置
        button3: 'All',//全部
        button4: 'Read',//已读
        button5: 'Unread',//未读
        button6: 'Delete',//删除
        input_placeholder: 'Please enter title or content',//搜索输入框提示语-请输入标题或内容
    },
    msg_table: {
        title: 'Title',//标题
        content: 'Content',//内容
        time: 'Time',//时间
    },


    //角色管理
    role_manage_title: {
        title: 'Role Management'
    },
    role_manage_buttons: {
        button1: 'Search',//搜索
        button2: 'Reset',//重置
        button3: 'Add Role',//添加角色
        button4: 'Configuration',//配置
        button5: 'Modify',//修改
        button6: 'Delete',//删除
        button7: 'Enable',//启用
        button8: 'Disable',//禁用
    },
    role_manage_query: {
        input_title: 'Role',//搜索输入框
        input_placeholder: 'Please enter the role number or name',//搜索输入框提示语
        select_title: 'Role Status',//搜索选择框
        select_placeholder: 'Please select the role status',//搜索输入框提示语
        role_state_using: 'Using',//使用中
        role_state_disabled: 'Disabled',//禁用中
        role_state_all: 'All',//全部
    },
    role_manage_table: {
        title_role_number: 'Role Number',//角色编号
        title_role_name: 'Role Name',//角色名称
        title_role_status: 'Role Status',//角色状态
        title_note: 'Remarks',//备注
        title_operation: 'Operation',//操作
        confirm_text: 'Are you sure to delete this role?',//删除提示信息
        confirm_title: 'Delete Role',//删除提示标题-删除角色
        confirm_result: 'Role deleted successfully',//删除提示结果-删除角色成功
        chooseRole: 'Please select resource',//请选择资源
        role_notice:"The role name cannot be empty"//角色名称输入空格提示
    },

    //角色管理-新增/修改
    role_add_title: {
        title: 'Add Role',
        title2: 'Modify Role'
    },
    main_content: {
        input_title1: 'Role Name',
        input_placeholder1: 'Please enter the role name',//请输入角色名称
        input_rolename:'Rolename cannot be empty',//角色姓名不能为空
        input_title2: 'Role Remarks',//角色备注
        input_placeholder2: 'Please enter remarks',//请输入备注信息
        input_title3: 'Role Status',//角色状态
        select_title1: 'Effective Date',//生效日期
        select_placeholder1: 'Please select effective date',//请选择生效日期
        select_title2: 'Expiry  Date',//失效日期
        select_placeholder2: 'Please select expiry date',//请选择失效日期
        button_title: 'Term of contract', //合同有效期
        button_name1: 'submit', // 提交/确定
        button_name2: 'cancel', // 取消
    },

    //角色管理-配置
    role_configuration_title: {
        title: 'Role Configuration',//角色配置
        title2: 'Configuration List',//配置列表
    },

    //用户管理
    user_manage_title: {
        title: 'User Management',
        title2: 'User Detail'
    },
    user_manage_buttons: {
        button1: 'Search',//搜索
        button2: 'Reset',//重置
        button3: 'Add User',//添加用户
        button4: 'View',//查看
        button5: 'Modify',//修改
        button6: 'Delete',//删除
        button7: 'Enable',//启用
        button8: 'Disable',//禁用
        button9: 'Reset Password',//重置密码
    },
    user_manage_query: {
        input_title: 'User',//搜索输入框-用户
        input_placeholder: 'Please enter the user ID , username or name',//搜索输入框提示语
        select_placeholder1: 'Please select the role',//选择框提示语
        select_placeholder2: 'Please select the user status',//选择框提示语
        user_state_using: 'Using',//使用中
        user_state_disabled: 'Disabled',//禁用中
    },
    user_manage_table: {
        user_id: 'UserID',//工号
        user_name: 'Username',//用户名称
        name: 'Name',//姓名
        phone_number: 'Mobile Phone Number',//手机号码
        creat_time: 'Creat Time',
        user_state: 'User Status',//用户状态
        title_operation: 'Operation',//操作
        confirm_text: 'Are you sure to delete this user?',//删除提示信息
        confirm_title: 'Delete User',//删除提示标题-删除角色
        confirm_result: 'User deleted successfully',//删除提示结果-删除用户成功
        user_name_notice:"The user name cannot be empty"//用户姓名输入空格提示
    },

    //用户管理-新增/修改
    user_add_title: {
        title: 'Add User',
        title2: 'Modify User'
    },
    user_main_content: {
        input_title1: 'User Name',
        input_placeholder1: 'Please enter the user name',//请输入用户名
        input_title2: 'Name',//角色备注
        input_placeholder2: 'Please enter name',//请输入备注信息
        sex: "Sex",//性别
        sex_male: 'Male',//男
        sex_female: 'Female',//女
        user_status: "Status",//状态
        status_enable: 'Using',//启用
        status_disable: 'Disabled',//禁用
        input_title3: 'Mobile Phone',//手机号码
        input_placeholder3: 'Please enter the mobile phone number',//请输入手机号码
        input_title4: 'Email',//邮箱
        input_placeholder4: 'Please enter email',//请输入邮箱
        select_title1: 'Role',//角色
        select_placeholder1: 'Please select role',//请选择角色
        input_title5: 'Remarks',//角色备注
        input_placeholder5: 'Please enter remark',//请输入备注信息
        button_name1: 'submit', // 提交/确定
        button_name2: 'cancel', // 取消
    },

    //登陆日志
    login_title: {
        title: 'Login Log'
    },
    login_buttons: {
        button1: 'Search',//搜索
        button2: 'Reset',//重置
    },
    login_query: {
        input_title: 'Log',//搜索输入框-日志
        input_placeholder: 'Please enter username or name',//搜索输入框提示语-请输入用户名，姓名
        select_title: 'Operation Time',//搜索选择框-操作时间
        select_placeholder1: 'Start Date',//选择框提示语-开始日期
        select_placeholder2: 'End Date',//选择框提示语-开始日期
        select_action_title: 'Action',//搜索选择框-行为
        action_option1: 'All',        //搜索行为下拉框选项
        action_option2: 'Log In',     //搜索行为下拉框选项
        action_option3: 'Log Out',    //搜索行为下拉框选项
    },
    login_table: {
        user_name: 'User Name',//用户名
        name: 'Name',//姓名
        action: 'Action',//行为
        time: 'Time',//时间
    },

    //操作日志
    operation_title: {
        title: 'Operation Log'
    },
    operation_buttons: {
        button1: 'Search',//搜索
        button2: 'Reset',//重置
    },
    operation_query: {
        input_title: 'Log',//搜索输入框-日志
        input_placeholder: 'Please enter username，name',//搜索输入框提示语-请输入用户名，姓名
        select_title: 'Operation Time',//搜索选择框-操作时间
        select_placeholder1: 'Start Date',//选择框提示语-开始日期
        select_placeholder2: 'End Date',//选择框提示语-开始日期
        select_action_title: 'Operation Type',//搜索选择框-操作类型
        action_option1: 'All',        //搜索操作类型下拉框选项
        action_option2: 'Add',        //搜索操作类型下拉框选项
        action_option3: 'Modify',     //搜索操作类型下拉框选项
        action_option4: 'Delete',     //搜索操作类型下拉框选项
        action_option5: 'Other',     //搜索操作类型下拉框选项
    },
    operation_table: {
        user_name: 'User Name',//用户名
        name: 'Name',//姓名
        time: 'Operation Time',//时间
        type: 'Operation Type',//操作类型
        description: 'Description',//描述
    },

    //个人中心
    personal_title: {
        title: 'Personal Information'
    },
    personal_buttons: {
        button1: 'Modify',//修改
        button2: 'Submit',//提交
        button3: 'Cancel',//取消
    },
    personal_content: {//个人中心
        user_avatar: 'User Avatar',//用户头像
        organization: 'Organization',//组织
        department: 'Department',//部门
        user_name: 'Username',//用户名
        role: 'Role',//角色
        name: 'Name',//姓名
        sex: 'Sex',//性别
        mobile_phone: 'Mobile Phone Number',//手机号码
        email: 'Email',//邮箱
        password: 'Password',//密码

        //弹窗用
        sex_male: 'Male',//男
        sex_female: 'Female',//女
        current_mobile_phone: 'Current Mobile Phone Number',//当前手机号
        new_mobile_phone: 'New Mobile Phone Number',//新手机号
        current_email: 'Current Email',//当前邮箱
        new_email: 'New Email',//新邮箱
        current_login_password: 'Current Login Password',//当前登陆密码
        new_login_password: 'New Login Password',//新密码
        enter_again: 'Please Enter Again',//再次输入
        //修改弹窗标题
        modify_head_icon: 'Modify User Avatar',//修改头像
        modify_name: 'Modify Name',//修改姓名
        modify_sex: 'Modify Sex',//修改性别
        modify_mobile_phone: 'Modify Mobile Phone',//修改手机号
        modify_Email: 'Modify Email',//修改邮箱
        modify_password: 'Modify Password',//修改密码
        current_email_notice: 'The current email is not entered correctly',//当前邮箱输入不正确
        current_phone_notice: 'The new phone number is the same as the current phone number and cannot be modified'//新手机号与当前手机号一致，无法修改
    },
    personal_text: {
        enter_username: 'Please enter username',//请输入用户名
        enter_name: 'Please enter name',//请输入姓名
        enter_current_mobile_phone: 'Please enter the current mobile phone number',//请输入当前手机号
        enter_new_mobile_phone: 'Please enter new mobile phone number',//请输入新手机号
        current_email: 'Please enter the current email',//请输入当前邮箱
        new_email: 'Please enter the new email',//请输入新邮箱
        current_password: 'Please enter the current login password',//请输入当前密码
        new_password: 'Please enter the new login password',//请输入新密码
        enter_agin: 'Please enter login password again',//请再次输入
    },
    //修改返回结果提示
    personal_placeholder: {
        dialog_placeholder1: 'Modify Successfully',//修改成功
        dialog_placeholder2: 'Avatar Upload Successfully',//头像上传成功
        dialog_placeholder3: 'Abnormal changes',//修改异常
        dialog_placeholder4: 'Profile picture uploading anomaly',//修改异常
    },

    //设备管理
    device_manage_title: {
        title: 'Device Management',
    },
    device_manage_buttons: {
        button1: 'Search',//搜索
        button2: 'Reset',//重置
        button3: 'View',//查看
        button4: 'Edit',//编辑
        button5: 'Delete',//删除
    },
    device_manage_query: {
        input_title1: 'Device',//搜索输入框
        input_placeholder1: 'Please enter device ID or customer name',//搜索输入框提示语
        input_title2: 'Registration Time',//搜索输入框
        input_placeholder2: 'Please select registration time',//搜索输入框提示语
    },
    device_manage_table: {
        title_device_id: 'Device ID',//设备ID
        title_custname: 'Customer Name',//客户名称
        title_time: 'Registration Time',//注册时间
        title_times: 'Authentication Times',//鉴权次数
        title_newtime: 'Last Authentication Time',//最近鉴权时间
        title_operation: 'Operation',//操作
        confirm_text: 'Are you sure to delete this device?',//删除提示信息
        confirm_title: 'Delete Device',//删除提示标题-删除设备
        confirm_result: 'Device deletion successful',//删除提示结果-删除设备成功
    },

    //设备管理-查看
    device_view_title: {
        title: 'View Device'
    },
    device_view_buttons: {
        button1: 'Return',//返回
    },
    device_view_form: {
        title_device_id: 'Device ID',//设备ID
        title_times: 'Authentication Times',//鉴权次数
        title_custname: 'Customer Name',//客户名称
        title_time: 'Registration Time',//设备注册时间
        title_newtime: 'Last Authentication Time',//最近鉴权时间
        title_note: 'Remarks',//备注
    },

    //设备管理-编辑
    device_edit_title: {
        title: 'Edit Device',
        title1: 'Please enter device information',
    },
    device_edit_buttons: {
        button1: 'OK',//确定
        button2: 'Cancel',//取消
    },
    device_edit_form: {
        title_device_id: 'Device ID',//设备ID
        title_times: 'Authentication Times',//鉴权次数
        title_custname: 'Customer Name',//客户名称
        title_note: 'Remarks',//备注
        title_success: 'Equipment modification successful',//设备修改成功
    },

    //客户管理
    customer_manage_title: {
        title: 'Customer Management',
        title1: 'View number segment',//查看号段
        title2: 'number segment',//号段
        title3: 'Have added',//已添加
        title4: 'no data',//暂无数据
    },
    customer_manage_buttons: {
        button1: 'Search',//搜索
        button2: 'Reset',//重置
        button3: 'Add Customer',//添加客户
        button4: 'Import Device',//导入设备
        button5: 'View',//查看
        button6: 'Modify',//修改
        button7: 'Delete',//删除
    },
    customer_manage_query: {
        input_title: 'Customer',//搜索输入框
        input_placeholder: 'Please enter customer name or contact information',//搜索输入框提示语
    },
    customer_manage_table: {
        title_customer_name: 'Device Customer Name',//客户姓名
        title_phone: 'Mobile Phone Number',//手机
        title_telephone: 'Landline Number',//固定电话
        title_number: 'Number Of Devices',//设备数量
        title_operation: 'Operation',//操作
        confirm_text: 'Are you sure to delete the customer?',//删除提示信息
        confirm_title: 'Delete Customer',//删除提示标题-删除客户
        confirm_result: 'Customer deletion successful',//删除提示结果-删除客户成功
    },

    //客户管理-查看
    customer_view_title: {
        title: 'View Customer'
    },
    customer_view_buttons: {
        button1: 'Return',//返回
    },
    customer_view_form: {
        title_custname: 'Customer Name',//客户名称
        title_device_id: 'Device ID Number Segment',//设备ID号段
        title_industry: 'Industry',//所属行业
        title_concat: 'Contact',//联系人
        title_phone: 'Mobile Phone Number',//手机号码
        title_telephone: 'Landline Number',//固定电话
        title_email: 'Email',//邮箱
    },
    

    //客户管理-修改-添加
    customer_edit_title: {
        title1: 'Add Customer',
        title2: 'Modify Customer'
    },
    customer_edit_buttons: {
        button1: 'OK',//确定
        button2: 'Cancel',//取消
        button3: 'Add/Edit',//添加/编辑
        button4: 'Add Segment',//添加号段
    },
    customer_edit_query: {
        input_title: 'Four segments have been added',
        input_placeholder: 'to',
        input_placeholder1: 'Please enter 1 to 20 digits or symbols',
        input_placeholder2: 'Please enter 1 to 20 characters',
        input_placeholder3: 'Please enter 1 to 40 characters',
        input_placeholder4: 'Please enter the starting segment',
        input_placeholder5: 'Please enter the ending segment',
    },
    customer_edit_table: {
        title_segment: 'Segment',//号段
        title_top: 'Add/Edit Segment',//添加/编辑号段
    },

    //客户管理-导入设备
    customer_import_title: {
        title1: 'Import Device',
        title2: 'Download Template',
        title3: 'Import',
    },
    customer_import_buttons: {
        button1: 'OK',//确定
        button2: 'Cancel',//取消
    },
    customer_import_table: {
        title_custname: 'Customer Name',//客户名称
        title_dev_start: 'The Starting Segment',//起始号段
        title_dev_end: 'The Ending Segment',//结束号段
        title_status: 'Import Status',//导入状态
        title_explain: 'Explain',
    },
    
    //通用部分内容
    loading: 'loading...',
    add_sucess: 'Added successfully',//添加成功
    change_sucess: 'Successfully changed',//修改成功
    Configuration_sucess: 'Configuration is successful',//配置成功
    enter_required: 'Please enter the required fields',//请输入必填项

    //系统管理
    system_manage_title: {
        title: 'System Management'
    },

    //验证提示信息
    rules: {
        enter_username: 'Please enter username',//请输入用户名
        Username_rules:'Username must contain letters and numbers',//用户名必须包含字母和数字
        enter_name: 'Please enter name',//请输入姓名
        select_roles: 'Please select roles',//请选择角色
        enter_current_password: 'Please enter the current login password',//请输入密码
        enter_again: 'Please enter again',//请再次输入密码
        two_passwords: 'The two passwords do not match',//两次输入密码不一致!
        reset_password:'Are you sure to reset the user password?',//确认重置该用户密码？
        reset_password_tip:'The password after reset is the last 6 digits of the mobile phone number',//重置后密码为手机号码后6位
        enter_phone: 'Please enter mobile phone number',//请输入电话号码
        enter_correct_custname: 'Custname could be Chinese letters and number',
        enter_correct_phone: 'Please enter the correct cell phone number',//请输入正确的电话号码
        enter_correct_telephone: 'Please enter the correct cell telephone number',//请输入正确的固定电话
        enter_email: 'Please enter email',//请输入邮箱
        enter_correct_email: 'Please enter the correct email address',//请输入正确的邮箱地址
        select_role: 'Please select role',//请选择角色
        uploading_avatar:'Error uploading avatar format',//上传头像格式错误
        avatars_size:'The size of uploaded avatars should not exceed 200KB!',//上传头像图片大小不能超过 200KB!
        //长度及格式限制
        length_up_6_16:'The length should be 6 to 16 characters',//长度应该是6至16 个字符
        length_up_16:'The length should be 16 characters',//长度应该是16 个字符
        length_up_10:'The length is up to 10 characters',//长度最多10 个字符
        length_up_20:'The length is up to 20 characters',//长度最多20 个字符
        length_up_30:'The length is up to 30 characters',//长度最多30 个字符
        length_up_40:'The length is up to 40 characters',//长度最多40 个字符
        length_up_400:'The length is up to 400 characters',//长度最多400 个字符
        username_up:'User name of 5 to 30 characters and must contain letters and Numbers',//用户名5~30个字符，只能且必须同时包含字母和数字
        loading: 'loading...'//加载中
    },

    //路由
    router: {
        system_management: 'SystemManagement', //系统管理
        login_log: 'Login Log', //登录日志
        operation_log: 'Operation Log', //操作日志
        user_manage: 'User Management', //用户管理
        role_manage: 'Role Management', //角色管理
        user_data: 'UserData', //个人信息
        msg_center: 'MsgCenter', //消息管理
    },

    //成功提示
    sucess: {
        cust_download: 'Template downloaded successfully',//模板下载成功
        cust_import: 'Import device successfully',//导入设备成功
        timeout:'This operation is taking a long time, please wait patiently',//该操作耗时较长，请耐心等待
    }
}