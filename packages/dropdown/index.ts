import CDropdown from "./dropdown.vue";

CDropdown.install = (app: any) => {
  app.component(CDropdown.name, CDropdown);
};

export default CDropdown;
