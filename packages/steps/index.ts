import CSteps from './steps.vue'
import CStep from './step.vue'

CSteps.install = (app: any) => {
  app.component(CSteps.name, CSteps)
  app.component(CStep.name, CStep)
}

export { CSteps, CStep }
export default CSteps 