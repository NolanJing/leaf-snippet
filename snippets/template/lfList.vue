<%desc 带搜索的列表页%>
<template>
  <view-container>
    <div class="ef-action-wrap">
      <el-button type="primary">新建</el-button>
      <div class="ef-search--group">
        <el-input
          v-model="form.name"
          @clear="getSearch"
          @keyup.enter.native="getSearch"
        >
          <el-button
            icon="el-icon-search"
            slot="append"
            @click.stop="getSearch"
          ></el-button>
        </el-input>
      </div>
       <div class="ef-button--group">
          <el-button icon="el-icon-refresh" @click.stop="getSearch"></el-button>
        </div>
    </div>

    <div v-loading="loading.table" class="mt-16">
      <el-table :data="$0">
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
             <el-button type="text" @click="onMenuSelect('edit', row)"
              >编辑</el-button
            >
            <el-button type="text" @click="onMenuSelect('delete', row)"
              >删除</el-button
            >
       
          <!--   <el-dropdown
              @command="(command) => onMenuSelect(command, row)"
              size="small"
            >
              <el-button type="text">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
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
import { Component, Mixins } from "vue-property-decorator";
import DateFormat from "@/mixins/date_format";
import PageData from "@/mixins/page_data";
// import HTTP_API from '@/api/app/controller-name';

@Component({
	name: "$1View",
})
export default class $1View extends Mixins(DateFormat, PageData) {
	private loading: LoadingVO = {
		table: false,
	};
	private form = {
		name: "",
	};
	private $0 = [];
	private mounted() {
		this.getPageList();
	}

	private async getPageList() {
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

	private getSearch() {
		this.page.pageNow = 1;
		this.getPageList();
	}

	private onPageChange(type: string, val: number) {
		this.page[type] = val;
		this.getPageList();
	}

	private onMenuSelect(command: "edit" | "delete" | number, row: any) {
		let actionMap: any = {
			recovery: {
				msg: "是否手动回收？",
				action: () => {
					this.recovery(row.pvName);
				},
			},
			delete: {
				msg: i18n.t("message.delete-confirm-msg"),
				action: () => {
					this.delRow(row.pvName);
				},
			},
		};

		if (actionMap[command].msg) {
			this.$confirm(actionMap[command].msg, actionMap[command].title, {
				type: "warning",
			})
				.then(() => {
					actionMap[command].action();
				})
				.catch(() => {
					this.$message.info("操作已取消！");
				});
		}
	}

	private async delRow(id: any) {
		try {
			const r = await HTTP_CLUSTER.deleteCluster(clusterName);
			if (r.data.code === 0) {
				this.$message.success(
					i18n.t("cluster-mgr.delete-cluster-success")
				);
				this.getSearch();
			}
		} catch (error) {
			console.log("error: ", error);
		} finally {
		}
	}
}
</script>
<style lang="scss" scoped>
</style>
