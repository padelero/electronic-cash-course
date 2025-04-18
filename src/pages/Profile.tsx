import { UserProfile } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";

const Profile = () => (
  <div className="min-h-screen flex flex-col bg-muted/30">
    <Navbar />
    <div className="container mx-auto py-8 px-4 flex-grow">
      <h1 className="text-3xl font-bold font-montserrat mb-6">Mi Perfil</h1>
      <div className="bg-background rounded-lg shadow-sm border p-4">
        <UserProfile />
      </div>
    </div>
  </div>
);

export default Profile;