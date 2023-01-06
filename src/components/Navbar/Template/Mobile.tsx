import React from "react";
import useIsMobile from "../../../hooks/helpers/useIsMobile";
import { IGTNavbarMobileOptions } from "../interface";
import NavbarMobile from "../NavbarMobile";

function GTNavbarMobile({ children }: IGTNavbarMobileOptions) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return <NavbarMobile.Wrapper>{children}</NavbarMobile.Wrapper>;
}

export default GTNavbarMobile;
