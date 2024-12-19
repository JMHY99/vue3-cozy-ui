import CCarousel from "./carousel.vue";
import CCarouselItem from "./carousel-item.vue";

CCarousel.install = (app: any) => {
  app.component(CCarousel.name, CCarousel);
};

CCarouselItem.install = (app: any) => {
  app.component(CCarouselItem.name, CCarouselItem);
};

export { CCarousel, CCarouselItem };
export default CCarousel;
