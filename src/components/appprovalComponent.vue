<template>
    <div class="approvalBox">
        <vue2-org-tree v-if="treeData.data" :data="treeData.data" :horizontal="!horizontal" :collapsable="collapsable"
            :label-class-name="labelClassName" :render-content="renderContent" name="organ" @on-node-click="onNodeClick" />
    </div>
</template>
  
<script>
import api from '@/api/index'
export default {
    name: 'AppprovalComponent',

    data() {
        return {
            "treeData": {
                labelClassName: "bg-color-orange",
                basicInfo: { id: null, label: "---null" },
                basicSwitch: false,
                data: null,
            }
            ,
            horizontal: true, //横版 竖版
            labelClassName: 'labelClassName', // 默认颜色
            scrollTreeStyle: 'width:100%;',
            collapsable: false,
            loading: false,
            primaryNode: []
        }
    },
    methods: {
        getList(code) {
            var params = {
                code: code
            }
            this.loading = true
            this.$parent.fullscreenLoading = true
            api
                .getList(params)
                .then((response) => {
                    //当前节点设置为组节点
                    this.$parent.fullscreenLoading = false
                    var data = response.data
                    this.xgbForEachFunc(data)
                    //模拟数据返回结果
                    data.type = 3
                    this.treeData.data = data

                })
                .catch(() => { this.spinning = false })
        },
        xgbForEachFunc(trees) {      //传一棵树
            if (trees.left || trees.right) {  //如果存在子节点
                trees.label = trees.feature == null && trees.feature_party == null ? trees.w : `${trees.feature_party}\n${trees.feature}`;  //根据需求赋的值
                trees.children = []
                trees.children.push(trees.left, trees.right)  //如果存在子节点，push进新建的children数组
                trees.children.forEach(e => {
                    e.label = e.feature == null && e.feature_party == null ? e.w : `${e.feature_party}\n${e.feature}` //根据需求
                    if (e.left || e.right) {
                        this.xgbForEachFunc(e)  //如果依然存在子节点，回调
                    } else {
                        return  //如果没有孩子，跳出
                    }
                })
            }
        },
        // 自定义您的点击事件
        onNodeClick(e, data) {
            //判断当前点击节点是否是主节点
            if (data.code != this.treeData.data.code) {//不是
                this.primaryNode.push(data.code)
                this.getList(data.code)

            } else { //是
                if (this.primaryNode.length == 0) {
                    return this.$message.error('当前已经是最上级节点了');
                }
                this.getList(this.primaryNode[this.primaryNode.length - 2] || this.$parent.input)
                this.primaryNode.pop();
            }
        },
        renderContent(h, data) {
            //正常逻辑 最上层为主节点   其余节点中introducer_code等于最上层code为直接介绍 否则为间接介绍
            //因为模拟接口 数据随机 所以暂定用type
            //type 3 主节点 2 直接介绍 1间接介绍 
            return (
                <div class="card_wrap" class={{ firstItem: data.type === 2, lastItem: data.type === 3, card_item: data.type === 1, card_wrap: true }}>
                    <div >
                        <span> 编号：{data.code}</span>
                    </div>
                    <div class="add_btn">
                        <div class="card_title">客户：{data.name}</div>
                        <div class="card_title">介绍人保户编号:{data.introducer_code}</div>
                        <div class="card_title">日期：{data.registration_date}</div>
                        <a class="card_title" style='color:blue'>
                            {this.primaryNode.length != 0 && data.code === this.treeData.data.code && data.type === 3 ? '上一级' : ''} </a>
                    </div>
                </div>
            )
        },
    }

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.approvalBox {
    display: flex;
    justify-content: center;
}

.org-tree-container {
    background: #f5f5f7;

}
</style>
<style>
.card_wrap {
    padding: 10px 15px !important;
}

.lastItem {
    background: yellow;
}

.firstItem {
    background: green;
}

.card_item {
    background: #cccccc;
}

.labelClassName {
    padding: 0 !important;
}
</style>
  