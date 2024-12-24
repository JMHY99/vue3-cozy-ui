import CTimeline from "./timeline.vue";
import CTimelineItem from "./timeline-item.vue";

CTimeline.install = (app: any) => {
  app.component(CTimeline.name, CTimeline);
};

CTimelineItem.install = (app: any) => {
  app.component(CTimelineItem.name, CTimelineItem);
};

export { CTimeline, CTimelineItem };

export default CTimeline;
