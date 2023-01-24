<template>
  <div style="height: 100%; width: 100%">
    <t-card>
      <t-row style="margin-top: 25px">
        <t-col :span="12" class="tableTitle">员工基本信息调查表</t-col>
      </t-row>
      <t-row style="margin-bottom: 0px">
        <t-col :span="9"></t-col>
        <t-col :span="1"
          ><t-link
            theme="primary"
            hover="color"
            @click="createModalVisible = true"
            ><t-icon name="add" size="large" /> 创建</t-link
          ></t-col
        >
        <t-col :span="1"
          ><t-link
            theme="primary"
            hover="color"
            :disabled="!selectedRowKeys.length"
            ><t-icon name="edit" size="large" /> 编辑</t-link
          ></t-col
        >
        <t-col :span="1"
          ><t-link
            theme="primary"
            hover="color"
            :disabled="!selectedRowKeys.length"
            ><t-icon name="delete" size="large" /> 删除</t-link
          ></t-col
        >
      </t-row>
      <t-row>
        <t-col
          :span="12"
          style="display: flex; justify-content: center; align-items: center"
        >
          <t-table
            style="width: 100%"
            rowKey="id"
            :data="setNewTableData()"
            :columns="colData"
            stripe
            bordered
            resizable
            bottomContent="———— 内部资料请勿拍照 ————"
            dragSort="row"
            :selected-row-keys="selectedRowKeys"
            @select-change="onSelectRow"
            :pagination="listPagination"
          />
        </t-col>
      </t-row>
    </t-card>
    <t-dialog
      header="Create"
      :visible="createModalVisible"
      :onClose="handleCloseCreateModal"
      :onConfirm="onSubmit"
      cancelBtn="Cancel"
      confirmBtn="Create"
    >
      <t-form ref="form" :data="formData" colon :rules="allRule">
        <t-form-item label="id" help="默认id锁定" name="id">
          <t-input v-model="formData.id" disabled></t-input>
        </t-form-item>
        <t-form-item label="姓名" name="name">
          <t-input
            v-model="formData.name"
            placeholder="请输入用户名"
            clearable
          ></t-input>
        </t-form-item>
        <t-form-item label="耗时" name="times">
          <t-input-number v-model="formData.times" max="10" min="1" />
        </t-form-item>
        <t-form-item label="职位" name="jobs">
          <t-select
            v-model="formData.jobs"
            class="demo-select-base"
            clearable
            filterable
            placeholder="请选择您的职位"
          >
            <t-option
              v-for="item in jobArr"
              :value="item.label"
              :label="item.label"
              :key="item.value"
            >
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="签署方式" name="types">
          <t-select
            v-model="formData.types"
            class="demo-select-base"
            clearable
            filterable
            placeholder="请选择您的签署方式"
          >
            <t-option
              v-for="item in typeArr"
              :value="item.label"
              :label="item.label"
              :key="item.value"
            >
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>

        <t-form-item label="工资" name="salary">
          <t-input
            v-model="formData.salary"
            placeholder="请输入您的工资"
            suffix="元"
          ></t-input>
        </t-form-item>

        <t-form-item
          label="座右铭"
          help="说出你内心为之奋斗的那团火"
          name="detailEvent"
        >
          <t-textarea
            v-model="formData.detailEvent"
            placeholder="请输入您的座右铭"
          ></t-textarea>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script>
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
  //   Icon
} from "tdesign-icons-vue";
import { mockList, allJobs, allTypes } from "../../mock/tableList";
const mockCol = [
  {
    colKey: "row-select",
    type: "multiple",
    // 禁用行选中方式一：使用 disabled 禁用行（示例代码有效，勿删）。disabled 参数：{row: RowData; rowIndex: number })
    // 这种方式禁用行选中，当前行会添加行类名 t-table__row--disabled，禁用行文字变灰
    // disabled: ({ rowIndex }) => rowIndex === 1 || rowIndex === 3,

    // 禁用行选中方式二：使用 checkProps 禁用行（示例代码有效，勿删）
    // 这种方式禁用行选中，行文本不会变灰
    //   checkProps: ({ rowIndex }) => ({ disabled: rowIndex % 2 !== 0 }),
    width: 50,
  },
  { colKey: "id", title: "序列", width: 60, align: "center" },
  { colKey: "name", title: "姓名", width: 80, align: "center" },
  { colKey: "times", title: "填写耗时（天）", width: 100, align: "center" },
  { colKey: "jobs", title: "当前职位", width: 120, align: "center" },

  {
    colKey: "types",
    title: "本人认可签署方式",
    width: 120,
    align: "center",
    cell: (h, { row }) => {
      const statusNameListMap = {
        纸质签署: {
          label: "纸质签署",
          theme: "success",
          icon: <CheckCircleFilledIcon />,
        },
        手写: {
          label: "手写",
          theme: "danger",
          icon: <CloseCircleFilledIcon />,
        },
        电子签署: {
          label: "电子签署",
          theme: "warning",
          icon: <ErrorCircleFilledIcon />,
        },
        "--": {
          label: "机打",
          theme: "warning",
          icon: <ErrorCircleFilledIcon />,
        },
      };
      return (
        <t-tag
          shape="round"
          theme={statusNameListMap[row.types].theme}
          variant="light-outline"
        >
          {statusNameListMap[row.types].icon}
          {statusNameListMap[row.types].label}
        </t-tag>
      );
    },
  },
  { colKey: "salary", title: "工资（元）", width: 100, align: "center" },
  { colKey: "detailEvent", title: "个人座右铭", width: 100, align: "center" },
];
const formD = {
  id: mockList().length + 1,
  name: "",
  times: 1,
  jobs: "",
  types: "",
  salary: "",
  detailEvent: "",
};
export default {
  mounted() {
    this.resize();
  },
  components: {
    // Icon
  },
  data() {
    return {
      jobArr: [...allJobs],
      typeArr: [...allTypes],
      createModalVisible: false,
      colData: mockCol,
      selectedRowKeys: [],
      listPagination: {
        current: 1,
        pageSize: 10,
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: this.setNewTableData().length,
        showJumper: true,
        onChange: (pageInfo) => {
          const { current, pageSize } = pageInfo;
          console.log("pagination.onChange", pageInfo);
          this.listPagination.current = current;
          this.listPagination.pageSize = pageSize;
        },
      },
      formData: {
        ...formD,
      },
      allRule: {
        name: [
          { required: true, message: "用户名必填", type: "error" },

          {
            validator: (val) => val.length <= 5,
            message: "内容文本长度不能超过 5 个字",
          },
        ],
        times: [
          { required: true, message: "兄弟，这个必填", type: "error", max: 10 },
          {
            validator: (val) => val <= 10,
            message: "都设置不允许超过10天了，你怎么还往高了输入",
          },
          // 自定义校验规则：不同的值可以有不同的校验结果，不同的校验类型
        ],
        jobs: [
          { required: true, message: "请选择职业", type: "error" },
          // 自定义校验规则：自定义异步校验规则
        ],
        types: [
          { required: true, message: "请选择签署方式", type: "error" },
          // 自定义校验规则：自定义异步校验规则
        ],
      },
    };
  },
  methods: {
    handleConfirmCreateModal() {
      this.createModalVisible = false;
      console.log(this.formData, "向后端传递");
    },
    handleCloseCreateModal() {
      this.createModalVisible = false;
    },
    resize() {
      window.onresize = function () {
        console.log(12);
      };
    },
    setNewTableData() {
      let _data = mockList();
      _data.map((item) => {
        Object.keys(item).map((val) => {
          if (item[val] == undefined) {
            item[val] = "--";
          }
        });
      });
      return _data;
    },
    onSelectRow(value, { selectedRowData }) {
      console.log(selectedRowData);
      this.selectedRowKeys = value;
    },
    onSubmit({ validate, firstError }) {
      console.log(validate, firstError);
      if (validate === true) {
        this.$message.success("提交成功");
      } else {
        console.log("Errors: ", validate);
        this.$message.warning(firstError);
      }
    },
    // 自定义异步校验器，使用 resolve 返回结果控制校验结果、校验信息、校验结果类型
  },
};
</script>

<style lang="less" scoped>
.t-row {
  margin-bottom: 25px;
}
.tableTitle {
  font-size: 30px;
  font-weight: 600;
}
:global(t-table__bottom-content) {
  margin-top: 20px;
}
</style>
