import React, { useState } from 'react';
import './Header.scss';
import { MdMenu, MdClose } from 'react-icons/md';

const Header = ({ theme }) => {
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  return (
    <nav className="header px-6 py-6 lg:px-16 lg:py-6 text-gray-900 flex flex-row items-center justify-between z-0">
      <h5 className="text-xl">
        <b>Youzan</b>.Design
      </h5>
      <div className="flex">
        <MdMenu
          onClick={toggleShow}
          className="text-gray-900 text-3xl lg:hidden"
        />
        <div className="hidden lg:flex flex-row space-x-5 font-bold">
          <a href="/">Stories</a>
          <a href="/">Listen</a>
          <a href="/">Team</a>
          <a href="/">Tools</a>
        </div>
      </div>

      <div
        className={`header__offcanvas lg:hidden ${
          show ? 'offcanvas-show' : 'offcanvas-hidden'
        } bg-${theme} shadow-xl`}
      >
        <div className="header__offcanvas-top px-6 py-6">
          <MdClose
            onClick={toggleShow}
            className="icon-close text-3xl sm:text-5xl"
          />
        </div>
        <div className="flex flex-col text-light font-semibold p-5 space-y-6 text-6vw sm:p-8 sm:space-y-10 sm:text-2xl">
          <a href="/">Stories</a>
          <a href="/">Listen</a>
          <a href="/">Team</a>
          <a href="/">Tools</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
