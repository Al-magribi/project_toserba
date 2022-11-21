import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as VsIcons from "react-icons/vsc";

export const sidebarData = [
  {
    title: "Dashboard",
    path: "/dasboard",
    icon: <FaIcons.FaTachometerAlt />,
    cName: "nav-text",
  },
  {
    title: "Semua Produk",
    path: "/admin/products",
    icon: <FaIcons.FaShoppingCart />,
    cName: "nav-text",
  },
  {
    title: "Tambah Produk",
    path: "/admin/tambah",
    icon: <AiIcons.AiOutlineAppstoreAdd />,
    cName: "nav-text",
  },
  {
    title: "Pesanan",
    path: "/admin/orders",
    icon: <FaIcons.FaListAlt />,
    cName: "nav-text",
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <FaIcons.FaUsers />,
    cName: "nav-text",
  },
  {
    title: "Reviews",
    path: "/admin/reviews",
    icon: <VsIcons.VscPreview />,
    cName: "nav-text",
  },
];
