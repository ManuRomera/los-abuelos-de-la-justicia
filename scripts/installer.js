import { MODULE_ID, loadAssetMap } from "./assets.js";
import { ADVENTURE_PDF_PAGES } from "./adventure-text.js";

const FLAG_KEY = "abjKey";
const INDEX_SETTING = "installIndex";
const SHOWN_SETTING = "installerShown";
const COVER_SCENE_KEY = "scene_00_portada_los_abuelos_de_la_justicia";

const SCENE_ORDER = [
  COVER_SCENE_KEY,
  "scene_01_autocar_viaje_con_jubilados",
  "scene_02_hotel_recepcion",
  "scene_03_habitacion_hotel_cajas_negras",
  "scene_04_teatro_sala_chirigotas",
  "scene_05_teatro_tramoya_backstage",
  "scene_06_banco_exterior_atraco",
  "scene_07_callejuelas_cadiz_carnaval",
  "scene_08_muelle_puerto_cadiz",
  "scene_09_autocar_interior_desde_atras",
  "scene_10_autocar_interior_desde_delante",
  "scene_11_hotel_buffet_desayuno",
  "scene_12_hotel_salon_nocturno",
  "scene_13_azotea_teatro",
  "scene_14_hotel_pasillo_nocturno_cajas",
  "scene_15_teatro_foyer_entrada",
  "scene_16_teatro_pasillo_estampitas"
];

let coverAudio = null;

const ACTOR_GROUPS = {
  pc: "Pregenerados",
  npc: "PNJ",
  enemy: "Enemigos",
  extra: "Extras"
};

const ADVENTURE_PC_FOLDER = "PJ'S";

const SCENE_GUIDES = {
  scene_00_portada_los_abuelos_de_la_justicia: {
    title: "Portada: Los Abuelos de la Justicia",
    read: "Cádiz despierta en plena fiesta: confeti, sol, carnaval y un autocar cargado de jubilados que todavía no sabe que el viaje va a salirse por completo del programa. Frente al Gran Teatro Falla, la ciudad parece prometer una mañana de coplas, turistas y desayuno de hotel. Por supuesto, eso sería demasiado fácil.",
    gm: "Escena de portada e introducción visual. Al activarse intenta reproducir Héroes de Cádiz en bucle para abrir la sesión."
  },
  scene_01_autocar_viaje_con_jubilados: {
    title: "Autocar: viaje con jubilados",
    read: "El autocar avanza hacia Cádiz con ese temblor constante de aire acondicionado demasiado fuerte, bolsas de tela en los pasillos y conversaciones cruzadas que no terminan nunca. En la parte delantera, Alejandro, el animador, lleva horas hablando de superhéroes con una pasión capaz de agotar a una estatua. Todavía quedan kilómetros, paradas, bocadillos envueltos en papel de aluminio y una promesa misteriosa: mañana os espera una sorpresa.",
    gm: "Usa esta escena para presentar PJ y extras. Alejandro debe resultar pesado, entusiasta y poco profesional. Cerca de Cádiz anuncia los disfraces y el pase gratis a las chirigotas si van vestidos."
  },
  scene_02_hotel_recepcion: {
    title: "Hotel: recepción",
    read: "El hotel os recibe con luz de fluorescente, maletas chocando contra tobillos y una cola de jubilados que avanza con la solemnidad de una procesión. En recepción reparten llaves, habitaciones y explicaciones que nadie escucha del todo. Cádiz huele a sal y carnaval al otro lado de las puertas automáticas, pero ahora mismo lo urgente es saber dónde se cena y quién tiene habitación individual.",
    gm: "Entrega llaves, decide habitaciones y presenta a Doña Magdalena, La Puri, Anselmo y Eusebio. Alejandro insiste en la cita de las 10:30 en el hall."
  },
  scene_03_habitacion_hotel_cajas_negras: {
    title: "Habitación del hotel: cajas negras",
    read: "Cuando por fin llegáis a la habitación, la cama no está vacía. Sobre la colcha os espera una caja negra de plástico duro, sin bisagras visibles ni ranuras claras, con una pegatina escrita con una ortografía criminal: NO HABLIL ASTA LAS 10 am. La caja no parece querer abrirse. Y eso, naturalmente, la hace mucho más interesante.",
    gm: "Las cajas de los PJ son negras y resistentes. Las de otros jubilados son cajas normales de cartón. Mantén el misterio hasta el desayuno."
  },
  scene_04_teatro_sala_chirigotas: {
    title: "Teatro: sala de chirigotas",
    read: "El teatro vibra con palmas, focos, disfraces y un volumen pensado para atravesar sonotones, orgullo y paredes de hormigón. Las chirigotas arrancan carcajadas entre filas de jubilados encantados. Fuera, muy lejos para vuestros oídos, hay sirenas. Luego disparos. Pero dentro todo sigue sonando a copla, bombo y caja.",
    gm: "Los PJ no se enteran del atraco al principio por el volumen. Permite competición por asientos y caos amable antes de revelar la desaparición de sus compañeros."
  },
  scene_05_teatro_tramoya_backstage: {
    title: "Teatro: tramoya / backstage",
    read: "Tras el telón, el teatro deja de ser brillo y se convierte en cables, polvo, madera pintada y sombras demasiado estrechas. Las estampitas de La Puri marcan un camino improbable entre decorados y escaleras. Al fondo, voces tensas. Un rehén que carraspea. Un arma que se mueve. Y varios villanos de carnaval que quizá no han entendido del todo el concepto de villano.",
    gm: "Aquí estalla el enfrentamiento principal. La Bane está al principio en la azotea y puede entrar cuando la pelea esté avanzada."
  },
  scene_06_banco_exterior_atraco: {
    title: "Banco: exterior tras el atraco",
    read: "La calle frente al banco es un tapón de coches patrulla, curiosos, turistas disfrazados y agentes intentando que nadie se acerque. En el suelo quedan papeles, confeti, cristales y una tensión que corta más que el levante. Lo que empezó como una mañana de chirigotas acaba de convertirse en una noticia nacional.",
    gm: "Esta escena funciona como contexto visual del atraco y como enlace para el epílogo policial. Los GEO entran al final y detienen a los atracadores."
  },
  scene_07_callejuelas_cadiz_carnaval: {
    title: "Callejuelas de Cádiz en carnaval",
    read: "Cádiz se retuerce en callejuelas llenas de coplas, serpentinas, vasos de plástico y gente disfrazada que camina como si la ciudad entera fuese un escenario. Aquí una persecución puede perderse en una comparsa, una pista puede confundirse con una broma y un jubilado con capa puede pasar completamente desapercibido.",
    gm: "Úsala para transiciones, persecuciones o para el cierre si Anselmo huye."
  },
  scene_08_muelle_puerto_cadiz: {
    title: "Muelle / puerto de Cádiz",
    read: "El puerto abre la ciudad hacia un horizonte oscuro y salpicado de luces. Las gaviotas gritan sobre las barcas, el agua golpea contra los pantalanes y cualquier maleta parece sospechosa si uno la mira el tiempo suficiente. Si alguien quisiera desaparecer con varias bolsas de deporte llenas de dinero, este sería un sitio demasiado apropiado.",
    gm: "Escena ideal para la postcréditos principal de Anselmo con el botín."
  },
  scene_09_autocar_interior_desde_atras: {
    title: "Autocar: interior desde atrás",
    read: "Desde el fondo del autocar se ve una colección de cogotes, bolsas, abanicos y cabezas que se giran cada vez que Alejandro dice una barbaridad sobre Marvel. Alguien pela una mandarina. Alguien ronca. Alguien pregunta cuánto queda. La respuesta, por desgracia, nunca es buena.",
    gm: "Plano alternativo del viaje. Úsalo para conversaciones entre PJ y presentación de extras."
  },
  scene_10_autocar_interior_desde_delante: {
    title: "Autocar: interior desde delante",
    read: "Desde la parte delantera, el autocar parece un pequeño reino rodante gobernado por horarios, bolsas de medicamentos y la voz de Alejandro en modo conferencia. Cádiz se acerca, pero antes hay que sobrevivir a otra explicación sobre por qué Batman ganaría cualquier discusión.",
    gm: "Plano de Alejandro y anuncio final de la sorpresa."
  },
  scene_11_hotel_buffet_desayuno: {
    title: "Hotel: buffet de desayuno",
    read: "El buffet abre y el comedor se transforma en un campo de batalla con tostadoras. Hay platos imposibles, servilletas conquistadas, gente fotografiando cruasanes y jubilados que ya han aparecido vestidos de superhéroe antes de la hora. Cuando os ponéis los trajes, algo os recorre la piel: un hormigueo eléctrico, absurdo, imposible. Luego llegan los primeros síntomas.",
    gm: "Tirada de Ingesta dificultad 8 para no empacharse y perder 1 Salud. Al ponerse trajes, cambia a versiones heroicas o aplica sus beneficios."
  },
  scene_12_hotel_salon_nocturno: {
    title: "Hotel: salón nocturno",
    read: "El salón del hotel mezcla luces cálidas, música de otra década y mesas donde se juega como si hubiera escrituras en juego. Hay baile, dominó, cartas y miradas de reojo. A las 23:00, la fiesta termina de golpe: todos a sus habitaciones. Cádiz duerme poco, pero el IMSERSO tiene horarios.",
    gm: "Escena social previa a las cajas. Permite pistas de Anselmo mediante llamadas telefónicas."
  },
  scene_13_azotea_teatro: {
    title: "Azotea del teatro",
    read: "La azotea está abierta al viento de Cádiz. Desde aquí se ven luces de policía, tejados, antenas y una ciudad que sigue cantando aunque abajo haya rehenes. La Bane observa la calle como una torre de músculo y mala idea, con una mochila verde a la espalda que parece respirar.",
    gm: "La Bane puede comprobar la situación aquí antes de bajar. Si se desespera, activa la mochila y usa su versión dopada."
  },
  scene_14_hotel_pasillo_nocturno_cajas: {
    title: "Hotel: pasillo nocturno con cajas",
    read: "El pasillo del hotel tiene esa moqueta que apaga pasos y multiplica sospechas. Bajo la luz amarillenta, algunas puertas esconden ronquidos; otras, cajas. Una figura con disfraz puede cruzar al fondo y desaparecer antes de que nadie admita haberla visto.",
    gm: "Muestra que otros jubilados tienen cajas normales y quizá se prueban disfraces antes de tiempo."
  },
  scene_15_teatro_foyer_entrada: {
    title: "Teatro: foyer / entrada",
    read: "El foyer del teatro es un embudo de entradas, abanicos, programas y codazos educados. Todo el mundo quiere pasar primero, sentarse mejor y comentar que antes estas cosas estaban mejor organizadas. Nadie mira todavía al banco de enfrente. Nadie sospecha que la mañana va a salirse del programa.",
    gm: "Entrada a las chirigotas. Permite una escena ligera antes de que el atraco avance fuera de plano."
  },
  scene_16_teatro_pasillo_estampitas: {
    title: "Teatro: pasillo con estampitas",
    read: "Una estampita en el suelo. Luego otra. Y otra más, como migas de pan con santos impresos. El pasillo se estrecha, el ruido del escenario queda atrás y cada paso os acerca a la parte del teatro donde no llega el aplauso.",
    gm: "Pista directa de La Puri hacia la tramoya. Lentes progresivas dificultad 8 si quieres exigir tirada para seguirlas con prisa."
  }
};

