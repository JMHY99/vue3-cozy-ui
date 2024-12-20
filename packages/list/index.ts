import CList from './list.vue'
import CListItem from './list-item.vue'

CList.install = (app: any) => {
  app.component(CList.name, CList)
}

CListItem.install = (app: any) => {
  app.component(CListItem.name, CListItem)
}

export { CListItem }
export default CList 