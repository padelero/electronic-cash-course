import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { coursesService } from "@/services/courses.service";
import { Course, Module, Lesson } from "@/types";
import { mockCourses } from "@/data/mockData";

const CourseAdmin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Verificar si el usuario es administrador
  useEffect(() => {
    if (user && user.role !== "admin") {
      toast({
        title: "Acceso denegado",
        description: "Solo los administradores pueden acceder a esta página",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Cargar cursos
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        // En un entorno real, esto cargaría desde la API
        // const data = await coursesService.getAllCourses();
        // Por ahora usamos datos de prueba
        setCourses(mockCourses);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los cursos",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Obtener curso seleccionado
  const selectedCourse = selectedCourseId
    ? courses.find((c) => c.id === selectedCourseId)
    : null;

  // Obtener módulo seleccionado
  const selectedModule = selectedCourse && selectedModuleId
    ? selectedCourse.modules.find((m) => m.id === selectedModuleId)
    : null;

  // Inicializar un nuevo curso
  const initNewCourse = () => {
    setEditingCourse({
      id: "", // Se generará en el backend
      title: "",
      description: "",
      imageUrl: "",
      instructor: user?.name || "",
      price: 0,
      currency: "USD",
      modules: [],
      estimatedHours: 0,
      level: "beginner",
      tags: [],
      rewardThresholds: [{ percentage: 100, rewardAmount: 0 }],
    });
  };

  // Inicializar un nuevo módulo
  const initNewModule = () => {
    if (!selectedCourse) return;
    
    setEditingModule({
      id: "", // Se generará en el backend
      title: "",
      description: "",
      order: selectedCourse.modules.length + 1,
      lessons: [],
    });
  };

  // Inicializar una nueva lección
  const initNewLesson = () => {
    if (!selectedModule) return;
    
    setEditingLesson({
      id: "", // Se generará en el backend
      title: "",
      description: "",
      content: "",
      type: "text",
      order: selectedModule.lessons.length + 1,
      duration: 0,
      completed: false,
      resources: [],
    });
  };

  // Guardar curso
  const saveCourse = async () => {
    if (!editingCourse) return;

    try {
      // En un entorno real, esto guardaría en la API
      // const savedCourse = await coursesService.createCourse(editingCourse);
      
      // Simulamos la respuesta
      const savedCourse = {
        ...editingCourse,
        id: editingCourse.id || `new-${Date.now()}`,
      };

      setCourses(prev => {
        if (editingCourse.id) {
          // Actualizar curso existente
          return prev.map(c => c.id === editingCourse.id ? savedCourse : c);
        } else {
          // Agregar nuevo curso
          return [...prev, savedCourse];
        }
      });

      setEditingCourse(null);
      toast({
        title: "Éxito",
        description: "Curso guardado correctamente",
      });
    } catch (error) {
      console.error("Error al guardar curso:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el curso",
        variant: "destructive",
      });
    }
  };

  // Guardar módulo
  const saveModule = () => {
    if (!editingModule || !selectedCourse) return;

    try {
      const savedModule = {
        ...editingModule,
        id: editingModule.id || `module-${Date.now()}`,
      };

      setCourses(prev => {
        return prev.map(course => {
          if (course.id === selectedCourse.id) {
            const updatedModules = editingModule.id
              ? course.modules.map(m => m.id === editingModule.id ? savedModule : m)
              : [...course.modules, savedModule];
            
            return {
              ...course,
              modules: updatedModules,
            };
          }
          return course;
        });
      });

      setEditingModule(null);
      toast({
        title: "Éxito",
        description: "Módulo guardado correctamente",
      });
    } catch (error) {
      console.error("Error al guardar módulo:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el módulo",
        variant: "destructive",
      });
    }
  };

  // Guardar lección
  const saveLesson = () => {
    if (!editingLesson || !selectedCourse || !selectedModule) return;

    try {
      const savedLesson = {
        ...editingLesson,
        id: editingLesson.id || `lesson-${Date.now()}`,
      };

      setCourses(prev => {
        return prev.map(course => {
          if (course.id === selectedCourse.id) {
            const updatedModules = course.modules.map(module => {
              if (module.id === selectedModule.id) {
                const updatedLessons = editingLesson.id
                  ? module.lessons.map(l => l.id === editingLesson.id ? savedLesson : l)
                  : [...module.lessons, savedLesson];
                
                return {
                  ...module,
                  lessons: updatedLessons,
                };
              }
              return module;
            });
            
            return {
              ...course,
              modules: updatedModules,
            };
          }
          return course;
        });
      });

      setEditingLesson(null);
      toast({
        title: "Éxito",
        description: "Lección guardada correctamente",
      });
    } catch (error) {
      console.error("Error al guardar lección:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la lección",
        variant: "destructive",
      });
    }
  };

  // Eliminar curso
  const deleteCourse = async (courseId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      // En un entorno real, esto eliminaría en la API
      // await coursesService.deleteCourse(courseId);
      
      setCourses(prev => prev.filter(c => c.id !== courseId));
      setSelectedCourseId(null);
      toast({
        title: "Éxito",
        description: "Curso eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar curso:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el curso",
        variant: "destructive",
      });
    }
  };

  // Eliminar módulo
  const deleteModule = (moduleId: string) => {
    if (!selectedCourse) return;
    if (!confirm("¿Estás seguro de que deseas eliminar este módulo? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      setCourses(prev => {
        return prev.map(course => {
          if (course.id === selectedCourse.id) {
            return {
              ...course,
              modules: course.modules.filter(m => m.id !== moduleId),
            };
          }
          return course;
        });
      });
      setSelectedModuleId(null);
      toast({
        title: "Éxito",
        description: "Módulo eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar módulo:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el módulo",
        variant: "destructive",
      });
    }
  };

  // Eliminar lección
  const deleteLesson = (lessonId: string) => {
    if (!selectedCourse || !selectedModule) return;
    if (!confirm("¿Estás seguro de que deseas eliminar esta lección? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      setCourses(prev => {
        return prev.map(course => {
          if (course.id === selectedCourse.id) {
            const updatedModules = course.modules.map(module => {
              if (module.id === selectedModule.id) {
                return {
                  ...module,
                  lessons: module.lessons.filter(l => l.id !== lessonId),
                };
              }
              return module;
            });
            
            return {
              ...course,
              modules: updatedModules,
            };
          }
          return course;
        });
      });
      toast({
        title: "Éxito",
        description: "Lección eliminada correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar lección:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la lección",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-montserrat mb-2">Administración de Cursos</h1>
            <p className="text-muted-foreground">Gestiona los cursos, módulos y lecciones en formato Moodle</p>
          </div>
        </div>

        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid">
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="modules" disabled={!selectedCourse}>Módulos</TabsTrigger>
            <TabsTrigger value="lessons" disabled={!selectedModule}>Lecciones</TabsTrigger>
          </TabsList>
          
          {/* Pestaña de Cursos */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Lista de Cursos</h2>
              <Button 
                onClick={initNewCourse}
                className="bg-gradient-to-br from-bitcoin to-bitcoincash hover:opacity-90"
              >
                Nuevo Curso
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Cargando cursos...</div>
            ) : courses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Card 
                    key={course.id} 
                    className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${selectedCourseId === course.id ? 'ring-2 ring-bitcoin' : ''}`}
                    onClick={() => setSelectedCourseId(course.id)}
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={course.imageUrl || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute right-2 top-2">
                        <Badge className={course.level === 'beginner' ? "bg-bitcoincash" : course.level === 'intermediate' ? "bg-bitcoin" : "bg-primary"}>
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-montserrat font-semibold text-lg line-clamp-1">{course.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Por {course.instructor}</p>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{course.description}</p>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16.5 12"/></svg>
                          {course.estimatedHours} horas
                        </span>
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                          {course.modules.length} módulos
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between items-center">
                      <div className="font-semibold flex items-center">
                        {course.currency === 'BCH' ? (
                          <>
                            <span className="text-bitcoincash mr-1">₿</span>
                            {course.price}
                          </>
                        ) : (
                          <>
                            <span className="mr-1">$</span>
                            {course.price}
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCourse({...course});
                          }}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCourse(course.id);
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="mb-4">No hay cursos disponibles.</p>
                <Button 
                  onClick={initNewCourse}
                  className="bg-gradient-to-br from-bitcoin to-bitcoincash hover:opacity-90"
                >
                  Crear primer curso
                </Button>
              </div>
            )}

            {/* Formulario de edición/creación de curso */}
            {editingCourse && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>{editingCourse.id ? "Editar Curso" : "Nuevo Curso"}</CardTitle>
                  <CardDescription>Complete la información del curso</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Título</label>
                      <Input 
                        id="title" 
                        value={editingCourse.title} 
                        onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                        placeholder="Título del curso"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="instructor" className="text-sm font-medium">Instructor</label>
                      <Input 
                        id="instructor" 
                        value={editingCourse.instructor} 
                        onChange={(e) => setEditingCourse({...editingCourse, instructor: e.target.value})}
                        placeholder="Nombre del instructor"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Descripción</label>
                    <Textarea 
                      id="description" 
                      value={editingCourse.description} 
                      onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                      placeholder="Descripción del curso"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="imageUrl" className="text-sm font-medium">URL de Imagen</label>
                      <Input 
                        id="imageUrl" 
                        value={editingCourse.imageUrl} 
                        onChange={(e) => setEditingCourse({...editingCourse, imageUrl: e.target.value})}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium">Precio</label>
                      <Input 
                        id="price" 
                        type="number" 
                        value={editingCourse.price.toString()} 
                        onChange={(e) => setEditingCourse({...editingCourse, price: parseFloat(e.target.value) || 0})}
                        placeholder="99.99"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="currency" className="text-sm font-medium">Moneda</label>
                      <Select 
                        value={editingCourse.currency} 
                        onValueChange={(value: 'USD' | 'BCH') => setEditingCourse({...editingCourse, currency: value})}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Seleccionar moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="BCH">BCH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="level" className="text-sm font-medium">Nivel</label>
                      <Select 
                        value={editingCourse.level} 
                        onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                          setEditingCourse({...editingCourse, level: value})}
                      >
                        <SelectTrigger id="level">
                          <SelectValue placeholder="Seleccionar nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Principiante</SelectItem>
                          <SelectItem value="intermediate">Intermedio</SelectItem>
                          <SelectItem value="advanced">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="estimatedHours" className="text-sm font-medium">Horas Estimadas</label>
                      <Input 
                        id="estimatedHours" 
                        type="number" 
                        value={editingCourse.estimatedHours.toString()} 
                        onChange={(e) => setEditingCourse({...editingCourse, estimatedHours: parseInt(e.target.value) || 0})}
                        placeholder="10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">Etiquetas (separadas por comas)</label>
                    <Input 
                      id="tags" 
                      value={editingCourse.tags.join(", ")} 
                      onChange={(e) => setEditingCourse({
                        ...editingCourse, 
                        tags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean)
                      })}
                      placeholder="Bitcoin, Blockchain, Cryptocurrency"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setEditingCourse(null)}>Cancelar</Button>
                  <Button onClick={saveCourse}>Guardar</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          {/* Pestaña de Módulos */}
          <TabsContent value="modules" className="space-y-6">
            {selectedCourse && (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedCourse.title}</h2>
                    <p className="text-muted-foreground">Módulos del curso</p>
                  </div>
                  <Button 
                    onClick={initNewModule}
                    className="bg-gradient-to-br from-bitcoin to-bitcoincash hover:opacity-90"
                  >
                    Nuevo Módulo
                  </Button>
                </div>

                {selectedCourse.modules.length > 0 ? (
                  <div className="space-y-4">
                    {selectedCourse.modules.map((module) => (
                      <Card 
                        key={module.id} 
                        className={`transition-all hover:shadow-md cursor-pointer ${selectedModuleId === module.id ? 'ring-2 ring-bitcoin' : ''}`}
                        onClick={() => setSelectedModuleId(module.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">{module.title}</h3>
                            <Badge>{module.lessons.length} lecciones</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingModule({...module});
                            }}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteModule(module.id);
                            }}
                          >
                            Eliminar
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="mb-4">Este curso no tiene módulos.</p>
                    <Button 
                      onClick={initNewModule}
                      className="bg-gradient-to-br from-bitcoin to-bitcoincash hover:opacity-90"
                    >
                      Crear primer módulo
                    </Button>
                  </div>
                )}

                {/* Formulario de edición/creación de módulo */}
                {editingModule && (
                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>{editingModule.id ? "Editar Módulo" : "Nuevo Módulo"}</CardTitle>
                      <CardDescription>Complete la información del módulo</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="moduleTitle" className="text-sm font-medium">Título</label>
                        <Input 
                          id="moduleTitle" 
                          value={editingModule.title} 
                          onChange={(e) => setEditingModule({...editingModule, title: e.target.value})}
                          placeholder="Título del módulo"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="moduleDescription" className="text-sm font-medium">Descripción</label>
                        <Textarea 
                          id="moduleDescription" 
                          value={editingModule.description} 
                          onChange={(e) => setEditingModule({...editingModule, description: e.target.value})}
                          placeholder="Descripción del módulo"
                          rows={3}