const ADVENTURE_FULL_SECTIONS = [
  { title: "Sinopsis", body: "Los Abuelos de la Justicia cuenta el viaje a Cádiz de un grupo de jubilados que debe soportar a Alejandro, un animador obsesionado con los superhéroes. En el hotel reciben cajas con disfraces preparados para acudir gratis a una función de chirigotas. Los trajes, lavados con un jabón experimental de origen militar, otorgan poderes reales. La situación explota cuando una banda de atracadores disfrazados de supervillanos huye de un banco cercano y se refugia en el teatro tomando rehenes." },
  { title: "Personajes jubilados", body: "La aventura proporciona personajes pregenerados y sus versiones heroicas, aunque pueden usarse PJ propios. Durante las pruebas se usaron los arquetipos Deportista, Gañán, Jarry el Guarro, Viuda liberada y Suegra, ligeramente modificados. Si se crean PJ nuevos, el Sr. Ministro debe buscar perfiles que encajen con Flash, Batman, Superman, Wonder Woman y Cyborg. El personaje que encarne a Batman debe tener el talento Doraemon Skill para justificar los cachivaches del cinturón." },
  { title: "El elenco", body: "Alejandro es el animador friki del viaje: enorme, barbudo, pesado y capaz de hablar siete horas de cómics. La Puri es una abuela santurrona con estampitas para cualquier ocasión. Doña Magdalena es una binguera profesional, velocísima con los cartones y discreta interesada en Anselmo. Anselmo es un viudo merodeador, machista y necesitado de dinero fácil; sus llamadas durante la aventura son contactos con La Bane para ultimar el atraco." },
  { title: "Los atracadores", body: "La Bane lidera la banda: una mujer enorme, culturista, adicta al dopaje, con una mochila verde que puede activar para aumentar PRE y ROB en 3 puntos, subiendo Nervio a 17 y Salud a 31. El Bromas quiso ir de Joker y acabó de jockey. Flash del Revés lleva el traje mal planteado. Sr. Frío va vestido para el Polo Norte en Cádiz. 2 caretos interpreta mal a Dos Caras. El mantas intenta parecer Manta Negra con una manta, casco y mucho sudor." },
  { title: "El viaje a Cádiz", body: "El viaje dura 7 horas de autocar más 3 de paradas. Es el momento para presentar PJ y extras mientras Alejandro agota a todos con historias de superhéroes DC y críticas a Marvel. Cerca del hotel anuncia que ha alquilado disfraces en Chiclana y que, si acuden disfrazados al teatro al día siguiente, entrarán gratis al pase matutino de chirigotas con aperitivo incluido." },
  { title: "Llegada al hotel y paquetes", body: "La llegada al hotel del centro de Cádiz ocurre a las 19:00. Se reparten habitaciones y llaves. A las 20:00 abre el restaurante y el buffet se convierte en una batalla. Tras la cena hay fiesta en el salón hasta las 23:00. Al volver a sus habitaciones, cada PJ encuentra una caja negra de plástico duro con la pegatina NO HABLIL ASTA LAS 10 am. Las cajas de otros jubilados son de cartón normal, aunque los PJ no tienen por qué saberlo todavía." },
  { title: "Desayuno y transformación", body: "En el desayuno algunos jubilados ya aparecen disfrazados. El buffet requiere una tirada de Ingesta dificultad 8 para no empacharse y perder 1 Salud. Cuando los PJ se ponen los trajes sienten un hormigueo: Superman se vuelve ligero y fuerte; Batman sufre una voz ronca; Flash percibe el mundo más lento; Wonder Woman nota el látigo y el impulso de decir la verdad; Cyborg ve trayectorias, números y oye sonidos mecánicos al moverse." },
  { title: "De chirigotas y atracos", body: "A las 11:30 se abren las puertas del teatro y a las 12:00 empieza el recital. El volumen impide oír sirenas y disparos. A las 12:30 la banda atraca la Caja Rural del Sur frente al teatro. Un empleado pulsa la alarma y El Bromas le dispara. La policía acude, los atracadores huyen con el dinero y se refugian en el teatro, donde toman como rehenes a La Puri, Eusebio, Doña Magdalena y Anselmo cuando regresaban del baño." },
  { title: "¿Qué ha sido de sus amigos?", body: "La Puri deja un rastro de estampitas como migas de pan. Si los PJ lo siguen, llegan a la tramoya, donde están los rehenes y los atracadores salvo La Bane, que se encuentra en la azotea vigilando la situación. La pelea debe permitir que los jubilados descubran y exageren sus poderes heroicos. La Bane puede entrar cuando el combate esté en pleno apogeo." },
  { title: "Una traición inesperada", body: "Anselmo es la mente criminal detrás del atraco. Mientras los PJ se enfrentan a los villanos, aprovecha el caos para intentar escabullirse con las bolsas del dinero. Detectarlo requiere Lentes progresivas dificultad 10 por el jaleo. Tras la pelea, tanto si los PJ vencen como si no, los GEO entran por puertas y ventanas y arrestan a los villanos." },
  { title: "Epílogo", body: "Tras el arresto aparece un hombre de unos 80 años, traje, pelo engominado y gafas de sol. Con sonrisa de anuncio dental dice: Ustedes no me conocen, me llamo Julio Iglesias. Estoy formando un equipo. Se recomienda música épica de superhéroes y pasar después a la escena postcréditos adecuada." },
  { title: "Escenas postcréditos", body: "Si Anselmo huye con el botín, un taxi lo lleva hasta el puerto deportivo; descarga bolsas negras, sube a una fueraborda y se pierde en el horizonte con un brillo extraño en los ojos. Si Anselmo es arrestado, se ve una cárcel en noche de lluvia: un trueno ilumina su rostro, sus ojos brillan y derriba la pared de la celda antes de escapar." },
  { title: "Consejos para el Sr. Ministro", body: "Anselmo requiere interpretación: debe ser evidente que busca a Doña Magdalena por interés doméstico y económico. Sus llamadas deben sembrar sospechas. Si los jugadores investigan, pueden descubrir que trama algo. Debe dar algo de pena por su incapacidad para cuidarse, pero también resultar desagradable por su machismo." },
  { title: "Escena opcional: origen de los trajes", body: "Puede jugarse como prólogo o sueño. Dos hombres con trajes presurizados entran en una lavandería, sacan trajes de lavadoras y los meten en bolsas etiquetadas. Un equipo de limpieza retira restos de papel y se ve un tebeo deshecho. Los hombres llevan los trajes por pasillos hasta una sala con cinco cajas negras. La cámara asciende y revela una base secreta con bandera estadounidense." },
  { title: "Los trajes y sus poderes", body: "Los disfraces vienen de un bazar de Chiclana, pero pertenecían a una partida experimental del gobierno estadounidense para recrear superhéroes. Superman obtiene +4 ROB, +2 PRE, daño 4, inmunidad a balas y vuelo a 30 cm del suelo a 2 m/min. Batman obtiene +4 CAC, +2 GRA, planeo y voz ronca. Flash obtiene +4 PRE, +2 ROB y defensa activa contra 3 enemigos, con riesgo de Jamacuco o cadera. Wonder Woman obtiene +2 GRA, +2 ROB, brazales que bloquean golpes y balas como Nervio 21 y látigo. Cyborg obtiene +2 ROB, +2 PRE, visor térmico y de puntería con +2 a Lentes progresivas y +3 a Petanca." },
  { title: "Estadísticas de enemigos", body: "El Bromas, Flash del Revés, Sr. Frío, 2 caretos y El mantas se tratan como ladronzuelos: CAC +4, GRA +2, PRE +6, ROB +4, Bemoles 11, Nervio 14, Salud 21, 3D en Memoria, Lentes progresivas, Sonotone y Tollinas; 2D en Archiperres y Gimnasia. La Bane antes del chute usa esos mismos valores. Dopada pasa a CAC +6, GRA +2, PRE +8, ROB +8, Bemoles 11, Nervio 17, Salud 31, y añade Petanca a las habilidades con 2D." }
];

