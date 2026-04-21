import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-full">
        <AdminSidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;