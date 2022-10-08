<template>
  <div class="upload-wrap">
    <!-- 图片上传 -->
    <div class="content-wrap">
      <el-upload
         :action="url"
         :data="data"
         :show-file-list="false"
         :on-success="_handle_img_success"
         :before-upload="beforeAvatarUpload"
         :headers="{'access-token': token,'url': 'basicInfo/customerManage','lang': language}"	>
        <el-button type="primary" size="small">{{ $t("customer_import_title.title3") }}</el-button>
      </el-upload>
    </div>
   
  </div>
</template>

<script>
import { Loading } from 'element-ui';
import { getToken } from '@/utils/auth'
export default {
  name: 'ufastUpload',
  props:{
    url:{
      type:String
    },
    // init:{
    //   type:Function
    // }
  },
  data() {
    return {
      token:'',
      iconVal: '',
      data:{ createrId: '123'},
      _file_list: [],
      fileIndex: [],
      // url: serviceGateway + service532 +  'customer/uploadcustomer',
      // url:'/service/107/customer/uploadcustomer',
      loading: null,
      language: '',
    }
  },
  mounted(){
    this.token = getToken()
    this.language = window.localStorage.getItem('language');
    if (this.language == 'en') {
      this.language = 'en_US'
    } else {
      this.language = 'zh_CN'
    }
  },
  methods: {
    //上传图标事件
    _uploadHttp(params) {
      // this.iconVal = require('../assets/images/assets-manage/product05.png')
      // this.$emit('handleFileList', this.iconVal);
    },
    _upload_file(params) {
      if (params.file.size > 1073741824) {
        this.$message({
          message: '文件大小不能超过1G',
          type: 'error'
        });
        return
      }
      this.$data._file_list.push(
        {name: '版本包V1.0', size: '100M'}
      )
    },
    // 上传成功
    _handle_img_success(response) {
      // this.$refs.headimgUpload.clearValidate(); // 关闭校验
      // this.loading.close();
      if (response.code == 200) {
        // this.$message.success(response.message)
        // this.init();
        this.form = response.data;
        this.$emit("passValue",this.form)
      } else {
        this.$message.error(response.message);
      }
    },
    _handle_preview() {

    },
    _before_remove() {

    },
    //对上传图片的大小、格式进行限制
    beforeAvatarUpload(file) {
    //     this.loading = Loading.service({
    //       lock: true,
    //       text: 'Loading',
    //       spinner: 'el-icon-loading',
    //       background: 'rgba(0, 0, 0, 0.7)'
    //     });
    //     const isXls = file.type === 'application/vnd.ms-excel';
    //     const isLt5M = file.size / 1024 / 1024 < 5;
    //     if (!isXls) {
    //       this.$message.warning('只支持xls格式文件');
    //       this.loading.close();
    //     }
    //     if (!isLt5M) {
    //       this.loading.close();
    //       this.$message.warning('请上传5MB以内的图片!');
    //     }
    //   return isXls && isLt5M;
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '~styles/variables.scss';

// 上传upload
.avatar-uploader {
    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .avatar-uploader {
    /deep/ .el-upload:hover {
      border-color: #409EFF;
    }
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
// 进度条
.isshows{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(0,0,0,0.2);
  left: 0;
  text-align: center;
  z-index: 999;
}
.processCircle {
  position: fixed;
  top: 45%;
  background: transparent;
  left: 45%;
  text-align: center;
  z-index: 999;
}
.cancelUpload {
  position: fixed;
  top: 43%;
  left: calc(45% + 126px);
  text-align: center;
  z-index: 999;
  cursor: pointer;
}
.header {
  overflow: hidden;
  padding: 0 20px 0 0;
  .add {
    float: right;
    cursor: pointer;
  }
}
/deep/ .el-table--border {
  border-bottom: 1px solid #dfe6ec;
}
/deep/ .operation {
  cursor: pointer;
}
/deep/ .el-form-item__content {
  margin-left: 48px;
}

/deep/ .el-upload {
  border: 0;
}
</style>