function defaultSkills(fill = 1) {
  return Object.fromEntries(["ambulatorio", "internes", "lentesProgresivas", "memoria", "sonotone", "telediarios", "batallitas", "discusion", "cotilleo", "salero", "silbido", "archiperres", "cosasDelCampo", "gimnasia", "nietos", "petanca", "susLabores", "ingesta", "mulaParda", "tollinas"].map((key) => [key, { dados: fill }]));
}

function skills(d3 = [], d2 = []) {
  const out = defaultSkills(1);
  for (const key of d2) out[key] = { dados: 2 };
  for (const key of d3) out[key] = { dados: 3 };
  return out;
}

function pjSystem(attrs, yayos, salud, jamacuco, d3, d2, data = {}) {
  return {
    datos: {
      arquetipo: data.arquetipo ?? "",
      arquetipoKey: data.arquetipoKey ?? "",
      arquetipoBase: data.arquetipoBase ?? data.arquetipo ?? "",
      trajeHeroico: data.trajeHeroico ?? "",
      estadoAventura: data.estadoAventura ?? "Civil",
      antiguaProfesion: data.profesion ?? "",
      talento: data.talento ?? "",
      vidaMilagros: data.vidaMilagros ?? "Personaje de Los Abuelos de la Justicia.",
      pertenencias: data.pertenencias ?? "",
      relaciones: data.relaciones ?? ""
    },
    atributos: attrs,
    habilidades: skills(d3, d2),
    yayopoints: { valor: yayos, inicial: yayos },
    salud: { valor: salud, max: salud },
    jamacuco: { valor: jamacuco, primeraTirada: false, umbrales: { 15: false, 10: false, 6: false, 3: false, 1: false } },
    achaques: { mayor: data.achaqueMayor ?? "", menor: data.achaqueMenor ?? "", menorUsado: false },
    combate: { armaIniciativa: data.armaTipo ?? "sinArmas", ataque: data.ataqueTipo ?? "sinArmas", sorprendido: false },
    estado: { notas: data.notas ?? "" }
  };
}

function extraSystem(attrs, bemoles, nervio, salud, d3 = [], d2 = [], data = {}) {
  return {
    descripcion: data.descripcion ?? "",
    bando: data.bando ?? "Los Abuelos de la Justicia",
    rol: data.rol ?? "",
    atributos: attrs,
    habilidades: skills(d3, d2),
    salud: { valor: salud, max: salud },
    bemoles: { valor: bemoles, manual: true },
    nervio: { valor: nervio, manual: true },
    ataque: data.ataque ?? { nombre: "Tollina", habilidad: "tollinas", tipo: "sinArmas", dano: 2 },
    combate: { sorprendido: false },
    notas: data.notas ?? ""
  };
}

const ACTOR_SYSTEMS = {
  pc_bonifacio_civil: pjSystem({ cac: 4, gra: 0, pre: 6, rob: 2 }, 5, 18, 10, ["lentesProgresivas", "memoria", "sonotone", "telediarios"], ["batallitas", "discusion", "internes", "petanca", "salero", "tollinas"], { profesion: "Periodista", arquetipo: "Jarry “el Guarro”", arquetipoKey: "jarry-el-guarro", talento: "Achante Master adaptado: su presencia intimida cuando aprieta con preguntas incómodas.", pertenencias: "Libreta, bolígrafo, recortes de prensa." }),
  pc_bonifacio_heroico: pjSystem({ cac: 4, gra: 0, pre: 8, rob: 6 }, 7, 26, 6, ["gimnasia", "lentesProgresivas", "mulaParda", "silbido", "sonotone", "tollinas"], ["batallitas", "discusion", "internes", "memoria", "petanca", "telediarios"], { profesion: "Periodista", arquetipo: "Jarry “el Guarro”", arquetipoKey: "jarry-el-guarro", trajeHeroico: "Superman", estadoAventura: "Transformado por el traje", talento: "Traje de Superman: +2 PRE, +4 ROB, daño sin armas 4, inmune a balas normales y puede volar a escasa altura.", ataqueTipo: "cuerpo", armaTipo: "cuerpo" }),
  pc_eliodoro_civil_revisar_recorte: pjSystem({ cac: 0, gra: 2, pre: 6, rob: 4 }, 4, 22, 8, ["archiperres", "lentesProgresivas", "memoria", "mulaParda"], ["discusion", "gimnasia", "internes", "petanca", "sonotone", "tollinas"], { profesion: "Jefe de obra", arquetipo: "Gañán", arquetipoKey: "ganan", talento: "Señor de las bestias. Los animales sienten una simpatía natural hacia él. Nunca será atacado por animal alguno salvo que él ataque primero." }),
  pc_eliodoro_heroico_vigilante: pjSystem({ cac: 4, gra: 4, pre: 6, rob: 6 }, 7, 26, 6, ["gimnasia", "petanca"], ["archiperres", "internes", "memoria", "mulaParda", "sonotone", "tollinas"], { profesion: "Jefe de obra", arquetipo: "Gañán", arquetipoKey: "ganan", trajeHeroico: "Batman", estadoAventura: "Transformado por el traje", talento: "Traje de Batman: +4 CAC, +2 GRA, +2 ROB, planea con la capa y usa cachivaches del cinturón.", armaTipo: "cuerpo" }),
  pc_silvestra_civil: pjSystem({ cac: 0, gra: 2, pre: 6, rob: 4 }, 4, 22, 8, ["gimnasia", "mulaParda", "petanca", "tollinas"], ["ambulatorio", "ingesta", "lentesProgresivas", "salero", "sonotone", "susLabores"], { profesion: "Profesora de aerobic", arquetipo: "Deportista", arquetipoKey: "deportista", talento: "Hércules Farnesio: una vez por partida puede llevar a cabo una proeza física sin tirar, salvo pelea." }),
  pc_silvestra_heroica_velocista: pjSystem({ cac: 2, gra: 2, pre: 8, rob: 6 }, 6, 26, 6, ["gimnasia", "petanca", "tollinas"], ["ambulatorio", "ingesta", "lentesProgresivas", "mulaParda", "salero", "sonotone"], { profesion: "Profesora de aerobic", arquetipo: "Deportista", arquetipoKey: "deportista", trajeHeroico: "Flash", estadoAventura: "Transformada por el traje", talento: "Traje de Flash: +2 CAC, +2 PRE, +2 ROB. Puede hacer defensa activa contra 3 enemigos." }),
  pc_ernestina_civil: pjSystem({ cac: 6, gra: 4, pre: 0, rob: 2 }, 6, 18, 10, ["discusion", "susLabores", "tollinas"], ["ambulatorio", "archiperres", "lentesProgresivas", "memoria", "mulaParda", "sonotone"], { profesion: "Planchaora", arquetipo: "Suegra", arquetipoKey: "suegra", talento: "Me vas a oír: puede minar la moral de un extra con reproches si tiene relación mínima." }),
  pc_ernestina_heroica_bionica: pjSystem({ cac: 6, gra: 4, pre: 2, rob: 4 }, 6, 22, 8, ["lentesProgresivas", "petanca", "tollinas"], ["archiperres", "discusion", "gimnasia", "memoria", "mulaParda", "sonotone", "susLabores"], { profesion: "Planchaora", arquetipo: "Suegra", arquetipoKey: "suegra", trajeHeroico: "Cyborg", estadoAventura: "Transformada por el traje", talento: "Traje de Cyborg: +2 ROB, +2 PRE, visor con puntería y brazo biónico.", ataqueTipo: "fuegoPequena", armaTipo: "fuegoPequena" }),
  pc_fortunata_civil: pjSystem({ cac: 0, gra: 6, pre: 4, rob: 2 }, 3, 18, 10, ["salero", "susLabores", "tollinas"], ["cotilleo", "discusion", "gimnasia", "lentesProgresivas", "memoria", "petanca"], { profesion: "Costurera", arquetipo: "Viuda liberada", arquetipoKey: "viuda-liberada", talento: "Carpe diem: cada crítico en habilidad otorga 2 yayopoints en lugar de 1." }),
  pc_fortunata_heroica_brazaletes: pjSystem({ cac: 2, gra: 8, pre: 4, rob: 4 }, 5, 22, 8, ["gimnasia", "tollinas"], ["cotilleo", "discusion", "lentesProgresivas", "memoria", "petanca", "salero", "susLabores"], { profesion: "Costurera", arquetipo: "Viuda liberada", arquetipoKey: "viuda-liberada", trajeHeroico: "Wonder Woman", estadoAventura: "Transformada por el traje", talento: "Traje de Wonder Woman: brazaletes defensivos, lazo y presencia arrolladora." }),
  npc_alejandro_animador_friki: extraSystem({ cac: 4, gra: 2, pre: 4, rob: 8 }, 11, 10, 30, ["batallitas", "internes", "telediarios"], ["discusion", "ingesta", "memoria", "sonotone"], { rol: "Animador del viaje", bando: "IMSERSO", descripcion: "Animador de 192 cm, barba larga y pasión agotadora por los cómics de superhéroes." }),
  npc_la_puri_santurrona: extraSystem({ cac: 6, gra: 6, pre: 2, rob: 2 }, 13, 5, 18, ["memoria", "salero", "susLabores"], ["ambulatorio", "cotilleo", "discusion", "lentesProgresivas"], { rol: "Rehén santurrona", bando: "Jubilados", descripcion: "Viuda creyente, tradicional y provista de estampitas para cualquier ocasión." }),
  npc_dona_magdalena_binguera: extraSystem({ cac: 8, gra: 6, pre: 2, rob: 2 }, 15, 5, 18, ["lentesProgresivas", "memoria", "telediarios"], ["cotilleo", "discusion", "ingesta", "salero"], { rol: "Binguera profesional", bando: "Jubilados" }),
  npc_anselmo_civil: extraSystem({ cac: 6, gra: 4, pre: 4, rob: 2 }, 13, 7, 18, ["cotilleo", "discusion", "memoria"], ["batallitas", "internes", "lentesProgresivas", "sonotone"], { rol: "Viudo merodeador", bando: "Traidor", descripcion: "Busca dinero fácil y coordina el atraco con La Bane por teléfono." }),
  npc_anselmo_revelado_botin: extraSystem({ cac: 6, gra: 4, pre: 4, rob: 2 }, 13, 7, 18, ["cotilleo", "discusion", "memoria"], ["batallitas", "internes", "lentesProgresivas", "sonotone"], { rol: "Traidor revelado", bando: "Traidor", descripcion: "Anselmo con el botín, listo para huir durante el caos." }),
  enemy_la_bane: extraSystem({ cac: 4, gra: 2, pre: 6, rob: 4 }, 11, 14, 21, ["lentesProgresivas", "memoria", "sonotone", "tollinas"], ["archiperres", "gimnasia"], { rol: "Jefa atracadora", bando: "Atracadores", descripcion: "Mujer enorme disfrazada de Bane, con mochila de dopaje verde.", ataque: { nombre: "Puñetazo de Bane", habilidad: "tollinas", tipo: "sinArmas", dano: 2 } }),
  enemy_la_bane_dopada: extraSystem({ cac: 6, gra: 2, pre: 8, rob: 8 }, 11, 17, 31, ["lentesProgresivas", "memoria", "sonotone", "tollinas"], ["archiperres", "gimnasia", "petanca"], { rol: "Jefa atracadora dopada", bando: "Atracadores", descripcion: "La Bane con la mochila activada.", ataque: { nombre: "Puñetazo dopado", habilidad: "tollinas", tipo: "cuerpo", dano: 4 } })
};

