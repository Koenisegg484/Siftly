import { useEffect, useRef, useState } from "react";
import "./menu.css";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const menu = menuRef.current;

    if (menu) {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.inOut" },
        onComplete: () => {
          if (!isOpen) {
            menu.style.visibility = "hidden"; // Hide the menu when closed
            document.body.style.overflow = "auto"; // Re-enable body scroll
          }
        },
      });

      if (isOpen) {
        document.body.style.overflow = "hidden"; // Disable body scroll
        tl.fromTo(menu, { opacity: 0, y: "-100%" }, { opacity: 1, y: "0%" })
          .set(menu, { visibility: "visible" });
      } else {
        tl.to(menu, { opacity: 0, y: "100%" }).set(menu, { visibility: "hidden" });
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Icon to toggle menu */}
      <div
        className="hamburger fixed z-50"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <label>
          <input
            type="checkbox"
            onChange={() => setIsOpen((prev) => !prev)}
            style={{ display: "none" }}
          />
          <svg viewBox="0 0 32 32" className="w-8 h-8 text-white cursor-pointer">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            />
            <path className="line" d="M7 16 27 16" />
          </svg>
        </label>
      </div>

      {/* Full-Screen Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-black text-white transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        <div className="flex justify-between items-cente px-8 pt-6 shadow-md">
          <h1 className="text-xl text-white font-semibold cursor-pointer" onClick={()=>navigate({ pathname: '/' })}>Siftly</h1>
        </div>

        {/* middle */}
        <div className="flex items-center justify-evenly h-3/4 m-5 ">
          <div className="m-5">
            <div className="flex flex-col m-5">
            <a href="#" className="m-2">Github</a>
              <a href="#" className="m-2">Linkedin</a>
              <a href="#" className="m-2">Twitter</a>
              <a href="#" className="m-2">Instagram</a>
            </div>
          </div>
          <div className="flex flex-col text-5xl font-semibold">
            <div className="m-3">
              <a href="#">About</a>
            </div>
            <div className="m-3">
              <a href="#">Categories</a>
            </div>
            <div className="m-3">
              <a href="#">Products</a>
            </div>
            <div className="m-3">
              <a href="#">FAQ</a>
            </div>
            <div className="m-3">
              <a href="#">Contact</a>
            </div>
          </div>
        </div>

        {/* last */}
        <div className="flex justify-between p-8">
          <div className="">
            <a href="#" className="p-5">
              Privacy policy
            </a>
            <a href="#" className="p-5">
              Cookie policy
            </a>
            <a href="#" className="p-5">
              Terms and conditions
            </a>
          </div>
          <div className="contact">
            <a href="#">siftly@gmail.Com</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
