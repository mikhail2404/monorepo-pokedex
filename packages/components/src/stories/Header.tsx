import "./header.css";

import React from "react";
import Link from "next/link";

interface HeaderProps {
  text: string;
  linkTo: string;
}

const Header: React.FC<HeaderProps> = ({ text, linkTo }) => {
  return (
    <header className="header">
      <Link href={linkTo} className="header-link">
        <h1 className="header-title">{text}</h1>
      </Link>
    </header>
  );
};

export default Header;
