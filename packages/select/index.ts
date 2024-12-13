import CSelect from './select.vue'
import COption from './option.vue'
import COptionGroup from './option-group.vue'

CSelect.install = (app: any) => {
  app.component(CSelect.name, CSelect)
  app.component(COption.name, COption);
  app.component(COptionGroup.name, COptionGroup);
}

export { COption, COptionGroup };
export default CSelect
