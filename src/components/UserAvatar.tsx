import React from "react";
import { Menu, MenuButton, MenuItem, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const pf =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

const UserAvatar: React.FC = () => {
  const { user, signOut } = useAuth();

  if (user?.id) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <img className="h-8 w-8 rounded-full" src={pf} alt={user.email} />
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </MenuButton>
        </div>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                {({ focus }) => (
                  <Link
                    to="/favorites"
                    className={`${
                      focus ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block px-4 py-2 text-sm`}
                  >
                    Favorites
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={signOut}
                    className={`${
                      focus ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    Sign out
                  </button>
                )}
              </MenuItem>
            </div>
          </div>
        </Transition>
      </Menu>
    );
  }

  return <></>;
};

export default UserAvatar;
