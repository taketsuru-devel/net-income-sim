<template>
  <el-drawer
    title="算出方法について"
    :visible.sync="isNoticeVisible"
    direction="ltr"
    :before-close="closeSelf">
    <el-tree :data="data" :props="defaultProps"></el-tree>
  </el-drawer>
</template>

<script>
  export default {
    props: ['isNoticeVisible'],
    data () {
      return {
        data: [{
          label: '属性',
          children: [{
            label: '所得',
            children: [{
              label: '会社勤務による給与収入のみ'
            },{
              label: '勤務先',
              children: [{
                label: '所在地は東京都',
              children: [{
                label: '月額報酬のみ、賞与なし',
              },{
                label: '関東IT健保に加入',
              }]
            }],
          },{
            label: '居所',
            children: [{
              label: '神奈川県横浜市'
            },{
              label: '賃貸住宅在住'
            }],
          },{
            label: '家族構成',
            children: [{
              label: '単身者'
            },{
              label: '配偶者、扶養家族なし'
            }],
          },{
            label: 'その他',
            children: [{
              label: '民間(生命、地震)保険未加入'
            },{
              label: 'iDeco未加入'
            }],
          }]
        }, {
          label: '所得、控除',
          children: [{
            label: 'Level two 2-1',
            children: [{
              label: 'Level three 2-1-1'
            }]
          }, {
            label: 'Level two 2-2',
            children: [{
              label: 'Level three 2-2-1'
            }]
          }]
        }, {
          label: 'Level one 3',
          children: [{
            label: 'Level two 3-1',
            children: [{
              label: 'Level three 3-1-1'
            }]
          }, {
            label: 'Level two 3-2',
            children: [{
              label: 'Level three 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods : {
      closeSelf() {
        this.$emit('closeNotice')
      }
    }
  };
</script>
