"use client"
import React, { useState, ReactNode } from 'react';
import { ChevronDown, ChevronRight, Clock, Target, CheckCircle, Code, Palette, Layout, Zap, Search, LucideIcon } from 'lucide-react';

// Interfaces para tipar las props
interface CodeBlockProps {
  children: ReactNode;
}

interface CSSCodeBlockProps {
  children: ReactNode;
}

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  duration?: string;
  icon?: LucideIcon;
}

interface ExerciseBoxProps {
  title: string;
  children: ReactNode;
  type?: "practice" | "project";
}

interface HighlightBoxProps {
  title: string;
  children: ReactNode;
  color?: "blue" | "yellow" | "green" | "purple" | "red";
}

// Estado del componente
interface ExpandedSections {
  [key: string]: boolean;
}

const Dia3Component: React.FC = () => {
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

  const CSSCodeBlock: React.FC<CSSCodeBlockProps> = ({ children }) => (
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">DÍA 3: CSS INTERMEDIO</h1>
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            Duración: 3 horas
          </span>
          <span className="flex items-center gap-1">
            <Target size={16} />
            Objetivo: Dominar el control preciso del diseño y layout
          </span>
        </div>
      </div>

      {/* Bloque 1 */}
      <Section id="bloque1" title="BLOQUE 1: SELECTORES Y ESPECIFICIDAD" duration="1 hora" icon={Search}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.1 Repaso y motivación (10 min)</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Revisión de selectores básicos del día 2</li>
              <li>¿Por qué necesitamos selectores más precisos?</li>
              <li>Introducción al concepto de especificidad</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.2 Selectores avanzados (25 min)</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Selectores de descendiente:</h5>
                <CSSCodeBlock>
{`/* Todos los párrafos dentro de un article */
article p {
    margin-bottom: 15px;
}

/* Enlaces dentro de la navegación */
nav a {
    text-decoration: none;
    color: #333;
}

/* Imágenes dentro de la galería */
.galeria img {
    border-radius: 5px;
    transition: transform 0.3s;
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Selector de hijo directo (&gt;):</h5>
                <CSSCodeBlock>
{`/* Solo los li que son hijos directos de .menu */
.menu > li {
    display: inline-block;
}

/* Solo los p que son hijos directos de .content */
.content > p {
    font-size: 1.1rem;
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Selector de hermano adyacente (+):</h5>
                <CSSCodeBlock>
{`/* Párrafo inmediatamente después de un h2 */
h2 + p {
    margin-top: 0;
    font-weight: bold;
}

/* Input después de un label */
label + input {
    margin-left: 10px;
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Selector de atributos:</h5>
                <CSSCodeBlock>
{`/* Enlaces que van a sitios externos */
a[href^="http"] {
    color: #e74c3c;
}

/* Inputs de tipo email */
input[type="email"] {
    background-color: #f0f8ff;
}

/* Enlaces que terminan en .pdf */
a[href$=".pdf"] {
    background-image: url('pdf-icon.png');
    padding-left: 20px;
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.3 Pseudoclases (15 min)</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Pseudoclases de estado:</h5>
                <CSSCodeBlock>
{`/* Estados de enlaces */
a:link { color: #3498db; }
a:visited { color: #9b59b6; }
a:hover { color: #e74c3c; }
a:active { color: #f39c12; }

/* Estados de formulario */
input:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
    outline: none;
}

input:invalid {
    border-color: #e74c3c;
    background-color: #fdf2f2;
}

button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Pseudoclases estructurales:</h5>
                <CSSCodeBlock>
{`/* Primer y último elemento */
li:first-child {
    border-top: 2px solid #3498db;
}

li:last-child {
    border-bottom: 2px solid #3498db;
}

/* Elementos pares e impares */
tr:nth-child(even) {
    background-color: #f8f9fa;
}

tr:nth-child(odd) {
    background-color: white;
}

/* Cada tercer elemento */
.item:nth-child(3n) {
    margin-right: 0;
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.4 Pseudoelementos (10 min)</h4>
            
            <CSSCodeBlock>
{`/* Primera línea y primera letra */
p:first-line {
    font-weight: bold;
}

p:first-letter {
    font-size: 3em;
    float: left;
    line-height: 1;
    margin-right: 5px;
}

/* Contenido generado */
.importante::before {
    content: "⚠️ ";
    color: #f39c12;
}

.link-externo::after {
    content: " 🔗";
    font-size: 0.8em;
}

/* Tooltips básicos */
.tooltip {
    position: relative;
}

.tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
}

.tooltip:hover::after {
    opacity: 1;
    visibility: visible;
}`}
            </CSSCodeBlock>
          </div>

          <ExerciseBox title="EJERCICIO PRÁCTICO 1 - Selectores avanzados (5 min)">
            <ol className="space-y-1">
              <li>1. Crear una lista de navegación con efectos hover</li>
              <li>2. Aplicar estilos alternados a filas de tabla</li>
              <li>3. Añadir iconos con pseudoelementos</li>
              <li>4. Crear tooltips básicos</li>
            </ol>
          </ExerciseBox>
        </div>
      </Section>

      {/* Bloque 2 */}
      <Section id="bloque2" title="BLOQUE 2: MODELO DE CAJA Y POSICIONAMIENTO" duration="1 hora" icon={Layout}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.1 El modelo de caja (Box Model) (20 min)</h4>
            
            <HighlightBox title="Componentes del modelo de caja:" color="blue">
              <ul className="space-y-1">
                <li>• <strong>Content:</strong> El contenido del elemento</li>
                <li>• <strong>Padding:</strong> Espacio interno (entre contenido y borde)</li>
                <li>• <strong>Border:</strong> El borde del elemento</li>
                <li>• <strong>Margin:</strong> Espacio externo (entre elementos)</li>
              </ul>
            </HighlightBox>

            <CSSCodeBlock>
{`.ejemplo-box {
    /* Contenido */
    width: 300px;
    height: 200px;
    
    /* Padding - espacio interno */
    padding: 20px; /* Todos los lados */
    padding: 10px 20px; /* Vertical | Horizontal */
    padding: 10px 15px 20px 25px; /* Arriba | Derecha | Abajo | Izquierda */
    
    /* Border - borde */
    border: 2px solid #3498db;
    border-top: 3px solid #e74c3c;
    border-radius: 10px;
    
    /* Margin - espacio externo */
    margin: 20px;
    margin: 10px auto; /* Centrar horizontalmente */
    margin-top: 30px;
}`}
            </CSSCodeBlock>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <HighlightBox title="Box-sizing tradicional:" color="red">
                <CSSCodeBlock>
{`.box-content {
    box-sizing: content-box; /* Default */
    width: 300px;
    padding: 20px;
    border: 2px solid black;
    /* Ancho total: 344px */
}`}
                </CSSCodeBlock>
              </HighlightBox>
              
              <HighlightBox title="Box-sizing moderno (recomendado):" color="green">
                <CSSCodeBlock>
{`.box-border {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 2px solid black;
    /* Ancho total: 300px */
}

/* Aplicar a todos */
* {
    box-sizing: border-box;
}`}
                </CSSCodeBlock>
              </HighlightBox>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.2 Posicionamiento (25 min)</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Position relative:</h5>
                <CSSCodeBlock>
{`.relativo {
    position: relative;
    top: 10px;
    left: 20px;
    /* Se mueve desde su posición original */
    /* Mantiene su espacio en el flujo */
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Position absolute:</h5>
                <CSSCodeBlock>
{`.contenedor {
    position: relative; /* Contexto de posicionamiento */
    width: 400px;
    height: 300px;
    border: 2px solid #ccc;
}

.absoluto {
    position: absolute;
    top: 20px;
    right: 30px;
    /* Se posiciona respecto al contenedor relativo */
    /* Sale del flujo normal */
    width: 100px;
    height: 50px;
    background-color: #3498db;
}

/* Centrar con position absolute */
.centrado-absoluto {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Position fixed:</h5>
                <CSSCodeBlock>
{`/* Header fijo */
.header-fijo {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 1000;
}

/* Botón flotante */
.boton-flotante {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #e74c3c;
    z-index: 999;
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Z-index:</h5>
                <CSSCodeBlock>
{`.capa-1 { z-index: 1; }
.capa-2 { z-index: 10; }
.capa-3 { z-index: 100; }
.capa-superior { z-index: 9999; }

/* Overlay/modal */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10000;
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <ExerciseBox title="EJERCICIO PRÁCTICO 2 - Layouts con posicionamiento (5 min)">
            <ol className="space-y-1">
              <li>1. Crear header fijo</li>
              <li>2. Posicionar elementos con absolute</li>
              <li>3. Crear un botón flotante</li>
              <li>4. Experimentar con z-index</li>
            </ol>
          </ExerciseBox>
        </div>
      </Section>

      {/* Bloque 3 */}
      <Section id="bloque3" title="BLOQUE 3: TIPOGRAFÍA Y COLORES" duration="1 hora" icon={Palette}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.1 Google Fonts y tipografía web (20 min)</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Importar Google Fonts:</h5>
                <CodeBlock>
{`<!-- En el HTML -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">`}
                </CodeBlock>
                
                <CSSCodeBlock>
{`/* O en CSS */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

/* Aplicar fuentes */
body {
    font-family: 'Roboto', Arial, sans-serif;
}

h1, h2, h3 {
    font-family: 'Playfair Display', serif;
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Propiedades tipográficas avanzadas:</h5>
                <CSSCodeBlock>
{`.texto-completo {
    /* Familia de fuentes con fallbacks */
    font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    
    /* Tamaño */
    font-size: 1.1rem;
    
    /* Peso */
    font-weight: 400; /* 100-900 */
    
    /* Altura de línea */
    line-height: 1.6; /* Sin unidad = multiplicador */
    
    /* Espaciado entre letras */
    letter-spacing: 0.5px;
    
    /* Alineación */
    text-align: justify;
    
    /* Transformación */
    text-transform: capitalize;
    
    /* Sombra de texto */
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    
    /* Control de desbordamiento */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.2 Unidades de medida (15 min)</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <HighlightBox title="Unidades absolutas:" color="yellow">
                <CSSCodeBlock>
{`.absolutas {
    /* Píxeles - más común */
    font-size: 16px;
    width: 300px;
    
    /* Otras unidades */
    font-size: 12pt; /* Puntos */
    width: 2in; /* Pulgadas */
}`}
                </CSSCodeBlock>
              </HighlightBox>
              
              <HighlightBox title="Unidades relativas:" color="green">
                <CSSCodeBlock>
{`/* Em - relativa al padre */
.em-ejemplo {
    font-size: 1.2em;
    padding: 0.5em;
}

/* Rem - relativa al root */
.rem-ejemplo {
    font-size: 1.5rem;
    padding: 2rem;
}

/* Viewport */
.viewport {
    width: 100vw;
    height: 100vh;
    font-size: 4vw;
}`}
                </CSSCodeBlock>
              </HighlightBox>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.3 Colores avanzados (15 min)</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Variables CSS (Custom Properties):</h5>
                <CSSCodeBlock>
{`:root {
    /* Definir variables globales */
    --color-primario: #3498db;
    --color-secundario: #2c3e50;
    --color-acento: #e74c3c;
    --color-texto: #333333;
    --color-fondo: #f8f9fa;
    
    /* Variables para espaciado */
    --espaciado-pequeno: 0.5rem;
    --espaciado-medio: 1rem;
    --espaciado-grande: 2rem;
}

/* Usar variables */
.componente {
    background-color: var(--color-primario);
    color: var(--color-blanco);
    padding: var(--espaciado-medio);
    
    /* Variable con fallback */
    margin: var(--espaciado-custom, 1rem);
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Gradientes:</h5>
                <CSSCodeBlock>
{`.gradientes {
    /* Gradiente lineal */
    background: linear-gradient(45deg, #3498db, #e74c3c);
    background: linear-gradient(to right, #74b9ff, #00cec9);
    
    /* Gradiente radial */
    background: radial-gradient(circle, #ff7675, #d63031);
    
    /* Gradientes complejos */
    background: linear-gradient(
        45deg,
        #ff6b6b 0%,
        #feca57 25%,
        #48dbfb 50%,
        #ff9ff3 75%,
        #54a0ff 100%
    );
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.4 Sombras y efectos (10 min)</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Box-shadow:</h5>
                <CSSCodeBlock>
{`.sombras {
    /* Sombra básica */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    
    /* Sombra múltiple */
    box-shadow: 
        0 1px 3px rgba(0,0,0,0.12),
        0 1px 2px rgba(0,0,0,0.24);
    
    /* Sombra interior */
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    
    /* Efecto de elevación */
    transition: box-shadow 0.3s ease;
}

.sombras:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}`}
                </CSSCodeBlock>
              </div>
              
              <div>
                <h5 className="font-semibold mb-2">Text-shadow:</h5>
                <CSSCodeBlock>
{`.texto-con-sombra {
    /* Sombra básica */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    
    /* Efecto neón */
    text-shadow: 
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #0073e6,
        0 0 20px #0073e6;
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <ExerciseBox title="EJERCICIO PRÁCTICO 3 - Tipografía y colores (5 min)">
            <ol className="space-y-1">
              <li>1. Importar y aplicar Google Fonts</li>
              <li>2. Crear sistema de colores con variables CSS</li>
              <li>3. Aplicar gradientes y sombras</li>
              <li>4. Experimentar con unidades responsive</li>
            </ol>
          </ExerciseBox>
        </div>
      </Section>

      {/* Proyecto del día */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Code size={24} />
          PROYECTO DEL DÍA - Mejorar la página personal (15 min)
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Objetivos del proyecto:</h3>
            <ul className="space-y-1 text-sm">
              <li>• Aplicar selectores avanzados para un control preciso</li>
              <li>• Usar el modelo de caja para layouts exactos</li>
              <li>• Implementar tipografía profesional</li>
              <li>• Crear sistema de colores coherente</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Checklist de mejoras:</h3>
            <ul className="space-y-1 text-sm">
              <li>• ✅ Importar Google Fonts</li>
              <li>• ✅ Implementar variables CSS</li>
              <li>• ✅ Mejorar la navegación con pseudoelementos</li>
              <li>• ✅ Añadir efectos hover a elementos</li>
              <li>• ✅ Optimizar formularios con focus states</li>
              <li>• ✅ Crear sistema de sombras coherente</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Ejemplo de mejoras CSS:</h3>
          <CSSCodeBlock>
{`:root {
    --primario: #2c3e50;
    --secundario: #3498db;
    --acento: #e74c3c;
    --sombra: 0 2px 10px rgba(0,0,0,0.1);
    --fuente-principal: 'Open Sans', sans-serif;
}

/* Navegación mejorada */
.nav-list a {
    position: relative;
    transition: color 0.3s ease;
}

.nav-list a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--secundario);
    transition: width 0.3s ease;
}

.nav-list a:hover::after {
    width: 100%;
}`}
          </CSSCodeBlock>
        </div>
      </div>

      {/* Resumen y Evaluación */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">¿Qué hemos aprendido?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Selectores avanzados para control preciso
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Especificidad y cascada de CSS
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Modelo de caja y posicionamiento
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Tipografía web profesional
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Sistema de colores y variables CSS
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Efectos visuales y transiciones
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium">
          <strong>Próximo día:</strong> Aprenderemos Flexbox y CSS Grid para crear layouts modernos y profesionales, además de completar nuestro proyecto final.
        </p>
      </div>

      {/* Recursos adicionales */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Recursos adicionales</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Selectores:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• CSS Selector Tester</li>
              <li>• W3Schools CSS</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Colores:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Coolors.co</li>
              <li>• Adobe Color</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Fuentes:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Google Fonts</li>
              <li>• Font Pair</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Efectos:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• CSS Gradient</li>
              <li>• Box Shadow Generator</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dia3Component;