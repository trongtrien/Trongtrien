import React from 'react';
import CourseHeader from './header/CourseHeader';

export default function CourseLayout({ children, link, setShowMenu, showMenu,chapterLabel,lesonLabel }) {
  return (
    <React.Fragment>
        <CourseHeader link={link}
                      setShowMenu={setShowMenu}
                      showMenu={showMenu}
                      chapterLabel={chapterLabel}
                      lesonLabel={lesonLabel}/>
      <main id="content" className='bg-dl'>
        {children}
      </main>
    </React.Fragment>
  );
}
