"use client"
import React, { useState } from 'react';
import { 
  Clock, 
  Target, 
  CheckCircle, 
  BookOpen, 
  Code, 
  Palette, 
  Layout, 
  Grid,
  Smartphone,
  Trophy,
  Star,
  Users,
  Calendar,
  PlayCircle,
  FileText,
  Award,
  ChevronRight,
  Monitor,
  Zap
} from 'lucide-react';

const TutoriaHTMLCSSPage = () => {
  const [diaExpandido, setDiaExpandido] = useState(null);

  const toggleDia = (diaId) => {
    setDiaExpandido(diaExpandido === diaId ? null : diaId);
  };

  const diasCurso = [
    {
      id: 1,
      titulo: "Fundamentos de HTML",
      duracion: "3 horas",
      dificultad: "Principiante",
      icon: <FileText size={24} />,
      color: "from-blue-600 to-purple-600",
      descripcion: "Aprende la estructura básica de HTML y crea tu primera página web",
      temas: [
        "Introducción y conceptos básicos",
        "Elementos fundamentales (encabezados, párrafos, enlaces, imágenes)",
        "Estructura y organización (listas, div, span, elementos semánticos)",
        "Práctica: Página personal básica"
      ],
      objetivos: "Crear una página web funcional con HTML semántico",
      ejercicios: 10,
      completado: false
    },
    {
      id: 2,
      titulo: "HTML Avanzado e Introducción a CSS",
      duracion: "3 horas",
      dificultad: "Principiante-Intermedio",
      icon: <Palette size={24} />,
      color: "from-purple-600 to-pink-600",
      descripcion: "Domina HTML semántico y aplica tus primeros estilos con CSS",
      temas: [
        "HTML semántico y formularios completos",
        "Multimedia y elementos avanzados",
        "Introducción a CSS (selectores, propiedades básicas)",
        "Práctica: Formulario de contacto estilizado"
      ],
      objetivos: "Crear formularios funcionales y aplicar estilos básicos",
      ejercicios: 15,
      completado: false
    },
    {
      id: 3,
      titulo: "CSS Intermedio",
      duracion: "3 horas",
      dificultad: "Intermedio",
      icon: <Code size={24} />,
      color: "from-indigo-600 to-purple-600",
      descripcion: "Domina el control preciso del diseño y layout",
      temas: [
        "Selectores avanzados y especificidad",
        "Modelo de caja y posicionamiento",
        "Tipografía web y sistema de colores",
        "Práctica: Página personal mejorada"
      ],
      objetivos: "Controlar precisamente el diseño y crear efectos visuales",
      ejercicios: 20,
      completado: false
    },
    {
      id: 4,
      titulo: "CSS Avanzado y Proyecto Final",
      duracion: "3 horas",
      dificultad: "Intermedio-Avanzado",
      icon: <Layout size={24} />,
      color: "from-emerald-600 to-blue-600",
      descripcion: "Crea layouts modernos y completa tu portfolio profesional",
      temas: [
        "Flexbox para layouts unidimensionales",
        "CSS Grid y responsive design",
        "Proyecto final: Portfolio completo",
        "Mejores prácticas y optimización"
      ],
      objetivos: "Crear un sitio web profesional y completamente responsive",
      ejercicios: 20,
      completado: false
    }
  ];

  const estadisticasCurso = {
    duracionTotal: "12 horas",
    ejercicios: 65,
    proyectos: 4,
    certificacion: true
  };

  const tecnologias = [
    { nombre: "HTML5", icon: <FileText size={20} />, color: "text-orange-600" },
    { nombre: "CSS3", icon: <Palette size={20} />, color: "text-blue-600" },
    { nombre: "Flexbox", icon: <Layout size={20} />, color: "text-purple-600" },
    { nombre: "CSS Grid", icon: <Grid size={20} />, color: "text-green-600" },
    { nombre: "Responsive", icon: <Smartphone size={20} />, color: "text-pink-600" }
  ];

  const beneficios = [
    {
      icon: <Trophy size={24} />,
      titulo: "Proyecto Real",
      descripcion: "Construye un portfolio profesional que puedes usar para mostrar tus habilidades"
    },
    {
      icon: <Zap size={24} />,
      titulo: "Aprendizaje Práctico",
      descripcion: "Más de 65 ejercicios interactivos para reforzar cada concepto aprendido"
    },
    {
      icon: <Monitor size={24} />,
      titulo: "Diseño Responsive",
      descripcion: "Aprende a crear sitios que se adapten perfectamente a cualquier dispositivo"
    },
    {
      icon: <Award size={24} />,
      titulo: "Base Sólida",
      descripcion: "Fundamentos necesarios para continuar con JavaScript y frameworks modernos"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Code className="text-white" size={24} />
                </div>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  Curso Intensivo
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Tutoría HTML & CSS
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 text-white text-opacity-90">
                Aprende a crear sitios web modernos y profesionales desde cero en solo 4 días
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <Clock size={20} />
                  <span>{estadisticasCurso.duracionTotal}</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <Target size={20} />
                  <span>{estadisticasCurso.ejercicios} ejercicios</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <Trophy size={20} />
                  <span>Certificación</span>
                </div>
              </div>
              
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                <PlayCircle size={24} />
                Comenzar Ahora
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Lo que aprenderás</h3>
                <div className="grid grid-cols-2 gap-4">
                  {tecnologias.map((tech, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white bg-opacity-20 p-3 rounded-lg">
                      <div className={tech.color}>
                        {tech.icon}
                      </div>
                      <span className="font-medium">{tech.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir este curso?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un enfoque práctico y estructurado para dominar las tecnologías fundamentales del desarrollo web
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-purple-600">
                    {beneficio.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {beneficio.titulo}
                </h3>
                <p className="text-gray-600">
                  {beneficio.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temario Detallado */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Temario del Curso
            </h2>
            <p className="text-lg text-gray-600">
              4 días intensivos para convertirte en desarrollador web frontend
            </p>
          </div>
          
          <div className="space-y-6">
            {diasCurso.map((dia) => (
              <div key={dia.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleDia(dia.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-r ${dia.color} p-3 rounded-lg text-white`}>
                        {dia.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-gray-800">
                            Día {dia.id}: {dia.titulo}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            dia.dificultad === 'Principiante' ? 'bg-green-100 text-green-800' :
                            dia.dificultad.includes('Intermedio') ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {dia.dificultad}
                          </span>
                        </div>
                        <p className="text-gray-600">{dia.descripcion}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {dia.duracion}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target size={16} />
                            {dia.ejercicios} ejercicios
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight 
                      size={24} 
                      className={`transition-transform duration-200 ${
                        diaExpandido === dia.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>
                
                {diaExpandido === dia.id && (
                  <div className="px-6 pb-6 border-t">
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <BookOpen size={18} />
                          Temas del día
                        </h4>
                        <ul className="space-y-2">
                          {dia.temas.map((tema, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{tema}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Target size={18} />
                          Objetivo del día
                        </h4>
                        <p className="text-gray-600 mb-4">{dia.objetivos}</p>
                        
                        <div className="flex gap-3">
                          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <BookOpen size={16} />
                            Ver Contenido
                          </button>
                          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <Code size={16} />
                            Ejercicios
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas del Curso */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Estadísticas del Curso</h2>
              <p className="text-lg text-white text-opacity-90">
                Un curso completo y estructurado para tu éxito
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <Clock size={32} className="mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-sm text-white text-opacity-80">Horas de contenido</div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <Target size={32} className="mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">65</div>
                <div className="text-sm text-white text-opacity-80">Ejercicios prácticos</div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <Trophy size={32} className="mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">4</div>
                <div className="text-sm text-white text-opacity-80">Proyectos reales</div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <Award size={32} className="mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-sm text-white text-opacity-80">Enfoque práctico</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Metodología de Aprendizaje
            </h2>
            <p className="text-lg text-gray-600">
              Aprendizaje práctico con resultados inmediatos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Teoría Práctica</h3>
              <p className="text-gray-600">
                Conceptos explicados de forma clara con ejemplos reales y código funcional
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Práctica Inmediata</h3>
              <p className="text-gray-600">
                Ejercicios interactivos después de cada tema para reforzar el aprendizaje
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Proyecto Final</h3>
              <p className="text-gray-600">
                Construye un portfolio profesional que demuestre todas tus nuevas habilidades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar tu carrera en desarrollo web?
          </h2>
          <p className="text-lg mb-8 text-white text-opacity-90">
            Únete a miles de estudiantes que ya están creando sitios web profesionales
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
            <PlayCircle size={24} />
            Comenzar Curso Ahora
          </button>
          
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-white text-opacity-80">
            <span className="flex items-center gap-1">
              <CheckCircle size={16} />
              Sin requisitos previos
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle size={16} />
              Acceso de por vida
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle size={16} />
              Certificado incluido
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutoriaHTMLCSSPage;