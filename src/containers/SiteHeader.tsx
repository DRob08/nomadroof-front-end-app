import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header3 from "components/Header/Header3";
import { Cog8ToothIcon as CogIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { PathName } from "routers/types";

export interface SiteHeaderProps {
  userLoggedInStatus: boolean;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ userLoggedInStatus }) => {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isTopOfPage, setIsTopOfPage] = useState(window.pageYOffset < 5);

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting);
    });
  };

  useEffect(() => {
    const OPTIONS = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    let OBSERVER: IntersectionObserver | null = null;

    if (location.pathname === "/") {
      OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS);
      anchorRef.current && OBSERVER.observe(anchorRef.current);
    }

    return () => {
      OBSERVER && OBSERVER.disconnect();
      OBSERVER = null;
    };
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Chisfis || Booking React Template</title>
      </Helmet>
      <div className="relative z-40 hidden lg:block">
        <div className="fixed right-3 top-1/4 z-40 flex items-center">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`p-2.5 bg-white hover:bg-neutral-100 dark:bg-primary-6000 dark:hover:bg-primary-700 rounded-xl shadow-xl border border-neutral-200 dark:border-primary-6000 z-10 focus:outline-none ${
                    open ? " focus:ring-2 ring-primary-500" : ""
                  }`}
                >
                  <CogIcon className="w-8 h-8" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-sm">
                    <div className="rounded-2xl bg-white dark:bg-neutral-800 overflow-hidden nc-custom-shadow-1">
                      <div className="relative p-6">
                        <span className="text-xl font-semibold">Customize</span>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
      <Header3 
        className={isTopOfPage ? "" : "shadow-sm dark:border-b dark:border-neutral-700"}
        userLoggedInStatus={userLoggedInStatus}
      />
      <div ref={anchorRef} className="h-1 absolute invisible"></div>
    </>
  );
};

export default SiteHeader;