for (const key of ["enemy_el_bromas_jockey", "enemy_relampago_del_reves", "enemy_don_congelador", "enemy_doble_caretos", "enemy_el_mantas"]) {
  ACTOR_SYSTEMS[key] = extraSystem({ cac: 4, gra: 2, pre: 6, rob: 4 }, 11, 14, 21, ["lentesProgresivas", "memoria", "sonotone", "tollinas"], ["archiperres", "gimnasia"], { rol: "Atracador", bando: "Atracadores", ataque: { nombre: "Pistola pequeña", habilidad: "petanca", tipo: "fuegoPequena", dano: 7 } });
}

Object.assign(ACTOR_SYSTEMS, {
  npc_loreta_blanca: pjSystem({ cac: 8, gra: 4, pre: 0, rob: 2 }, 6, 18, 10, ["discusion", "memoria"], ["cotilleo", "lentesProgresivas", "telediarios"], { arquetipo: "Suegra", arquetipoKey: "suegra", profesion: "Mecenas", estadoAventura: "Pregenerado de apoyo", vidaMilagros: "Mecenas de Villabajo con mucha autoridad social y poca paciencia." }),
  npc_agustin_farina: pjSystem({ cac: 8, gra: 6, pre: 2, rob: 2 }, 6, 18, 10, ["batallitas", "telediarios"], ["cotilleo", "discusion", "sonotone"], { arquetipo: "Cuñado", arquetipoKey: "cunado", profesion: "Presidente de Fary", estadoAventura: "Pregenerado de apoyo", vidaMilagros: "Presidente de Fary, opinador nato y figura pública de Villarriba." }),
  npc_fernanda_gimenez: pjSystem({ cac: 2, gra: 0, pre: 4, rob: 6 }, 6, 24, 12, ["mulaParda", "susLabores"], ["cosasDelCampo", "ingesta", "tollinas"], { arquetipo: "Buffet killer", arquetipoKey: "buffet-killer", profesion: "Cocinera", estadoAventura: "Pregenerada de apoyo", vidaMilagros: "Cocinera de Villarriba, fuerte, práctica y acostumbrada a sacar trabajo adelante." }),
  npc_felipe_el_bestia_guzman: pjSystem({ cac: 2, gra: 0, pre: 8, rob: 10 }, 4, 36, 6, ["gimnasia", "tollinas"], ["mulaParda", "petanca", "sonotone"], { arquetipo: "Deportista", arquetipoKey: "deportista", profesion: "Jefe de seguridad", estadoAventura: "Pregenerado de apoyo", vidaMilagros: "Jefe de seguridad de Villarriba. Enorme, directo y preparado para repartir con el puño americano.", ataqueTipo: "cuerpo", armaTipo: "cuerpo" }),
  npc_helmut_koch: pjSystem({ cac: 8, gra: 0, pre: 4, rob: 2 }, 6, 18, 8, ["ingesta", "internes"], ["gimnasia", "petanca", "sonotone"], { arquetipo: "Cultureta", arquetipoKey: "cultureta", profesion: "Propietario real", estadoAventura: "Pregenerado de apoyo", vidaMilagros: "Propietario real de Fary, reservado y peligroso cuando saca la pistola.", ataqueTipo: "fuegoPequena", armaTipo: "fuegoPequena" }),
  npc_isabel_moyano: pjSystem({ cac: 8, gra: 0, pre: 2, rob: 2 }, 6, 18, 8, ["memoria", "telediarios"], ["internes", "susLabores"], { arquetipo: "Cultureta", arquetipoKey: "cultureta", profesion: "Notaria", estadoAventura: "Pregenerada de apoyo", vidaMilagros: "Notaria neutral, observadora y muy difícil de impresionar." }),
  npc_voluntario: extraSystem({ cac: 4, gra: 6, pre: 0, rob: 2 }, 11, 3, 18, ["mulaParda", "salero"], ["memoria", "susLabores"], { bando: "Villarriba", rol: "Voluntario" }),
  npc_sanitario: extraSystem({ cac: 8, gra: 4, pre: 2, rob: 2 }, 15, 5, 18, ["ambulatorio", "susLabores"], ["cosasDelCampo", "mulaParda"], { bando: "Neutral", rol: "Sanitario" }),
  npc_agente_de_policia: extraSystem({ cac: 2, gra: 0, pre: 4, rob: 8 }, 9, 13, 30, ["gimnasia", "tollinas"], ["mulaParda", "petanca", "sonotone"], { bando: "Autoridad", rol: "Policía" })
});

