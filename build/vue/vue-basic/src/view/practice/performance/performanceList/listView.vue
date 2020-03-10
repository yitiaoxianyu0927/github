<template>
  <div 
    class="list-view" 
    @scroll="handleScroll">
    <div
      class="list-view-phantom"       
      :style="{
         height: contentHeight
      }">
    </div>
    <div
      ref="content"
      class="list-view-content">
      <div
        class="list-view-item"
        :style="{
          height: itemHeight + 'px'
        }"
        v-for="item in visibleData"
       >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>


<script>

export default {
    name: 'ListView',
 
    props: {
    data: {
        type: Array,
      required: true
    },
 
    itemHeight: {
      type: Number,
      default: 30
    }
  },
 
  computed: {
    contentHeight() {
        return this.data.length * this.itemHeight + 'px';
    }
  },
 
  mounted() {
    this.updateVisibleData();
  },
 
  data() {
    return {
      visibleData: []
    };
  },
 
  methods: {
    
    updateVisibleData(scrollTop) {

        scrollTop = scrollTop || 0;
        const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight); // 取得可见区域的可见列表项数量
        const start = Math.floor(scrollTop / this.itemHeight); // 取得可见区域的起始数据索引
        const end = start + visibleCount; // 取得可见区域的结束数据索引
        this.visibleData = this.data.slice(start, end); // 计算出可见区域对应的数据，让 Vue.js 更新
        this.$refs.content.style.webkitTransform = `translate3d(0, ${ start * this.itemHeight }px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）

    },
 
    handleScroll() {
      const scrollTop = this.$el.scrollTop;

      console.log(this.$el)
      this.updateVisibleData(scrollTop);
    }
  }
}  

</script>

<style scoped>

.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #aaa;
}
 
.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
 
.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
 
.list-view-item {
  padding: 5px;
  color: #666;
  line-height: 30px;
  box-sizing: border-box;
}


</style>
