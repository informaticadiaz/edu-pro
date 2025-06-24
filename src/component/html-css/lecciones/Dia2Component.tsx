import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Target, CheckCircle, Code, Palette, FileText, Play } from 'lucide-react';

const Dia2Component = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const CodeBlock = ({ children }) => (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{children}</code>
    </pre>
  );

  const CSSCodeBlock = ({ children }) => (
    <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{children}</code>
    </pre>
  );

  const Section = ({ id, title, children, duration, icon }) => {
    const IconComponent = icon || FileText;
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

  const ExerciseBox = ({ title, children, type = "practice" }) => {
    const bgColor = type === "practice" ? "bg-orange-50" : "bg-green-50";
    const textColor = type === "practice" ? "text-orange-800" : "text-green-800";
    const itemColor = type === "practice" ? "text-orange-700" : "text-green-700";
    
    return (
      <div className={`${bgColor} p-4 rounded-lg`}>
        <h4 className={`text-lg font-semibold ${textColor} mb-2 flex items-center gap-2`}>
          <Play size={18} />
          {title}
        </h4>
        <div className={itemColor}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">DÍA 2: HTML AVANZADO E INTRODUCCIÓN A CSS</h1>
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            Duración: 3 horas
          </span>
          <span className="flex items-center gap-1">
            <Target size={16} />
            Objetivo: Dominar HTML semántico y aplicar estilos básicos con CSS
          </span>
        </div>
      </div>

      {/* Bloque 1 */}
      <Section id="bloque1" title="BLOQUE 1: HTML SEMÁNTICO Y FORMULARIOS" duration="1 hora" icon={Code}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.1 Repaso del día anterior (10 min)</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Revisión de tareas opcionales</li>
              <li>Resolución de dudas</li>
              <li>Verificación de que todos tienen sus páginas funcionando</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.2 HTML Semántico avanzado (15 min)</h4>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h5 className="font-semibold text-blue-800 mb-2">¿Por qué HTML semántico?</h5>
              <ul className="text-blue-700 space-y-1">
                <li>• Mejor SEO (posicionamiento en buscadores)</li>
                <li>• Accesibilidad mejorada</li>
                <li>• Código más legible y mantenible</li>
                <li>• Estándares web modernos</li>
              </ul>
            </div>

            <CodeBlock>
{`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Blog Personal</title>
</head>
<body>
    <header>
        <h1>Mi Blog Personal</h1>
        <nav>
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="blog">
            <h2>Últimas Entradas</h2>
            
            <article>
                <header>
                    <h3>Mi primer artículo</h3>
                    <p>Publicado el <time datetime="2025-06-19">19 de junio, 2025</time></p>
                </header>
                <p>Contenido del artículo...</p>
                <footer>
                    <p>Categorías: <a href="#tech">Tecnología</a></p>
                </footer>
            </article>
        </section>

        <aside>
            <h4>Sobre el autor</h4>
            <p>Información adicional sobre mí...</p>
        </aside>
    </main>

    <footer>
        <p>&copy; 2025 Mi Blog. Todos los derechos reservados.</p>
    </footer>
</body>
</html>`}
            </CodeBlock>

            <div className="mt-4">
              <h5 className="font-semibold mb-2">Elementos semánticos clave:</h5>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <ul className="space-y-1 text-gray-700">
                  <li><code className="bg-gray-100 px-1 rounded">&lt;section&gt;</code>: Sección temática</li>
                  <li><code className="bg-gray-100 px-1 rounded">&lt;article&gt;</code>: Contenido independiente</li>
                  <li><code className="bg-gray-100 px-1 rounded">&lt;aside&gt;</code>: Contenido secundario</li>
                </ul>
                <ul className="space-y-1 text-gray-700">
                  <li><code className="bg-gray-100 px-1 rounded">&lt;time&gt;</code>: Fechas y horas</li>
                  <li><code className="bg-gray-100 px-1 rounded">&lt;figure&gt;</code>: Imágenes con descripción</li>
                  <li><code className="bg-gray-100 px-1 rounded">&lt;figcaption&gt;</code>: Descripción de imagen</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">1.3 Formularios HTML (25 min)</h4>
            
            <h5 className="font-semibold mb-3">Formulario básico de contacto:</h5>
            <CodeBlock>
{`<section id="contacto">
    <h2>Contacto</h2>
    <form action="/procesar-contacto" method="POST">
        
        <!-- Campos de texto -->
        <label for="nombre">Nombre completo:</label>
        <input type="text" id="nombre" name="nombre" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <!-- Área de texto -->
        <label for="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" rows="5" cols="30" required></textarea>

        <!-- Select dropdown -->
        <label for="asunto">Asunto:</label>
        <select id="asunto" name="asunto">
            <option value="">Selecciona un asunto</option>
            <option value="consulta">Consulta general</option>
            <option value="trabajo">Oportunidad laboral</option>
        </select>

        <!-- Radio buttons -->
        <fieldset>
            <legend>¿Cómo nos conociste?</legend>
            <input type="radio" id="redes" name="conociste" value="redes">
            <label for="redes">Redes sociales</label>
        </fieldset>

        <!-- Botones -->
        <button type="submit">Enviar mensaje</button>
        <button type="reset">Limpiar formulario</button>
    </form>
</section>`}
            </CodeBlock>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Tipos de input importantes:</h5>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• <code>text</code>: Texto normal</li>
                  <li>• <code>email</code>: Email (validación automática)</li>
                  <li>• <code>password</code>: Contraseña (oculta texto)</li>
                  <li>• <code>tel</code>: Teléfono</li>
                  <li>• <code>date</code>: Fecha</li>
                  <li>• <code>file</code>: Subir archivos</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h5 className="font-semibold text-yellow-800 mb-2">Atributos importantes:</h5>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• <code>required</code>: Campo obligatorio</li>
                  <li>• <code>placeholder</code>: Texto de ayuda</li>
                  <li>• <code>maxlength</code>: Longitud máxima</li>
                  <li>• <code>min/max</code>: Valores mínimo/máximo</li>
                </ul>
              </div>
            </div>
          </div>

          <ExerciseBox title="EJERCICIO PRÁCTICO 1 - Agregar formulario de contacto">
            <ol className="space-y-1">
              <li>1. Añadir sección de contacto a la página personal</li>
              <li>2. Crear formulario con diferentes tipos de campos</li>
              <li>3. Usar elementos semánticos apropiados</li>
            </ol>
          </ExerciseBox>
        </div>
      </Section>

      {/* Bloque 2 */}
      <Section id="bloque2" title="BLOQUE 2: MULTIMEDIA Y ELEMENTOS AVANZADOS" duration="45 min" icon={FileText}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.1 Audio y Video (15 min)</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Audio:</h5>
                <CodeBlock>
{`<section>
    <h3>Mi podcast</h3>
    <audio controls>
        <source src="podcast.mp3" type="audio/mpeg">
        <source src="podcast.ogg" type="audio/ogg">
        Tu navegador no soporta audio.
    </audio>
</section>`}
                </CodeBlock>
              </div>
              
              <div>
                <h5 className="font-semibold mb-2">Video:</h5>
                <CodeBlock>
{`<section>
    <h3>Video</h3>
    <video width="560" height="315" 
           controls poster="miniatura.jpg">
        <source src="video.mp4" type="video/mp4">
        Tu navegador no soporta video.
    </video>
</section>`}
                </CodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">2.2 Favicon y metadatos (10 min)</h4>
            <CodeBlock>
{`<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Título y descripción -->
    <title>Juan Pérez - Desarrollador Web</title>
    <meta name="description" content="Portfolio personal">
    <meta name="keywords" content="desarrollador, web, HTML, CSS">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    
    <!-- Open Graph para redes sociales -->
    <meta property="og:title" content="Juan Pérez - Desarrollador Web">
    <meta property="og:description" content="Portfolio personal">
</head>`}
            </CodeBlock>
          </div>

          <ExerciseBox title="EJERCICIO PRÁCTICO 2 - Enriquecer la página">
            <ol className="space-y-1">
              <li>1. Añadir favicon</li>
              <li>2. Mejorar metadatos</li>
              <li>3. Insertar un video o iframe</li>
              <li>4. Validar el HTML</li>
            </ol>
          </ExerciseBox>
        </div>
      </Section>

      {/* Bloque 3 */}
      <Section id="bloque3" title="BLOQUE 3: INTRODUCCIÓN A CSS" duration="1 hora 15 min" icon={Palette}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.1 ¿Qué es CSS? (10 min)</h4>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <p className="text-lg font-medium text-purple-800 mb-2">
                <strong>CSS</strong> = <strong>C</strong>ascading <strong>S</strong>tyle <strong>S</strong>heets
              </p>
              <p className="text-purple-700">(Hojas de Estilo en Cascada)</p>
            </div>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Controla la presentación</strong> visual del HTML</li>
              <li><strong>Separa contenido de diseño</strong></li>
              <li>Permite crear sitios web atractivos y responsive</li>
              <li>Se basa en <strong>selectores</strong> y <strong>propiedades</strong></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.2 Formas de incluir CSS (15 min)</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">1. CSS en línea (inline):</h5>
                <CodeBlock>
{`<p style="color: red; font-size: 18px;">Texto rojo y grande</p>`}
                </CodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">2. CSS interno:</h5>
                <CodeBlock>
{`<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
        h1 {
            color: green;
            text-align: center;
        }
    </style>
</head>`}
                </CodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">3. CSS externo (recomendado):</h5>
                <CodeBlock>
{`<head>
    <link rel="stylesheet" href="estilos.css">
</head>`}
                </CodeBlock>

                <p className="text-sm text-gray-600 mt-2 mb-2">Archivo estilos.css:</p>
                <CSSCodeBlock>
{`/* Este es un comentario en CSS */
p {
    color: navy;
    font-size: 16px;
    line-height: 1.5;
}

h1 {
    color: darkgreen;
    text-align: center;
    font-family: Arial, sans-serif;
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.3 Selectores básicos (20 min)</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Selector de elemento:</h5>
                <CSSCodeBlock>
{`/* Todos los párrafos */
p {
    color: black;
}

/* Todos los h1 */
h1 {
    font-size: 32px;
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Selector de clase:</h5>
                <CodeBlock>
{`<!-- HTML -->
<p class="destacado">Párrafo importante</p>
<p>Párrafo normal</p>`}
                </CodeBlock>
                <CSSCodeBlock>
{`/* CSS - clase con punto */
.destacado {
    background-color: yellow;
    font-weight: bold;
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Selector de ID:</h5>
                <CodeBlock>
{`<!-- HTML - solo un elemento por ID -->
<div id="encabezado-principal">Contenido único</div>`}
                </CodeBlock>
                <CSSCodeBlock>
{`/* CSS - ID con almohadilla */
#encabezado-principal {
    background-color: navy;
    color: white;
    padding: 20px;
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.4 Propiedades básicas (20 min)</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Colores:</h5>
                <CSSCodeBlock>
{`.ejemplo-colores {
    /* Nombres de colores */
    color: red;
    background-color: lightblue;
    
    /* Hexadecimal */
    color: #ff0000;
    background-color: #add8e6;
    
    /* RGB */
    color: rgb(255, 0, 0);
    
    /* RGBA (con transparencia) */
    background-color: rgba(173, 216, 230, 0.5);
}`}
                </CSSCodeBlock>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Tipografía:</h5>
                <CSSCodeBlock>
{`.texto-ejemplo {
    /* Familia de fuentes */
    font-family: Arial, Helvetica, sans-serif;
    
    /* Tamaño */
    font-size: 18px;
    
    /* Peso */
    font-weight: bold;
    
    /* Estilo */
    font-style: italic;
    
    /* Alineación */
    text-align: center;
    
    /* Espaciado */
    line-height: 1.5;
    letter-spacing: 1px;
}`}
                </CSSCodeBlock>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">3.5 Ejemplo práctico de CSS (10 min)</h4>
            
            <CSSCodeBlock>
{`/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Estilos generales */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

/* Header */
header {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    text-align: center;
}

/* Navegación */
nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 20px;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 3px;
}

nav a:hover {
    background-color: #34495e;
}

/* Contenido principal */
main {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}`}
            </CSSCodeBlock>
          </div>

          <ExerciseBox title="EJERCICIO PRÁCTICO 3 - Aplicar CSS">
            <ol className="space-y-1">
              <li>1. Crear archivo estilos.css</li>
              <li>2. Enlazarlo al HTML</li>
              <li>3. Aplicar estilos básicos a todos los elementos</li>
              <li>4. Experimentar con colores y fuentes</li>
              <li>5. Añadir efectos hover a los enlaces</li>
            </ol>
          </ExerciseBox>
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
                HTML semántico avanzado
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Formularios completos y funcionales
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Multimedia e iframes
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Metadatos y SEO básico
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Fundamentos de CSS
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-200" />
                Primera transformación visual de nuestro sitio
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium">
          <strong>Próximo día:</strong> Profundizaremos en CSS con selectores avanzados, el modelo de caja, posicionamiento y comenzaremos con layouts más complejos.
        </p>
      </div>
    </div>
  );
};

export default Dia2Component;