const ADDITIONAL_ACTORS = {
  jubilado_bernarda: {
    title: "Bernarda",
    type: "pc",
    path: "icons/svg/aura.svg",
    system: pjSystem({ cac: 4, gra: 0, pre: 6, rob: 2 }, 5, 18, 6, ["ambulatorio", "gimnasia", "sonotone", "telediarios"], ["cosasDelCampo", "ingesta", "internes", "lentesProgresivas", "mulaParda", "salero"], { arquetipo: "Anciana alternativa", arquetipoKey: "anciana-alternativa", talento: "Ooooommmmm. Una sola vez por partida puede ponerse a meditar con las piernas cruzadas y recuperar 2 puntos de Salud o ganar 1 yayopoint.", vidaMilagros: "Una señora que sabe cuidarse y ve con malos ojos los hábitos de los demás, aunque hace no mucho ella hacía lo mismo. Le gusta salir a andar, el yoga y es vegana la mayor parte del tiempo.", achaqueMayor: "Tensión por las nubes", achaqueMenor: "Migrañas" })
  },
  jubilado_clemencio: {
    title: "Clemencio",
    type: "pc",
    path: "icons/svg/wing.svg",
    system: pjSystem({ cac: 0, gra: 2, pre: 6, rob: 4 }, 4, 22, 6, ["gimnasia", "mulaParda", "petanca", "tollinas"], ["ambulatorio", "archiperres", "cosasDelCampo", "ingesta", "lentesProgresivas", "sonotone"], { arquetipo: "Deportista", arquetipoKey: "deportista", talento: "Hercules Farnesio. Una vez por partida puede llevar a cabo una admirable proeza física sin tirar, salvo acciones de pelea.", vidaMilagros: "Siempre ha estado en forma y ahora se dedica en exclusiva al deporte. Bicicleta, senderismo, ir a comprar el pan... siempre en chándal.", achaqueMayor: "Dentadura postiza", achaqueMenor: "Vista regulera" })
  },
  jubilado_marciala: {
    title: "Marciala",
    type: "pc",
    path: "icons/svg/book.svg",
    system: pjSystem({ cac: 6, gra: 0, pre: 4, rob: 2 }, 6, 18, 8, ["internes", "lentesProgresivas", "memoria", "telediarios"], ["archiperres", "discusion", "gimnasia", "nietos", "sonotone", "susLabores"], { arquetipo: "Cultureta", arquetipoKey: "cultureta", talento: "Oyssss. +3 a cualquier tirada en la que pueda realizar su acción de manera pedante.", vidaMilagros: "No hay libro que no haya leído ni tema del que no tenga opinión. Dejen paso a la cabeza pensante.", achaqueMayor: "Sordera", achaqueMenor: "Rodilla hecha puré" })
  },
  jubilado_valeriano: {
    title: "Valeriano",
    type: "pc",
    path: "icons/svg/meat.svg",
    system: pjSystem({ cac: 2, gra: 4, pre: 0, rob: 6 }, 6, 26, 12, ["cotilleo", "ingesta", "mulaParda", "salero"], ["ambulatorio", "batallitas", "discusion", "memoria", "susLabores", "tollinas"], { arquetipo: "Buffet killer", arquetipoKey: "buffet-killer", talento: "Sugar power. Tras cada merma de Salud puede recuperar 1 punto perdido si justo después saca una chocolatina o galletita y se la come.", vidaMilagros: "Cree firmemente en la disciplina y divide su día en etapas: jamón, ensaladilla, bravas...", achaqueMayor: "Barrigón más duro que una piedra", achaqueMenor: "Dolor de espalda" })
  },
  jubilado_romualda: {
    title: "Romualda",
    type: "pc",
    path: "icons/svg/eye.svg",
    system: pjSystem({ cac: 6, gra: 0, pre: 4, rob: 2 }, 6, 18, 8, ["discusion", "lentesProgresivas", "memoria", "telediarios"], ["batallitas", "cotilleo", "ingesta", "sonotone", "susLabores", "tollinas"], { arquetipo: "Criticona", arquetipoKey: "criticon", talento: "Calumnia que algo queda. Una vez por partida puede convencer automáticamente a un extra de que alguien o algo está rematadamente mal.", vidaMilagros: "Lo importante no es lo que haga bien una misma, sino lo que hagan mal los demás.", achaqueMayor: "Lagunas", achaqueMenor: "Ciática" })
  },
  jubilado_argimiro: {
    title: "Argimiro",
    type: "pc",
    path: "icons/svg/anchor.svg",
    system: pjSystem({ cac: 6, gra: 4, pre: 0, rob: 2 }, 6, 18, 10, ["archiperres", "discusion", "lentesProgresivas", "memoria"], ["batallitas", "cotilleo", "mulaParda", "silbido", "sonotone", "telediarios"], { arquetipo: "Contemplador de obra", arquetipoKey: "contemplador-de-obra", talento: "Aparejador de raza. +3 a tiradas relacionadas con obras, puentes, carreteras, depuradoras, gasolineras, estaciones, etc.", vidaMilagros: "Con la vejez llega la sabiduría: Argimiro sabe cómo se hacen las cosas, sobre todo si tienen que ver con obras.", achaqueMayor: "Flato", achaqueMenor: "Manos sudorosas" })
  },
  extra_rodolfo_blanca: { title: "Rodolfo Blanca", type: "extra", path: "icons/svg/mystery-man.svg", system: extraSystem({ cac: 0, gra: 2, pre: 6, rob: 4 }, 7, 12, 22, ["ingesta", "sonotone"], ["gimnasia", "memoria"], { bando: "Villabajo", rol: "Presidente de Blanca" }) },
  extra_sofia_farina: { title: "Sofia Farina", type: "extra", path: "icons/svg/mystery-man.svg", system: extraSystem({ cac: 6, gra: 8, pre: 4, rob: 2 }, 13, 10, 18, ["cotilleo", "salero"], ["discusion", "gimnasia", "tollinas"], { bando: "Villarriba", rol: "Hija del presidente" }) },
  extra_marc_rivero: { title: "Marc Rivero", type: "extra", path: "icons/svg/mystery-man.svg", system: extraSystem({ cac: 6, gra: 4, pre: 2, rob: 0 }, 13, 5, 14, ["internes", "lentesProgresivas"], ["archiperres", "sonotone", "telediarios"], { bando: "Neutral", rol: "Jefe de equipo de TVE" }) }
};

const ITEM_SYSTEMS = {
  item_brazaletes_dorados: itemSystem("Equipo heroico", "Brazaletes defensivos del traje heroico. Úsalos para resolver defensas activas cuando proceda.", { equipable: true, automatismo: "brazaletes", habilidadUso: "gimnasia", dificultadUso: 10 }),
  item_latigo_luminoso: itemSystem("Equipo heroico", "Lazo o látigo luminoso para acciones de agarre, desarme o control dramático.", { equipable: true, usable: true, habilidadUso: "petanca", dificultadUso: 10 }),
  item_visor_bionico: itemSystem("Equipo heroico", "Visor integrado del traje biónico. Ayuda en puntería, observación y análisis de objetivos.", { equipable: true, usable: true, automatismo: "visor-bionico", habilidadUso: "lentesProgresivas", dificultadUso: 10 }),
  item_cinturon_cachivaches: itemSystem("Equipo heroico", "Cinturón con herramientas y cachivaches útiles cuando el jugador justifique qué saca de ahí.", { equipable: true, usable: true, automatismo: "cachivache", habilidadUso: "archiperres", dificultadUso: 10 }),
  item_jabon_experimental: itemSystem("Pista", "Producto experimental que explica la transformación heroica de los disfraces.", { usable: false }),
  item_caja_disfraces_heroicos: itemSystem("Pista", "Caja con los disfraces que desencadenan la parte superheroica de la aventura.", { usable: false }),
  item_cajas_negras_misteriosas: itemSystem("Pista", "Paquetes misteriosos encontrados en las habitaciones del hotel.", { usable: false }),
  item_estampitas_religiosas: itemSystem("Pista", "Reguero de estampitas que puede guiar a los PJ hacia la tramoya.", { usable: true, habilidadUso: "lentesProgresivas", dificultadUso: 8 }),
  item_estampitas_religiosas_con_rosario: itemSystem("Pista", "Estampitas y rosario vinculados a La Puri.", { usable: true, habilidadUso: "lentesProgresivas", dificultadUso: 8 }),
  item_rosario: itemSystem("Pista", "Rosario de La Puri.", { usable: true, habilidadUso: "lentesProgresivas", dificultadUso: 8 }),
  item_mochila_dopaje_verde: itemSystem("Equipo enemigo", "Mochila de dopaje de La Bane. Al activarse, usa la ficha de La Bane dopada.", { equipable: true, usable: true, automatismo: "la-bane-dopada" }),
  item_bolsa_deporte_billetes: itemSystem("Pista", "Bolsa de deporte con el dinero del atraco.", { usable: false }),
  item_botin_banco_confeti: itemSystem("Pista", "Botín del banco alterado por el caos de la aventura.", { usable: false }),
  item_llaves_tarjeta_hotel: itemSystem("Pista", "Llaves y tarjetas de habitación del hotel.", { usable: false }),
  item_programa_chirigotas_entrada: itemSystem("Pista", "Programa y entrada para el pase de chirigotas.", { usable: false }),
  item_carton_bingo_magdalena: itemSystem("Pista", "Cartón de bingo de Doña Magdalena.", { usable: true, habilidadUso: "memoria", dificultadUso: 8 }),
  item_sonotone: itemSystem("Equipo", "Audífono para oír lo que otros no llegan a entender.", { equipable: true, usable: true, habilidadUso: "sonotone", dificultadUso: 8 }),
  item_pastillero_semanal: itemSystem("Equipo", "Pastillero semanal. Útil como pista, recurso narrativo o excusa médica.", { usable: true, habilidadUso: "memoria", dificultadUso: 8 }),
  item_abanico_floral: itemSystem("Equipo", "Abanico floral para sofocos, salero y maniobras sociales con mucho arte.", { usable: true, habilidadUso: "salero", dificultadUso: 8 }),
  item_maleta_jubilado_pegatinas: itemSystem("Equipo", "Maleta de viaje con pegatinas y pertenencias de jubilado.", { usable: false }),
  item_caja_carton_normal: itemSystem("Pista", "Caja de cartón corriente.", { usable: false }),
  item_folleto_imserso_cadiz: itemSystem("Pista", "Folleto del viaje del IMSERSO a Cádiz.", { usable: false }),
  item_tebeo_deshecho_lavadora: itemSystem("Pista", "Tebeo parcialmente deshecho que apunta al origen de los poderes.", { usable: false })
};

const ADDITIONAL_ITEMS = {
  equipo_botiquin: { title: "Botiquín", type: "equipo", path: "icons/svg/heal.svg", system: itemSystem("Curación", "Permite curar con Ambulatorio a dificultad 10: recupera 2 de Salud, o 4 con crítico.", { usable: true, automatismo: "botiquin", habilidadUso: "ambulatorio", dificultadUso: 10 }) },
  equipo_lavavajillas_sospechoso: { title: "Lavavajillas sospechoso", type: "equipo", path: "icons/commodities/materials/liquid-blue.webp", system: itemSystem("Sabotaje", "Material ideal para cambiazos, sabotajes y catástrofes de paellera.", { usable: true, habilidadUso: "archiperres", dificultadUso: 8 }) },
  arma_baston_recio: { title: "Bastón recio", type: "arma", path: "icons/weapons/staves/staff-simple-brown.webp", system: { tipo: "cuerpo", habilidad: "tollinas", danoBase: 4, atributoDano: "rob", iniciativa: 2, descripcion: "Cuenta como arma cuerpo a cuerpo.", equipable: true, equipado: false } },
  arma_pistola_pequena: { title: "Pistola pequeña", type: "arma", path: "icons/weapons/guns/gun-pistol-flintlock.webp", system: { tipo: "fuegoPequena", habilidad: "petanca", danoBase: 7, atributoDano: "pre", iniciativa: 5, descripcion: "Arma de fuego pequeña.", equipable: true, equipado: false } },
  talento_es_que_yo_a_tus_anos: { title: "Es que yo a tus años...", type: "talento", path: "icons/svg/daze.svg", system: { descripcion: "Una vez por sesión permite narrar un flashback y sumar +1D a una tirada de habilidad o Jamacuco.", usos: { valor: 1, max: 1 }, automatismo: "flashback" } }
};

