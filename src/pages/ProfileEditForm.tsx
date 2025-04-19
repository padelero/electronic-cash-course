import { useState } from "react";
import { toast } from "@/hooks/use-toast";

type ProfileEditFormProps = {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
    walletAddress?: string;
  };
};

const ProfileEditForm = ({ user }: ProfileEditFormProps) => {
  const [name, setName] = useState(user.name || "");
  const [walletAddress, setWalletAddress] = useState(user.walletAddress || "");
  const [role, setRole] = useState(user.role || "estudiante");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/users/sync.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name,
          wallet_address: walletAddress,
          role,
        }),
      });
      if (!res.ok) throw new Error("Error al actualizar el perfil");
      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido actualizados correctamente.",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Dirección de Wallet</label>
        <input
          type="text"
          value={walletAddress}
          onChange={e => setWalletAddress(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {user.role && (
        <div>
          <label className="block text-sm font-medium mb-1">Rol</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={user.role === "admin"}
          >
            <option value="estudiante">Estudiante</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Administrador</option>
          </select>
          {user.role === "admin" && (
            <p className="text-xs text-gray-500 mt-1">No puedes cambiar tu propio rol de administrador.</p>
          )}
        </div>
      )}
      <button
        type="submit"
        className="bg-bitcoin text-white px-4 py-2 rounded hover:bg-bitcoin/90 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
};

export default ProfileEditForm;