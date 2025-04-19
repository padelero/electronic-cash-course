import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const UserCreateForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    id: "",
    email: "",
    name: "",
    role: "student",
    wallet_address: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/users/create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Usuario creado correctamente");
        setForm({
          id: "",
          email: "",
          name: "",
          role: "student",
          wallet_address: "",
        });
        if (onSuccess) onSuccess();
      } else {
        setMessage(data.message || "Error al crear usuario");
      }
    } catch (err) {
      setMessage("Error de red o del servidor");
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">Crear usuario</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ID (uuid):</label>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nombre:</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rol:</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="student">Estudiante</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Wallet Address:</label>
            <input
              name="wallet_address"
              value={form.wallet_address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <Button type="submit" className="w-full">
            Crear
          </Button>
          {message && (
            <div className="mt-2 text-center text-sm text-green-600">{message}</div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UserCreateForm;