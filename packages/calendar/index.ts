import CCalendar from './calendar.vue'

CCalendar.install = (app: any) => {
  app.component(CCalendar.name, CCalendar)
}

export default CCalendar
