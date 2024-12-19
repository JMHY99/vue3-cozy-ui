import CComment from './comment.vue'

// 注册组件
CComment.install = function(app: any) {
  app.component(CComment.name, CComment)
}

// 导出组件
export default CComment 