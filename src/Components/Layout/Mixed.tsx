import { useContext, useEffect, useState } from "react";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { LayoutAlert, LayoutBody, LayoutContainer, LayoutFooter, LayoutHeader, LayoutHeaderSpacer, LayoutOverlay, LayoutRow, LayoutSection, LayoutSidebar, LayoutSidebarMenu, LayoutSpacer, LayoutStackedPanel, RoundedButton } from "./StyledComponents";
import { Card, ColoredLabel, DivSubtitle, DivTitle2 } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";
import { LogoER } from "../Images/LogoEntreRios";

import { MdNotificationsNone } from "react-icons/md";
import useMediaQuery from "../../Utils/Hooks";
import { RiLayout4Fill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Pages } from "../../Routes/Pages";
import { INavigation } from "../../Interfaces/Data";
import { LayoutBreadcrump } from "./Breadcrump";


export const LayoutMixed = () => {

  return (
    <div className="p-8" style={{display: 'flex', justifyContent: 'center'}}>
      <LayoutSection style={{ maxWidth: "400px" }}>
        <Outlet></Outlet>
      </LayoutSection>
    </div>
  );
};