function itemSystem(categoria, descripcion, data = {}) {
  return {
    descripcion,
    categoria,
    cantidad: 1,
    equipado: false,
    equipable: data.equipable ?? false,
    usable: data.usable ?? true,
    uso: categoria,
    habilidadUso: data.habilidadUso ?? "",
    dificultadUso: data.dificultadUso ?? 0,
    automatismo: data.automatismo ?? "",
    modificadores: data.modificadores ?? {}
  };
}

function actorSystemFor(key, asset) {
  if (ADDITIONAL_ACTORS[key]) return foundry.utils.deepClone(ADDITIONAL_ACTORS[key].system);
  if (ACTOR_SYSTEMS[key]) return foundry.utils.deepClone(ACTOR_SYSTEMS[key]);
  if (asset.type === "pc") return pjSystem({ cac: 0, gra: 2, pre: 4, rob: 6 }, 4, 18, 10, [], [], { arquetipo: "Deportista", arquetipoKey: "deportista", estadoAventura: "Pregenerado" });
  return extraSystem({ cac: 2, gra: 2, pre: 2, rob: 2 }, 9, 9, 12, [], [], { rol: asset.title, bando: asset.type === "enemy" ? "Atracadores" : "Los Abuelos de la Justicia" });
}

function itemSystemFor(key, asset) {
  const system = foundry.utils.deepClone(ITEM_SYSTEMS[key] ?? itemSystem("Pista / objeto de aventura", "Objeto o pista de Los Abuelos de la Justicia.", { usable: false }));
  return system;
}

const JOURNAL_DEFS = [
  { key: "creditos-adaptacion", title: "Créditos y adaptación" },
  { key: "aventura-completa", title: "Aventura completa" },
  { key: "inicio-viaje-cadiz", title: "Inicio y viaje a Cádiz", scenes: ["scene_01_autocar_viaje_con_jubilados", "scene_09_autocar_interior_desde_atras", "scene_10_autocar_interior_desde_delante"], actors: ["npc_alejandro_animador_friki", "pc_bonifacio_civil", "pc_eliodoro_civil_revisar_recorte", "pc_ernestina_civil", "pc_fortunata_civil", "pc_silvestra_civil"], text: SCENE_GUIDES.scene_01_autocar_viaje_con_jubilados.read, gm: "Presenta a los PJ, deja que sufran a Alejandro y anuncia la sorpresa de los disfraces al acercarse a Cádiz." },
  { key: "llegada-hotel", title: "Llegada al hotel", scenes: ["scene_02_hotel_recepcion", "scene_14_hotel_pasillo_nocturno_cajas"], actors: ["npc_alejandro_animador_friki", "npc_dona_magdalena_binguera", "npc_eusebio_rehen"], items: ["item_llaves_tarjeta_hotel", "item_cajas_negras_misteriosas", "item_caja_carton_normal"], text: SCENE_GUIDES.scene_02_hotel_recepcion.read, gm: "Reparte habitaciones, mueve a los PNJ y deja a Anselmo haciendo alguna llamada si quieres plantar sospecha." },
  { key: "noche-paquetes", title: "La noche de los paquetes", scenes: ["scene_03_habitacion_hotel_cajas_negras", "scene_14_hotel_pasillo_nocturno_cajas", "scene_12_hotel_salon_nocturno"], actors: ["npc_anselmo_civil"], items: ["item_cajas_negras_misteriosas", "item_caja_disfraces_heroicos", "item_jabon_experimental"], text: SCENE_GUIDES.scene_03_habitacion_hotel_cajas_negras.read, gm: "Las cajas negras no se abren antes de tiempo. Otros jubilados pueden tener cajas de cartón y probarse disfraces sin que los PJ entiendan todavía la diferencia." },
  { key: "desayuno-trajes", title: "Desayuno y trajes", scenes: ["scene_11_hotel_buffet_desayuno"], actors: ["pc_bonifacio_heroico", "pc_eliodoro_heroico_vigilante", "pc_ernestina_heroica_bionica", "pc_fortunata_heroica_brazaletes", "pc_silvestra_heroica_velocista"], items: ["item_caja_disfraces_heroicos", "item_brazaletes_dorados", "item_latigo_luminoso", "item_visor_bionico", "item_cinturon_cachivaches"], text: SCENE_GUIDES.scene_11_hotel_buffet_desayuno.read, gm: "Haz tirada de Ingesta dificultad 8 para el buffet. Cuando se pongan los trajes, cambia a las versiones heroicas o aplica sus modificadores." },
  { key: "chirigotas-atracos", title: "De chirigotas y atracos", scenes: ["scene_04_teatro_sala_chirigotas", "scene_06_banco_exterior_atraco", "scene_15_teatro_foyer_entrada"], actors: ["enemy_la_bane", "enemy_la_bane_dopada", "enemy_el_bromas_jockey", "enemy_relampago_del_reves", "enemy_don_congelador", "enemy_doble_caretos", "enemy_el_mantas"], items: ["item_programa_chirigotas_entrada", "item_botin_banco_confeti"], text: SCENE_GUIDES.scene_04_teatro_sala_chirigotas.read, gm: "El atraco sucede fuera mientras el espectáculo tapa sirenas y disparos. Los atracadores entran al teatro con rehenes." },
  { key: "tramoya", title: "La tramoya", scenes: ["scene_05_teatro_tramoya_backstage", "scene_16_teatro_pasillo_estampitas", "scene_13_azotea_teatro"], actors: ["npc_la_puri_santurrona", "npc_voluntario"], items: ["item_estampitas_religiosas", "item_estampitas_religiosas_con_rosario", "item_rosario"], text: SCENE_GUIDES.scene_16_teatro_pasillo_estampitas.read, gm: "El rastro de estampitas conduce a los rehenes. La Bane aparece desde la azotea cuando quieras subir la presión." },
  { key: "traicion-anselmo", title: "La traición de Anselmo", scenes: ["scene_06_banco_exterior_atraco", "scene_08_muelle_puerto_cadiz"], actors: ["npc_anselmo_civil", "npc_anselmo_revelado_botin"], items: ["item_bolsa_deporte_billetes", "item_botin_banco_confeti"], text: "Mientras todo el mundo mira a los villanos, Anselmo mira las bolsas. En mitad del caos, el anciano que parecía necesitar ayuda para todo descubre una agilidad moral sorprendente: si nadie lo detiene, el botín saldrá del teatro con él.", gm: "Lentes progresivas dificultad 10 para pillarlo por el jaleo. Decide si lo capturan o si usas la postcréditos de fuga." },
  { key: "epilogo", title: "Epílogo", scenes: ["scene_08_muelle_puerto_cadiz", "scene_07_callejuelas_cadiz_carnaval"], actors: ["npc_productor_octogenario_epilogo"], items: ["item_folleto_imserso_cadiz"], text: "Cuando las sirenas se apagan y el polvo cae, un hombre mayor con traje, pelo engominado y gafas de sol aparece con una sonrisa imposible. Os mira como si acabara de encontrar exactamente lo que buscaba y dice: Ustedes no me conocen. Me llamo Julio Iglesias. Estoy formando un equipo.", gm: "Cierra con música épica y lee la postcréditos según el destino de Anselmo." },
  { key: "objetos-pistas", title: "Objetos y pistas", items: "all" },
  { key: "reparto-personajes", title: "Reparto de personajes", actors: "all" }
];

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, INDEX_SETTING, { scope: "world", config: false, type: Object, default: {} });
  game.settings.register(MODULE_ID, SHOWN_SETTING, { scope: "world", config: false, type: Boolean, default: false });
});

Hooks.once("ready", async () => {
  if (!game.user.isGM) return;
  game.modules.get(MODULE_ID).api = { showInstaller, installAdventure };
  game.settings.registerMenu(MODULE_ID, "installer", {
    name: "Instalador: Los Abuelos de la Justicia",
    label: "Abrir instalador",
    hint: "Instala o repara escenas, actores, objetos y diarios.",
    icon: "fas fa-person-cane",
    type: InstallerMenu,
    restricted: true
  });
  if (!game.settings.get(MODULE_ID, SHOWN_SETTING)) {
    await game.settings.set(MODULE_ID, SHOWN_SETTING, true);
    showInstaller();
  }
});

Hooks.on("canvasReady", () => {
  const scene = canvas?.scene;
  if (!scene?.getFlag?.(MODULE_ID, FLAG_KEY)) return;
  window.setTimeout(() => fitAdventureScene(scene), 100);
  syncCoverAudio(scene);
});

Hooks.on("canvasTearDown", () => stopCoverAudio());

class InstallerMenu extends FormApplication {
  render(force, options) {
    showInstaller();
    return this;
  }

  async _updateObject() {}
}

export function showInstaller() {
  const content = `
    <div class="abj-installer-card">
      <h2>Los Abuelos de la Justicia</h2>
      <p>Instala el contenido visual y documental de la aventura en este mundo. La operación es idempotente: repara imágenes y enlaces sin duplicar documentos ya instalados.</p>
      <small>Usa assets/asset-map.json como única fuente de rutas.</small>
    </div>`;
  new Dialog({
    title: "Instalador · Los Abuelos de la Justicia",
    content,
    buttons: {
      all: { label: "Instalar todo", callback: () => installAdventure("all") },
      scenes: { label: "Solo escenas", callback: () => installAdventure("scenes") },
      actors: { label: "Solo actores", callback: () => installAdventure("actors") },
      items: { label: "Solo objetos", callback: () => installAdventure("items") },
      journals: { label: "Solo diarios", callback: () => installAdventure("journals") },
      repair: { label: "Reinstalar / reparar enlaces", callback: () => installAdventure("repair") }
    },
    default: "all"
  }, { classes: ["dialog", "abj-installer"], width: 620 }).render(true);
}

