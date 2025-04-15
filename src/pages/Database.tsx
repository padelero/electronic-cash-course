
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { DatabaseStatus } from "@/components/DatabaseStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function Database() {
  const [formData, setFormData] = useState({
    host: '127.0.0.1',
    port: '3306',
    username: 'u877712588_crypto',
    password: '',
    database: 'u877712588_crypto'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectionResult, setConnectionResult] = useState<{success: boolean, message: string} | null>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveConfiguration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Aquí enviaríamos los datos a tu backend para guardar la configuración
      // Simulamos una respuesta exitosa
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionResult({
        success: true,
        message: "Configuración guardada correctamente. Puedes verificar la conexión ahora."
      });
      
      toast({
        title: "Configuración guardada",
        description: "Los datos de conexión han sido guardados correctamente.",
      });
    } catch (error) {
      setConnectionResult({
        success: false,
        message: "Error al guardar la configuración."
      });
      
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Configuración de Base de Datos MySQL</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <DatabaseStatus />
            
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Conexión MySQL</CardTitle>
                <CardDescription>
                  Ingresa los detalles de tu conexión a la base de datos MySQL.
                </CardDescription>
              </CardHeader>
              <form onSubmit={saveConfiguration}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="host">Host</Label>
                    <Input 
                      id="host" 
                      name="host"
                      value={formData.host}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="port">Puerto</Label>
                    <Input 
                      id="port" 
                      name="port"
                      value={formData.port}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Usuario</Label>
                    <Input 
                      id="username" 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Ingresa la contraseña"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="database">Base de Datos</Label>
                    <Input 
                      id="database" 
                      name="database"
                      value={formData.database}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {connectionResult && (
                    <Alert variant={connectionResult.success ? "default" : "destructive"}>
                      <AlertTitle>{connectionResult.success ? "Éxito" : "Error"}</AlertTitle>
                      <AlertDescription>
                        {connectionResult.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-bitcoin to-bitcoincash text-white hover:opacity-90"
                  >
                    {isSubmitting ? "Guardando..." : "Guardar configuración"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Información sobre la conexión MySQL</CardTitle>
                <CardDescription>
                  Guía para configurar y conectar tu aplicación a una base de datos MySQL.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Requisitos para la conexión</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Servidor MySQL activo y accesible</li>
                      <li>Usuario con permisos adecuados</li>
                      <li>Base de datos creada</li>
                      <li>Firewall configurado para permitir conexiones</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Seguridad</h3>
                    <p className="text-sm">
                      Recomendamos usar un usuario con permisos limitados para la conexión 
                      desde la aplicación. Nunca uses el usuario root para conexiones desde aplicaciones.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Estructura actual de la base de datos</h3>
                    <p className="text-sm">
                      Esta interfaz muestra la configuración de conexión a la base de datos.
                      Para gestionar la estructura (tablas, campos, etc.), debes usar una herramienta
                      como phpMyAdmin, MySQL Workbench o similares.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Instrucciones para el Backend</CardTitle>
                <CardDescription>
                  Cómo implementar el backend para la conexión MySQL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                  <p className="font-mono text-sm">
                    # Instala las dependencias necesarias<br/>
                    npm install express mysql2 cors dotenv<br/><br/>
                    
                    # Crea un archivo .env para las variables de entorno<br/>
                    DB_HOST=127.0.0.1<br/>
                    DB_PORT=3306<br/>
                    DB_USER=u877712588_crypto<br/>
                    DB_PASSWORD=tu_contraseña<br/>
                    DB_NAME=u877712588_crypto<br/><br/>
                    
                    # Configura tu servidor Express<br/>
                    const express = require('express');<br/>
                    const mysql = require('mysql2/promise');<br/>
                    const app = express();<br/><br/>
                    
                    # Crea pool de conexiones MySQL<br/>
                    const pool = mysql.createPool({'{'}...<br/>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
