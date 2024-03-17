import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-300 rounded-xl">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            S & T{" "}
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <Link href="/users" className="btn btn-ghost text-lg">
              ADD
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
