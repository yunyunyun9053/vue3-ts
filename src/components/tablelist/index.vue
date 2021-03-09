<template>
  <div>
    <a-card :bordered="cardBorder">
      <!-- 搜索区 -->
      <div class="table-page-search-wrapper">
        <slot name="searchCriteria">
        </slot>
      </div>
			<!-- 操作区 -->
      <div class="operate-btn">
        <slot name="operateBtn">
        </slot>
      </div>
      <!-- 表格区 -->
      <a-table
        class="table-list"
        :columns="columns"
        :data-source="dataList"
        :loading="loading"
        :pagination="false"
        :rowKey="dataIndex"
				:row-selection="rowSelection"
        :childrenColumnName="childrenColumnName"
        :scroll="{ x: 'calc(400px + 50%)' }"
      >
        <template
          v-for="(colSolt, i) in columnsSlots"
					v-slot:[colSolt.itemSlot]="{ text, record }"
        >
          <slot
            :name="colSolt.itemSlot"
            :tableRow="record"
            :text="text"
            :list="dataList"
            :index="i"
          />
        </template>
      </a-table>
			<!-- 所有页数都展示 -->
      <div v-if="paginationFlag === 'all'" class="pagination-box">
        <a-pagination
          show-quick-jumper
          v-model="pagination.current"
          :default-page-size="pagination.pageSize"
          :total="pagination.total"
          @change="onChange"
        />
      </div>
			<!-- 只展示上一页下一页 -->
      <div v-if="paginationFlag === 'two'" class="customize-pagination">
				<a-button :disabled="pagination.current === 1" :loading="loading" @click="onChange(Math.min(pagination.current - 1, 1))">
					<template #icon><LeftOutlined /></template>
				</a-button>
				<span class="current">第{{ pagination.current }}页</span>
				<a-button :disabled="!pagination.hasNext" :loading="loading" @click="onChange(pagination.current + 1)">
					<template #icon><RightOutlined /></template>
				</a-button>
			</div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, reactive, Ref, computed } from 'vue'

interface ReturnData {
	list: Array<any>;
	totalSize?: number;
	hasNext?: boolean;
}

export default defineComponent({
  name: 'TableList',
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    dataIndex: {
      type: String,
      default: 'key'
    },
    childrenColumnName: {
      type: String,
      default: 'children'
    },
    // 列表请求参数
    searchParams: {
      type: Object,
      default: () => ({})
    },
    pageSize: {
      type: Number,
      default: () => 10
    },
		paginationFlag: {
			type: String,
      default: 'all' // all 展示所有页  two 展示上下页   其他值 不展示页码
		},
		// 搜索是否返回所有数据  true 自行分页  false每一页都向后端请求
    isReturnAllData: {
      type: Boolean,
      default: false
    },
    // 是否清空
    empty: {
      type: Boolean,
      default: false
    },
    // 是否显示卡片边
    cardBorder: {
      type: Boolean,
      default: true
		},
		rowSelection: {
			type: Object,
      default: () => (undefined)
		}
  },
	setup(props) {
		const currentInstance = getCurrentInstance() as any // 获取当前组件实例
		const dataList: Ref<any[]> = ref([])
		const isSearching = ref(false)
		const loading = ref(false)
		let usedParams: any = {}
		let allData: Array<any> = []

		const pagination = reactive({
			current: 0,
			total: 0,
			hasNext: false,
			pageSize: props.pageSize
		})
		const columnsSlots = computed(() => {
			const slotArr: any[] = []
			props.columns.forEach((item: any) => {
				if (item.slots) {
					for (const key in item.slots) {
						if (Object.prototype.hasOwnProperty.call(item.slots, key)) {
							const element = item.slots[key]
							slotArr.push({ itemSlot: element })
						}
					}
				}
			})
			return slotArr
		})
		// methods
		const fetchList = () => {
			const current = currentInstance as any
      console.log('%c 列表请求参数 >>> ', 'color:red;')
			console.log(usedParams)
      const realSearchParams: any = {}
      for (const k in usedParams) {
        if (usedParams[k] !== '') {
          realSearchParams[k] = usedParams[k]
        }
      }
      loading.value = true
      return (current.ctx.$parent as any).loadTable(realSearchParams).then((res: ReturnData) => {
				const list = res.list || []
				if (props.isReturnAllData) {
					allData = [...list]
				}
				dataList.value = list.slice(0, pagination.pageSize)
				pagination.total = res.totalSize || list.length || 0
				pagination.hasNext = !!(pagination.total > (pagination.current) * pagination.pageSize) || res.hasNext || false
				loading.value = false
      })
    }

		const onChange = (val: number) => {
			pagination.current = val
			Object.keys(props.searchParams).forEach(([key]) => {
				props.searchParams[key] = usedParams[key]
			})
      if (props.paginationFlag === 'all') {
        usedParams = { ...usedParams, ...{ pageIndex: pagination.current, pageSize: pagination.pageSize } }
			} else if (props.paginationFlag === 'two') {
        usedParams = { ...usedParams, ...{ pos: (Math.min(pagination.current - 1, 0)) * pagination.pageSize, pageSize: pagination.pageSize + 1 } }
			}
			// 判断是否是一次返回所有数据
			if (props.isReturnAllData) {
				dataList.value = allData.slice((pagination.current - 1) * pagination.pageSize, (pagination.current) * pagination.pageSize)
				pagination.hasNext = !!(pagination.total > (pagination.current) * pagination.pageSize)
			} else {
				fetchList().finally(() => {
					loading.value = false
				})
			}
		}
		const search = (params: any) => {
      pagination.current = 1
      isSearching.value = true
      usedParams.pageIndex = pagination.current
      if (params) {
        usedParams = { ...params }
      } else {
        usedParams = { ...props.searchParams }
        if (props.paginationFlag === 'all') {
          usedParams = {
            ...props.searchParams,
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          }
        } else if (props.paginationFlag === 'two') {
					usedParams = { ...props.searchParams, ...{ pos: (Math.min(pagination.current - 1, 0)) * pagination.pageSize, pageSize: pagination.pageSize + 1 } }
				}
      }
      if (props.empty) {
        dataList.value = []
        return
			}
      console.log('search params:', params, props.searchParams, usedParams)
      fetchList().finally(() => {
        isSearching.value = false
        loading.value = false
      })
		}

		const getParams = () => {
      return { ...usedParams }
		}
		return {
			dataList,
      pagination,
      usedParams,
      isSearching,
			loading,
			allData,
			columnsSlots,
			onChange,
			search,
			getParams
		}
	}
})
</script>

<style lang="less" scoped>
  .operate-btn {
    display: block;
    margin-top: 18px;
    margin-bottom: 18px;
  }
  .btn-list :deep(.ant-btn:not(:last-child)) {
    margin-right: 10px;
    margin-bottom: 20px;
	}
  .pagination-box {
    padding-top: 10px;
    text-align: center;
  }
  .table-list :deep(.ant-table-body),
  .table-list :deep(.ant-table-scroll) {
    overflow-x: auto !important;
	}
	.customize-pagination {
		text-align: center;
		margin-top: 10px;
		.ant-btn:not(.ant-btn-link):not(:last-child) {
			margin: 0;
		}
		.current {
			display: inline-block;
			margin: 0 20px;
		}
	}
</style>
