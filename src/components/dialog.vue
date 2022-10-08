<template>
    <el-dialog :title="title" :close-on-click-modal="closeModel" :visible.sync="dialogVisible" top="10vh" :width="width + 'px'">
        <div class="dialog-content">
            <slot></slot>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" icon="el-icon-circle-check" @click="submit" :disabled="submitBtn">确 定</el-button>
            <el-button type="primary" size="small" icon="el-icon-circle-close" plain @click="cancle()">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            submitBtn: false,
            dialogVisible: false,
        };
    },
    props: {
        title: {
            default: '标题'
        },
        width: {
            default: '600'
        },
        closeModel:{
            default:true
        }
    },
    methods: {

        // 确定按钮
        submit() {
            this.$emit('submit')
        },
        cancle () {
            this.dialogVisible = false
            // this.$parent.cancle();
        }

    }
};
</script>

<style lang="scss" scoped>
/deep/.el-dialog {
    padding: 20px 20px 80px 20px;
}

.role-item {
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    border-radius: 4px;
    height: 268px;
    overflow: auto;
    padding: 8px 0;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
}

.avatar {
    width: 90px;
    height: 90px;
    display: block;
}

/deep/ .el-dialog__body {
    padding-bottom: 20px;
}
</style>
