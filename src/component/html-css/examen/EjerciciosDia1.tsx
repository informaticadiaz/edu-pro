"use client"
import React, { useState } from 'react';
import { CheckCircle, XCircle, Code, FileText, AlertCircle, Trophy, ChevronRight, Eye, EyeOff } from 'lucide-react';

const EjerciciosDia1 = () => {
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [codigoVisibleIndex, setCodigoVisibleIndex] = useState(null);

  const ejercicios = [
    {
      id: 1,
      tipo: 'opcion-multiple',
      categoria: 'Conceptos Básicos',
      dificultad: 'Fácil',
      pregunta: '¿Qué significa HTML?',
      opciones: [
        'HyperText Markup Language',
        'HighTech Modern Language',
        'HyperLink Text Management Language',
        'Home Tool Markup Language'
      ],
      respuestaCorrecta: 0,
      explicacion: 'HTML significa HyperText Markup Language (Lenguaje de Marcado de Hipertexto). Es un lenguaje de marcado, no de programación, que define la estructura y contenido de páginas web.'
    },
    {
      id: 2,
      tipo: 'codigo-completar',
      categoria: 'Estructura HTML',
      dificultad: 'Fácil',
      pregunta: 'Completa la estructura básica de un documento HTML5:',
      codigoBase: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <____>Mi Primera Página</____>
</head>
<____>
    <h1>¡Hola Mundo!</h1>
    <p>Esta es mi primera página web.</p>
</____>
</html>`,
      respuestasCorrectas: ['title', '/title', 'body', '/body'],
      explicacion: 'La estructura básica incluye: DOCTYPE html, elemento html con idioma, head con metadatos y title, y body con el contenido visible.'
    },
    {
      id: 3,
      tipo: 'opcion-multiple',
      categoria: 'Elementos HTML',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la diferencia principal entre <strong> y <b>?',
      opciones: [
        'No hay diferencia, son exactamente iguales',
        '<strong> es semántico (importante), <b> es solo visual (negrita)',
        '<b> es semántico, <strong> es solo visual',
        '<strong> solo funciona en HTML5'
      ],
      respuestaCorrecta: 1,
      explicacion: '<strong> tiene significado semántico (indica importancia), mientras que <b> es solo un efecto visual. Es mejor usar <strong> para mantener la semántica del contenido.'
    },
    {
      id: 4,
      tipo: 'verdadero-falso',
      categoria: 'Elementos HTML',
      dificultad: 'Fácil',
      pregunta: 'Solo debe haber un elemento <h1> por página para una buena práctica de SEO.',
      respuestaCorrecta: true,
      explicacion: 'Es una buena práctica tener solo un <h1> por página ya que representa el título principal y ayuda a los motores de búsqueda a entender la jerarquía del contenido.'
    },
    {
      id: 5,
      tipo: 'codigo-escribir',
      categoria: 'Enlaces e Imágenes',
      dificultad: 'Medio',
      pregunta: 'Escribe el código HTML para crear un enlace que abra Google en una nueva pestaña:',
      respuestaCorrecta: '<a href="https://www.google.com" target="_blank">Google</a>',
      variacionesAceptadas: [
        '<a target="_blank" href="https://www.google.com">Google</a>',
        '<a href="https://google.com" target="_blank">Google</a>'
      ],
      explicacion: 'El atributo target="_blank" hace que el enlace se abra en una nueva pestaña. Es importante incluir href con la URL completa.'
    },
    {
      id: 6,
      tipo: 'opcion-multiple',
      categoria: 'Elementos Semánticos',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la diferencia entre <div> y <span>?',
      opciones: [
        '<div> es para texto, <span> es para imágenes',
        '<div> es elemento de bloque, <span> es elemento en línea',
        '<span> es más moderno que <div>',
        'No hay diferencia práctica'
      ],
      respuestaCorrecta: 1,
      explicacion: '<div> es un elemento de bloque que ocupa toda la línea disponible, mientras que <span> es un elemento en línea que solo ocupa el espacio necesario.'
    },
    {
      id: 7,
      tipo: 'codigo-completar',
      categoria: 'Listas',
      dificultad: 'Medio',
      pregunta: 'Completa este código para crear una lista ordenada de pasos:',
      codigoBase: `<____>
    <____>Abrir VS Code</____>
    <____>Crear archivo HTML</____>
    <____>Escribir código</____>
    <____>Guardar archivo</____>
</____>`,
      respuestasCorrectas: ['ol', 'li', '/li', 'li', '/li', 'li', '/li', 'li', '/li', '/ol'],
      explicacion: 'Para listas ordenadas usamos <ol> (ordered list) y cada elemento va dentro de <li> (list item). Para listas no ordenadas usaríamos <ul>.'
    },
    {
      id: 8,
      tipo: 'verdadero-falso',
      categoria: 'Atributos',
      dificultad: 'Fácil',
      pregunta: 'El atributo "alt" en las imágenes es obligatorio para la accesibilidad.',
      respuestaCorrecta: true,
      explicacion: 'El atributo "alt" proporciona texto alternativo para usuarios con discapacidades visuales y es fundamental para la accesibilidad web.'
    },
    {
      id: 9,
      tipo: 'codigo-escribir',
      categoria: 'Estructura Semántica',
      dificultad: 'Difícil',
      pregunta: 'Escribe la estructura básica de una página usando elementos semánticos (header, main, footer):',
      respuestaCorrecta: `<header>
<h1>Título del Sitio</h1>
</header>
<main>
<p>Contenido principal</p>
</main>
<footer>
<p>© 2025 Mi Sitio</p>
</footer>`,
      explicacion: 'Los elementos semánticos dan significado al contenido: <header> para encabezados, <main> para contenido principal, <footer> para pie de página.'
    },
    {
      id: 10,
      tipo: 'opcion-multiple',
      categoria: 'Mejores Prácticas',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la mejor práctica para comentarios en HTML?',
      opciones: [
        '// Este es un comentario',
        '/* Este es un comentario */',
        '<!-- Este es un comentario -->',
        '# Este es un comentario'
      ],
      respuestaCorrecta: 2,
      explicacion: 'En HTML, los comentarios se escriben entre <!-- y -->. No se muestran en el navegador pero son útiles para documentar el código.'
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
          respuestaUsuario.toLowerCase().includes(ejercicio.respuestaCorrecta.toLowerCase()) ||
          ejercicio.variacionesAceptadas?.some(variacion => 
            respuestaUsuario.toLowerCase().includes(variacion.toLowerCase())
          )
        )) {
          correctas++;
        }
      } else if (ejercicio.tipo === 'codigo-completar') {
        if (respuestaUsuario && Array.isArray(respuestaUsuario)) {
          const todasCorrectas = ejercicio.respuestasCorrectas.every((correcta, i) => 
            respuestaUsuario[i]?.toLowerCase() === correcta.toLowerCase()
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
                respuestaUsuario.toLowerCase().includes(ejercicio.respuestaCorrecta.toLowerCase()) ||
                ejercicio.variacionesAceptadas?.some(variacion => 
                  respuestaUsuario.toLowerCase().includes(variacion.toLowerCase())
                )
              );
            } else if (ejercicio.tipo === 'codigo-completar') {
              if (respuestaUsuario && Array.isArray(respuestaUsuario)) {
                esCorrecta = ejercicio.respuestasCorrectas.every((correcta, i) => 
                  respuestaUsuario[i]?.toLowerCase() === correcta.toLowerCase()
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
                          <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto mb-2">
                            <code>{ejercicio.respuestaCorrecta}</code>
                          </pre>
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar Ejercicios
          </button>
        </div>
      </div>
    );
  }

  const ejercicio = ejercicios[ejercicioActual];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Ejercicios de Evaluación - Día 1</h1>
        <p className="text-lg">Fundamentos de HTML</p>
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
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">
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
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Ejercicio {ejercicioActual + 1}: {ejercicio.pregunta}
        </h2>

        {/* Opción Múltiple */}
        {ejercicio.tipo === 'opcion-multiple' && (
          <div className="space-y-3">
            {ejercicio.opciones.map((opcion, index) => (
              <label key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
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
              <label key={valor.toString()} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="verdadero-falso"
                  value={valor.toString()}
                  checked={respuestas[ejercicioActual] === valor}
                  onChange={() => manejarRespuesta(valor)}
                  className="mr-3"
                />
                <span>{valor ? 'Verdadero' : 'Falso'}</span>
              </label>
            ))}
          </div>
        )}

        {/* Código para escribir */}
        {ejercicio.tipo === 'codigo-escribir' && (
          <div>
            <textarea
              value={respuestas[ejercicioActual] || ''}
              onChange={(e) => manejarRespuesta(e.target.value)}
              placeholder="Escribe tu código HTML aquí..."
              className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50"
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
              placeholder="Ejemplo: title, /title, body, /body"
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
          className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 flex items-center gap-2"
        >
          {ejercicioActual === ejercicios.length - 1 ? 'Finalizar' : 'Siguiente'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EjerciciosDia1;