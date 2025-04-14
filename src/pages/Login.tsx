
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="fixed inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80')] bg-cover bg-center bg-no-repeat opacity-10"></div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto h-10 w-10 rounded-full bg-gradient-to-br from-bitcoin to-bitcoincash flex items-center justify-center text-white font-bold text-sm mb-4">
            CL
          </div>
          <CardTitle className="text-2xl font-bold">Bienvenido de nuevo</CardTitle>
          <CardDescription>
            Introduce tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignIn 
            routing="path" 
            path="/login" 
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full mx-auto",
                card: "shadow-none w-full !bg-transparent border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                formFieldInput: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                formButtonPrimary: "bg-bitcoin hover:bg-bitcoin/90 text-primary-foreground rounded-md px-4 py-2 w-full",
                footerAction: "hidden"
              },
              variables: {
                colorPrimary: "#f7931a",
                borderRadius: "0.25rem"
              }
            }}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="underline text-primary hover:text-primary/80">
              Regístrate
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <Link to="/terms" className="underline hover:text-primary">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link to="/privacy" className="underline hover:text-primary">
              Política de Privacidad
            </Link>.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
