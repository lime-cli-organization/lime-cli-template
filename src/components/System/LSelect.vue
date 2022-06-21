<template>
  <div class="l_select">
    <div
      :class="isVisible ? 'input_wrapper focus' : 'input_wrapper'"
      @click="toggle"
    >
      <input
        type="text"
        :value="labelText"
        :placeholder="placeholder"
        :readonly="!canInput"
      />
      <div class="icon_wrapper">
        <template v-if="isClearShow">
          <LSvg
            iconName="close_fill"
            color="#dcdfe6"
            @click.native.stop="clearSelected"
          />
        </template>
        <LSvg
          iconName="arrow_down_line"
          color="#dcdfe6"
          :className="isVisible ? 'arrow down ' : 'arrow '"
        />
      </div>
    </div>
    <div class="popper" v-show="isVisible">
      <div
        :class="isSelected(item[idKey]) ? 'item active' : 'item'"
        v-for="item in filterList"
        :key="item[idKey]"
        @click="selectRow(item)"
      >
        {{ item[labelKey] }}
      </div>
    </div>
  </div>
</template>
<script>
// name > components > mixins > props > data > computed > watch > filter > 钩子函数 > methods
import LSvg from "./LSvg.vue";
export default {
  name: "LSelect",
  components: {
    LSvg,
  },
  props: {},
  data() {
    return {
      inputText: "", // 输入的值
      placeholder: "请选择",
      idKey: "name",
      labelKey: "value",
      data: [
        {
          name: 1,
          value: "这是一条数据",
        },
        {
          name: 2,
          value: "这是一条数据2",
        },
        {
          name: 3,
          value: "这是一条数据3",
        },
        {
          name: 4,
          value: "这是一条数据4",
        },
        {
          name: 5,
          value: "这是一条数据5",
        },
      ],
      canClear: true,
      filterable: true, // 本地检索
      remote: true, // 远程搜索 && remoteMethod
      canInsert: true, // 创建新条目
      isMultiple: true,
      isVisible: false,
      selectedIdKeys: [],
    };
  },
  created() {},
  computed: {
    labelText() {
      const { filterList, selectedIdKeys, idKey, labelKey } = this;
      const textStr = filterList
        .filter((item) => selectedIdKeys.indexOf(item[idKey]) !== -1)
        .map((item) => item[labelKey]);
      return textStr.join(",");
    },
    isClearShow() {
      return this.canClear && this.selectedIdKeys.length > 0 && !this.isVisible;
    },
    canInput() {
      const { filterable, remote, canInsert } = this;
      return canInsert || filterable || remote;
    },

    filterList() {
      const { data, labelKey, filterable, inputText } = this;
      if (filterable) {
        console.log(filterable);
        return data.filter((item) => item[labelKey].indexOf(inputText) !== -1);
      }
      return data;
    },
  },
  watch: {
    selectedIdKeys: {
      handler(newVal) {
        const { filterList, idKey } = this;
        const selectedItems = filterList.filter(
          (item) => newVal.indexOf(item[idKey]) !== -1
        );
        this.$emit("change", selectedItems);
      },
    },
    labelText: {
      handler(newVal) {
        console.log(newVal);
        if (newVal === "") {
          this.selectedIdKeys = [];
        }
      },
    },
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible;
    },
    closePopper() {
      this.isVisible = false;
    },
    selectRow(item) {
      const { isMultiple, selectedIdKeys, idKey } = this;
      const unique = item[idKey];
      if (isMultiple) {
        selectedIdKeys.indexOf(unique) !== -1
          ? this.selectedIdKeys.splice(selectedIdKeys.indexOf(unique), 1)
          : this.selectedIdKeys.push(unique);
      } else {
        this.selectedIdKeys = [unique];
        this.closePopper();
      }
    },
    isSelected(idKey) {
      const { selectedIdKeys } = this;
      return selectedIdKeys.indexOf(idKey) !== -1;
    },
    clearSelected() {
      this.selectedIdKeys = [];
      this.$emit("clear");
    },
    inputSearch(e) {
      console.log(e);
      // const { labelText } = this;
      // console.log(labelText);
    },
  },
};
</script>
<style lang="less" scoped>
.l_select {
  width: 100%;
  height: 100%;
  position: relative;
  .popper {
    position: absolute;
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    margin: 5px 0;
    overflow: hidden;
    max-height: 400px;
    .item {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 68px;
      line-height: 68px;
      box-sizing: border-box;
      cursor: pointer;
      text-align: left;
      &.active {
        color: @primary;
        font-weight: 700;
        background-color: #f5f7fa;
      }
    }
  }
}
.input_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  &.focus {
    border-color: @primary;
  }
  input {
    width: calc(100% - 4em);
    height: 100%;
    border: none;
    outline: none;
    line-height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
  }
  .icon_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .arrow {
    transition: all 0.3s;
    &.down {
      transform: rotate(-180deg);
    }
  }
}
</style>
