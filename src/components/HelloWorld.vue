<template>
  <div class="page">
    <div class="btnWrap">
      <el-input v-model="input" placeholder="请输入客户编号" style="width:200px;margin-right: 10px;"></el-input>
      <el-button type="primary" @click="getList" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
    </div>
    <div class="approvalDrawercontent">
      <div class="approvalBox">
        <AppprovalComponent :scale="scale" ref="AppprovalComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import AppprovalComponent from '@/components/appprovalComponent.vue'
export default {
  name: 'HelloWorld',
  components: { AppprovalComponent },
  data() {
    return {
      input: "",
      scale: 0,
      fullscreenLoading: false
    }
  },
  methods: {
    getList() {
      if (this.input === '') {
        return this.$message.error('请输入客户编号');
      }
      this.$refs.AppprovalComponent.primaryNode = []
      this.$refs.AppprovalComponent.getList(this.input)
    },
    // 放大缩小
    onScale(type) {
      if (type == 'in') {
        if (this.scale !== 100) {
          this.scale = this.scale + 10
        } else {
          return false
        }
      } else {
        if (this.scale !== 50) {
          this.scale = this.scale - 10
        } else {
          return false
        }
      }
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnWrap {
  display: flex;
}

.approvalDrawercontent {
  height: 800px;
  padding: 20px 0 0;
  width: 100%;
  background-color: #f5f5f7;
  overflow: auto;
  margin-top: 20px;
}

.zoom {
  display: flex;
  position: fixed;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 40px;
  width: 125px;
  right: 40px;
  margin-top: 30px;
  z-index: 10;


}

.zoom-out {
  width: 30px;
  height: 30px;
  background: #fff;
  color: #c1c1cd;
  cursor: pointer;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url(https://gw.alicdn.com/tfs/TB1s0qhBHGYBuNjy0FoXXciBFXa-90-90.png);
}

.zoom-in {
  width: 30px;
  height: 30px;
  background: #fff;
  color: #c1c1cd;
  cursor: pointer;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url(https://gw.alicdn.com/tfs/TB1UIgJBTtYBeNjy1XdXXXXyVXa-90-90.png);
}
</style>