export async function installAdventure(mode = "all") {
  const assetMap = await loadAssetMap();
  const index = foundry.utils.deepClone(game.settings.get(MODULE_ID, INDEX_SETTING) ?? {});
  const ctx = { assetMap, index, report: { scenes: 0, actors: 0, items: 0, journals: 0, assets: countAssets(assetMap), warnings: [] } };
  const all = mode === "all" || mode === "repair";
  if (all || mode === "scenes") await installScenes(ctx);
  if (all || mode === "actors") await installActors(ctx);
  if (all || mode === "items") await installItems(ctx);
  if (all || mode === "journals") await installJournals(ctx);
  await game.settings.set(MODULE_ID, INDEX_SETTING, ctx.index);
  console.info("Los Abuelos de la Justicia | Informe de instalación", ctx.report);
  ui.notifications.info(`Los Abuelos de la Justicia: ${ctx.report.scenes} escenas, ${ctx.report.actors} actores, ${ctx.report.items} objetos, ${ctx.report.journals} diarios. Assets: ${ctx.report.assets}.`);
  if (ctx.report.warnings.length) console.warn("Los Abuelos de la Justicia | Advertencias", ctx.report.warnings);
  return ctx.report;
}

async function installScenes(ctx) {
  const folder = await ensureFolder("Scene", "Los Abuelos de la Justicia", "Escenas");
  const journalFolder = await ensureFolder("JournalEntry", "Los Abuelos de la Justicia", "Diarios");
  for (const key of SCENE_ORDER) {
    const asset = ctx.assetMap.scenes[key];
    if (!asset) continue;
    const dims = await imageDimensions(asset.path, ctx);
    const scene = await upsertDocument(game.scenes, Scene, key, {
      name: asset.title,
      folder: folder.id,
      width: dims.width,
      height: dims.height,
      padding: 0,
      backgroundColor: "#000000",
      background: { src: asset.path },
      img: asset.path,
      initial: { x: Math.round(dims.width / 2), y: Math.round(dims.height / 2), scale: 1 },
      tokenVision: false,
      fogExploration: false,
      globalLight: false,
      navigation: true,
      navName: asset.title,
      grid: { type: CONST.GRID_TYPES?.GRIDLESS ?? 0, size: 100, color: "#000000", alpha: 0 },
      gridType: CONST.GRID_TYPES?.GRIDLESS ?? 0,
      gridDistance: 1,
      gridUnits: "m",
      environment: { globalLight: { enabled: false } },
      canvas: { backgroundColor: "#000000" },
      flags: { [MODULE_ID]: { sceneKey: key, fitOnLoad: true, coverAudioKey: asset.audio ?? "" } }
    }, ctx, "scenes");
    const guide = SCENE_GUIDES[key] ?? { read: "Escena visual de apoyo.", gm: "" };
    const journal = await upsertDocument(game.journal, JournalEntry, `scene-note-${key}`, {
      name: `Escena · ${asset.title}`,
      folder: journalFolder.id,
      pages: [{ name: "Uso en mesa", type: "text", text: { format: 1, content: sceneGuideContent(asset.title, scene, guide) } }]
    }, ctx, "journals", { count: false });
    await scene.update({ journal: journal.id }).catch(() => {});
  }
}

async function installActors(ctx) {
  const root = await ensureFolder("Actor", "Los Abuelos de la Justicia");
  await renameActorFolder(root.id, "PJ / Pregenerados", "Pregenerados");
  const folders = {};
  for (const name of new Set([...Object.values(ACTOR_GROUPS), ADVENTURE_PC_FOLDER])) folders[name] = await ensureFolder("Actor", name, null, root.id);
  for (const [key, asset] of Object.entries({ ...ctx.assetMap.actors, ...ADDITIONAL_ACTORS })) {
    const actorType = asset.type === "pc" ? "jubilado" : "extra";
    const disposition = asset.type === "enemy" ? -1 : asset.type === "npc" || asset.type === "extra" ? 0 : 1;
    const size = key.includes("la_bane") ? 1 : 1;
    const folderName = actorFolderName(key, asset);
    await upsertDocument(game.actors, Actor, key, {
      name: asset.title,
      type: actorType,
      img: asset.path,
      folder: folders[folderName]?.id ?? root.id,
      system: actorSystemFor(key, asset),
      prototypeToken: {
        name: asset.title,
        actorLink: actorType === "jubilado",
        disposition,
        displayName: CONST.TOKEN_DISPLAY_MODES?.OWNER ?? 30,
        displayBars: CONST.TOKEN_DISPLAY_MODES?.NONE ?? 0,
        texture: { src: asset.path },
        width: size,
        height: size,
        bar1: { attribute: null },
        bar2: { attribute: null }
      }
    }, ctx, "actors");
  }
}

async function renameActorFolder(parentId, oldName, newName) {
  const oldFolder = game.folders.find((folder) => folder.type === "Actor" && folder.name === oldName && folder.folder?.id === parentId);
  if (!oldFolder) return;
  const targetFolder = game.folders.find((folder) => folder.type === "Actor" && folder.name === newName && folder.folder?.id === parentId);
  if (!targetFolder) await oldFolder.update({ name: newName });
}

function actorFolderName(key, asset) {
  if (asset.type === "pc" && key.startsWith("pc_")) return ADVENTURE_PC_FOLDER;
  return ACTOR_GROUPS[asset.type];
}

async function installItems(ctx) {
  const folder = await ensureFolder("Item", "Los Abuelos de la Justicia", "Objetos y pistas");
  for (const [key, asset] of Object.entries(ctx.assetMap.items)) {
    await upsertDocument(game.items, Item, key, {
      name: asset.title,
      type: "equipo",
      img: asset.path,
      folder: folder.id,
      system: itemSystemFor(key, asset)
    }, ctx, "items");
  }
  for (const [key, asset] of Object.entries(ADDITIONAL_ITEMS)) {
    await upsertDocument(game.items, Item, key, {
      name: asset.title,
      type: asset.type,
      img: asset.path,
      folder: folder.id,
      system: foundry.utils.deepClone(asset.system)
    }, ctx, "items");
  }
}

async function installJournals(ctx) {
  const folder = await ensureFolder("JournalEntry", "Los Abuelos de la Justicia", "Diarios");
  for (const def of JOURNAL_DEFS) {
    const pages = def.key === "aventura-completa"
      ? fullAdventurePages(ctx)
      : def.key === "creditos-adaptacion"
        ? [{ name: def.title, type: "text", text: { format: 1, content: creditsContent(ctx) } }]
      : [{ name: def.title, type: "text", text: { format: 1, content: journalContent(def, ctx) } }];
    await upsertDocument(game.journal, JournalEntry, def.key, {
      name: def.title,
      folder: folder.id,
      pages
    }, ctx, "journals");
  }
}

function journalContent(def, ctx) {
  const scenes = resolveRefs(def.scenes, ctx.assetMap.scenes, ctx.index.scenes);
  const actors = resolveRefs(def.actors, { ...ctx.assetMap.actors, ...ADDITIONAL_ACTORS }, ctx.index.actors);
  const items = resolveRefs(def.items, { ...ctx.assetMap.items, ...ADDITIONAL_ITEMS }, ctx.index.items);
  const narrative = def.text ? `<h2>Lectura para mesa</h2><blockquote>${escapeHtml(def.text)}</blockquote>` : "";
  const gm = def.gm ? `<h2>Notas del Sr. Ministro</h2><p>${escapeHtml(def.gm)}</p>` : "";
  return `
    <section class="abj-journal">
      <h1>${escapeHtml(def.title)}</h1>
      ${narrative}
      ${gm}
      ${listBlock("Escenas", scenes)}
      ${listBlock("Personajes", actors)}
      ${listBlock("Objetos y pistas", items)}
    </section>`;
}

function sceneGuideContent(title, scene, guide) {
  return `
    <section class="abj-journal abj-scene-guide">
      <h1>${escapeHtml(title)}</h1>
      <p>${link(scene)}</p>
      <h2>Lectura para jugadores</h2>
      <blockquote>${escapeHtml(guide.read)}</blockquote>
      <h2>Notas del Sr. Ministro</h2>
      <p>${escapeHtml(guide.gm)}</p>
    </section>`;
}

