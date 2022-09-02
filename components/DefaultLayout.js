import React from 'react';
import Header from './header/Header';
import Footer from './footer/footer';

export default function DefaultLayout({ children }) {
  
  return (
    <React.Fragment>
        <Header/>
      <main id="content" className='bg-dl'>
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}
