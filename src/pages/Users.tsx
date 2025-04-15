
import { useState, useEffect } from 'react';
import { usersService } from '@/services/users.service';
import { User } from '@/types';
import { Navbar } from '@/components/Navbar';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from '@/hooks/use-toast';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los usuarios',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Calcular usuarios paginados
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Listado de Usuarios</CardTitle>
            <Button 
              onClick={loadUsers}
              className="bg-gradient-to-br from-bitcoin to-bitcoincash hover:opacity-90"
            >
              Actualizar
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Cargando usuarios...</div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Dirección de Wallet</TableHead>
                      <TableHead>Fecha de Creación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id.substring(0, 8)}...</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-red-100 text-red-800' 
                                : user.role === 'instructor' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role === 'admin' 
                                ? 'Administrador' 
                                : user.role === 'instructor' 
                                ? 'Instructor' 
                                : 'Estudiante'}
                            </span>
                          </TableCell>
                          <TableCell>{user.walletAddress ? `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}` : 'No asignada'}</TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No hay usuarios para mostrar
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                
                {users.length > usersPerPage && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && paginate(currentPage - 1)} 
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
