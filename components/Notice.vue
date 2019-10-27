<template>
  <el-drawer
    title="算出の際の前提条件"
    :visible.sync="isNoticeVisible"
    direction="ltr"
    size="300px"
    :before-close="closeSelf">
    <p style="padding: 20px;"><small>
      令和元年度の税率を使用しています。
    </small></p>
    <p style="padding: 20px;"><small>
      以下の条件を前提に算出しています。<br>
      以下のいずれかに該当しない場合、<br>算出額が異なる場合があります。
    </small></p>
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
            label: '本人',
            children: [{
              label: '障害者ではない',
              children: [{
                label: '障害者控除の対象ではない'
              }],
            },{
              label: '勤労学生ではない'
            },{
              label: '寡婦(寡夫)ではない'
            }],
          },{
            label: '居所',
            children: [{
              label: '神奈川県横浜市'
            },{
              label: '賃貸住宅在住'
            }],
          },{
            label: '家族(生計を同一にする者)構成',
            children: [{
              label: '単身者'
            },{
              label: '配偶者、扶養者なし'
            }],
          }]
        }, {
          label: '収入',
          children: [{
            label: '会社勤務による給与収入のみ'
          },{
            label: '勤務先',
            children: [{
              label: '所在地は東京都',
            },{
              label: '月額報酬のみ、賞与なし',
            },{
              label: '関東IT健保に加入',
            }]
          }],
        },{
          label: '支出',
          children: [{
            label: '民間(生命、地震)保険未加入'
          },{
            label: '10万円以上の医療費支出がない',
          },{
            label: 'iDeco未加入'
          },{
            label: '寄附による支出がない'
          },{
            label: '盗難、災害などによる支出がない'
          }],
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
