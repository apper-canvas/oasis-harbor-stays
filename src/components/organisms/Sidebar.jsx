import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

function Sidebar() {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
    { name: 'Rooms', path: '/admin/rooms', icon: 'DoorOpen' },
{ name: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
    { name: 'Rooms', path: '/admin/rooms', icon: 'DoorOpen' },
    { name: 'Bookings', path: '/admin/bookings', icon: 'Calendar' },
    { name: 'Guests', path: '/admin/guests', icon: 'Users' },
    { name: 'Reports', path: '/admin/reports', icon: 'FileText' }
  ];

  return (
    <div className="h-screen w-64 bg-primary text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center">
            <ApperIcon name="Building2" size={24} className="text-white" />
          </div>
          <div>
<div 
              onClick={() => navigate('/')} 
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <h1 className="text-xl font-bold">Harbor Stays</h1>
              <p className="text-xs text-white/70">Hotel Management</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )
            }
>
            <ApperIcon name={item.icon} size={20} />
            <span className="font-medium text-white">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white font-bold">
            AD
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-white/70">Front Desk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;