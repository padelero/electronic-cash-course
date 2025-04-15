
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { API_CONFIG, DB_CONFIG } from "../config/api.config";

export function DatabaseStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      // Hacemos una llamada al endpoint status para verificar la conexión
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATUS}`);
      
      if (response.ok) {
        const data = await response.json();
        setIsConnected(data.connected);
        toast({
          title: data.connected ? "Conexión exitosa" : "Conexión fallida",
          description: data.message,
          variant: data.connected ? "default" : "destructive",
        });
      } else {
        setIsConnected(false);
        toast({
          title: "Error de conexión",
          description: "No se pudo verificar la conexión con la base de datos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error al verificar la conexión:", error);
      setIsConnected(false);
      toast({
        title: "Error de conexión",
        description: "Error al intentar conectar con el servidor",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="mb-6 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Estado de la base de datos MySQL</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <div 
          className={`h-3 w-3 rounded-full ${
            isConnected === null ? 'bg-gray-400' : 
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span>
          {isConnected === null ? 'Verificando conexión...' : 
           isConnected ? 'Conectado a MySQL' : 'Desconectado'}
        </span>
      </div>
      
      {!isConnected && isConnected !== null && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error de conexión</AlertTitle>
          <AlertDescription>
            No se pudo establecer conexión con la base de datos MySQL. Verifica la configuración y los parámetros de conexión.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mt-4">
        <Button 
          onClick={checkConnection}
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? 'Verificando...' : 'Verificar conexión'}
        </Button>
        <div className="mt-2 text-sm text-gray-500">
          Conexión a: {DB_CONFIG.HOST}:{DB_CONFIG.PORT}
        </div>
      </div>
    </div>
  );
}
