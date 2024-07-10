import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedValue, setSearchedValue] = useState("");

  function handleinputChange(e) {
    setSearchedValue(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Dropdown />
        <div className="form-control ">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchedValue}
              onChange={handleinputChange}
            />
          </form>
        </div>
        <UserAvatar />
      </div>
    </div>
  );
}

export default Header;
