import React, { useState } from 'react';
import Cart from '../cart/Cart';
import NarrowSidebar from './NarrowSidebar';
import TopNav from './TopNav';

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);

  return (
    <>
      <Cart isCartOpen={isCartOpen} closeCart={closeCart} />
      <div className="h-screen hide-scrollbar overflow-hidden flex">
        {/* <!-- Top nav--> */}
        <NarrowSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav openCart={openCart} />

          {/* Main area */}
          <main className="w-full h-full bg-white">
            <section className="h-full w-full overflow-y-auto hide-scrollbar flex flex-col">
              <section className="flex-1 pb-10">{children}</section>
            </section>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
