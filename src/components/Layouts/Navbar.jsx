import React from 'react';
import {  Button } from '../ui/button';
import { Avatar } from '../ui/avatar';
import { Popover } from '../ui/popover';
import { User } from 'lucide-react'; 
import { useAtom } from 'jotai';
import { globalState } from '../../jotai/globalState';

function Navbar() {
  const [user, setUser] = useAtom(globalState);
  console.log(user);

  const userMenu = (
    <div className="p-4 w-full">
      <div className="flex items-center mb-4">
        <Avatar
          size={64}
          src={user.picture}
          icon={<User />}
          className="w-full"
        />
        <div className="ml-3">
          <h4 className="font-semibold text-gray-800">{user.name}</h4>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <Button
          className="w-full"
          variant="outline"
          color="danger"
          onClick={() => setUser(null)}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-600">WACspace</div>
      <div className="flex items-center">
        <Popover content={userMenu} title={null} trigger="click" placement="bottomRight">
          <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <Avatar
              size="large"
              src={user.picture}
              icon={<User />}
              className="border-2 border-blue-500"
            />
            <span className="ml-2 text-gray-700 font-medium hidden md:block">{user.name}</span>
          </div>
        </Popover>
      </div>
    </nav>
  );
}

export default Navbar;
