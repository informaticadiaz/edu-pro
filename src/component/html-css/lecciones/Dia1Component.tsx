"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Target, CheckCircle } from 'lucide-react';

interface ExpandedSections {
  [key: string]: boolean;
}

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  duration?: string;
}

const Dia1Component: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});

  const toggleSection = (sectionId: string): void => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const CodeBlock: React.FC<CodeBlockProps> = ({ children, language = "html" }) => (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{children}</code>
    </pre>
  );

  const Section: React.FC<SectionProps> = ({ id, title, children, duration }) => (
    <div className="mb-8 border border-gray-200 rounded-lg">
      <button
        onClick={() => toggleSection(id)}
        className="w-full p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-t-lg flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3">
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">DÍA 1: FUNDAMENTOS DE HTML</h1>
        <div className="flex items-center justify-center gap-6 text-sm">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            Duración: 3 horas
          </span>
          <span className="flex items-center gap-1">
            <Target size={16} />
            Objetivo: Crear la primera página web funcional
          </span>
        </div>
      </div>

      {/* Bloque 1 */}
      <Section id="bloque1" title="BLOQUE 1: INTRODUCCIÓN Y CONCEPTOS BÁSICOS" duration="1 hora">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.1 Bienvenida y presentación (10 min)</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Presentación de participantes</li>
              <li>Objetivos del curso y expectativas</li>
              <li>¿Qué vamos a construir en estos 4 días?</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.2 ¿Qué es HTML? (15 min)</h4>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <p className="text-lg font-medium text-yellow-800 mb-2">
                <strong>HTML</strong> = <strong>H</strong>yper<strong>T</strong>ext <strong>M</strong>arkup <strong>L</strong>anguage
              </p>
              <p className="text-yellow-700">(Lenguaje de Marcado de Hipertexto)</p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>No es un lenguaje de programación</strong>, es un lenguaje de marcado</li>
              <li>Define la <strong>estructura</strong> y <strong>contenido</strong> de páginas web</li>
              <li>Usa <strong>etiquetas</strong> para organizar información</li>
              <li>Es la base de toda página web</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-blue-800"><strong>Analogía:</strong> HTML es como el esqueleto de una casa - define dónde van las habitaciones, puertas y ventanas.</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.3 Estructura básica de HTML (20 min)</h4>
            <CodeBlock>
{`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Primera Página</title>
</head>
<body>
    <h1>¡Hola Mundo!</h1>
    <p>Esta es mi primera página web.</p>
</body>
</html>`}
            </CodeBlock>
            
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Explicación línea por línea:</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><code className="bg-gray-100 px-2 py-1 rounded">&lt;!DOCTYPE html&gt;</code>: Declara que es HTML5</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">&lt;html lang="es"&gt;</code>: Elemento raíz, idioma español</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">&lt;head&gt;</code>: Información sobre el documento (no visible)</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">&lt;meta charset="UTF-8"&gt;</code>: Codificación de caracteres</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">&lt;title&gt;</code>: Título que aparece en la pestaña del navegador</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">&lt;body&gt;</code>: Contenido visible de la página</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.4 Elementos, etiquetas y atributos (10 min)</h4>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h5 className="font-semibold mb-2">Anatomía de un elemento HTML:</h5>
              <code className="text-lg">&lt;etiqueta atributo="valor"&gt;Contenido&lt;/etiqueta&gt;</code>
            </div>
            
            <CodeBlock>
{`<h1>Título principal</h1>
<p>Un párrafo de texto</p>
<a href="https://google.com">Enlace a Google</a>
<img src="imagen.jpg" alt="Descripción">`}
            </CodeBlock>

            <div className="mt-4">
              <h5 className="font-semibold mb-2">Conceptos clave:</h5>
              <ul className="space-y-1 text-gray-700">
                <li><strong>Etiqueta de apertura:</strong> <code className="bg-gray-100 px-1 rounded">&lt;h1&gt;</code></li>
                <li><strong>Etiqueta de cierre:</strong> <code className="bg-gray-100 px-1 rounded">&lt;/h1&gt;</code></li>
                <li><strong>Contenido:</strong> texto entre las etiquetas</li>
                <li><strong>Atributos:</strong> información adicional (<code className="bg-gray-100 px-1 rounded">href</code>, <code className="bg-gray-100 px-1 rounded">src</code>, <code className="bg-gray-100 px-1 rounded">alt</code>)</li>
                <li><strong>Elementos vacíos:</strong> no tienen contenido (<code className="bg-gray-100 px-1 rounded">&lt;img&gt;</code>, <code className="bg-gray-100 px-1 rounded">&lt;br&gt;</code>)</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.5 Herramientas y configuración (5 min)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Herramientas necesarias:</h5>
                <ul className="text-green-700 space-y-1">
                  <li>• <strong>Editor de código:</strong> Visual Studio Code</li>
                  <li>• <strong>Navegador:</strong> Chrome, Firefox o Edge</li>
                  <li>• <strong>Extensión:</strong> Live Server para VS Code</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h5 className="font-semibold text-orange-800 mb-2">EJERCICIO PRÁCTICO 1:</h5>
                <ol className="text-orange-700 space-y-1 text-sm">
                  <li>1. Abrir VS Code</li>
                  <li>2. Crear carpeta "mi-primera-web"</li>
                  <li>3. Crear archivo "index.html"</li>
                  <li>4. Escribir la estructura básica</li>
                  <li>5. Abrir con Live Server</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Bloque 2 */}
      <Section id="bloque2" title="BLOQUE 2: ELEMENTOS FUNDAMENTALES" duration="1 hora">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.1 Encabezados (h1-h6) (15 min)</h4>
            <p className="text-gray-700 mb-3">Los encabezados crean jerarquía en el contenido:</p>
            <CodeBlock>
{`<h1>Título Principal (h1)</h1>
<h2>Subtítulo (h2)</h2>
<h3>Sub-subtítulo (h3)</h3>
<h4>Encabezado nivel 4</h4>
<h5>Encabezado nivel 5</h5>
<h6>Encabezado nivel 6</h6>`}
            </CodeBlock>
            
            <div className="bg-red-50 p-4 rounded-lg mt-4">
              <h5 className="font-semibold text-red-800 mb-2">Reglas importantes:</h5>
              <ul className="text-red-700 space-y-1">
                <li>• Solo un <code className="bg-red-100 px-1 rounded">&lt;h1&gt;</code> por página (SEO)</li>
                <li>• Mantener orden jerárquico</li>
                <li>• No saltar niveles (h1 → h3)</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.2 Párrafos y texto (15 min)</h4>
            <CodeBlock>
{`<p>Este es un párrafo normal de texto.</p>

<p>Este párrafo tiene <strong>texto en negrita</strong> 
y <em>texto en cursiva</em>.</p>

<p>También podemos usar <b>bold</b> y <i>italic</i>, 
pero <strong> y <em> son más semánticos.</p>

<!-- Salto de línea -->
<p>Primera línea<br>Segunda línea</p>

<!-- Línea horizontal -->
<hr>`}
            </CodeBlock>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.3 Enlaces (15 min)</h4>
            <CodeBlock>
{`<!-- Enlace externo -->
<a href="https://www.google.com">Ir a Google</a>

<!-- Enlace a otra página del sitio -->
<a href="sobre-mi.html">Sobre mí</a>

<!-- Enlace a una sección de la misma página -->
<a href="#contacto">Ir a contacto</a>

<!-- Enlace que abre en nueva pestaña -->
<a href="https://www.youtube.com" target="_blank">YouTube</a>

<!-- Enlace de email -->
<a href="mailto:contacto@email.com">Enviar email</a>

<!-- Enlace de teléfono -->
<a href="tel:+541234567890">Llamar</a>`}
            </CodeBlock>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.4 Imágenes (10 min)</h4>
            <CodeBlock>
{`<!-- Imagen básica -->
<img src="mi-foto.jpg" alt="Descripción de la imagen">

<!-- Imagen con tamaño específico -->
<img src="logo.png" alt="Logo de la empresa" width="200" height="100">

<!-- Imagen desde internet -->
<img src="https://via.placeholder.com/300x200" alt="Imagen de prueba">`}
            </CodeBlock>
            
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Atributos importantes:</h5>
              <ul className="space-y-1 text-gray-700">
                <li><code className="bg-gray-100 px-1 rounded">src</code>: Ruta de la imagen</li>
                <li><code className="bg-gray-100 px-1 rounded">alt</code>: Texto alternativo (accesibilidad)</li>
                <li><code className="bg-gray-100 px-1 rounded">width/height</code>: Dimensiones (mejor usar CSS)</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-orange-800 mb-2">EJERCICIO PRÁCTICO 2 - Añadir contenido básico</h4>
            <ol className="text-orange-700 space-y-1">
              <li>1. Agregar encabezados h1, h2, h3</li>
              <li>2. Escribir párrafos con texto</li>
              <li>3. Crear enlaces internos y externos</li>
              <li>4. Insertar una imagen</li>
              <li>5. Añadir comentarios explicativos</li>
            </ol>
          </div>
        </div>
      </Section>

      {/* Bloque 3 */}
      <Section id="bloque3" title="BLOQUE 3: ESTRUCTURA Y ORGANIZACIÓN" duration="1 hora">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.1 Listas (20 min)</h4>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-semibold mb-2">Lista no ordenada (viñetas):</h5>
                <CodeBlock>
{`<ul>
    <li>Primer elemento</li>
    <li>Segundo elemento</li>
    <li>Tercer elemento</li>
</ul>`}
                </CodeBlock>
              </div>
              
              <div>
                <h5 className="font-semibold mb-2">Lista ordenada (números):</h5>
                <CodeBlock>
{`<ol>
    <li>Paso uno</li>
    <li>Paso dos</li>
    <li>Paso tres</li>
</ol>`}
                </CodeBlock>
              </div>
            </div>

            <h5 className="font-semibold mb-2">Lista anidada:</h5>
            <CodeBlock>
{`<ul>
    <li>Tecnologías Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>Tecnologías Backend
        <ol>
            <li>Python</li>
            <li>Node.js</li>
            <li>PHP</li>
        </ol>
    </li>
</ul>`}
            </CodeBlock>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.2 Div y Span (15 min)</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Div - Contenedor de bloque:</h5>
                <CodeBlock>
{`<div>
    <h2>Sección de noticias</h2>
    <p>Contenido...</p>
</div>

<div>
    <h2>Sección de productos</h2>
    <p>Otro contenido...</p>
</div>`}
                </CodeBlock>
              </div>
              
              <div>
                <h5 className="font-semibold mb-2">Span - Contenedor en línea:</h5>
                <CodeBlock>
{`<p>Este texto tiene una 
<span>palabra destacada</span> 
en el medio.</p>

<p>El precio es 
<span>$299</span> pesos.</p>`}
                </CodeBlock>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h5 className="font-semibold text-blue-800 mb-2">Diferencias clave:</h5>
              <ul className="text-blue-700 space-y-1">
                <li>• <code className="bg-blue-100 px-1 rounded">&lt;div&gt;</code>: Elemento de bloque (ocupa toda la línea)</li>
                <li>• <code className="bg-blue-100 px-1 rounded">&lt;span&gt;</code>: Elemento en línea (solo el espacio necesario)</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.3 Elementos semánticos básicos (15 min)</h4>
            <CodeBlock>
{`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Sitio Web</title>
</head>
<body>
    <header>
        <h1>Mi Sitio Web</h1>
        <nav>
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#sobre-mi">Sobre mí</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h2>Contenido principal</h2>
        <p>Este es el contenido más importante.</p>
    </main>

    <footer>
        <p>&copy; 2025 Mi Sitio Web. Todos los derechos reservados.</p>
    </footer>
</body>
</html>`}
            </CodeBlock>
            
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Elementos semánticos:</h5>
              <ul className="space-y-1 text-gray-700">
                <li><code className="bg-gray-100 px-1 rounded">&lt;header&gt;</code>: Encabezado de página o sección</li>
                <li><code className="bg-gray-100 px-1 rounded">&lt;nav&gt;</code>: Navegación</li>
                <li><code className="bg-gray-100 px-1 rounded">&lt;main&gt;</code>: Contenido principal</li>
                <li><code className="bg-gray-100 px-1 rounded">&lt;footer&gt;</code>: Pie de página</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-green-800 mb-2">PROYECTO PRÁCTICO - Página personal básica (10 min)</h4>
            <p className="text-green-700 mb-3">Crear una página personal que incluya:</p>
            <ol className="text-green-700 space-y-1">
              <li>1. Header con nombre y navegación</li>
              <li>2. Sección "Sobre mí" con párrafos</li>
              <li>3. Lista de habilidades o intereses</li>
              <li>4. Sección de contacto con enlaces</li>
              <li>5. Footer con información adicional</li>
            </ol>
          </div>
        </div>
      </Section>

      {/* Resumen y Evaluación */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">¿Qué hemos aprendido?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Estructura básica de HTML
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Elementos fundamentales
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Organización con listas y contenedores
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Primeros elementos semánticos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Creación de una página web básica pero funcional
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium">
          <strong>Próximo día:</strong> Introduciremos formularios, multimedia y daremos nuestros primeros pasos con CSS para hacer que nuestra página se vea mejor.
        </p>
      </div>

      {/* Ejercicios para casa */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-purple-800 mb-3">Ejercicios para casa (Opcional)</h3>
        <ol className="text-purple-700 space-y-2">
          <li><strong>1. Mejorar la página personal:</strong> Añadir más secciones como "Experiencia" o "Proyectos"</li>
          <li><strong>2. Crear una segunda página:</strong> "sobre-mi.html" y enlazarla desde index.html</li>
          <li><strong>3. Investigar:</strong> Buscar 5 etiquetas HTML que no hayamos visto hoy</li>
        </ol>
      </div>

      {/* Recursos adicionales */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Recursos adicionales</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Documentación:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• MDN Web Docs</li>
              <li>• W3C Validator</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Imágenes gratuitas:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Unsplash</li>
              <li>• Pixabay</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Evaluación:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Ejercicios diarios (60%)</li>
              <li>• Proyecto final (40%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dia1Component;