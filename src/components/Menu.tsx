import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const Menu: React.FC = () => {
  const isSignedIn = useAppSelector((state) => state.auth.isSignedIn);

  return (
    <div className="nav-menu">
      <Link to="/" className="nav-menu__item">
        Articles
      </Link>
      <Link to="/" className="nav-menu__item">
        All articles
      </Link>
      {isSignedIn && (
        <Link to="/articles/new" className="nav-menu__item">
          Create blog
        </Link>
      )}
    </div>
  );
};

export default Menu;
