import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import "./style/docs.css";
import "./style/global.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes , BrowserRouter as Router } from "react-router-dom";
import  CoinflipPaage  from "./pages/Coinflip";
import { Faq } from "./components/Faq";
import { Login } from "./components/Login";
import { TermsOfService } from "./components/TermsOfService";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import { Deposit } from "./components/Inventory/Deposit";
import { Inventory } from "./components/Inventory/Inventory";
import { Withdraw } from "./components/Inventory/Withdraw";

import Templete from "./Layout/";
import Main from "./pages/Main";
import About from "./pages/About";
import Stats from "./pages/Stats";

export enum MainWindows {
  None,
  Faq,
  TermsOfService,
  Login,
  Inventory,
  Deposit,
  Withdraw,
}
export interface User {
  IsAnyBuildersClubMember: boolean;
  IsPremium: boolean;
  RobuxBalance: number;
  ThumbnailUrl: string;
  UserID: number;
  UserName: string;
}
function App() {
  const [window, setWindow] = useState<MainWindows>(0);
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["loginCookie"]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await (await fetch(`/users/`)).json();
      console.log(res);
      if (String(res.status)[0] === "4") {
        removeCookie("loginCookie");
        return;
      }
      setCookie("loginCookie", cookies.loginCookie, { maxAge: 60 * 24 * 7 });
      setUser(res);
    })();
  }, []);
  return (
    <div className="bg-[#0D101D]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route 
          path="/"
          element={
            <Templete 
              setWindow={setWindow} 
              user={user} 
              chat={true}
              footer={true}
              showChat={showChat}
              setShowChat={setShowChat}
              setUser={setUser}>
              <Main 
              />
            </Templete>
          }
        />
        <Route
          path='/about'
          element={
            <Templete
              footer={false}
              chat={false}
              setWindow={setWindow}
              user={user}
              showChat={showChat}
              setShowChat={setShowChat}
              setUser={setUser}>
              <About />  
            </Templete>
          }
          />
        <Route
          path='/coinflip'
          element={
            <Templete
              chat={true}
              footer={false}
              setWindow={setWindow}
              user={user}
              showChat={showChat}
              setShowChat={setShowChat}
              setUser={setUser}>
              <CoinflipPaage 
                user={user}
              />  
            </Templete>
          }
          />  
          <Route
          path='/stats'
          element={
            <Templete
              chat={false}
              footer={false}
              setWindow={setWindow}
              user={user}
              showChat={showChat}
              setShowChat={setShowChat}
              setUser={setUser}>
              <Stats /> 
            </Templete>
          }
          />
        <Route
          path='/jackpot'
          element={
            <Templete
              chat={false}
              footer={false}
              setWindow={setWindow}
              user={user}
              showChat={showChat}
              setShowChat={setShowChat}
              setUser={setUser}>
               
            </Templete>
          }
          />  
        <Route
          path='/rps'
          element={
            <Templete
              chat={false}
              footer={false}
              setWindow={setWindow}
              user={user}
              showChat={showChat}
              setShowChat={setShowChat}
              setUser={setUser}>
               
            </Templete>
          }
          />    
      </Routes>
      {(() => {
        switch (window) {
          case MainWindows.Faq:
            return <Faq setWindow={setWindow} />;
          case MainWindows.TermsOfService:
            return <TermsOfService setWindow={setWindow} />;
          case MainWindows.Login:
            return <Login setWindow={setWindow} setUser={setUser} />;
          case MainWindows.Inventory:
            return <Inventory setWindow={setWindow} />;
          case MainWindows.Deposit:
            return <Deposit setWindow={setWindow} />;
          case MainWindows.Withdraw:
            return <Withdraw setWindow={setWindow} />;
        }
      })()}
    </div>
  );
}

export default App;
