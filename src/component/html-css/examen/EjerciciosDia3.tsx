"use client"
import React, { useState, JSX } from 'react';
import { CheckCircle, XCircle, Code, Search, AlertCircle, Trophy, ChevronRight, Eye, EyeOff, Palette, Layout, Type, Target } from 'lucide-react';

// Tipos para los ejercicios
type TipoEjercicio = 'opcion-multiple' | 'codigo-completar' | 'codigo-escribir' | 'verdadero-falso';
type Dificultad = 'Fácil' | 'Medio' | 'Difícil';

interface EjercicioBase {
  id: number;
  tipo: TipoEjercicio;
  categoria: string;
  dificultad: Dificultad;
  pregunta: string;
  explicacion: string;
}

interface EjercicioOpcionMultiple extends EjercicioBase {
  tipo: 'opcion-multiple';
  opciones: string[];
  respuestaCorrecta: number;
}

interface EjercicioVerdaderoFalso extends EjercicioBase {
  tipo: 'verdadero-falso';
  respuestaCorrecta: boolean;
}

interface EjercicioCodigoEscribir extends EjercicioBase {
  tipo: 'codigo-escribir';
  respuestaCorrecta: string;
  variacionesAceptadas?: string[];
}

interface EjercicioCodigoCompletar extends EjercicioBase {
  tipo: 'codigo-completar';
  codigoBase: string;
  respuestasCorrectas: string[];
}

type Ejercicio = EjercicioOpcionMultiple | EjercicioVerdaderoFalso | EjercicioCodigoEscribir | EjercicioCodigoCompletar;

// Tipo para las respuestas del usuario
type RespuestaUsuario = number | boolean | string | string[];

interface Respuestas {
  [key: number]: RespuestaUsuario;
}

