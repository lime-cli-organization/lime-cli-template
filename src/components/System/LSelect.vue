<template>
  <div class="l_select">
    <div class="input_box" ref="input_box" @click="toggleDropDown">
      <input
        type="text"
        v-model="inputText"
        :disabled="isDisable"
        :readonly="!canInput"
        @input="handleInput"
      />
      <div class="icon">
        <van-icon
          name="arrow-down"
          :class="isDropdownVisible ? 'rotate' : ''"
        />
      </div>
    </div>
    <div
      class="mask"
      v-if="isDropdownVisible"
      @click="isDropdownVisible = false"
    >
      <ul class="dropdown" :style="`left:${style.left}px; top:${style.top}px;`">
        <li
          class="dropdown_item"
          :class="selectedItems === item ? 'active' : ''"
          v-for="(item, index) in data"
          :key="index"
          @click="doSelect(item)"
        >
          这是{{ item.name }}个选项
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// name > components > mixins > props > data > computed > watch > filter > 钩子函数 > methods
export default {
  name: 'LSelect',
  props: [
    'isMultiple', // 是否多选
    'value', // 选中的key的值
    'props', // 属性， value,label
    'clearable', // 是否可清除
    'separator', // 分隔符
    'isDisable', // 是否禁用
    'filterable', // 是否可搜索
  ],
  data() {
    return {
      data: [
        { id: 1, name: 12 },
        { id: 2, name: 23 },
        { id: 3, name: 34 },
        { id: 4, name: 45 },
      ],
      style: {},
      isDropdownVisible: false,
      selectedItems: [], // 选中的数据
    };
  },
  created() {
    this.idKey = this.props.value;
  },
  computed: {
    inputText: {
      get() {
        const lableKey = this.props.label;
        return this.selectedItems[lableKey];
      },
    },
    canInput() {
      return this.filterable;
    },
  },
  watch: {
    isDropdownVisible: {
      handler(newVal) {
        if (!newVal) {
          this.$emit('change', this.selectedItems);
        }
      },
    },
  },
  methods: {
    toggleDropDown() {
      const elementRects = this.$refs.input_box.getClientRects()[0];
      this.style = {
        left: elementRects.x,
        top: elementRects.y + elementRects.height,
      };
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    doSelect(item) {
      this.selectedItems = item;
    },
    handleInput: () => {
      console.log(this.inputText);
    },
  },
};
</script>
<style lang="less" scoped>
.l_select {
  position: relative;
  width: 150px;
  background-color: #fff;
}
.input_box {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid red;
  margin-left: 12px;
  input {
    border: none;
    line-height: 24px;
    width: calc(100% - 40px);
  }
  .icon {
    padding: 0 8px;
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
}
.dropdown {
  position: absolute;
  margin-top: 12px;
  border: 1px solid lightblue;
  background-color: white;
  li {
    line-height: 2;
    padding: 0 12px;
    &:hover {
      background-color: #f5f7fa;
    }
    &.active {
      color: #409eff;
      font-weight: bold;
    }
  }
}
.rotate {
  transform: rotate(-180deg);
  transition: transform 0.3s;
}
</style>
