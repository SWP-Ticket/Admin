import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import Image1 from "@/assets/img/lading-image.png";
import LoginPage from "./Auth/LoginPage";
import { useTranslation } from "react-i18next";
function Landingpage() {
  const { openLogin, setOpenLogin } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <section className="mx-auto w-full max-w-screen-xl">
      <div id="landingpage">
        <div className="content">
          <div className="header px-8  gap-3 flex items-center justify-end h-16   border-b">
            <Button
              className="rounded-lg bg-green-600 hover:bg-green-500"
              onClick={() => {
                setOpenLogin(true);
              }}
            >
              Login
            </Button>
          </div>
          <div className=" flex pt-10 px-20 gap-20 ">
            <img
              src={Image1}
              className=" h-[540px] basis-2/6"
              alt="Learn without limits and spread knowledge."
            />
            <div className=" flex justify-center items-center basis-4/6">
              <div className="">
                <h1 className="text-6xl py-3 font-semibold">
                  Event Ticket Management System
                </h1>
                <p className="text-gray-500 py-5">
                  The event ticketing management system supports seminars and
                  workshops organized by the school or the Biz and
                  Entrepreneurship department of FU. This system will help the
                  organizer manage registration, fee collection, check-in, and
                  receive feedback after the event in an efficient and
                  professional manner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginPage isOpen={openLogin} setOpen={setOpenLogin} />
    </section>
  );
}

export default Landingpage;
