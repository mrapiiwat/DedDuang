import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis dicta saepe
      autem. Voluptates quos numquam dignissimos deserunt quod quisquam
      praesentium maiores, possimus ipsa explicabo voluptas accusantium error
      consequatur adipisci suscipit?
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
