import { UserProfile } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileEditForm from "./ProfileEditForm";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetch("/api/users/sync.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          wallet_address: user.walletAddress || null,
        }),
      });
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold font-montserrat mb-6">Mi Perfil</h1>
        <div className="bg-background rounded-lg shadow-sm border p-4 mb-6">
          <UserProfile />
        </div>
        {user && (
          <div className="bg-background rounded-lg shadow-sm border p-4 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Editar información adicional</h2>
            <ProfileEditForm user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;