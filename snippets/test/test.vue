<template>
  <view-container>
    <div class="ef-action-wrap">
      <el-button type="primary">新建</el-button>
      <el-button icon="el-icon-refresh"></el-button>
      <div class="ef-search--group">
        <el-input
          v-model="form.name"
          @clear="getPageList"
          @keyup.enter.native="getPageList"
        >
          <el-button
            icon="el-icon-search"
            slot="append"
            @click.stop="getPageList"
          ></el-button>
        </el-input>
      </div>
    </div>

    <div v-loading="loading.table" class="mt-16">
      <el-table :data="">
        <el-table-column prop="name" label="名称">
          <template slot-scope="{ row }">
            <el-button type="text" @click="checkDetail(row)">{{
              row.name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="test" label="测试"></el-table-column>
        <el-table-column width="160" label="操作">
          <template slot-scope="{ row }">
            <el-dropdown
              @command="(command) => onMenuSelect(command, row)"
              size="small"
            >
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
        v-if="pageTotal > 10"
        @size-change="(val) => onPageChange('pageSize', val)"
        @current-change="(val) => onPageChange('pageNow', val)"
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
  name: 'View',
})
export default class View extends Mixins(DateFormat, PageData) {
  public loading: LoadingVO = {
    table: false,
  };
  public form = {
    name: '',
  };
  public  = [];
  public mounted() {
    this.getPageList();
  }

  public async getPageList() {
     this.loading.init = true;
     let params = {};
     try {
       const r = await API.sfda
       if (r.data.code === 0) {
         ;
       }
     } catch (e) {
       console.log('e: ', e);
     } finally {
       this.loading.init = false;
     }
     
  }

  public onPageChange(type: string, val: number) {
    this.page[type] = val;
    this.getPageList();
  }

  public onMenuSelect(command: 'edit' | 'delete' | number, row: any) {
    let actionMap: any = {
      recovery: {
        msg: '是否手动回收？',
        action: () => {
          this.recovery(row.pvName);
        },
      },
      delete: {
        msg: i18n.t('message.delete-confirm-msg'),
        action: () => {
          this.delRow(row.pvName);
        },
      },
    };

    this.$confirm(actionMap[command].msg, actionMap[command].title, {
      type: 'warning',
    })
      .then(() => {
        actionMap[command].action();
      })
      .catch(() => {
        this.$message.info('操作已取消！');
      });
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
<style lang="scss" scoped></style>
