
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Rewards = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-montserrat text-3xl md:text-5xl font-bold mb-6">
              Programa de Recompensas
            </h1>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-700">
              Aprende sobre criptomonedas y blockchain mientras ganas Bitcoin Cash por completar cursos y actividades.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-bitcoin/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bitcoin"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34"></path><path d="M14 3h7v7"></path><path d="M21 3 9 15"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Completa Cursos</h3>
                <p className="text-gray-600">
                  Gana Bitcoin Cash cada vez que completes un curso o módulo en nuestra plataforma.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-bitcoin/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bitcoin"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path><circle cx="17" cy="7" r="5"></circle></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Invita Amigos</h3>
                <p className="text-gray-600">
                  Recibe recompensas por cada amigo que invites y se una a nuestra comunidad de aprendizaje.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-bitcoin/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bitcoin"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Participa en Retos</h3>
                <p className="text-gray-600">
                  Completa retos especiales y concursos para ganar recompensas adicionales.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-bitcoin/10 to-bitcoincash/10 p-8 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Programa en desarrollo</h3>
              <p className="mb-6">
                Estamos perfeccionando nuestro programa de recompensas. Únete a nuestra lista de espera para ser de los primeros en aprovecharlo.
              </p>
              <Button 
                className="bg-bitcoin hover:bg-bitcoin/90 text-white font-medium px-6 py-3 rounded-md text-lg"
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              >
                Unirse a la lista de espera
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#1A1F2C] text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} CryptoLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Rewards;
