<template>
  <div>
    <div class="main_title">
      <b v-if="isAdd">{{ $t("customer_edit_title.title1") }}</b>
      <b v-if="!isAdd">{{ $t("customer_edit_title.title2") }}</b>
    </div>
    <el-form label-width="210px" :model="custInfo" :rules="rules" ref="custInfo" v-loading="formLoading">
      <div class="area">
        <el-form-item :label="title_custname" prop="name">
          <el-input v-model="custInfo.name" :placeholder="input_placeholder2" size="medium"></el-input>
        </el-form-item>
        <el-form-item :label="title_device_id">
          <template>
            <span style="color:#E6A23C"><i class="el-icon-success"></i> {{ $t("customer_manage_title.title3") }}&nbsp;{{ form.formList.length&&form.formList[0].devStart==""&&isAdd ? 0:form.formList.length }}&nbsp;{{ $t("customer_manage_title.title2") }}</span>
            <el-button type="primary" class="btn_bg" size="small" @click="dialogVisible = true">{{ $t("customer_edit_buttons.button3") }}</el-button>
          </template>
        </el-form-item>
        <el-form-item :label="title_industry" prop="trade">
          <el-input v-model="custInfo.trade" :placeholder="input_placeholder2" size="medium"></el-input>
        </el-form-item>
        <el-form-item :label="title_concat" prop="contact">
          <el-input v-model="custInfo.contact" :placeholder="input_placeholder2" size="medium"></el-input>
        </el-form-item>
        <el-form-item :label="title_phone" prop="phone">
          <el-input v-model="custInfo.phone" :placeholder="input_placeholder1" size="medium"></el-input>
        </el-form-item>
        <el-form-item :label="title_telephone" prop="telephone">
          <el-input v-model="custInfo.telephone" :placeholder="input_placeholder1" size="medium"></el-input>
        </el-form-item>
        <el-form-item :label="title_email" prop="email">
          <el-input v-model="custInfo.email" :placeholder="input_placeholder2" size="medium"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="main_bottom">
      <el-form class="bottom">
        <el-button type="primary" icon="el-icon-circle-check" @click="submit()" :loading="loading">{{ $t("customer_edit_buttons.button1") }}</el-button>
        <el-button type="primary" icon="el-icon-circle-close" plain @click="reBack()">{{ $t("customer_edit_buttons.button2") }}</el-button>
      </el-form>
    </div>

    <!-- ??????/?????? -->
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
      <template slot="title">
        <div style="text-align:center">{{ $t("customer_edit_table.title_top") }}</div>  
      </template>
      <el-form :model="form" class="form" ref="form" style="width:550px;margin:0 auto">
        <div v-for="(item, index) in form.formList" :key="index" class="mydiv">
          <el-form-item :label="title_segment+(index+1)*1" label-width="100px" :prop="'formList.'+index+'.devStart'" :rules="formRules.devStart">
            <el-input v-model="item.devStart"></el-input>
            &nbsp;{{ $t("customer_edit_query.input_placeholder") }}&nbsp;&nbsp;
          </el-form-item>
          <el-form-item :prop="'formList.'+index+'.devEnd'" :rules="formRules.devEnd">
            <el-input v-model="item.devEnd"></el-input>
            <el-button type="danger" size="small" title="??????" @click="deleteItem(item, index)">{{ $t("customer_manage_buttons.button7") }}</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div style="margin:20px 0 60px 0;text-align:center">
        <el-button type="primary" class="btn_bg" size="small" @click="addItem()" v-if="form.formList.length<20">{{ $t("customer_edit_buttons.button4") }}</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-circle-check" @click="add('form')">{{ $t("customer_edit_buttons.button1") }}</el-button>
        <el-button type="primary" icon="el-icon-circle-close" plain @click="close()">{{ $t("customer_edit_buttons.button2") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryCustDetailApi } from "@/api/custManage";
//??????
import { addCustApi } from "@/api/custManage";
//??????/??????
import { updateCustApi } from "@/api/custManage";
export default {
  name: "upDate",
  components: {},
  props: ["staffId","isAdd"],
  data() {
    //?????????????????????????????????
    let custname = this.$t('rules.enter_correct_custname');
    let userValid = function (rule, value, callback) {
      let words = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/.test(value);
      if (words) {
        callback();
      } else {
        callback(new Error(custname));
      }
    };
    //???????????????
    let phone = this.$t('rules.enter_correct_phone')
    let validatorMobile = function (rule, value, callback) {
      if(value){
        let isMobile = /^([0-9]|[+-]){1,20}$/.test(value);
        if (isMobile) {
          callback();
        } else {
          callback(new Error(phone));
        }
      }else{
        callback();
      }
    };
    //??????????????????
    let telephone = this.$t('rules.enter_correct_telephone')
    let validatorTele = function (rule, value, callback) {
      if(value){
        let isTele = /^([0-9]|[+-]){1,20}$/.test(value);
        if (isTele) {
          callback();
        } else {
          callback(new Error(telephone));
        }
      }else{
        callback();
      }
    };
    //????????????
    let email = this.$t('rules.enter_correct_email')
    let sendEmail = function (rule, value, callback) {
      if(value){
        let regEmail = /^[\u4e00-\u9fa5a-zA-Z0-9]+@[\u4e00-\u9fa5a-zA-Z0-9_-]+(\.[\u4e00-\u9fa5a-zA-Z0-9_-]+)+$/.test(value);
        if (regEmail) {
          callback();
        } else {
          callback(new Error(email));
        }
      }else{
        callback();
      }
    };

    //??????ID????????????
    let devID = function(rule,value,callback){
      if(/^[0-9]+$/.test(value) == false){
        callback(new Error('??????ID?????????????????????'));
      }else{
        callback();
      }
    };

    return {
      dialogVisible:false,
      custInfo: {
        name: "",
        trade:"",
        contact:"",
        phone: "",
        telephone:"",
        email: "",
      },

      //??????
      title_custname: this.$t("customer_view_form.title_custname"), //????????????
      title_device_id: this.$t("customer_view_form.title_device_id"), //??????ID??????
      title_industry: this.$t("customer_view_form.title_industry"), //????????????
      title_concat: this.$t("customer_view_form.title_concat"), //?????????
      title_phone: this.$t("customer_view_form.title_phone"), //????????????
      title_telephone: this.$t("customer_view_form.title_telephone"), //????????????
      title_email: this.$t("customer_view_form.title_email"), //??????
      title_segment: this.$t("customer_edit_table.title_segment"),//??????
      input_placeholder1: this.$t("customer_edit_query.input_placeholder1"),
      input_placeholder2: this.$t("customer_edit_query.input_placeholder2"),
      input_placeholder3: this.$t("customer_edit_query.input_placeholder3"),

      loading: false,
      formLoading: false,
      form: {
        formList: [{
          devStart: '',
          devEnd: ''
        }],
      },
      
      rules: {
        name: [
          { required: true, message: this.$t('rules.enter_name'), trigger: "blur" },
          { max: 20, message: this.$t('rules.length_up_20'), trigger: ["blur", "change"] },
          { validator: userValid, trigger: ["blur", "change"]},
        ],
        trade: [
          {max: 20, message: this.$t('rules.length_up_20'), trigger:["blur", "change"]}
        ],
        contact: [
          {max: 20, message: this.$t('rules.length_up_20'), trigger:["blur", "change"]}
        ],
        phone: [
          { validator: validatorMobile, trigger: ["blur", "change"] }
        ],
        telephone: [
          { validator: validatorTele, trigger: ["blur", "change"] }
        ],
        email: [
          { validator: sendEmail, trigger: ["blur", "change"] },
        ],
      },
      formRules: {
        devStart: [
          { required: true, message: this.$t('customer_edit_query.input_placeholder4'), trigger: 'blur' },
          { min: 16,max: 16, message: this.$t('rules.length_up_16'), trigger: 'blur' },
          { validator: devID, trigger: 'blur'},
        ],
        devEnd: [
          { required: true, message: this.$t('customer_edit_query.input_placeholder5'), trigger: 'blur' },
          { min: 16,max: 16, message: this.$t('rules.length_up_16'), trigger: 'blur' },
          { validator: devID, trigger: 'blur'},
        ]
      }
    };
  },
  mounted() {
    if(!this.isAdd){
      this.getCustDetail()
    }
  },
  methods: {
      // this.$message({
      //   showClose: true,
      //   message: '???????????????????????????????????????'
      // });
    //????????????
    getCustDetail() {
      this.formLoading = true;
      queryCustDetailApi(this.staffId).then((res) => {
        this.custInfo = res.data;
        this.form.formList = res.data.list;
        this.formLoading = false;
      })
    },
    // ????????????
    addItem () {
      this.form.formList.push({ devStart: '', devEnd: ''});
    },
    // ????????????
    deleteItem (item, index) {
      // debugger
      // if (this.form.formList.length == 1) {
      //   this.form.formList= [{
      //     devStart: '',
      //     devEnd: ''
      //   }];
      // } else if (this.form.formList.length > 1) {
        this.form.formList.splice(index, 1); 
      // }
    },
    //??????
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose(){
      // if(!this.isAdd){
      //   this.$refs.form.validate((valid) => {
      //     if (valid) {
      //       this.dialogVisible = false;
      //     } else {
      //       this.$message.error("?????????????????????")
      //       return false;
      //     }
      //   });
      // }else if (this.form.formList[0].devStart==""||this.form.formList[0].devEnd==""){
      //   this.dialogVisible = false;
      // }
      this.dialogVisible = false;
      if(!this.isAdd){
        this.getCustDetail()
      }else{
        this.form.formList= [{
          devStart: '',
          devEnd: ''
        }];
      }
      this.$refs.form.resetFields();
    },
    close () {
      this.dialogVisible = false;
      if(!this.isAdd){
        this.getCustDetail()
      }else{
        this.form.formList= [{
          devStart: '',
          devEnd: ''
        }];
      }
      this.$refs.form.resetFields();
    },
    //??????
    submit() {
      this.loading = true;
      let newDevList = [];
      this.$refs.custInfo.validate((valid) => {
        if (valid) {
          this.$message({
            showClose: true,
            message: this.$t('sucess.timeout')
          });
          
          if(this.isAdd){
            if(this.form.formList.length>0&&(this.form.formList[0].devStart != ""||this.form.formList[0].devEnd != "")){
              newDevList = this.form.formList;
            }
            var param1 = {
              name: this.custInfo.name,
              devList: newDevList,
              trade: this.custInfo.trade,
              contact: this.custInfo.contact,
              phone: this.custInfo.phone,
              telephone:this.custInfo.telephone,
              email: this.custInfo.email,
            };
            addCustApi(param1).then((res) => {   
              this.devList3 = [];
              if (res.code == 200) {
                this.$message({
                  message: this.$t('add_sucess'),
                  type: "success",
                });
                this.reBack();
              } else {
                this.$message.error(res.message);
              }
              this.loading = false
            });
          } else {
            var param2 = {
              id:this.staffId,
              name: this.custInfo.name,
              devList: this.form.formList,
              trade: this.custInfo.trade,
              contact: this.custInfo.contact,
              phone: this.custInfo.phone,
              telephone:this.custInfo.telephone,
              email: this.custInfo.email,
            };
            updateCustApi(param2).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: this.$t('change_sucess'),
                  type: "success",
                });
                this.reBack();
              } else {
                this.$message.error(res.message);
              }
              this.loading = false
            });
          }
        } else {
          this.loading = false
          console.log('error submit!!');
          return false;
        }
      })
    },
    reBack() {
      this.update = false;
      this.$emit("showCust");
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .area {
    width: 500px;
    margin: 0 auto;
    padding-top: 20px;
  }

  .main_bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    background: #f6f5fa;
    width: 100%;
    border-radius: 0 0 8px 8px;
    padding: 20px 0;
    .bottom {
      text-align: center;
    }
  }
}
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 250px;
  margin-right: 20px;
}
.el-switch__label.is-active {
  color: #6442f5;
}
.el-switch {
  margin-top: 8px;
}
.form{
  .el-input{
    width:170px
  }
  .el-button{
    margin-left: 20px;
  }
}
.mydiv{
  display: flex;
}
</style>