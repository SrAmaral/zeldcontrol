/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { signOut } from "next-auth/react";
import { Sidebar } from "primereact/sidebar";
import { useContext } from "react";
import { useSession } from "~/context/Session/useSession";
import { LayoutContext } from "./context/layoutcontext";

const AppProfileSidebar = () => {
  const { layoutState, setLayoutState } = useContext(LayoutContext);
  const session = useSession((state) => state.session);

  const onProfileSidebarHide = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      profileSidebarVisible: false,
    }));
  };

  return (
    <Sidebar
      visible={layoutState.profileSidebarVisible}
      onHide={onProfileSidebarHide}
      position="right"
      className="layout-profile-sidebar sm:w-25rem w-full"
    >
      <div className="flex-column mx-auto flex md:mx-0">
        <span className="mb-2 font-semibold">Welcome</span>
        <span className="text-color-secondary mb-5 font-medium">
          {session?.user?.name}
        </span>

        <ul className="m-0 list-none p-0">
          {/* <li>
            <a className="surface-border align-items-center border-1 surface-border border-round hover:surface-hover transition-duration-150 mb-3 flex cursor-pointer p-3 transition-colors">
              <span>
                <i className="pi pi-user text-primary text-xl"></i>
              </span>
              <div className="ml-3">
                <span className="mb-2 font-semibold">Profile</span>
                <p className="text-color-secondary m-0">
                  Lorem ipsum date visale
                </p>
              </div>
            </a>
          </li> */}
          <li>
            <a className="surface-border align-items-center border-1 surface-border border-round hover:surface-hover transition-duration-150 mb-3 flex cursor-pointer p-3 transition-colors">
              <span>
                <i className="pi pi-power-off text-primary text-xl"></i>
              </span>
              <div className="ml-3" onClick={() => signOut()}>
                <span className="mb-2 font-semibold">Sign Out</span>
                <p className="text-color-secondary m-0">Finalizar Sessão</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default AppProfileSidebar;
