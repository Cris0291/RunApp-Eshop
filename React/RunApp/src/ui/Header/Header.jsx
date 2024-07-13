import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import UserAvatar from "./UserAvatar";
import SearchBar from "./SearchBar";
import Drawer from "./Drawer";
import Tab from "./Tab";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedValue, setSearchedValue] = useState("");
  const [selectedItem, setSelectedItem] = useState("Greedo");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log([selectedItem, searchedValue]);
    navigate("/products");
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div>
          <Drawer />
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="join">
        <div>
          <div>
            <SearchBar />
          </div>
        </div>
        <select className="select select-bordered join-item">
          <option disabled selected>
            Filter
          </option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select>
      </div>
      <div className="navbar-end">
        <Tab />
        <UserAvatar />
      </div>
    </div>
  );
}

export default Header;
