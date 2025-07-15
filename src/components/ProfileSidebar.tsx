import { FaUserEdit, FaCreditCard, FaCrown, FaHome } from "react-icons/fa";

interface ProfileSidebarProps {
  active: string;
  setActive: (section: string) => void;
}

export default function ProfileSidebar({ active, setActive }: ProfileSidebarProps) {
  const items = [
    { id: "home", label: "Inicio perfil", icon: <FaHome /> },
    { id: "personal", label: "Datos personales", icon: <FaUserEdit /> },
    { id: "subscription", label: "Suscripción", icon: <FaCrown /> },
    { id: "payments", label: "Pagos", icon: <FaCreditCard /> },
  ];

  return (
    <aside className="w-64 bg-white rounded-xl shadow-md p-4 space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition 
            ${active === item.id 
              ? "bg-green-100 text-green-700 font-semibold" 
              : "hover:bg-gray-100"}`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </aside>
  );
}
