"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  Award,
  Search,
  Bell
} from 'lucide-react';

// Define types
interface SubMenuItem {
  id: string;
  title: string;
  route: string;
  icon: React.ReactElement;
  description: string;
}

interface MenuItem {
  id: string;
  title: string;
  route?: string;
  icon: React.ReactElement;
  description: string;
  submenu?: SubMenuItem[];
}

interface Progress {
  teoria: boolean;
  ejercicios: boolean;
}

interface ProgressMap {
  [key: string]: Progress;
}

interface ResponsiveMenuProps {
  currentRoute?: string;
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({ currentRoute }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Usar el pathname real si no se proporciona currentRoute
  const currentPath = currentRoute || pathname?.split('/').pop() || 'indice';

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

  const menuItems: MenuItem[] = [
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

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (itemId: string): void => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleNavigation = (route: string): void => {
    router.push(`/${route}`);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (route: string): boolean => {
    return currentPath === route;
  };

  const getDayProgress = (dayId: string): Progress => {
    // Lógica mejorada para calcular progreso desde localStorage
    const savedProgress = localStorage.getItem(`progress_${dayId}`);
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
    
    const defaultProgress: ProgressMap = {
      dia1: { teoria: true, ejercicios: false },
      dia2: { teoria: false, ejercicios: false },
      dia3: { teoria: false, ejercicios: false },
      dia4: { teoria: false, ejercicios: false }
    };

    return defaultProgress[dayId] || { teoria: false, ejercicios: false };
  };

  const getOverallProgress = (): number => {
    let completed = 0;
    let total = 0;
    
    menuItems.forEach(item => {
      if (item.submenu) {
        const progress = getDayProgress(item.id);
        total += 2; // teoría + ejercicios
        if (progress.teoria) completed++;
        if (progress.ejercicios) completed++;
      }
    });
    
    return Math.round((completed / total) * 100);
  };

  // Filtrar items para búsqueda
  const getFilteredItems = () => {
    if (!searchTerm) return menuItems;
    
    return menuItems.filter(item => {
      const matchesTitle = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDescription = item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubmenu = item.submenu?.some(sub => 
        sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return matchesTitle || matchesDescription || matchesSubmenu;
    });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-sm">
                <FileText className="text-white" size={24} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">Tutoría HTML & CSS</h1>
                <p className="text-xs text-white/80">4 días • 12 horas • {getOverallProgress()}% completado</p>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <Search size={20} />
              </button>
              {showSearch && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4">
                  <input
                    type="text"
                    placeholder="Buscar contenido..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  {searchTerm && (
                    <div className="mt-2 max-h-60 overflow-y-auto">
                      {getFilteredItems().map(item => (
                        <div key={item.id} className="py-1">
                          {item.route ? (
                            <button
                              onClick={() => {
                                handleNavigation(item.route!);
                                setShowSearch(false);
                                setSearchTerm('');
                              }}
                              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                            >
                              {item.title}
                            </button>
                          ) : item.submenu?.map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                handleNavigation(sub.route);
                                setShowSearch(false);
                                setSearchTerm('');
                              }}
                              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                            >
                              {item.title} - {sub.title}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <div key={item.id} className="relative group">
                  {item.submenu ? (
                    <div className="relative">
                      <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                        {item.icon}
                        {item.title}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                      
                      {/* Dropdown mejorado */}
                      <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-2">
                          <div className="px-3 py-3 border-b border-gray-200">
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-600">{item.description}</p>
                            <div className="mt-2 flex items-center gap-2">
                              {getDayProgress(item.id).teoria && <CheckCircle size={12} className="text-green-500" />}
                              {getDayProgress(item.id).ejercicios && <Target size={12} className="text-blue-500" />}
                              <span className="text-xs text-gray-500">
                                Progreso: {getDayProgress(item.id).teoria && getDayProgress(item.id).ejercicios ? 'Completo' : 'En progreso'}
                              </span>
                            </div>
                          </div>
                          
                          {item.submenu.map((subItem) => {
                            const progress = getDayProgress(item.id);
                            const isCompleted = subItem.id.includes('ejercicio') ? 
                              progress.ejercicios : progress.teoria;
                            
                            return (
                              <button
                                key={subItem.id}
                                onClick={() => handleNavigation(subItem.route)}
                                className={`w-full text-left px-3 py-3 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                                  isActive(subItem.route) ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600' : 'text-gray-700'
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
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => item.route && handleNavigation(item.route)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.route && isActive(item.route)
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
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
              className="bg-white/20 backdrop-blur-sm inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/30 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu mejorado */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t">
          {/* Search móvil */}
          <div className="px-4 py-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-96 overflow-y-auto">
            {getFilteredItems().map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
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
                      <div className="pl-4 space-y-1 bg-gray-50 rounded-lg ml-2 mr-2">
                        {item.submenu.map((subItem) => {
                          const progress = getDayProgress(item.id);
                          const isCompleted = subItem.id.includes('ejercicio') ? 
                            progress.ejercicios : progress.teoria;
                          
                          return (
                            <button
                              key={subItem.id}
                              onClick={() => handleNavigation(subItem.route)}
                              className={`w-full text-left px-3 py-3 rounded-md text-sm hover:bg-white transition-colors flex items-center gap-3 ${
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
                    onClick={() => item.route && handleNavigation(item.route)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      item.route && isActive(item.route)
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
          
          {/* Footer del menú móvil mejorado */}
          <div className="border-t bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award size={16} />
                <span>Progreso: {getOverallProgress()}%</span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getOverallProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveMenu;