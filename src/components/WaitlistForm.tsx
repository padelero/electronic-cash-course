
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí normalmente enviaríamos la solicitud a un API, 
      // pero por ahora simularemos un retraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulamos una respuesta exitosa
      console.log('Waitlist submission:', { email, name });
      toast({
        title: "¡Registro exitoso!",
        description: "Te has unido a nuestra lista de espera. Pronto recibirás noticias.",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast({
        title: "Error al registrarse",
        description: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-bitcoin/10 to-bitcoincash/10 rounded-xl p-8 text-center">
        <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Gracias por unirte!</h3>
        <p className="text-gray-600 mb-4">
          Te hemos añadido a nuestra lista de espera. Te notificaremos cuando los cursos estén disponibles.
        </p>
        <p className="text-sm text-gray-500">
          No olvides revisar tu email para confirmar tu registro.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-bitcoin/10 to-bitcoincash/10 rounded-xl p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
          Sé el primero en acceder a nuestros cursos premium
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Únete a nuestra lista de espera y consigue acceso anticipado + 20% de descuento en el lanzamiento
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-2">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            Contenido exclusivo
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            Acceso prioritario
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            Ofertas especiales
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <Input 
              type="text" 
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border-gray-300 focus:ring-bitcoin focus:border-bitcoin"
            />
          </div>
          <div>
            <Input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-gray-300 focus:ring-bitcoin focus:border-bitcoin"
            />
          </div>
          <div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-bitcoin to-bitcoincash text-white hover:opacity-90 py-3 font-medium text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </>
              ) : (
                'Reserva tu plaza'
              )}
            </Button>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Más de 500 personas ya en lista de espera
        </p>
        <p className="mt-1 text-center text-xs text-gray-400">
          No compartiremos tu información con terceros.
        </p>
      </form>
    </div>
  );
};
