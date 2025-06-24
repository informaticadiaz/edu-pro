import React, { useState } from 'react';
import { CheckCircle, XCircle, Code, FileText, AlertCircle, Trophy, ChevronRight, Eye, EyeOff, Palette, Edit3 } from 'lucide-react';

const EjerciciosDia2 = () => {
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [codigoVisibleIndex, setCodigoVisibleIndex] = useState(null);

  const ejercicios = [
    {
      id: 1,
      tipo: 'opcion-multiple',
      categoria: 'HTML Semántico',
      dificultad: 'Fácil',
      pregunta: '¿Cuál es la principal ventaja del HTML semántico?',
      opciones: [
        'Hace que el sitio web se vea mejor',
        'Mejora el SEO y la accesibilidad',
        'Reduce el tamaño del archivo',
        'Hace que el código sea más corto'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El HTML semántico mejora el SEO (posicionamiento en buscadores), la accesibilidad para usuarios con discapacidades, y hace el código más legible y mantenible.'
    },
    {
      id: 2,
      tipo: 'codigo-completar',
      categoria: 'Elementos Semánticos',
      dificultad: 'Medio',
      pregunta: 'Completa la estructura semántica de un artículo de blog:',
      codigoBase: `<____>
    <____>
        <h3>Mi primer artículo</h3>
        <p>Publicado el <____ datetime="2025-06-19">19 de junio, 2025</____></p>
    </____>
    <p>Contenido del artículo...</p>
    <footer>
        <p>Categorías: <a href="#tech">Tecnología</a></p>
    </footer>
</____>`,
      respuestasCorrectas: ['article', 'header', 'time', '/time', '/header', '/article'],
      explicacion: 'Los elementos semánticos clave son: <article> para contenido independiente, <header> para encabezado del artículo, <time> para fechas, y <footer> para información adicional.'
    },
    {
      id: 3,
      tipo: 'opcion-multiple',
      categoria: 'Formularios',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la diferencia entre los métodos GET y POST en formularios?',
      opciones: [
        'GET es más rápido que POST',
        'POST es solo para imágenes, GET para texto',
        'GET envía datos en la URL, POST en el cuerpo del mensaje',
        'No hay diferencia práctica'
      ],
      respuestaCorrecta: 2,
      explicacion: 'GET envía los datos como parámetros en la URL (visible), mientras que POST los envía en el cuerpo del mensaje HTTP (no visible en la URL). POST es más seguro para datos sensibles.'
    },
    {
      id: 4,
      tipo: 'codigo-escribir',
      categoria: 'Formularios',
      dificultad: 'Medio',
      pregunta: 'Crea un input de email obligatorio con placeholder "Tu email":',
      respuestaCorrecta: '<input type="email" required placeholder="Tu email">',
      variacionesAceptadas: [
        '<input type="email" placeholder="Tu email" required>',
        '<input required type="email" placeholder="Tu email">',
        '<input placeholder="Tu email" type="email" required>'
      ],
      explicacion: 'Un input de email necesita type="email" para validación automática, required para hacerlo obligatorio, y placeholder para texto de ayuda.'
    },
    {
      id: 5,
      tipo: 'verdadero-falso',
      categoria: 'Formularios',
      dificultad: 'Fácil',
      pregunta: 'El atributo "name" en los inputs es necesario para que el servidor reciba los datos del formulario.',
      respuestaCorrecta: true,
      explicacion: 'El atributo "name" es fundamental porque identifica cada campo cuando se envían los datos al servidor. Sin él, el servidor no puede procesar la información.'
    },
    {
      id: 6,
      tipo: 'opcion-multiple',
      categoria: 'Multimedia',
      dificultad: 'Medio',
      pregunta: '¿Cuál es el propósito del elemento <source> dentro de <video>?',
      opciones: [
        'Añadir subtítulos al video',
        'Proporcionar múltiples formatos del mismo video',
        'Controlar el volumen del video',
        'Añadir una imagen de vista previa'
      ],
      respuestaCorrecta: 1,
      explicacion: 'El elemento <source> permite especificar múltiples formatos del mismo video (MP4, WebM, etc.) para asegurar compatibilidad con diferentes navegadores.'
    },
    {
      id: 7,
      tipo: 'codigo-completar',
      categoria: 'CSS Básico',
      dificultad: 'Fácil',
      pregunta: 'Completa la sintaxis para aplicar CSS externo:',
      codigoBase: `<head>
    <meta charset="UTF-8">
    <title>Mi Página</title>
    <____ rel="____" href="estilos.css">
</head>`,
      respuestasCorrectas: ['link', 'stylesheet'],
      explicacion: 'Para enlazar CSS externo usamos <link rel="stylesheet" href="archivo.css"> dentro del <head>. Esta es la mejor práctica para proyectos reales.'
    },
    {
      id: 8,
      tipo: 'opcion-multiple',
      categoria: 'CSS Selectores',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la diferencia entre seleccionar por clase y por ID en CSS?',
      opciones: [
        'Las clases son más rápidas que los IDs',
        'Los IDs usan # y son únicos, las clases usan . y pueden repetirse',
        'Los IDs solo funcionan con JavaScript',
        'No hay diferencia técnica'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Los IDs se seleccionan con # y deben ser únicos en la página. Las clases se seleccionan con . y pueden usarse en múltiples elementos.'
    },
    {
      id: 9,
      tipo: 'codigo-escribir',
      categoria: 'CSS Propiedades',
      dificultad: 'Medio',
      pregunta: 'Escribe CSS para hacer un texto rojo, centrado y en negrita:',
      respuestaCorrecta: `color: red;
text-align: center;
font-weight: bold;`,
      variacionesAceptadas: [
        'color: red; text-align: center; font-weight: bold;',
        'font-weight: bold; color: red; text-align: center;',
        'text-align: center; color: red; font-weight: bold;'
      ],
      explicacion: 'Para esto necesitamos: color para el color del texto, text-align para la alineación, y font-weight para el peso de la fuente.'
    },
    {
      id: 10,
      tipo: 'verdadero-falso',
      categoria: 'Metadatos',
      dificultad: 'Fácil',
      pregunta: 'Los metadatos Open Graph son importantes para cómo se ve tu sitio cuando se comparte en redes sociales.',
      respuestaCorrecta: true,
      explicacion: 'Los metadatos Open Graph (og:title, og:description, og:image) controlan cómo se muestra tu página cuando se comparte en redes sociales como Facebook y Twitter.'
    },
    {
      id: 11,
      tipo: 'codigo-completar',
      categoria: 'Formularios Avanzados',
      dificultad: 'Difícil',
      pregunta: 'Completa este código para crear radio buttons agrupados:',
      codigoBase: `<____>
    <legend>¿Cómo nos conociste?</legend>
    <input type="____" id="redes" name="____" value="redes">
    <label for="redes">Redes sociales</label>
    
    <input type="____" id="buscador" name="____" value="buscador">
    <label for="buscador">Buscador</label>
</____>`,
      respuestasCorrectas: ['fieldset', 'radio', 'conociste', 'radio', 'conociste', '/fieldset'],
      explicacion: '<fieldset> agrupa campos relacionados, <legend> proporciona título, y todos los radio buttons deben tener el mismo "name" para formar un grupo.'
    },
    {
      id: 12,
      tipo: 'opcion-multiple',
      categoria: 'CSS Colores',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la ventaja de usar RGBA en lugar de RGB?',
      opciones: [
        'RGBA es más rápido de procesar',
        'RGBA permite especificar transparencia (canal alfa)',
        'RGBA tiene mejor compatibilidad',
        'RGBA usa menos memoria'
      ],
      respuestaCorrecta: 1,
      explicacion: 'RGBA incluye el canal alfa (A) que permite especificar transparencia. El valor va de 0 (transparente) a 1 (opaco), ejemplo: rgba(255, 0, 0, 0.5) para rojo semi-transparente.'
    },
    {
      id: 13,
      tipo: 'verdadero-falso',
      categoria: 'CSS Cascada',
      dificultad: 'Medio',
      pregunta: 'CSS interno (en <style>) tiene mayor especificidad que CSS externo (archivo .css).',
      respuestaCorrecta: false,
      explicacion: 'La especificidad no depende de si el CSS es interno o externo, sino del tipo de selector usado. Ambos tienen la misma especificidad, pero el que aparezca último en el código tendrá prioridad.'
    },
    {
      id: 14,
      tipo: 'codigo-escribir',
      categoria: 'CSS Efectos',
      dificultad: 'Difícil',
      pregunta: 'Escribe CSS para crear un efecto hover que cambie el color de fondo a azul:',
      respuestaCorrecta: 'background-color: blue;',
      variacionesAceptadas: [
        'background: blue;',
        'background-color: #0000ff;',
        'background-color: rgb(0, 0, 255);'
      ],
      selector: '.boton:hover',
      explicacion: 'El pseudo-selector :hover se activa cuando el cursor está sobre el elemento. Se combina con el selector base, ejemplo: .boton:hover { background-color: blue; }'
    },
    {
      id: 15,
      tipo: 'opcion-multiple',
      categoria: 'Mejores Prácticas',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la mejor práctica para incluir CSS en un proyecto web?',
      opciones: [
        'CSS inline para mejor rendimiento',
        'CSS interno para mantener todo junto',
        'CSS externo para separar contenido y presentación',
        'Mezclar todos los métodos por igual'
      ],
      respuestaCorrecta: 2,
      explicacion: 'CSS externo es la mejor práctica porque separa contenido (HTML) de presentación (CSS), permite reutilización, facilita mantenimiento y mejora el rendimiento mediante cache.'
    }
  ];

  const manejarRespuesta = (valor) => {
    setRespuestas(prev => ({
      ...prev,
      [ejercicioActual]: valor
    }));
  };

  const siguienteEjercicio = () => {
    if (ejercicioActual < ejercicios.length - 1) {
      setEjercicioActual(ejercicioActual + 1);
    } else {
      setMostrarResultados(true);
    }
  };

  const ejercicioAnterior = () => {
    if (ejercicioActual > 0) {
      setEjercicioActual(ejercicioActual - 1);
    }
  };

  const calcularPuntaje = () => {
    let correctas = 0;
    ejercicios.forEach((ejercicio, index) => {
      const respuestaUsuario = respuestas[index];
      
      if (ejercicio.tipo === 'opcion-multiple' || ejercicio.tipo === 'verdadero-falso') {
        if (respuestaUsuario === ejercicio.respuestaCorrecta) correctas++;
      } else if (ejercicio.tipo === 'codigo-escribir') {
        if (respuestaUsuario && (
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

  const reiniciarEjercicios = () => {
    setEjercicioActual(0);
    setRespuestas({});
    setMostrarResultados(false);
    setCodigoVisibleIndex(null);
  };

  const toggleCodigoVisible = (index) => {
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
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {ejercicios.map((ejercicio, index) => {
            const respuestaUsuario = respuestas[index];
            let esCorrecta = false;
            
            if (ejercicio.tipo === 'opcion-multiple' || ejercicio.tipo === 'verdadero-falso') {
              esCorrecta = respuestaUsuario === ejercicio.respuestaCorrecta;
            } else if (ejercicio.tipo === 'codigo-escribir') {
              esCorrecta = respuestaUsuario && (
                respuestaUsuario.toLowerCase().trim().includes(ejercicio.respuestaCorrecta.toLowerCase().trim()) ||
                ejercicio.variacionesAceptadas?.some(variacion => 
                  respuestaUsuario.toLowerCase().trim().includes(variacion.toLowerCase().trim())
                )
              );
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
                    
                    {ejercicio.tipo === 'codigo-escribir' || ejercicio.tipo === 'codigo-completar' ? (
                      <div>
                        <button
                          onClick={() => toggleCodigoVisible(index)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-2"
                        >
                          {codigoVisibleIndex === index ? <EyeOff size={16} /> : <Eye size={16} />}
                          {codigoVisibleIndex === index ? 'Ocultar' : 'Ver'} respuesta correcta
                        </button>
                        
                        {codigoVisibleIndex === index && (
                          <div>
                            {ejercicio.selector && (
                              <p className="text-sm text-gray-600 mb-1">Selector: {ejercicio.selector}</p>
                            )}
                            <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto mb-2">
                              <code>{ejercicio.respuestaCorrecta}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ) : null}
                    
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
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Reintentar Ejercicios
          </button>
        </div>
      </div>
    );
  }

  const ejercicio = ejercicios[ejercicioActual];

  const getCategoryIcon = (categoria) => {
    if (categoria.includes('Semántico') || categoria.includes('Elementos')) return <FileText size={16} />;
    if (categoria.includes('Formularios')) return <Edit3 size={16} />;
    if (categoria.includes('CSS') || categoria.includes('Colores')) return <Palette size={16} />;
    return <Code size={16} />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Ejercicios de Evaluación - Día 2</h1>
        <p className="text-lg">HTML Avanzado e Introducción a CSS</p>
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
              <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs flex items-center gap-1">
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
                <span>{opcion}</span>
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
            {ejercicio.selector && (
              <div className="mb-3 p-2 bg-blue-50 rounded text-sm">
                <span className="font-medium text-blue-800">Selector: </span>
                <code className="text-blue-600">{ejercicio.selector}</code>
              </div>
            )}
            <textarea
              value={respuestas[ejercicioActual] || ''}
              onChange={(e) => manejarRespuesta(e.target.value)}
              placeholder={ejercicio.categoria.includes('CSS') ? 
                "Escribe las propiedades CSS aquí..." : 
                "Escribe tu código HTML aquí..."
              }
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
              Completa los espacios en blanco (escribe las etiquetas que faltan, separadas por comas):
            </p>
            <input
              type="text"
              value={respuestas[ejercicioActual]?.join?.(', ') || ''}
              onChange={(e) => manejarRespuesta(e.target.value.split(', '))}
              placeholder="Ejemplo: article, header, time, /time"
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
          disabled={respuestas[ejercicioActual] === undefined || respuestas[ejercicioActual] === ''}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 flex items-center gap-2 transition-colors"
        >
          {ejercicioActual === ejercicios.length - 1 ? 'Finalizar' : 'Siguiente'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EjerciciosDia2;