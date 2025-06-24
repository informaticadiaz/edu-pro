import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  BookOpen, 
  Target, 
  ChevronDown,
  Home,
  FileText,
  CheckCircle,
  Calendar,
  Award
} from 'lucide-react';

const ResponsiveMenu = ({ currentRoute = 'indice' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Cerrar menú al hacer scroll en móvil
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Cerrar menú al redimensionar ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      id: 'indice',
      title: 'Inicio',
      route: 'indice',
      icon: <Home size={18} />,
      description: 'Temario general del curso'
    },
    {
      id: 'dia1',
      title: 'Día 1',
      icon: <Calendar size={18} />,
      description: 'Fundamentos de HTML',
      submenu: [
        {
          id: 'dia-uno',
          title: 'Contenido del Día 1',
          route: 'dia-uno',
          icon: <BookOpen size={16} />,
          description: 'Teoría y ejemplos'
        },
        {
          id: 'ejercicio-uno',
          title: 'Ejercicios Día 1',
          route: 'ejercicio-uno',
          icon: <Target size={16} />,
          description: 'Práctica y evaluación'
        }
      ]
    },
    {
      id: 'dia2',
      title: 'Día 2',
      icon: <Calendar size={18} />,
      description: 'HTML Avanzado e Introducción a CSS',
      submenu: [
        {
          id: 'dia-dos',
          title: 'Contenido del Día 2',
          route: 'dia-dos',
          icon: <BookOpen size={16} />,
          description: 'Formularios, multimedia y CSS básico'
        },
        {
          id: 'ejercicio-dos',
          title: 'Ejercicios Día 2',
          route: 'ejercicio-dos',
          icon: <Target size={16} />,
          description: 'Práctica con formularios y CSS'
        }
      ]
    },
    {
      id: 'dia3',
      title: 'Día 3',
      icon: <Calendar size={18} />,
      description: 'CSS Intermedio',
      submenu: [
        {
          id: 'dia-tres',
          title: 'Contenido del Día 3',
          route: 'dia-tres',
          icon: <BookOpen size={16} />,
          description: 'Selectores, modelo de caja, tipografía'
        },
        {
          id: 'ejercicio-tres',
          title: 'Ejercicios Día 3',
          route: 'ejercicio-tres',
          icon: <Target size={16} />,
          description: 'Práctica con CSS avanzado'
        }
      ]
    },
    {
      id: 'dia4',
      title: 'Día 4',
      icon: <Calendar size={18} />,
      description: 'CSS Avanzado y Proyecto Final',
      submenu: [
        {
          id: 'dia-cuatro',
          title: 'Contenido del Día 4',
          route: 'dia-cuatro',
          icon: <BookOpen size={16} />,
          description: 'Flexbox, Grid y responsive design'
        },
        {
          id: 'ejercicio-cuatro',
          title: 'Ejercicios Día 4',
          route: 'ejercicio-cuatro',
          icon: <Target size={16} />,
          description: 'Evaluación final del curso'
        }
      ]
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleNavigation = (route) => {
    // Aquí iría tu lógica de navegación (React Router, Next.js, etc.)
    console.log(`Navegando a: ${route}`);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (route) => {
    return currentRoute === route;
  };

  const getDayProgress = (dayId) => {
    // Lógica para calcular progreso (ejemplo)
    const progress = {
      dia1: { teoria: true, ejercicios: false },
      dia2: { teoria: false, ejercicios: false },
      dia3: { teoria: false, ejercicios: false },
      dia4: { teoria: false, ejercicios: false }
    };

    return progress[dayId] || { teoria: false, ejercicios: false };
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="text-white" size={24} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">Tutoría HTML & CSS</h1>
                <p className="text-xs text-gray-600">4 días • 12 horas</p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <div key={item.id} className="relative group">
                  {item.submenu ? (
                    <div className="relative">
                      <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        {item.icon}
                        {item.title}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                      
                      {/* Dropdown */}
                      <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-2">
                          <div className="px-3 py-2 border-b">
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-600">{item.description}</p>
                          </div>
                          
                          {item.submenu.map((subItem) => {
                            const progress = getDayProgress(item.id);
                            const isCompleted = subItem.id.includes('ejercicio') ? 
                              progress.ejercicios : progress.teoria;
                            
                            return (
                              <button
                                key={subItem.id}
                                onClick={() => handleNavigation(subItem.route)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                                  isActive(subItem.route) ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600' : 'text-gray-700'
                                }`}
                              >
                                <div className="flex-shrink-0">
                                  {item.icon}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{subItem.title}</p>
                                  <p className="text-xs text-gray-500">{subItem.description}</p>
                                </div>
                                {isCompleted && (
                                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item.route)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.route)
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-200 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-screen overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <div className="text-left">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {activeDropdown === item.id && (
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => {
                          const progress = getDayProgress(item.id);
                          const isCompleted = subItem.id.includes('ejercicio') ? 
                            progress.ejercicios : progress.teoria;
                          
                          return (
                            <button
                              key={subItem.id}
                              onClick={() => handleNavigation(subItem.route)}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                                isActive(subItem.route) ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600' : 'text-gray-600'
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {subItem.icon}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{subItem.title}</p>
                                <p className="text-xs text-gray-500">{subItem.description}</p>
                              </div>
                              {isCompleted && (
                                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.route)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.route)
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.icon}
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Footer del menú móvil */}
          <div className="border-t bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award size={16} />
              <span>Progreso del curso: 25%</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveMenu;