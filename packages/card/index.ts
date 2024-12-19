import CCard from "./card.vue";

CCard.install = (app: any) => {
  app.component(CCard.name, CCard);
};

export default CCard;
