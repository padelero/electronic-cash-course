
import { Waitlist } from "@clerk/clerk-react";

export const ClerkWaitlist = () => {
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

      <div className="max-w-md mx-auto">
        <Waitlist 
          appearance={{
            elements: {
              formButtonPrimary: "w-full bg-gradient-to-r from-bitcoin to-bitcoincash text-white hover:opacity-90 py-3 font-medium text-lg",
              formFieldInput: "w-full border-gray-300 focus:ring-bitcoin focus:border-bitcoin"
            },
            variables: {
              colorPrimary: "#f7931a",
              colorTextOnPrimaryBackground: "white"
            }
          }}
        />
        <p className="mt-4 text-center text-sm text-gray-500">
          Más de 500 personas ya en lista de espera
        </p>
        <p className="mt-1 text-center text-xs text-gray-400">
          No compartiremos tu información con terceros.
        </p>
      </div>
    </div>
  );
};
