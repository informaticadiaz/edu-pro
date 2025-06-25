"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Target, CheckCircle, Code, Layout, Zap, Grid, Trophy, Award } from 'lucide-react';

interface ExpandedSections {
  [key: string]: boolean;
}

interface CodeBlockProps {
  children: React.ReactNode;
}

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  duration?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface ExerciseBoxProps {
  title: string;
  children: React.ReactNode;
  type?: "practice" | "final";
}

interface HighlightBoxProps {
  title: string;
  children: React.ReactNode;
  color?: "blue" | "yellow" | "green" | "purple" | "red";
}

interface ConceptBoxProps {
  title: string;
  children: React.ReactNode;
}

const Dia4Component: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});

  const toggleSection = (sectionId: string): void => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{children}</code>
    </pre>
  );

  const CSSCodeBlock: React.FC<CodeBlockProps> = ({ children }) => (
    <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{children}</code>
    </pre>
  );

  const Section: React.FC<SectionProps> = ({ id, title, children, duration, icon }) => {
    const IconComponent = icon || Code;
    return (
      <div className="mb-8 border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection(id)}
          className="w-full p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-t-lg flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <IconComponent size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
            {duration && (
              <span className="flex items-center gap-1 text-sm text-blue-600">
                <Clock size={16} />
                {duration}
              </span>
            )}
          </div>
          {expandedSections[id] ? <ChevronDown /> : <ChevronRight />}
        </button>
        {expandedSections[id] && (
          <div className="p-6 space-y-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  const ExerciseBox: React.FC<ExerciseBoxProps> = ({ title, children, type = "practice" }) => {
    const bgColor = type === "practice" ? "bg-orange-50" : "bg-green-50";
    const textColor = type === "practice" ? "text-orange-800" : "text-green-800";
    const itemColor = type === "practice" ? "text-orange-700" : "text-green-700";
    
    return (
      <div className={`${bgColor} p-4 rounded-lg`}>
        <h4 className={`text-lg font-semibold ${textColor} mb-2 flex items-center gap-2`}>
          <Zap size={18} />
          {title}
        </h4>
        <div className={itemColor}>
          {children}
        </div>
      </div>
    );
  };

  const HighlightBox: React.FC<HighlightBoxProps> = ({ title, children, color = "blue" }) => {
    const colorClasses: Record<string, string> = {
      blue: "bg-blue-50 text-blue-800 text-blue-700",
      yellow: "bg-yellow-50 text-yellow-800 text-yellow-700",
      green: "bg-green-50 text-green-800 text-green-700",
      purple: "bg-purple-50 text-purple-800 text-purple-700",
      red: "bg-red-50 text-red-800 text-red-700"
    };
    
    const [bgColor, titleColor, textColor] = colorClasses[color].split(' ');
    
    return (
      <div className={`${bgColor} p-4 rounded-lg`}>
        <h5 className={`font-semibold ${titleColor} mb-2`}>{title}</h5>
        <div className={textColor}>
          {children}
        </div>
      </div>
    );
  };

  const ConceptBox: React.FC<ConceptBoxProps> = ({ title, children }) => (
    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
      <h5 className="font-semibold text-indigo-800 mb-2">{title}</h5>
      <div className="text-indigo-700 text-sm">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">DÍA 4: CSS AVANZADO Y PROYECTO FINAL</h1>
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            Duración: 3 horas
          </span>
          <span className="flex items-center gap-1">
            <Target size={16} />
            Objetivo: Crear un sitio web profesional y responsive
          </span>
        </div>
      </div>

      {/* Bloque 1 */}
      <Section id="bloque1" title="BLOQUE 1: FLEXBOX" duration="1 hora" icon={Layout}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.1 Repaso y motivación (10 min)</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Revisión de conceptos del día 3</li>
              <li>Introducción a los layouts modernos</li>
              <li>¿Por qué Flexbox cambió el desarrollo web?</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.2 Conceptos fundamentales de Flexbox (15 min)</h4>
            
            <HighlightBox title="¿Qué es Flexbox?" color="blue">
              <ul className="space-y-1">
                <li>• Sistema de layout unidimensional (una dirección a la vez)</li>
                <li>• Perfecto para alinear elementos y distribuir espacio</li>
                <li>• Resuelve problemas clásicos del CSS (centrado vertical, distribución equitativa)</li>
              </ul>
            </HighlightBox>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <ConceptBox title="Conceptos clave:">
                <ul className="space-y-1">
                  <li>• <strong>Flex Container:</strong> Elemento padre con <code className="bg-indigo-100 px-1 rounded">display: flex</code></li>
                  <li>• <strong>Flex Items:</strong> Elementos hijos directos del container</li>
                  <li>• <strong>Main Axis:</strong> Eje principal (por defecto horizontal)</li>
                  <li>• <strong>Cross Axis:</strong> Eje cruzado (perpendicular al principal)</li>
                </ul>
              </ConceptBox>
              
              <div>
                <CSSCodeBlock>
{`.flex-container {
    display: flex; /* Activa Flexbox */
    /* Ahora todos los hijos directos 
       son flex items */
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.3 Propiedades del contenedor flex (20 min)</h4>
            
            <CSSCodeBlock>
{`.flex-container {
    display: flex;
    
    /* Dirección de los elementos */
    flex-direction: row; /* row, row-reverse, column, column-reverse */
    
    /* Alineación en el eje principal */
    justify-content: center; /* flex-start, center, flex-end, space-between, space-around, space-evenly */
    
    /* Alineación en el eje cruzado */
    align-items: center; /* flex-start, center, flex-end, stretch, baseline */
    
    /* Quebrar líneas */
    flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
    
    /* Espaciado entre líneas (si hay wrap) */
    align-content: center; /* flex-start, center, flex-end, stretch, space-between, space-around */
    
    /* Atajo para direction y wrap */
    flex-flow: row wrap;
}`}
            </CSSCodeBlock>

            <div className="mt-4">
              <h5 className="font-semibold mb-2">Ejemplo práctico - Navbar horizontal:</h5>
              <CodeBlock>
{`<div class="navbar">
    <div class="logo">Mi Logo</div>
    <nav class="nav-links">
        <a href="#inicio">Inicio</a>
        <a href="#sobre-mi">Sobre mí</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
    </nav>
</div>`}
              </CodeBlock>
              
              <CSSCodeBlock>
{`.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #2c3e50;
    color: white;
}

.nav-links {
    display: flex;
    gap: 20px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.nav-links a:hover {
    background-color: #34495e;
}`}
              </CSSCodeBlock>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.4 Propiedades de los flex items (10 min)</h4>
            
            <CSSCodeBlock>
{`.flex-item {
    /* Capacidad de crecer */
    flex-grow: 1; /* 0 = no crece, 1+ = crece proporcionalmente */
    
    /* Capacidad de encogerse */
    flex-shrink: 1; /* 0 = no se encoge, 1+ = se encoge proporcionalmente */
    
    /* Tamaño base */
    flex-basis: auto; /* auto, 0, 200px, 30%, etc. */
    
    /* Atajo para grow, shrink, basis */
    flex: 1; /* equivale a flex: 1 1 0% */
    
    /* Alineación individual */
    align-self: center; /* auto, flex-start, center, flex-end, stretch, baseline */
}`}
            </CSSCodeBlock>

            <div className="mt-4">
              <h5 className="font-semibold mb-2">Ejemplo de layout de 3 columnas:</h5>
              <CodeBlock>
{`<div class="contenido">
    <aside class="sidebar">Sidebar</aside>
    <main class="main-content">Contenido principal</main>
    <aside class="widgets">Widgets</aside>
</div>`}
              </CodeBlock>
              
              <CSSCodeBlock>
{`.contenido {
    display: flex;
    gap: 20px;
    min-height: 500px;
}

.sidebar {
    flex: 0 0 200px; /* No crece, no se encoge, 200px fijo */
    background-color: #ecf0f1;
}

.main-content {
    flex: 1; /* Toma todo el espacio restante */
    background-color: white;
    padding: 20px;
}

.widgets {
    flex: 0 0 150px; /* 150px fijo */
    background-color: #ecf0f1;
}`}
              </CSSCodeBlock>
            </div>
          </div>

          <ExerciseBox title="EJERCICIO PRÁCTICO 1 - Header con Flexbox (5 min)">
            <ol className="space-y-1">
              <li>1. Crear header con logo y navegación</li>
              <li>2. Centrar elementos verticalmente</li>
              <li>3. Distribuir espacio horizontalmente</li>
              <li>4. Añadir efectos hover</li>
            </ol>
          </ExerciseBox>
        </div>
      </Section>

      {/* Bloque 2 */}
      <Section id="bloque2" title="BLOQUE 2: CSS GRID Y RESPONSIVE DESIGN" duration="1 hora" icon={Grid}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.1 Introducción a CSS Grid (20 min)</h4>
            
            <HighlightBox title="¿Qué es CSS Grid?" color="purple">
              <ul className="space-y-1">
                <li>• Sistema de layout bidimensional (filas Y columnas)</li>
                <li>• Perfecto para layouts complejos y páginas completas</li>
                <li>• Complementa a Flexbox (no lo reemplaza)</li>
              </ul>
            </HighlightBox>

            <div className="space-y-4 mt-4">
              <div>
                <h5 className="font-semibold mb-2">Conceptos básicos:</h5>
                <CSSCodeBlock>
{`.grid-container {
    display: grid;
    
    /* Definir columnas */
    grid-template-columns: 1fr 2fr 1fr; /* 3 columnas proporcionales */
    /* O también: */
    grid-template-columns: 200px 1fr 150px; /* Tamaños específicos */
    
    /* Definir filas */
    grid-template-rows: auto 1fr auto; /* Header, contenido, footer */
    
    /* Espaciado */
    gap: 20px; /* Espacio entre elementos */
    grid-column-gap: 20px; /* Solo columnas */
    grid-row-gap: 15px; /* Solo filas */
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Layout clásico de página web:</h5>
                <CodeBlock>
{`<div class="page-layout">
    <header class="header">Header</header>
    <nav class="navigation">Navegación</nav>
    <main class="main">Contenido Principal</main>
    <aside class="sidebar">Sidebar</aside>
    <footer class="footer">Footer</footer>
</div>`}
                </CodeBlock>
                
                <CSSCodeBlock>
{`.page-layout {
    display: grid;
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas: 
        "header header header"
        "nav nav nav"
        "sidebar main widgets"
        "footer footer footer";
    min-height: 100vh;
    gap: 10px;
}

.header { grid-area: header; }
.navigation { grid-area: nav; }
.main { grid-area: main; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.2 Media Queries y Responsive Design (25 min)</h4>
            
            <HighlightBox title="¿Qué son las Media Queries?" color="green">
              <ul className="space-y-1">
                <li>• Aplican estilos según características del dispositivo</li>
                <li>• Permiten crear diseños adaptativos</li>
                <li>• Breakpoints comunes: móvil, tablet, desktop</li>
              </ul>
            </HighlightBox>

            <div className="space-y-4 mt-4">
              <div>
                <h5 className="font-semibold mb-2">Sintaxis básica:</h5>
                <CSSCodeBlock>
{`/* Estilos base (móvil first) */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet */
@media screen and (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
        padding: 20px;
    }
}

/* Desktop */
@media screen and (min-width: 1024px) {
    .container {
        max-width: 1200px;
        padding: 30px;
    }
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Grid responsive:</h5>
                <CSSCodeBlock>
{`.galeria {
    display: grid;
    gap: 20px;
    
    /* Móvil - 1 columna */
    grid-template-columns: 1fr;
}

/* Tablet - 2 columnas */
@media screen and (min-width: 768px) {
    .galeria {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop - 3 columnas */
@media screen and (min-width: 1024px) {
    .galeria {
        grid-template-columns: repeat(3, 1fr);
    }
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <ExerciseBox title="EJERCICIO PRÁCTICO 2 - Layout responsive (5 min)">
            <ol className="space-y-1">
              <li>1. Crear layout de 3 columnas con Grid</li>
              <li>2. Hacer responsive: móvil 1 col, tablet 2 col, desktop 3 col</li>
              <li>3. Añadir navbar responsive con Flexbox</li>
            </ol>
          </ExerciseBox>
        </div>
      </Section>

      {/* Bloque 3 */}
      <Section id="bloque3" title="BLOQUE 3: PROYECTO FINAL Y MEJORES PRÁCTICAS" duration="1 hora" icon={Trophy}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.1 Planificación del proyecto final (10 min)</h4>
            
            <HighlightBox title="Objetivo: Crear un portfolio personal completo y responsive" color="green">
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h6 className="font-medium mb-2">Características del proyecto:</h6>
                  <ul className="space-y-1 text-sm">
                    <li>• ✅ Estructura HTML semántica</li>
                    <li>• ✅ CSS moderno (Flexbox + Grid)</li>
                    <li>• ✅ Diseño responsive</li>
                    <li>• ✅ Navegación funcional</li>
                    <li>• ✅ Formulario de contacto</li>
                    <li>• ✅ Galería de proyectos</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium mb-2">Secciones obligatorias:</h6>
                  <ul className="space-y-1 text-sm">
                    <li>• Header: Logo/nombre + navegación responsive</li>
                    <li>• Hero: Presentación personal con imagen</li>
                    <li>• Sobre mí: Descripción personal y habilidades</li>
                    <li>• Proyectos: Galería de trabajos</li>
                    <li>• Contacto: Formulario funcional</li>
                    <li>• Footer: Enlaces adicionales y copyright</li>
                  </ul>
                </div>
              </div>
            </HighlightBox>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.2 Estructura del proyecto (15 min)</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Organización de archivos:</h5>
                <CodeBlock>
{`mi-portfolio/
├── index.html
├── css/
│   ├── styles.css
│   └── responsive.css
├── images/
│   ├── profile.jpg
│   ├── proyecto1.jpg
│   ├── proyecto2.jpg
│   └── favicon.ico
└── README.md`}
                </CodeBlock>
              </div>
              
              <div className="space-y-3">
                <HighlightBox title="Checklist de mejores prácticas:" color="yellow">
                  <ul className="space-y-1 text-sm">
                    <li>• ✅ Código semántico y validado</li>
                    <li>• ✅ Imágenes optimizadas</li>
                    <li>• ✅ Favicon y metadatos completos</li>
                    <li>• ✅ Variables CSS para colores</li>
                    <li>• ✅ Transiciones y efectos sutiles</li>
                    <li>• ✅ Accesibilidad básica</li>
                  </ul>
                </HighlightBox>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.3 CSS del proyecto (20 min)</h4>
            
            <h5 className="font-semibold mb-2">styles.css - Estilos principales:</h5>
            <CSSCodeBlock>
{`/* Reset y variables */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
    --text-color: #333;
    --bg-color: #f8f9fa;
    --white: #ffffff;
    --shadow: 0 2px 10px rgba(0,0,0,0.1);
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--bg-color);
}

/* Header */
.header {
    background-color: var(--white);
    box-shadow: var(--shadow);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--white);
    padding: 120px 0 60px;
    text-align: center;
}

/* Proyectos Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.project-card:hover {
    transform: translateY(-5px);
}`}
            </CSSCodeBlock>
          </div>

          <ExerciseBox title="PROYECTO FINAL - Implementación (15 min)" type="final">
            <p className="mb-3 font-medium">Los estudiantes trabajan en su portfolio personal aplicando todo lo aprendido</p>
          </ExerciseBox>
        </div>
      </Section>

      {/* Evaluación final del curso */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle size={24} />
          EVALUACIÓN FINAL DEL CURSO
        </h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">¿Qué hemos logrado en 4 días?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-200" />
                  Dominio de HTML semántico
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-200" />
                  CSS moderno (Flexbox + Grid)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-200" />
                  Diseño responsive profesional
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-200" />
                  Portfolio personal completo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-200" />
                  Fundamentos sólidos para seguir aprendiendo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-200" />
                  Confianza para crear sitios web
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 inline-block">
            <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
              <Award size={24} />
              ¡Felicitaciones!
            </h3>
            <p className="text-lg">
              Ahora eres un <strong>desarrollador web frontend junior</strong> con conocimientos sólidos 
              para crear sitios web modernos y responsivos.
            </p>
          </div>
        </div>
      </div>

      {/* Recursos para continuar */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <HighlightBox title="Recursos recomendados:" color="blue">
          <ul className="space-y-1 text-sm">
            <li>• <strong>Documentación:</strong> MDN Web Docs</li>
            <li>• <strong>Práctica:</strong> FreeCodeCamp, Codecademy</li>
            <li>• <strong>Inspiración:</strong> CodePen, Dribbble, Awwwards</li>
            <li>• <strong>Comunidad:</strong> Stack Overflow, Reddit (r/webdev)</li>
            <li>• <strong>YouTube:</strong> Canales de desarrollo web</li>
          </ul>
        </HighlightBox>
        
        <HighlightBox title="Herramientas útiles:" color="green">
          <ul className="space-y-1 text-sm">
            <li>• <strong>Editores:</strong> VS Code, Sublime Text</li>
            <li>• <strong>Diseño:</strong> Figma, Adobe XD</li>
            <li>• <strong>Hosting gratuito:</strong> GitHub Pages, Netlify, Vercel</li>
            <li>• <strong>CDN:</strong> Cloudflare, jsDelivr</li>
          </ul>
        </HighlightBox>
      </div>
    </div>
  );
};

export default Dia4Component;