const EjerciciosDia3: React.FC = () => {
  const [ejercicioActual, setEjercicioActual] = useState<number>(0);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [mostrarResultados, setMostrarResultados] = useState<boolean>(false);
  const [codigoVisibleIndex, setCodigoVisibleIndex] = useState<number | null>(null);

  const ejercicios: Ejercicio[] = [
    {
      id: 1,
      tipo: 'opcion-multiple',
      categoria: 'Selectores Avanzados',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la diferencia entre "article p" y "article > p"?',
      opciones: [
        'No hay diferencia, ambos seleccionan lo mismo',
        'El primero selecciona todos los p dentro de article, el segundo solo los hijos directos',
        'El segundo es más rápido que el primero',
        'El primero solo funciona en HTML5'
      ],
      respuestaCorrecta: 1,
      explicacion: '"article p" es un selector descendiente que selecciona TODOS los párrafos dentro de article (incluso anidados). "article > p" es un selector de hijo directo que solo selecciona párrafos que son hijos inmediatos de article.'
    },
    {
      id: 2,
      tipo: 'codigo-escribir',
      categoria: 'Selectores CSS',
      dificultad: 'Medio',
      pregunta: 'Escribe un selector que aplique estilos a enlaces que terminen en ".pdf":',
      respuestaCorrecta: 'a[href$=".pdf"]',
      variacionesAceptadas: [
        'a[href$=\'.pdf\']',
        'a[href$=".pdf"] {',
        'a[href$=\'.pdf\'] {'
      ],
      explicacion: 'El selector de atributos a[href$=".pdf"] usa el operador $ que significa "termina con". Esto selecciona todos los enlaces cuyo href termine en ".pdf".'
    },
    {
      id: 3,
      tipo: 'verdadero-falso',
      categoria: 'Pseudoclases',
      dificultad: 'Fácil',
      pregunta: 'La pseudoclase :hover solo funciona en elementos <a>.',
      respuestaCorrecta: false,
      explicacion: ':hover funciona en cualquier elemento HTML, no solo en enlaces. Puedes usarlo en divs, botones, imágenes, etc. para crear efectos interactivos.'
    },
    {
      id: 4,
      tipo: 'codigo-completar',
      categoria: 'Pseudoclases Estructurales',
      dificultad: 'Medio',
      pregunta: 'Completa el CSS para alternar colores en filas de tabla:',
      codigoBase: `tr:____(____)  {
    background-color: #f8f9fa;
}

tr:____(____)  {
    background-color: white;
}`,
      respuestasCorrectas: ['nth-child', 'even', 'nth-child', 'odd'],
      explicacion: 'nth-child(even) selecciona elementos pares (2, 4, 6...) y nth-child(odd) selecciona elementos impares (1, 3, 5...). Es perfecto para alternar estilos en listas o tablas.'
    },
    {
      id: 5,
      tipo: 'opcion-multiple',
      categoria: 'Pseudoelementos',
      dificultad: 'Difícil',
      pregunta: '¿Cuál es la diferencia entre ::before y :before?',
      opciones: [
        '::before es la sintaxis moderna (CSS3), :before es la antigua',
        ':before es más específico que ::before',
        'No hay diferencia, son exactamente iguales',
        '::before solo funciona en navegadores modernos'
      ],
      respuestaCorrecta: 0,
      explicacion: '::before es la sintaxis moderna de CSS3 para pseudoelementos (doble dos puntos). :before es la sintaxis antigua que aún funciona por compatibilidad, pero se recomienda usar ::before.'
    },
    {
      id: 6,
      tipo: 'codigo-escribir',
      categoria: 'Box Model',
      dificultad: 'Medio',
      pregunta: 'Escribe CSS para aplicar box-sizing border-box a todos los elementos:',
      respuestaCorrecta: '* { box-sizing: border-box; }',
      variacionesAceptadas: [
        '*{box-sizing:border-box;}',
        '* {\n  box-sizing: border-box;\n}',
        'box-sizing: border-box;'
      ],
      explicacion: 'El selector universal (*) aplica estilos a todos los elementos. box-sizing: border-box hace que el padding y border se incluyan en el ancho total, facilitando el diseño.'
    },
    {
      id: 7,
      tipo: 'opcion-multiple',
      categoria: 'Modelo de Caja',
      dificultad: 'Medio',
      pregunta: 'Si un elemento tiene width: 300px, padding: 20px y border: 2px, ¿cuál es su ancho total con box-sizing: content-box?',
      opciones: [
        '300px',
        '322px',
        '344px',
        '364px'
      ],
      respuestaCorrecta: 2,
      explicacion: 'Con content-box: ancho total = width + padding izquierdo + padding derecho + border izquierdo + border derecho = 300 + 20 + 20 + 2 + 2 = 344px.'
    },
    {
      id: 8,
      tipo: 'verdadero-falso',
      categoria: 'Posicionamiento',
      dificultad: 'Medio',
      pregunta: 'Un elemento con position: absolute se posiciona relativo al elemento padre más cercano que tenga position: relative.',
      respuestaCorrecta: true,
      explicacion: 'Correcto. Un elemento con position: absolute busca el ancestro más cercano con position: relative (o absolute/fixed) para usarlo como referencia. Si no encuentra ninguno, se posiciona relativo al viewport.'
    },
    {
      id: 9,
      tipo: 'codigo-completar',
      categoria: 'Posicionamiento',
      dificultad: 'Difícil',
      pregunta: 'Completa el CSS para centrar un elemento con position absolute:',
      codigoBase: `.centrado {
    position: absolute;
    top: ____;
    left: ____;
    transform: ____(-50%, -50%);
}`,
      respuestasCorrectas: ['50%', '50%', 'translate'],
      explicacion: 'Para centrar con position absolute: top: 50% y left: 50% posicionan la esquina superior izquierda en el centro, transform: translate(-50%, -50%) ajusta para centrar el elemento completo.'
    },
    {
      id: 10,
      tipo: 'opcion-multiple',
      categoria: 'Z-index',
      dificultad: 'Medio',
      pregunta: '¿Cuándo funciona la propiedad z-index?',
      opciones: [
        'Siempre, en cualquier elemento',
        'Solo en elementos con position: static',
        'Solo en elementos con position diferente de static',
        'Solo en elementos con display: block'
      ],
      respuestaCorrecta: 2,
      explicacion: 'z-index solo funciona en elementos posicionados (position: relative, absolute, fixed o sticky). No funciona en elementos con position: static (el valor por defecto).'
    },
    {
      id: 11,
      tipo: 'codigo-escribir',
      categoria: 'Google Fonts',
      dificultad: 'Fácil',
      pregunta: 'Escribe el HTML para importar la fuente "Roboto" de Google Fonts:',
      respuestaCorrecta: '<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">',
      variacionesAceptadas: [
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap">',
        '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">',
        'https://fonts.googleapis.com/css2?family=Roboto'
      ],
      explicacion: 'Para importar Google Fonts se usa un elemento <link> en el <head> con la URL de Google Fonts. Es importante incluir &display=swap para mejor rendimiento.'
    },
    {
      id: 12,
      tipo: 'opcion-multiple',
      categoria: 'Unidades CSS',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la diferencia entre em y rem?',
      opciones: [
        'em es para texto, rem es para contenedores',
        'em es relativo al padre, rem es relativo al elemento raíz',
        'rem es más moderno que em',
        'No hay diferencia práctica'
      ],
      respuestaCorrecta: 1,
      explicacion: 'em es relativo al font-size del elemento padre, mientras que rem es relativo al font-size del elemento raíz (<html>). rem es más predecible para sistemas de diseño consistentes.'
    },
    {
      id: 13,
      tipo: 'verdadero-falso',
      categoria: 'Unidades Responsive',
      dificultad: 'Medio',
      pregunta: 'La unidad vw representa el 1% del ancho del viewport.',
      respuestaCorrecta: true,
      explicacion: 'Correcto. vw (viewport width) representa el 1% del ancho del viewport. 100vw = 100% del ancho de la ventana del navegador. Similmente, vh = viewport height.'
    },
    {
      id: 14,
      tipo: 'codigo-completar',
      categoria: 'Variables CSS',
      dificultad: 'Medio',
      pregunta: 'Completa el código para definir y usar variables CSS:',
      codigoBase: `____ {
    --color-primario: #3498db;
    --espaciado: 1rem;
}

.boton {
    background-color: ____(____ ____ ____);
    padding: ____(____ ____ ____);
}`,
      respuestasCorrectas: [':root', 'var', '--color-primario', ')', 'var', '--espaciado', ')'],
      explicacion: 'Las variables CSS se definen en :root con -- al inicio del nombre. Se usan con var(--nombre-variable). Opcionalmente se puede añadir un valor fallback: var(--color, blue).'
    },
    {
      id: 15,
      tipo: 'opcion-multiple',
      categoria: 'Gradientes',
      dificultad: 'Difícil',
      pregunta: '¿Cuál es la sintaxis correcta para un gradiente lineal de azul a rojo hacia la derecha?',
      opciones: [
        'background: linear-gradient(blue, red);',
        'background: linear-gradient(to right, blue, red);',
        'background: linear-gradient(right, blue, red);',
        'background: gradient(to right, blue, red);'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La sintaxis correcta es linear-gradient(to right, color1, color2). "to right" especifica la dirección. Sin dirección, el gradiente va de arriba hacia abajo por defecto.'
    },
    {
      id: 16,
      tipo: 'codigo-escribir',
      categoria: 'Box Shadow',
      dificultad: 'Medio',
      pregunta: 'Escribe CSS para una sombra básica (2px horizontal, 2px vertical, 5px blur, color negro semi-transparente):',
      respuestaCorrecta: 'box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);',
      variacionesAceptadas: [
        'box-shadow: 2px 2px 5px rgba(0,0,0,0.2);',
        'box-shadow: 2px 2px 5px rgba(0, 0, 0, .2);',
        'box-shadow:2px 2px 5px rgba(0,0,0,0.2);'
      ],
      explicacion: 'box-shadow tiene la sintaxis: horizontal vertical blur spread color. En este caso: 2px derecha, 2px abajo, 5px de difuminado, sin spread, color negro con 20% de opacidad.'
    },
    {
      id: 17,
      tipo: 'verdadero-falso',
      categoria: 'Text Shadow',
      dificultad: 'Fácil',
      pregunta: 'text-shadow funciona igual que box-shadow pero para texto.',
      respuestaCorrecta: true,
      explicacion: 'Correcto. text-shadow aplica sombras al texto usando una sintaxis similar a box-shadow: horizontal vertical blur color. Es útil para efectos de texto y mejorar legibilidad.'
    },
    {
      id: 18,
      tipo: 'opcion-multiple',
      categoria: 'Especificidad',
      dificultad: 'Difícil',
      pregunta: '¿Cuál de estos selectores tiene mayor especificidad?',
      opciones: [
        '.clase p',
        '#id',
        'div.clase',
        'p:hover'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Los IDs (#id) tienen la mayor especificidad (100 puntos), seguidos por clases (.clase = 10 puntos) y elementos (p = 1 punto). #id gana sobre cualquier combinación de clases y elementos.'
    },
    {
      id: 19,
      tipo: 'codigo-completar',
      categoria: 'Tooltips',
      dificultad: 'Difícil',
      pregunta: 'Completa el CSS para crear un tooltip que aparezca al hacer hover:',
      codigoBase: `.tooltip {
    position: relative;
}

.tooltip____(____)  {
    content: ____(____ ____);
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip:____::after {
    opacity: 1;
}`,
      respuestasCorrectas: ['::after', ':hover', 'attr', 'data-tooltip', ')', 'hover'],
      explicacion: 'Los tooltips usan ::after para crear contenido, attr(data-tooltip) para obtener el texto del atributo HTML, y :hover para mostrar/ocultar con opacity.'
    },
    {
      id: 20,
      tipo: 'opcion-multiple',
      categoria: 'Mejores Prácticas',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la mejor práctica para organizar las propiedades CSS?',
      opciones: [
        'Orden alfabético',
        'Por importancia personal',
        'Posicionamiento → Box Model → Tipografía → Visual',
        'Colores primero, luego el resto'
      ],
      respuestaCorrecta: 2,
      explicacion: 'La práctica recomendada es: 1) Posicionamiento (position, top, left), 2) Box Model (display, width, margin, padding), 3) Tipografía (font, text-align), 4) Visual (color, background, border).'
    }
  ];

  const manejarRespuesta = (valor: RespuestaUsuario): void => {
    setRespuestas(prev => ({
      ...prev,
      [ejercicioActual]: valor
    }));
  };

  const siguienteEjercicio = (): void => {
    if (ejercicioActual < ejercicios.length - 1) {
      setEjercicioActual(ejercicioActual + 1);
    } else {
      setMostrarResultados(true);
    }
  };

  const ejercicioAnterior = (): void => {
    if (ejercicioActual > 0) {
      setEjercicioActual(ejercicioActual - 1);
    }
  };

  const calcularPuntaje = (): { correctas: number; total: number; porcentaje: number } => {
    let correctas = 0;
    ejercicios.forEach((ejercicio, index) => {
      const respuestaUsuario = respuestas[index];
      
      if (ejercicio.tipo === 'opcion-multiple') {
        if (respuestaUsuario === ejercicio.respuestaCorrecta) correctas++;
      } else if (ejercicio.tipo === 'verdadero-falso') {
        if (respuestaUsuario === ejercicio.respuestaCorrecta) correctas++;
      } else if (ejercicio.tipo === 'codigo-escribir') {
        if (respuestaUsuario && typeof respuestaUsuario === 'string' && (
          respuestaUsuario.toLowerCase().trim().includes(ejercicio.respuestaCorrecta.toLowerCase().trim()) ||
          ejercicio.variacionesAceptadas?.some(variacion => 
            respuestaUsuario.toLowerCase().trim().includes(variacion.toLowerCase().trim())
          )
        )) {
          correctas++;
        }
      } else if (ejercicio.tipo === 'codigo-completar') {
        if (respuestaUsuario && Array.isArray(respuestaUsuario)) {
          const todasCorrectas = ejercicio.respuestasCorrectas.every((correcta, i) => 
            respuestaUsuario[i]?.toLowerCase().trim() === correcta.toLowerCase().trim()
          );
          if (todasCorrectas) correctas++;
        }
      }
    });
    
    return { correctas, total: ejercicios.length, porcentaje: (correctas / ejercicios.length) * 100 };
  };

  const reiniciarEjercicios = (): void => {
    setEjercicioActual(0);
    setRespuestas({});
    setMostrarResultados(false);
    setCodigoVisibleIndex(null);
  };

  const toggleCodigoVisible = (index: number): void => {
    setCodigoVisibleIndex(codigoVisibleIndex === index ? null : index);
  };

  if (mostrarResultados) {
    const { correctas, total, porcentaje } = calcularPuntaje();
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-3 p-6 rounded-lg ${
            porcentaje >= 80 ? 'bg-green-100' : porcentaje >= 60 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <Trophy size={32} className={
              porcentaje >= 80 ? 'text-green-600' : porcentaje >= 60 ? 'text-yellow-600' : 'text-red-600'
            } />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Resultados</h2>
              <p className="text-lg">
                {correctas} de {total} ejercicios correctos ({porcentaje.toFixed(1)}%)
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {porcentaje >= 80 ? '¡Excelente dominio de CSS intermedio!' :
                 porcentaje >= 60 ? 'Buen trabajo, revisa algunos conceptos' :
                 'Necesitas repasar más los temas del día 3'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {ejercicios.map((ejercicio, index) => {
            const respuestaUsuario = respuestas[index];
            let esCorrecta: boolean = false;
            
            if (ejercicio.tipo === 'opcion-multiple') {
              esCorrecta = respuestaUsuario === ejercicio.respuestaCorrecta;
            } else if (ejercicio.tipo === 'verdadero-falso') {
              esCorrecta = respuestaUsuario === ejercicio.respuestaCorrecta;
            } else if (ejercicio.tipo === 'codigo-escribir') {
              esCorrecta = Boolean(respuestaUsuario && typeof respuestaUsuario === 'string' && (
                respuestaUsuario.toLowerCase().trim().includes(ejercicio.respuestaCorrecta.toLowerCase().trim()) ||
                ejercicio.variacionesAceptadas?.some(variacion => 
                  respuestaUsuario.toLowerCase().trim().includes(variacion.toLowerCase().trim())
                )
              ));
            } else if (ejercicio.tipo === 'codigo-completar') {
              if (respuestaUsuario && Array.isArray(respuestaUsuario)) {
                esCorrecta = ejercicio.respuestasCorrectas.every((correcta, i) => 
                  respuestaUsuario[i]?.toLowerCase().trim() === correcta.toLowerCase().trim()
                );
              }
            }

            return (
              <div key={ejercicio.id} className={`p-4 rounded-lg border-l-4 ${
                esCorrecta ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  {esCorrecta ? 
                    <CheckCircle className="text-green-600 mt-1" size={20} /> :
                    <XCircle className="text-red-600 mt-1" size={20} />
                  }
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Ejercicio {index + 1}: {ejercicio.pregunta}
                    </h3>
                    
                    {(ejercicio.tipo === 'codigo-escribir' || ejercicio.tipo === 'codigo-completar') && (
                      <div>
                        <button
                          onClick={() => toggleCodigoVisible(index)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-2"
                        >
                          {codigoVisibleIndex === index ? <EyeOff size={16} /> : <Eye size={16} />}
                          {codigoVisibleIndex === index ? 'Ocultar' : 'Ver'} respuesta correcta
                        </button>
                        
                        {codigoVisibleIndex === index && (
                          <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto mb-2">
                            <code>
                              {ejercicio.tipo === 'codigo-escribir' 
                                ? ejercicio.respuestaCorrecta 
                                : ejercicio.tipo === 'codigo-completar'
                                ? ejercicio.respuestasCorrectas.join(', ')
                                : ''
                              }
                            </code>
                          </pre>
                        )}
                      </div>
                    )}
                    
                    <p className="text-gray-700 text-sm">{ejercicio.explicacion}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={reiniciarEjercicios}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reintentar Ejercicios
          </button>
        </div>
      </div>
    );
  }

  const ejercicio = ejercicios[ejercicioActual];

  const getCategoryIcon = (categoria: string): JSX.Element => {
    if (categoria.includes('Selectores') || categoria.includes('CSS')) return <Search size={16} />;
    if (categoria.includes('Pseudoclases') || categoria.includes('Pseudoelementos')) return <Target size={16} />;
    if (categoria.includes('Box') || categoria.includes('Posicionamiento') || categoria.includes('Z-index')) return <Layout size={16} />;
    if (categoria.includes('Fonts') || categoria.includes('Unidades') || categoria.includes('Text')) return <Type size={16} />;
    if (categoria.includes('Variables') || categoria.includes('Gradientes') || categoria.includes('Shadow')) return <Palette size={16} />;
    return <Code size={16} />;
  };

  const isRespuestaEmpty = (respuesta: RespuestaUsuario | undefined): boolean => {
    if (respuesta === undefined || respuesta === null) return true;
    if (typeof respuesta === 'string') return respuesta.trim() === '';
    if (Array.isArray(respuesta)) return respuesta.length === 0 || respuesta.every(item => !item || item.trim() === '');
    return false;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Ejercicios de Evaluación - Día 3</h1>
        <p className="text-lg">CSS Intermedio</p>
        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex justify-between items-center text-sm">
            <span>Progreso: {ejercicioActual + 1} de {ejercicios.length}</span>
            <span className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${
                ejercicio.dificultad === 'Fácil' ? 'bg-green-200 text-green-800' :
                ejercicio.dificultad === 'Medio' ? 'bg-yellow-200 text-yellow-800' :
                'bg-red-200 text-red-800'
              }`}>
                {ejercicio.dificultad}
              </span>
              <span className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                {getCategoryIcon(ejercicio.categoria)}
                {ejercicio.categoria}
              </span>
            </span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((ejercicioActual + 1) / ejercicios.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Ejercicio Actual */}
      <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Ejercicio {ejercicioActual + 1}: {ejercicio.pregunta}
        </h2>

        {/* Opción Múltiple */}
        {ejercicio.tipo === 'opcion-multiple' && (
          <div className="space-y-3">
            {ejercicio.opciones.map((opcion, index) => (
              <label key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="opcion"
                  value={index}
                  checked={respuestas[ejercicioActual] === index}
                  onChange={() => manejarRespuesta(index)}
                  className="mr-3"
                />
                <span className="font-mono text-sm">{opcion}</span>
              </label>
            ))}
          </div>
        )}

        {/* Verdadero/Falso */}
        {ejercicio.tipo === 'verdadero-falso' && (
          <div className="space-y-3">
            {[true, false].map((valor) => (
              <label key={valor.toString()} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="verdadero-falso"
                  value={valor.toString()}
                  checked={respuestas[ejercicioActual] === valor}
                  onChange={() => manejarRespuesta(valor)}
                  className="mr-3"
                />
                <span className={`font-medium ${valor ? 'text-green-700' : 'text-red-700'}`}>
                  {valor ? '✓ Verdadero' : '✗ Falso'}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Código para escribir */}
        {ejercicio.tipo === 'codigo-escribir' && (
          <div>
            <div className="mb-3 p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                💡 <strong>Consejo:</strong> Escribe solo la sintaxis CSS necesaria, sin llaves adicionales a menos que se especifique.
              </p>
            </div>
            <textarea
              value={typeof respuestas[ejercicioActual] === 'string' ? respuestas[ejercicioActual] as string : ''}
              onChange={(e) => manejarRespuesta(e.target.value)}
              placeholder="Escribe tu código CSS aquí..."
              className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50 resize-none"
            />
          </div>
        )}

        {/* Código para completar */}
        {ejercicio.tipo === 'codigo-completar' && (
          <div>
            <div className="mb-4">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{ejercicio.codigoBase}</code>
              </pre>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Completa los espacios en blanco (escribe solo las palabras que faltan, separadas por comas):
            </p>
            <input
              type="text"
              value={Array.isArray(respuestas[ejercicioActual]) ? (respuestas[ejercicioActual] as string[]).join(', ') : ''}
              onChange={(e) => manejarRespuesta(e.target.value.split(', '))}
              placeholder="Ejemplo: nth-child, even, nth-child, odd"
              className="w-full p-3 border rounded-lg font-mono text-sm"
            />
          </div>
        )}
      </div>

      {/* Navegación */}
      <div className="flex justify-between items-center">
        <button
          onClick={ejercicioAnterior}
          disabled={ejercicioActual === 0}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Anterior
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <AlertCircle size={16} />
          <span>Puedes cambiar tu respuesta antes de continuar</span>
        </div>

        <button
          onClick={siguienteEjercicio}
          disabled={isRespuestaEmpty(respuestas[ejercicioActual])}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 flex items-center gap-2 transition-colors"
        >
          {ejercicioActual === ejercicios.length - 1 ? 'Finalizar' : 'Siguiente'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EjerciciosDia3;