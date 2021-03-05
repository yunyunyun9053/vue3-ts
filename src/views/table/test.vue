<template>
	<table-list
		ref="table"
		dataIndex="key"
		:columns="columns"
		:searchParams="searchParams"
		paginationFlag="all"
		:pageSize="1"
		:showAllPage="true"
		:rowSelection="rowSelection"
		:isReturnAllData="true"
	>
		<template #searchCriteria>
			<span>searchCriteria</span>
		</template>
		<template #operateBtn>
			<a-button type="primary">
				operateBtn
			</a-button>
		</template>
		<template #name="{ tableRow: record }">
			{{ record.name }}
		</template>
		<template #age="{ text }">
			{{ text }}
		</template>
		<template #nameTitle>
			<span>new Name</span>
		</template>
	</table-list>
</template>
<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance } from 'vue'

import TableList from '@/components/tablelist/index.vue'

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
    key: 'address'
  }
]

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park'
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park'
          }
        ]
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park'
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]
const rowSelection = {
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows)
  }
}

export default defineComponent({
	components: {
		TableList
	},
  setup() {
		const currentInstance = getCurrentInstance() as any // 获取当前组件实例
		const searchParams = {}
		const loadTable = (params: any) => {
			console.log('params ', params)
			return new Promise((resolve) => {
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
    }
  }
})
</script>
