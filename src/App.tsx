import { Suspense } from "react";

import HeaderContainer from "./components/Header/HeaderContainer";
// import { Preloader } from "./components/common/Preloader/Preloader";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <HeaderContainer />
      <main className="min-h-125 -translate-y-8 relative max-w-289.75 mx-auto rounded-b-4xl bg-white/20 backdrop-blur-[20px] px-6 pb-8 pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default App;
