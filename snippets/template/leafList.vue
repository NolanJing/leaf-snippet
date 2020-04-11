<%desc 带搜索的列表页%> 
<template>
  <view-container>
    <div class="ef-action-wrap">
      <el-button type="primary">新建</el-button>
      <div class="ef-search--group">
        <el-input v-model="form.name">
          <el-button icon="el-icon-search" slot="append" @click.stop=""></el-button>
        </el-input>
        <div class="ef-button--group">
          <el-button icon="el-icon-refresh"></el-button>
          <el-button icon="el-icon-download"></el-button>
        </div>
      </div>
    </div>

    <div v-loading="loading.table">
      <el-table :data="$0">
        <el-table-column prop="name" label="名称">
          <template slot-scope="{row}">
            <el-button type="text" @click="checkDetail(row)">{{row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="test" label="测试"></el-table-column>
        <el-table-column width="160" label="操作">
          <template slot-scope="{row}">
            <el-dropdown @command="(command)=>onMenuSelect(command,row)" size="small">
              <el-button type="text">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="pageTotal > 10 "
        @size-change="val => onPageChange('pageSize', val)"
        @current-change="val => onPageChange('pageNow', val)"
        :current-page="page.pageNow"
        :total="pageTotal"
      ></el-pagination>
    </div>
  </view-container>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import DateFormat from '@/mixins/date_format';
import PageData from '@/mixins/page_data';
// import HTTP_API from '@/api/app/controller-name';

@Component({
  name: '$1',
})
export default class $1 extends Mixins(DateFormat, PageData) {
  public loading: LoadingVO = {
    table: false,
  };
  public form = {
    name: '',
  };
  public $0 = [];
  public mounted() {
    this.getPageList();
  }

  public async getPageList() {
    try {
      this.loading.table = true;
      let r = await HTTP_API.do(params);
      if (r.data.code == 0) {
        this.$0 = r.data.data.records;
        this.pageTotal = r.data.data.total;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading.table = false;
    }
  }

  public onPageChange(type: string, val: number) {
    this.page[type] = val;
    this.getPageList();
  }

  public onMenuSelect(command: 'edit' | 'delete' | number, row: any) {
    if (command === 'edit') {
    } else if (command === 'delete') {
      this.$confirm(
        i18n.t('message.delete-confirm-msg'),
        i18n.t('host-mgr.delete-host-title'),
        {
          type: 'warning',
        },
      )
        .then(() => {
          this.delRow(row.id);
        })
        .catch(() => {
          this.$message.info('取消删除');
        });
    } else {
    }
  }

  public async delRow(id: any) {
    try {
      const r = await HTTP_CLUSTER.deleteCluster(clusterName);
      if (r.data.code === 0) {
        this.$message.success(i18n.t('cluster-mgr.delete-cluster-success'));
        this.getList();
      }
    } catch (error) {
      console.log('error: ', error);
    } finally {
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
