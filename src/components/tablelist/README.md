## 公共列表组件

### 使用方法
> 模版
``` html
  <table-list
		ref="table"
		dataIndex="key"
		:columns="columns"
		:searchParams="searchParams"
		paginationFlag="all"
		:pageSize="1"
		:showAllPage="true"
		:isReturnAllData="true"
	>
		<!-- 搜索区域自定义内容 -->
		<template #searchCriteria>
			<span>searchCriteria</span>
		</template>
		<!-- 操作区域自定义内容 -->
		<template #operateBtn>
			<a-button type="primary">
				operateBtn
			</a-button>
		</template>
		<!-- 列表row自定义数据显示，slot要和slots.customRender对应-->
		<template #name="{ tableRow: record }">
			{{ record.name }}
		</template>
		<template #age="{tableRow: record, text }">
			{{ text }} 
		</template>
		<template #nameTitle>
			<span>new Name</span>
		</template>
	</table-list>
```
> 逻辑
```
1、详情请参照 `ant-design-vue` 的 `table` 组件文档，用法基本相同，属性可透传至框架原生组件
2、searchParams中定义的字段，会通过接口发送(绑定至搜索条件slot)
```
3、searchKey 为使用默认搜索框，搜索接口的字段名
e.g. [用户详情页面](../../../src/views/manage/consumer/list/index.vue)
``` html
<!-- 使用默认搜索框 (不注入 'search-inputs') -->
<!-- 可以不传searchParams，searchKey为搜索接口的字段，直接传字段名即可 -->
<template>
  <table-list
    ref="table"
    :columns="columns"
    searchKey="account"
    dataIndex="id"
  >
  <!-- 内容同上，略 -->
</template>
```
``` ts
  import TableList from '@/components/TableList/TableList'
  const columns = [
  {
    dataIndex: 'name',
		key: 'name',
		slots: {
			title: 'nameTitle', customRender: 'name'
		}
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
		width: '12%',
		slots: {
			customRender: 'age'
		}
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
]

export default defineComponent({
	components: {
		TableList
	},
  setup() {
		const currentInstance = getCurrentInstance() as any // 获取当前组件实例
		const searchParams = {}
		// 如果需要通过外部调用搜索的话，请在方法里调用以下，并绑好ref
    // this.$refs['table'].search(this.searchParams)
		const loadTable = (params: any) => {
			return new Promise((resolve, reject) => {
				resolve({
					list: data,
					totalSize: data.length
				})
			})
			// getRuleList(params)
      // .then(res => {
      //   return {
      //     list: res.data.ruleList,
      //     totalSize: res.data.totalSize
      //   }
      // })
		}
		onMounted(() => {
			const current = currentInstance as any
			current.ctx.$nextTick(() => {
				current.ctx.$refs.table.search()
			})
		})
		
    return {
      data,
      columns,
			rowSelection,
			loadTable,
			searchParams
    };
  },
});
```