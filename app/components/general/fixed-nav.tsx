"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useActiveSection, useNavbarVisibility, useScrollToView, } from "../../hooks";
import { RiMenu2Line } from 'react-icons/ri';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
// import MobileNav from '../Navbar/MobileNav';

type Props = {}

const FixedNav = (props: Props) => {
    const [nav, setNav] = useState(false);
    const scrollToView = useScrollToView();
    const { isVisible } = useNavbarVisibility();
    const activeSection = useActiveSection([
        "showcase",
        "about-us",
        "courses",
        "program",
        "e-learning",
        "community",
        "blog",
    ]);
    const handleNav = () => {
    setNav(!nav);
    }
    const closeNav = () => {
        setNav(false);
    }

    const controls = useAnimation();

    useEffect(() => {
        if (isVisible) {
        controls.start({ y: 0, transition: { duration: 0.3 } });
        } else {
        controls.start({ y: -100 });
        }
    }, [isVisible, controls]);

  return (
    <motion.nav
      className={`max-w-screen z-20 w-full overflow-x-hidden bg-black transition-all duration-300 ease-in-out sm:w-full
      ${ isVisible ? 'fixed left-0 top-0' : 'hidden'}
      `}
      animate={controls}
      initial={{ y: -100 }}
      >
      {/* <MobileNav closeNav={closeNav} handleNav={handleNav} nav={nav}/> */}
      <ul className="mx-auto flex max-w-6xl items-center justify-between lg:justify-center gap-4 max-lg:pr-4">
        <Link
          href="/#showcase"
          onClick={() => scrollToView("showcase")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            activeSection === "showcase" ? "border-t-4 border-blue-500" : ""
          }`}
        >
          showcase
        </Link>
        <Link
          href="/#about-us"
          onClick={() => scrollToView("about-us")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            activeSection === "about-us" ? "border-t-2 border-blue-500" : ""
          }`}
        >
          about us
        </Link>
        <Link
          href="/#courses"
          onClick={() => scrollToView("courses")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            activeSection === "courses" ? "border-t-2 border-blue-500" : ""
          }`}
        >
          Courses
        </Link>
        <Link
          href="/#program"
          onClick={() => scrollToView("program")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            activeSection === "program" ? "border-t-2 border-blue-500" : ""
          }`}
        >
          Programs
        </Link>

        <Link href="/">
          <Image
            src="/wificombat.svg"
            alt="homepage"
            className="h-20 w-20 md:h-24 md:w-24 px-2.5 py-2"
            width={"96"}
            height={"96"}
          />
        </Link>
        <Link
          href="/#e-learning"
          onClick={() => scrollToView("e-learning")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            activeSection === "e-learning" ? "border-t-2 border-blue-500" : ""
          }`}
        >
          E- Learning
        </Link>
        <Link
          href="/#community"
          onClick={() => scrollToView("community")}
          className="px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden"
        >
          Community
        </Link>
        <Link
          href="/#blog"
          onClick={() => scrollToView("blog")}
          className="px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden"
        >
          Blog & News
        </Link>
        <Link
          href="/login"
          className="px-2.5 py-2 text-lg capitalize text-[#0784C3] hover:text-[#0784C3] max-lg:hidden"
        >
          Login
        </Link>
        <div className='pr-3'>
          <RiMenu2Line 
          onClick={handleNav}
          size={25}
          className="text-gray-300 lg:hidden"/>
        </div>
      </ul>
    </motion.nav>
  )
}

export default FixedNav