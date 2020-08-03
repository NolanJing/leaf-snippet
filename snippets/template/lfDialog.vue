<%desc 弹窗模板页%> 
<template>
  <el-dialog :title="title" :visible="true" @close="onClose" width="520px">
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" :loading="loading.confirm" @click="onConfirm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
// import HTTP_CS_IMAGE_HUB_USER, {CsImageHubUserVO} from '@/apis/app/cs-image-hub-user';

@Component({
  name: '$0Dialog',
})
export default class $0Dialog extends Vue {
  @Prop({
    default: {},
  })
  private itemData!: any;

  private loading: LoadingVO = {
    confirm: false,
  };

  private get title() {
    return this.isEdit ? '编辑' : '新增';
  }

  private get isEdit() {
    return true;
  }

  private onConfirm() {
    this.$emit('on-close', {
      name: 'hub',
      type: 'success',
    });
  }

  private onClose(type = 'dismiss') {
    this.$emit('on-close', {
      name: 'hub',
      type: type,
    });
  }
}
</script>
<style lang="scss" scoped>
</style>
