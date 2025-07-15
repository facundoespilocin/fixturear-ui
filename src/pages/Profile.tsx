import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHome from "../components/ProfileHome";
import PersonalData from "../components/PersonalData";
import Subscription from "../components/Subscription";
import Payments from "../components/Payments";

export default function Profile() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("home");

  if (loading) return <p>Cargando perfil...</p>;
  if (!user) return <p>No hay usuario logueado.</p>;

  return (
    <div className="flex gap-6 container mx-auto">
      <ProfileSidebar active={activeSection} setActive={setActiveSection} />

      <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
        {activeSection === "home" && <ProfileHome user={user} />}
        {activeSection === "personal" && <PersonalData user={user} />}
        {activeSection === "subscription" && <Subscription user={user} />}
        {activeSection === "payments" && <Payments />}
      </div>
    </div>
  );
}
