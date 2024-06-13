/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEventListener } from "primereact/hooks";
import { DomHandler } from "primereact/utils";
import { useContext, useEffect } from "react";
import type { UseSubmenuOverlayPositionProps } from "~/types";
import { LayoutContext } from "../context/layoutcontext";
import { MenuContext } from "../context/menucontext";

export const useSubmenuOverlayPosition = ({
    target,
    overlay,
    container,
    when,
}: UseSubmenuOverlayPositionProps) => {
    const { isSlim, isSlimPlus, isHorizontal, setLayoutState } =
        useContext(LayoutContext);
    const { activeMenu } = useContext(MenuContext);

    const handleScroll = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            overlaySubmenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
            resetMenu: true,
        }));
    };

    const [bindScrollListener, unbindScrollListener] = useEventListener({
        type: "scroll",
        target: container as React.Ref<HTMLElement>,
        listener: handleScroll,
    });

    const calculatePosition = () => {
        if (overlay && target) {
            const { left, top } = target.getBoundingClientRect();
            const { width: vWidth, height: vHeight } = DomHandler.getViewport();
            const [oWidth, oHeight] = [
                overlay.offsetWidth,
                overlay.offsetHeight,
            ];
            const scrollbarWidth = DomHandler.calculateScrollbarWidth(
                container!
            );

            // reset
            overlay.style.top = overlay.style.left = "";

            if (isHorizontal()) {
                const width = left + oWidth + scrollbarWidth;
                overlay.style.left =
                    vWidth < width
                        ? `${left - (width - vWidth)}px`
                        : `${left}px`;
            } else if (isSlim() || isSlimPlus()) {
                const height = top + oHeight;
                overlay.style.top =
                    vHeight < height
                        ? `${top - (height - vHeight)}px`
                        : `${top}px`;
            }
        }
    };

    useEffect(() => {
        if (when) {
            (bindScrollListener as () => void)();
        }
    
        return () => {
            (unbindScrollListener as () => void)();
        };
    }, [when]);

    useEffect(() => {
        if (when) {
            calculatePosition();
        }
    }, [when, activeMenu]);
};
