import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Technicians", path: "/admin/technicians" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Reports", path: "/admin/reports" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
