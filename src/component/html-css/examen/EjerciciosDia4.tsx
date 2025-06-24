"use client"
import React, { useState } from 'react';
import { CheckCircle, XCircle, Code, Grid, AlertCircle, Trophy, ChevronRight, Eye, EyeOff, Layout, Smartphone, Monitor, Award } from 'lucide-react';

const EjerciciosDia4 = () => {
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [codigoVisibleIndex, setCodigoVisibleIndex] = useState(null);

  const ejercicios = [
    {
      id: 1,
      tipo: 'opcion-multiple',
      categoria: 'Flexbox Conceptos',
      dificultad: 'Fácil',
      pregunta: '¿Cuál es la principal diferencia entre Flexbox y CSS Grid?',
      opciones: [
        'Flexbox es más moderno que Grid',
        'Flexbox es unidimensional, Grid es bidimensional',
        'Grid solo funciona en navegadores nuevos',
        'No hay diferencia práctica'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Flexbox es un sistema de layout unidimensional (trabaja en una dirección: fila o columna), mientras que CSS Grid es bidimensional (trabaja con filas Y columnas simultáneamente).'
    },
    {
      id: 2,
      tipo: 'codigo-escribir',
      categoria: 'Flexbox Básico',
      dificultad: 'Fácil',
      pregunta: 'Escribe CSS para activar Flexbox en un contenedor:',
      respuestaCorrecta: 'display: flex;',
      variacionesAceptadas: [
        'display:flex;',
        'display: flex',
        'display:flex'
      ],
      explicacion: 'Para activar Flexbox se usa "display: flex" en el elemento contenedor. Esto convierte automáticamente a todos los hijos directos en flex items.'
    },
    {
      id: 3,
      tipo: 'opcion-multiple',
      categoria: 'Flexbox Propiedades',
      dificultad: 'Medio',
      pregunta: '¿Qué hace justify-content: space-between?',
      opciones: [
        'Centra todos los elementos',
        'Distribuye elementos con espacio igual entre ellos',
        'Pone todos los elementos al final',
        'Hace que los elementos ocupen todo el espacio'
      ],
      respuestaCorrecta: 1,
      explicacion: 'justify-content: space-between distribuye los elementos con espacio igual entre ellos. El primer elemento va al inicio, el último al final, y los demás se distribuyen uniformemente.'
    },
    {
      id: 4,
      tipo: 'codigo-completar',
      categoria: 'Flexbox Layout',
      dificultad: 'Medio',
      pregunta: 'Completa el CSS para centrar elementos horizontal y verticalmente con Flexbox:',
      codigoBase: `.contenedor {
    display: flex;
    ____-content: ____;
    ____-items: ____;
    height: 100vh;
}`,
      respuestasCorrectas: ['justify', 'center', 'align', 'center'],
      explicacion: 'Para centrar con Flexbox: justify-content: center (centra en el eje principal/horizontal), align-items: center (centra en el eje cruzado/vertical).'
    },
    {
      id: 5,
      tipo: 'verdadero-falso',
      categoria: 'Flex Items',
      dificultad: 'Medio',
      pregunta: 'La propiedad flex: 1 hace que un elemento tome todo el espacio disponible restante.',
      respuestaCorrecta: true,
      explicacion: 'Correcto. flex: 1 es equivalente a flex: 1 1 0%, lo que significa que el elemento puede crecer para ocupar el espacio disponible restante.'
    },
    {
      id: 6,
      tipo: 'opcion-multiple',
      categoria: 'CSS Grid Básico',
      dificultad: 'Medio',
      pregunta: '¿Cuál es la sintaxis correcta para crear 3 columnas iguales en CSS Grid?',
      opciones: [
        'grid-template-columns: 1fr 1fr 1fr;',
        'grid-template-columns: repeat(3, 1fr);',
        'grid-columns: 3;',
        'Tanto A como B son correctas'
      ],
      respuestaCorrecta: 3,
      explicacion: 'Ambas sintaxis son correctas y equivalentes: "1fr 1fr 1fr" y "repeat(3, 1fr)" crean 3 columnas de igual tamaño usando fracciones flexibles.'
    },
    {
      id: 7,
      tipo: 'codigo-escribir',
      categoria: 'CSS Grid',
      dificultad: 'Medio',
      pregunta: 'Escribe CSS para crear un gap de 20px entre elementos de grid:',
      respuestaCorrecta: 'gap: 20px;',
      variacionesAceptadas: [
        'gap:20px;',
        'grid-gap: 20px;',
        'grid-gap:20px;'
      ],
      explicacion: 'La propiedad "gap" (antes grid-gap) establece el espacio entre elementos del grid tanto en filas como en columnas. Es más concisa que usar row-gap y column-gap por separado.'
    },
    {
      id: 8,
      tipo: 'codigo-completar',
      categoria: 'Grid Areas',
      dificultad: 'Difícil',
      pregunta: 'Completa el CSS para un layout con áreas nombradas:',
      codigoBase: `.page-layout {
    display: grid;
    grid-template-____: 
        "____ ____ ____"
        "____ main ____"
        "____ ____ ____";
}

.header { grid-____: header; }
.main { grid-____: main; }`,
      respuestasCorrectas: ['areas', 'header', 'header', 'header', 'sidebar', 'sidebar', 'footer', 'footer', 'footer', 'area', 'area'],
      explicacion: 'grid-template-areas define áreas nombradas usando strings. Cada string representa una fila, cada palabra un área. Luego se asignan con grid-area.'
    },
    {
      id: 9,
      tipo: 'opcion-multiple',
      categoria: 'Media Queries',
      dificultad: 'Fácil',
      pregunta: '¿Qué significa "mobile first" en diseño responsive?',
      opciones: [
        'Diseñar solo para móviles',
        'Empezar con estilos para móvil y expandir hacia pantallas más grandes',
        'Los móviles son más importantes que desktop',
        'Usar solo min-width en media queries'
      ],
      respuestaCorrecta: 1,
      explicacion: '"Mobile first" significa comenzar con estilos base para móviles y usar media queries con min-width para ir agregando estilos para pantallas más grandes progresivamente.'
    },
    {
      id: 10,
      tipo: 'codigo-escribir',
      categoria: 'Media Queries',
      dificultad: 'Medio',
      pregunta: 'Escribe una media query para pantallas de al menos 768px de ancho:',
      respuestaCorrecta: '@media screen and (min-width: 768px)',
      variacionesAceptadas: [
        '@media (min-width: 768px)',
        '@media screen and (min-width:768px)',
        '@media(min-width:768px)'
      ],
      explicacion: 'Media query con min-width aplica estilos cuando la pantalla es mayor o igual al valor especificado. "screen and" es opcional pero es una buena práctica.'
    },
    {
      id: 11,
      tipo: 'verdadero-falso',
      categoria: 'Responsive Design',
      dificultad: 'Fácil',
      pregunta: 'La unidad vw representa el 1% del ancho del viewport.',
      respuestaCorrecta: true,
      explicacion: 'Correcto. vw (viewport width) = 1% del ancho del viewport. 100vw = ancho completo de la pantalla. Igualmente vh = viewport height.'
    },
    {
      id: 12,
      tipo: 'opcion-multiple',
      categoria: 'Flexbox vs Grid',
      dificultad: 'Medio',
      pregunta: '¿Cuándo es mejor usar Flexbox en lugar de Grid?',
      opciones: [
        'Siempre, Flexbox es más moderno',
        'Para layouts de componentes individuales y alineación en una dimensión',
        'Solo para navegación horizontal',
        'Nunca, Grid puede hacer todo'
      ],
      respuestaCorrecta: 1,
      explicacion: 'Flexbox es ideal para: componentes individuales (navbar, cards), alineación en una dimensión, distribución de espacio. Grid es mejor para layouts de página completa.'
    },
    {
      id: 13,
      tipo: 'codigo-completar',
      categoria: 'Responsive Grid',
      dificultad: 'Difícil',
      pregunta: 'Completa el CSS para un grid responsive (1 col móvil, 2 tablet, 3 desktop):',
      codigoBase: `.galeria {
    display: grid;
    gap: 20px;
    grid-template-columns: ____;
}

@media screen and (min-width: 768px) {
    .galeria {
        grid-template-columns: ____(____, ____);
    }
}

@media screen and (min-width: 1024px) {
    .galeria {
        grid-template-columns: ____(____, ____);
    }
}`,
      respuestasCorrectas: ['1fr', 'repeat', '2', '1fr', 'repeat', '3', '1fr'],
      explicacion: 'Mobile first: inicia con 1fr (1 columna), tablet 768px+ usa repeat(2, 1fr), desktop 1024px+ usa repeat(3, 1fr). Cada breakpoint sobrescribe el anterior.'
    },
    {
      id: 14,
      tipo: 'opcion-multiple',
      categoria: 'Flexbox Dirección',
      dificultad: 'Medio',
      pregunta: '¿Qué hace flex-direction: column?',
      opciones: [
        'Crea columnas como CSS Grid',
        'Cambia el eje principal de horizontal a vertical',
        'Solo funciona con 3 elementos',
        'Es lo mismo que flex-direction: row'
      ],
      respuestaCorrecta: 1,
      explicacion: 'flex-direction: column cambia el eje principal de horizontal (row) a vertical (column). Los elementos se apilan verticalmente en lugar de horizontalmente.'
    },
    {
      id: 15,
      tipo: 'verdadero-falso',
      categoria: 'CSS Grid',
      dificultad: 'Medio',
      pregunta: 'CSS Grid puede crear layouts que se adaptan automáticamente sin media queries usando auto-fit.',
      respuestaCorrecta: true,
      explicacion: 'Correcto. grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) crea un grid que se adapta automáticamente, añadiendo/quitando columnas según el espacio disponible.'
    },
    {
      id: 16,
      tipo: 'codigo-escribir',
      categoria: 'Flexbox Wrap',
      dificultad: 'Medio',
      pregunta: 'Escribe CSS para que los flex items se envuelvan en nuevas líneas cuando sea necesario:',
      respuestaCorrecta: 'flex-wrap: wrap;',
      variacionesAceptadas: [
        'flex-wrap:wrap;',
        'flex-wrap: wrap',
        'flex-flow: row wrap;'
      ],
      explicacion: 'flex-wrap: wrap permite que los flex items se envuelvan en nuevas líneas cuando no caben en una sola línea. Por defecto es nowrap.'
    },
    {
      id: 17,
      tipo: 'opcion-multiple',
      categoria: 'Breakpoints',
      dificultad: 'Fácil',
      pregunta: '¿Cuáles son los breakpoints comunes para responsive design?',
      opciones: [
        '480px, 768px, 1024px, 1200px',
        '500px, 800px, 1000px',
        '320px, 640px, 960px',
        'Solo 768px y 1024px'
      ],
      respuestaCorrecta: 0,
      explicacion: 'Los breakpoints estándar son: 480px (móvil grande), 768px (tablet), 1024px (desktop), 1200px (desktop grande). Pueden variar según el proyecto.'
    },
    {
      id: 18,
      tipo: 'codigo-completar',
      categoria: 'Flexbox Navbar',
      dificultad: 'Medio',
      pregunta: 'Completa el CSS para un navbar responsive con Flexbox:',
      codigoBase: `.navbar {
    display: flex;
    ____-content: ____-between;
    ____-items: center;
    padding: 15px 20px;
}

.nav-links {
    display: flex;
    ____: 20px;
}`,
      respuestasCorrectas: ['justify', 'space', 'align', 'gap'],
      explicacion: 'Navbar típico: justify-content: space-between (logo a la izquierda, nav a la derecha), align-items: center (centrado vertical), gap para espaciado entre enlaces.'
    },
    {
      id: 19,
      tipo: 'verdadero-falso',
      categoria: 'Grid Auto',
      dificultad: 'Difícil',
      pregunta: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) crea columnas que se ajustan automáticamente al contenido.',
      respuestaCorrecta: true,
      explicacion: 'Correcto. auto-fit con minmax crea columnas que se ajustan automáticamente: mínimo 250px, máximo 1fr. Si hay espacio, las columnas crecen; si no, se crean nuevas filas.'
    },
    {
      id: 20,
      tipo: 'opcion-multiple',
      categoria: 'Proyecto Portfolio',
      dificultad: 'Medio',
      pregunta: 'Para un portfolio profesional, ¿cuál es la mejor estructura de archivos CSS?',
      opciones: [
        'Todo en un solo archivo styles.css',
        'styles.css principal + responsive.css para media queries',
        'Un archivo CSS por cada sección HTML',
        'CSS inline para mejor rendimiento'
      ],
      respuestaCorrecta: 1,
      explicacion: 'La mejor práctica es separar: styles.css (estilos principales) + responsive.css (media queries). Esto mantiene el código organizado y facilita el mantenimiento.'
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

  const getNivelMaestria = (porcentaje) => {
    if (porcentaje >= 90) return { nivel: '🏆 Experto', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (porcentaje >= 80) return { nivel: '🥇 Avanzado', color: 'text-green-600', bg: 'bg-green-100' };
    if (porcentaje >= 70) return { nivel: '🥈 Competente', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (porcentaje >= 60) return { nivel: '🥉 Básico', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { nivel: '📚 En desarrollo', color: 'text-red-600', bg: 'bg-red-100' };
  };

  if (mostrarResultados) {
    const { correctas, total, porcentaje } = calcularPuntaje();
    const maestria = getNivelMaestria(porcentaje);
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-3 p-6 rounded-lg ${maestria.bg}`}>
            <Trophy size={32} className={maestria.color} />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">¡Curso Completado!</h2>
              <p className="text-lg">
                {correctas} de {total} ejercicios correctos ({porcentaje.toFixed(1)}%)
              </p>
              <p className={`text-lg font-medium ${maestria.color}`}>
                Nivel de maestría: {maestria.nivel}
              </p>
            </div>
          </div>

          {porcentaje >= 80 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="text-green-600" size={24} />
                <h3 className="text-lg font-bold text-green-800">¡Felicitaciones!</h3>
              </div>
              <p className="text-green-700">
                Has completado exitosamente el curso de HTML y CSS. Ahora tienes las habilidades 
                necesarias para crear sitios web modernos y responsivos.
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Layout className="mx-auto mb-2 text-blue-600" size={24} />
            <h3 className="font-semibold text-blue-800">Flexbox</h3>
            <p className="text-sm text-blue-600">Layouts unidimensionales</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <Grid className="mx-auto mb-2 text-purple-600" size={24} />
            <h3 className="font-semibold text-purple-800">CSS Grid</h3>
            <p className="text-sm text-purple-600">Layouts bidimensionales</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <Smartphone className="mx-auto mb-2 text-green-600" size={24} />
            <h3 className="font-semibold text-green-800">Responsive</h3>
            <p className="text-sm text-green-600">Diseño adaptativo</p>
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

        <div className="text-center space-y-4">
          <button
            onClick={reiniciarEjercicios}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Reintentar Ejercicios
          </button>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">🎓 Próximos pasos recomendados:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold">Tecnologías a aprender:</h4>
                <ul className="list-disc list-inside">
                  <li>JavaScript (interactividad)</li>
                  <li>React, Vue o Angular</li>
                  <li>Node.js (backend)</li>
                  <li>Bases de datos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Herramientas útiles:</h4>
                <ul className="list-disc list-inside">
                  <li>Git y GitHub</li>
                  <li>Sass/SCSS</li>
                  <li>Webpack/Vite</li>
                  <li>Frameworks CSS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ejercicio = ejercicios[ejercicioActual];

  const getCategoryIcon = (categoria) => {
    if (categoria.includes('Flexbox')) return <Layout size={16} />;
    if (categoria.includes('Grid')) return <Grid size={16} />;
    if (categoria.includes('Media') || categoria.includes('Responsive') || categoria.includes('Breakpoints')) return <Smartphone size={16} />;
    if (categoria.includes('Portfolio') || categoria.includes('Proyecto')) return <Award size={16} />;
    return <Code size={16} />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8 bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Ejercicios de Evaluación - Día 4</h1>
        <p className="text-lg">CSS Avanzado y Proyecto Final</p>
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
              <span className="bg-emerald-200 text-emerald-800 px-2 py-1 rounded text-xs flex items-center gap-1">
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
            <div className="mb-3 p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-700">
                💡 <strong>Consejo:</strong> Escribe solo la propiedad y valor CSS necesarios, sin llaves adicionales.
              </p>
            </div>
            <textarea
              value={respuestas[ejercicioActual] || ''}
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
              value={respuestas[ejercicioActual]?.join?.(', ') || ''}
              onChange={(e) => manejarRespuesta(e.target.value.split(', '))}
              placeholder="Ejemplo: justify, center, align, center"
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
          <span>¡Último día! Da lo mejor de ti</span>
        </div>

        <button
          onClick={siguienteEjercicio}
          disabled={respuestas[ejercicioActual] === undefined || respuestas[ejercicioActual] === ''}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 flex items-center gap-2 transition-colors"
        >
          {ejercicioActual === ejercicios.length - 1 ? '🎓 Finalizar Curso' : 'Siguiente'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EjerciciosDia4;