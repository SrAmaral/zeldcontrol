import type { MenuModel } from "~/types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
  const model: MenuModel[] = [
    {
      label: "Dashboards",
      icon: "pi pi-home",
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          to: "/dashboard",
        },
        {
          label: "Clientes",
          icon: "pi pi-user",
          to: "/dashboard/clients/new",
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
};

export default AppMenu;
