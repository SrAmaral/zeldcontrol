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
          items: [
            {
              label: "Dashboard de Clientes",
              icon: "pi pi-th-large",
              to: "/dashboard/clients",
            },
            {
              label: "Listagem de Clientes",
              icon: "pi pi-fw pi-users",
              to: "/dashboard/clients/list",
            },
            {
              label: "Novo Cliente",
              icon: "pi pi-fw pi-plus",
              to: "/dashboard/clients/new",
            },
          ],
        },
      ],
    },
  ];

  return <AppSubMenu model={model} />;
};

export default AppMenu;