function creditsContent(ctx) {
  const cover = ctx.assetMap.scenes?.[COVER_SCENE_KEY]?.path ?? "";
  const image = cover ? `<img class="abj-credits-cover" src="${cover}" alt="Los Abuelos de la Justicia">` : "";
  return `
    <section class="abj-journal abj-credits-journal">
      ${image}
      <h1>Los Abuelos de la Justicia</h1>
      <p>Aventura original para <strong>IMSERSO to the limit</strong> escrita por <strong>Arturo Urbano</strong> (“Jubilados de Arkham”).</p>
      <p>Publicada originalmente como aventura en libre descarga para <strong>IMSERSO to the limit</strong> con motivo del <strong>Día del Rol Gratis 2021</strong>.</p>
      <h2>Créditos del PDF original</h2>
      <ul class="abj-credit-list">
        <li><strong>Autor de la aventura:</strong> Arturo Urbano (“Jubilados de Arkham”)</li>
        <li><strong>Gestión editorial:</strong> Jorge Carrero Roig</li>
        <li><strong>Diseño del proyecto:</strong> Ignacio Sánchez Aranda</li>
        <li><strong>Diseño de portada:</strong> Adrián Jiménez Rodríguez “Squirrel”</li>
        <li><strong>Revisión:</strong> Antonio Lozano Lubián</li>
        <li><strong>Maquetación:</strong> Adrián Jiménez Rodríguez “Squirrel”</li>
        <li><strong>Arte interior:</strong> arte de repositorio libre de derechos</li>
      </ul>
      <h2>Adaptación Foundry VTT</h2>
      <p>Adaptación para uso privado en Foundry VTT realizada por <strong>Manu Romera</strong>.</p>
      <p>Imágenes generadas específicamente para esta adaptación.</p>
    </section>`;
}

function fullAdventurePages(ctx) {
  return [
    { name: "Guía de mesa", type: "text", text: { format: 1, content: fullAdventureSummaryContent() } },
    { name: "Transcripción depurada", type: "text", text: { format: 1, content: fullAdventureTranscriptContent() } },
    { name: "Enlaces de aventura", type: "text", text: { format: 1, content: fullAdventureLinksContent(ctx) } }
  ];
}

function fullAdventureSummaryContent() {
  return `
    <section class="abj-journal abj-full-adventure">
      <h1>Los Abuelos de la Justicia</h1>
      <p><strong>Diario completo para el Sr. Ministro.</strong> Contiene la sinopsis, estructura de escenas, PNJ, trajes, giro final, epílogos y estadísticas esenciales de la aventura.</p>
      ${ADVENTURE_FULL_SECTIONS.map((section) => `<h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p>`).join("")}
      <h2>Créditos</h2>
      <p>Aventura original de Arturo Urbano para IMSERSO to the limit. Adaptación técnica para Foundry VTT en este módulo.</p>
    </section>`;
}

function fullAdventureTranscriptContent() {
  return `
    <section class="abj-journal abj-full-adventure">
      <h1>Transcripción depurada</h1>
      <p>Referencia textual depurada del PDF para consulta rápida. Se omiten portadas, índice, licencia, hojas de personaje escaneadas y restos de maquetación que no aportan información de juego.</p>
      ${ADVENTURE_PDF_PAGES.map(cleanPdfPage).filter(Boolean).map((page) => `<article class="abj-pdf-page"><div class="abj-page-label">Página ${page.page}</div>${textToParagraphs(page.text)}</article>`).join("")}
    </section>`;
}

function fullAdventureLinksContent(ctx) {
  const sceneRows = resolveRefs(SCENE_ORDER, ctx.assetMap.scenes, ctx.index.scenes);
  const actorRows = resolveRefs("all", { ...ctx.assetMap.actors, ...ADDITIONAL_ACTORS }, ctx.index.actors);
  const itemRows = resolveRefs("all", { ...ctx.assetMap.items, ...ADDITIONAL_ITEMS }, ctx.index.items);
  return `
    <section class="abj-journal abj-full-adventure">
      <h1>Enlaces de aventura</h1>
      <h2>Escenas de apoyo</h2>
      ${linkList(sceneRows)}
      <h2>Reparto y documentos</h2>
      <h3>Personajes</h3>
      ${linkList(actorRows)}
      <h3>Objetos y pistas</h3>
      ${linkList(itemRows)}
    </section>`;
}

function cleanPdfPage(page) {
  const pageNumber = Number(page?.page);
  if (!Number.isFinite(pageNumber)) return null;
  if (pageNumber < 4 || pageNumber > 14) return null;
  let text = String(page.text ?? "");
  text = text.replace(/\r/g, "");
  text = text.replace(/\n?--- PAGE \d+ ---\n?/g, "");
  text = text.replace(new RegExp(`\\n?${pageNumber}\\s*$`), "");
  text = text.replace(/([A-Za-zÁÉÍÓÚÜÑáéíóúüñ])-\n([a-záéíóúüñ])/g, "$1$2");
  text = text.replace(/([,;:])\n/g, "$1 ");
  text = text.replace(/\n(?=[a-záéíóúüñ])/g, " ");
  text = text.replace(/\n{3,}/g, "\n\n");
  if (pageNumber === 4) {
    const start = text.indexOf("LOS ABUELOS DE LA JUSTICIA es");
    if (start >= 0) text = `SINOPSIS\n${text.slice(start)}`;
  }
  if (pageNumber === 5) text = text.replace("EL ELENCO\nAviso", "EL ELENCO\nAviso");
  return { page: pageNumber, text: text.trim() };
}

function linkList(rows) {
  if (!rows.length) return "";
  return `<ul class="abj-link-list">${rows.map((row) => `<li>${row.uuid ? `@UUID[${row.uuid}]{${escapeHtml(row.title)}}` : escapeHtml(row.title)}</li>`).join("")}</ul>`;
}

function resolveRefs(keys, source, indexPart = {}) {
  if (!keys) return [];
  const list = keys === "all" ? Object.keys(source) : keys;
  return list.map((key) => {
    const asset = source[key];
    const uuid = indexPart?.[key]?.uuid;
    return { title: asset?.title ?? key, uuid };
  });
}

function listBlock(title, rows) {
  if (!rows.length) return "";
  return `<h2>${title}</h2><ul>${rows.map((row) => `<li>${row.uuid ? `@UUID[${row.uuid}]{${escapeHtml(row.title)}}` : escapeHtml(row.title)}</li>`).join("")}</ul>`;
}

async function ensureFolder(type, name, childName = null, parent = null) {
  if (childName) {
    const root = await ensureFolder(type, name);
    return ensureFolder(type, childName, null, root.id);
  }
  const found = game.folders.find((folder) => folder.type === type && folder.name === name && (folder.folder?.id ?? null) === (parent ?? null));
  if (found) return found;
  return Folder.create({ name, type, folder: parent });
}

async function upsertDocument(collection, cls, key, data, ctx, indexType, { count = true } = {}) {
  data.flags = foundry.utils.mergeObject(data.flags ?? {}, { [MODULE_ID]: { [FLAG_KEY]: key } });
  let doc = collection.find((entry) => entry.getFlag?.(MODULE_ID, FLAG_KEY) === key);
  if (!doc) doc = collection.find((entry) => entry.name === data.name && (!data.folder || entry.folder?.id === data.folder));
  if (doc) {
    const updateData = foundry.utils.deepClone(data);
    delete updateData.type;
    const replacementPages = updateData.pages;
    delete updateData.pages;
    await doc.update(updateData);
    if (Array.isArray(replacementPages) && doc.documentName === "JournalEntry") {
      const existingPageIds = doc.pages?.contents?.map((page) => page.id) ?? [];
      if (existingPageIds.length) await doc.deleteEmbeddedDocuments("JournalEntryPage", existingPageIds);
      if (replacementPages.length) await doc.createEmbeddedDocuments("JournalEntryPage", replacementPages);
    }
  } else {
    doc = await cls.create(data);
    if (count) ctx.report[indexType] += 1;
  }
  ctx.index[indexType] ??= {};
  ctx.index[indexType][key] = { id: doc.id, uuid: doc.uuid, name: doc.name };
  return doc;
}

async function imageDimensions(src, ctx) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth || 1600, height: image.naturalHeight || 900 });
    image.onerror = () => {
      ctx.report.warnings.push(`No se pudo medir imagen: ${src}`);
      resolve({ width: 1600, height: 900 });
    };
    image.src = src;
  });
}

function countAssets(assetMap) {
  return Object.values(assetMap).reduce((total, group) => total + Object.keys(group).length, 0);
}

function link(doc) {
  return doc ? `@UUID[${doc.uuid}]{${escapeHtml(doc.name)}}` : "";
}

function textToParagraphs(text) {
  return String(text ?? "")
    .split(/\n{2,}/)
    .map((part) => `<p>${escapeHtml(part).replaceAll("\n", "<br>")}</p>`)
    .join("");
}

function fitAdventureScene(scene) {
  const screen = canvas?.app?.renderer?.screen;
  if (!scene || !screen?.width || !screen?.height || !canvas?.animatePan) return;
  const scale = Math.min(screen.width / Math.max(scene.width, 1), screen.height / Math.max(scene.height, 1)) * 0.98;
  canvas.animatePan({
    x: Math.round(scene.width / 2),
    y: Math.round(scene.height / 2),
    scale: Math.max(0.05, Math.min(scale, 3)),
    duration: 250
  });
}

async function syncCoverAudio(scene) {
  const sceneKey = scene?.getFlag?.(MODULE_ID, "sceneKey");
  if (sceneKey !== COVER_SCENE_KEY) return stopCoverAudio();
  if (coverAudio) return;
  const audioKey = scene.getFlag(MODULE_ID, "coverAudioKey");
  if (!audioKey) return;
  const assetMap = await loadAssetMap().catch(() => null);
  const src = assetMap?.audio?.[audioKey]?.path;
  const audioHelper = globalThis.foundry?.audio?.AudioHelper;
  if (!src || !audioHelper) return;
  coverAudio = await audioHelper.play({ src, loop: true, volume: 0.55 }, true).catch((err) => {
    console.warn("Los Abuelos de la Justicia | No se pudo reproducir la música de portada.", err);
    return null;
  });
}

function stopCoverAudio() {
  if (!coverAudio) return;
  coverAudio.stop?.();
  coverAudio = null;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
