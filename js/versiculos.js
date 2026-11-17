// BASE DE TEXTOS BÍBLICOS — Reina-Valera 1960 (dominio público).
// Escogidos según los temas del testimonio y los mensajes de la pastora Angela Bornachera.
// Para agregar uno: copia una línea, cambia texto (t), referencia (r) y tema.
// Verificados en línea contra la RVR1960 (Bible Gateway): Sal 34:18, Fil 4:6-7, Is 41:10, Jer 33:3, Mr 9:23, Mt 11:28, Sal 73:25,
//   Sal 51:6, 1 P 5:7, 1 Co 2:16, 2 Co 10:5, Sal 27:14, Ap 21:5, Is 43:19, Sal 126:5, Sal 30:5, Lc 15:20, 1 Co 14:3, 2 Ti 1:7,
//   Is 43:1, Lm 3:22-23, Mt 6:6, Ap 2:4-5, Is 40:31, Fil 4:13, Ro 12:2 (y partes de Fil 4:8, Stg 5:16, Jos 1:9, 1 Jn 4:18).
// Pendientes de confirmar en una Biblia impresa antes de publicar: Sal 55:22 y el final de Fil 4:8, Stg 5:16, Jos 1:9 y 1 Jn 4:18.
window.TEMAS = {
  ansiedad: "Ansiedad", empezar: "Volver a empezar", soltar: "Soltar cargas", quebrantado: "Quebrantados",
  miedo: "Miedo", silencio: "Silencio de Dios", oracion: "Oración", mente: "Mente de Cristo",
  altar: "Volver al altar", profecia: "Voz profética", fortaleza: "Fortaleza"
};
window.VERSICULOS = [
  { tema: "ansiedad", r: "Filipenses 4:6", t: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias." },
  { tema: "ansiedad", r: "Filipenses 4:7", t: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús." },
  { tema: "ansiedad", r: "1 Pedro 5:7", t: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros." },
  { tema: "empezar", r: "Apocalipsis 21:5", t: "Y el que estaba sentado en el trono dijo: He aquí, yo hago nuevas todas las cosas." },
  { tema: "empezar", r: "Isaías 43:19", t: "He aquí que yo hago cosa nueva; pronto saldrá a luz; ¿no la conoceréis? Otra vez abriré camino en el desierto, y ríos en la soledad." },
  { tema: "empezar", r: "Lamentaciones 3:22-23", t: "Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad." },
  { tema: "soltar", r: "Mateo 11:28", t: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar." },
  { tema: "soltar", r: "Salmo 55:22", t: "Echa sobre Jehová tu carga, y él te sustentará; no dejará para siempre caído al justo." },
  { tema: "quebrantado", r: "Salmo 34:18", t: "Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu." },
  { tema: "quebrantado", r: "Salmo 30:5", t: "Por la noche durará el lloro, y a la mañana vendrá la alegría." },
  { tema: "quebrantado", r: "Salmo 126:5", t: "Los que sembraron con lágrimas, con regocijo segarán." },
  { tema: "quebrantado", r: "Lucas 15:20", t: "Y levantándose, vino a su padre. Y cuando aún estaba lejos, lo vio su padre, y fue movido a misericordia, y corrió, y se echó sobre su cuello, y le besó." },
  { tema: "miedo", r: "Isaías 41:10", t: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia." },
  { tema: "miedo", r: "Isaías 43:1", t: "No temas, porque yo te redimí; te puse nombre, mío eres tú." },
  { tema: "miedo", r: "Josué 1:9", t: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas." },
  { tema: "miedo", r: "2 Timoteo 1:7", t: "Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio." },
  { tema: "miedo", r: "1 Juan 4:18", t: "En el amor no hay temor, sino que el perfecto amor echa fuera el temor." },
  { tema: "silencio", r: "Salmo 27:14", t: "Aguarda a Jehová; esfuérzate, y aliéntese tu corazón; sí, espera a Jehová." },
  { tema: "silencio", r: "Isaías 40:31", t: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán." },
  { tema: "silencio", r: "Salmo 73:25", t: "¿A quién tengo yo en los cielos sino a ti? Y fuera de ti nada deseo en la tierra." },
  { tema: "oracion", r: "Jeremías 33:3", t: "Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces." },
  { tema: "oracion", r: "Marcos 9:23", t: "Jesús le dijo: Si puedes creer, al que cree todo le es posible." },
  { tema: "oracion", r: "Mateo 6:6", t: "Mas tú, cuando ores, entra en tu aposento, y cerrada la puerta, ora a tu Padre que está en secreto; y tu Padre que ve en lo secreto te recompensará en público." },
  { tema: "oracion", r: "Santiago 5:16", t: "La oración eficaz del justo puede mucho." },
  { tema: "mente", r: "Filipenses 4:8", t: "Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si algo digno de alabanza, en esto pensad." },
  { tema: "mente", r: "1 Corintios 2:16", t: "Porque ¿quién conoció la mente del Señor? ¿Quién le instruirá? Mas nosotros tenemos la mente de Cristo." },
  { tema: "mente", r: "2 Corintios 10:5", t: "Derribando argumentos y toda altivez que se levanta contra el conocimiento de Dios, y llevando cautivo todo pensamiento a la obediencia a Cristo." },
  { tema: "mente", r: "Romanos 12:2", t: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta." },
  { tema: "altar", r: "Apocalipsis 2:4-5", t: "Pero tengo contra ti, que has dejado tu primer amor. Recuerda, por tanto, de dónde has caído, y arrepiéntete, y haz las primeras obras." },
  { tema: "altar", r: "Salmo 51:6", t: "He aquí, tú amas la verdad en lo íntimo, y en lo secreto me has hecho comprender sabiduría." },
  { tema: "profecia", r: "1 Corintios 14:3", t: "Pero el que profetiza habla a los hombres para edificación, exhortación y consolación." },
  { tema: "fortaleza", r: "Filipenses 4:13", t: "Todo lo puedo en Cristo que me fortalece." }
];
