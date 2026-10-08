// Base de datos de tenis de básquetbol estilo Nike / NBA con fotos de atletas oficiales
const basketballShoes = [
  // ================= 3 MODELOS PRINCIPALES SOLICITADOS =================
  {
    id: "giannis-immortality-4-pink",
    name: "Giannis Immortality 4 'Pink Flare'",
    brand: "Nike",
    signatureAthlete: "Giannis Antetokounmpo",
    athleteNumber: "#34",
    nbaTeam: "Milwaukee Bucks",
    playerImage: "assets/giannis-player.jpg",
    colorway: "Hyper Pink / Siren Red / Fierce Orange",
    category: "outdoor",
    categoryLabel: "Asfalto / Cemento (Outdoor)",
    badge: "🔥 Estrella del Asfalto",
    featured: true,
    priceUSD: 85,
    priceMXN: 1599,
    rating: 4.8,
    durabilityScore: 9.6,
    tractionScore: 9.1,
    cushionScore: 8.2,
    weightScore: 9.5,
    rubberType: "Caucho macizo ranurado de alta densidad con espiga profunda anti-abrasión",
    cushionTech: "Espuma Phylon moldeada de doble densidad con talón ergonómico curvado",
    playerType: "Bases, escoltas y jugadores veloces que dominan el eurostep",
    image: "assets/giannis-immortality-4.jpg",
    description: "El Giannis Immortality 4 en su vibrante edición Rosa Eléctrico ('Pink Flare'). Construido pensando en el streetball y las canchas públicas de asfalto. Su suela de caucho de alta densidad y surcos profundos ofrecen un agarre brutal en superficies ásperas sin desgastarse prematuramente, manteniendo un peso pluma incomparable.",
    athleteBio: "Giannis Antetokounmpo (#34 Milwaukee Bucks) — 2x MVP de la NBA y campeón. Su juego de potencia exige un calzado con caucho que resista la fricción extrema de sus eurosteps y zancadas imparables.",
    pros: [
      "Suela de caucho resistente especialmente formulada para concreto y asfalto",
      "Colorway 'Pink Flare' ultra llamativo y moderno estilo Nike Basketball",
      "Amortiguación Phylon ligera que facilita transiciones rápidas y eurosteps",
      "Excelente relación calidad-precio: nivel NBA por menos de $90 USD"
    ],
    cons: [
      "Amortiguación orientada a velocidad; jugadores de más de 100kg podrían preferir Max Air",
      "Sin unidad Zoom Air en el antepié para mantener el precio accesible"
    ],
    verdict: "El indiscutible rey del asfalto por debajo de los $100 USD. Resiste el desgaste del pavimento con el look audaz de 'The Greek Freak'."
  },
  {
    id: "nike-ja-3-zoomx",
    name: "Nike Ja 3 'Hyper Energy / ZoomX'",
    brand: "Nike",
    signatureAthlete: "Ja Morant",
    athleteNumber: "#12",
    nbaTeam: "Memphis Grizzlies",
    playerImage: "assets/ja-player.webp",
    colorway: "Plum Mist / Pink / Glacier Mint / Dark Concord",
    category: "indoor",
    categoryLabel: "Duela / Madera Pulida (Indoor)",
    badge: "⚡ Reactividad Explosiva",
    featured: true,
    priceUSD: 135,
    priceMXN: 2499,
    rating: 4.9,
    durabilityScore: 7.2,
    tractionScore: 9.9,
    cushionScore: 9.5,
    weightScore: 9.6,
    rubberType: "Goma de compuesto adherente con espigas dentadas multidireccionales en 3D",
    cushionTech: "Mediasuela ZoomX de retorno de energía ultraligero + unidad Air Zoom delantera",
    playerType: "Bases acrobáticos, finalizadores por encima del aro y velocistas",
    image: "assets/ja-3.webp",
    description: "La evolución de la línea signature de Ja Morant incorpora por primera vez la aclamada espuma ZoomX en la mediasuela. Su suela de agarre tridimensional cuenta con un patrón dentado agresivo diseñado para morder la madera pulida en cambios de dirección instantáneos y despegues verticales explosivos.",
    athleteBio: "Ja Morant (#12 Memphis Grizzlies) — Uno de los bases más explosivos y acrobáticos en la historia de la liga. Requiere tracción de frenado instantáneo para clavar frenadas en seco y despegar al aro.",
    pros: [
      "Agarre quirúrgico con frenada chirriante ('squeak') inmediato en duela de madera",
      "Espuma ZoomX que brinda el mayor retorno de energía de Nike Basketball",
      "Ajuste ceñido con bloqueo en el mediopié para saltos acrobáticos",
      "Estética agresiva y vanguardista con suela texturizada envolvente"
    ],
    cons: [
      "NO RECOMENDADO PARA ASFALTO RUGOSO: el compuesto blando de duela se degrada en pavimento",
      "Ajuste atlético ceñido (se recomienda media talla más para pie ancho)"
    ],
    verdict: "Una máquina de propulsión para duela techada. Si tu juego se basa en aceleraciones supersónicas y brincos como los de Ja, este es el arma definitiva."
  },
  {
    id: "lebron-witness-8-lakers",
    name: "Nike LeBron Witness 8 'Lakers King'",
    brand: "Nike",
    signatureAthlete: "LeBron James",
    athleteNumber: "#23",
    nbaTeam: "Los Angeles Lakers",
    playerImage: "assets/lebron-player.webp",
    colorway: "Court Purple / University Gold / Black / White",
    category: "hybrid",
    categoryLabel: "Versátil / Híbrida (Asfalto & Duela)",
    badge: "👑 Impacto & Fuerza",
    featured: true,
    priceUSD: 110,
    priceMXN: 2099,
    rating: 4.8,
    durabilityScore: 9.0,
    tractionScore: 9.2,
    cushionScore: 9.4,
    weightScore: 8.3,
    rubberType: "Caucho de alta duración con espiga clásica segmentada y diamante de tracción",
    cushionTech: "Unidad Max Air de perfil bajo en toda la zona del talón + espuma envolvente",
    playerType: "Aleros potentes, jugadores físicos y reboteadores",
    image: "assets/lebron-witness-8.webp",
    description: "Inspirado en la potencia de 'The King' LeBron James y los colores emblemáticos de Los Angeles Lakers. El LeBron Witness 8 destaca por su imponente emblema del león coronado en la lengüeta y una unidad Max Air visible en el talón que neutraliza los impactos más severos sobre asfalto o duela.",
    athleteBio: "LeBron James (#23 Los Angeles Lakers) — 4x Campeón de la NBA y líder histórico. Su calzado signature está construido como un blindaje de absorción para soportar el impacto físico en cualquier superficie.",
    pros: [
      "Cámara Max Air visible que absorbe y disipa el impacto en caídas duras",
      "Construcción híbrida muy resistente: excelente tanto en cemento como en madera",
      "Cuello acolchado y contención lateral para máxima protección del tobillo",
      "Colores legendarios de los Lakers (Púrpura y Oro) con detalles premium"
    ],
    cons: [
      "Sensación ligeramente más alta del suelo (menos court-feel rasante)",
      "Un poco más pesado que los modelos de base (390g)"
    ],
    verdict: "El todoterreno blindado de Nike. Cuida tus articulaciones y rinde con honores tanto en el parque de tu colonia como en torneos techados."
  },

  // ================= KOBE 8 PROTRO (IMAGEN 4 ZAPATILLA + IMAGEN 5 KOBE BRYANT) =================
  {
    id: "nike-kobe-8-protro",
    name: "Nike Kobe 8 Protro 'Court Purple 8/24'",
    brand: "Nike",
    signatureAthlete: "Kobe Bryant",
    athleteNumber: "#8 / #24",
    nbaTeam: "Los Angeles Lakers (Legend)",
    playerImage: "assets/kobe-player.webp",
    colorway: "White / Court Purple (Números 8 y 24)",
    category: "indoor",
    categoryLabel: "Duela / Madera Pulida (Indoor NBA)",
    badge: "🐍 Mamba Forever • Duela Pro",
    featured: true,
    priceUSD: 190,
    priceMXN: 3799,
    rating: 4.95,
    durabilityScore: 6.2,
    tractionScore: 10.0,
    cushionScore: 8.9,
    weightScore: 10.0,
    rubberType: "Goma translúcida y sólida de agarre quirúrgico con grabado en espiga de precisión",
    cushionTech: "Plantilla removible completa de espuma Nike React de perfil ultra bajo",
    playerType: "Bases, escoltas y creadores de tiro ágiles que exigen frenada milimétrica",
    image: "assets/kobe-8-shoe.webp",
    description: "La legendaria silueta de Kobe Bryant en su icónica edición Court Purple con los dorsales #8 y #24 estampados sobre la malla transpirable. Considerado por los jugadores de la NBA como el mejor tenis de duela jamás creado: ultraligero (menos de 340 gramos), con una plantilla reactiva de espuma React y una mordida quirúrgica que abraza el parquet como ningún otro.",
    athleteBio: "Kobe Bryant (#8 / #24 Los Angeles Lakers) — 5x Campeón de la NBA y leyenda eterna de la Mamba Mentality. Su calzado fue pionero en revolucionar los tenis de corte bajo para máxima velocidad y tracción milimétrica en duela.",
    pros: [
      "El agarre más preciso y letal del mundo en duela de madera (10/10)",
      "Ultraligero: menos de 340g, sensación de correr descalzo con tracción",
      "Edición homenaje con los números 8 y 24 en púrpura Lakers",
      "Plantilla de espuma React ultra cómoda y de respuesta inmediata"
    ],
    cons: [
      "PROHIBIDO EN ASFALTO: El compuesto tierno de la suela se desgasta en pocas sesiones en exteriores",
      "Alta demanda y precio de reventa elevado en el mercado de coleccionistas"
    ],
    verdict: "El santo grial para duela techada. Una obra de arte de la Mamba Mentality que nunca debe pisar el asfalto callejero."
  },

  // ================= WAY OF WADE ALL CITY 12 (IMAGEN 1 ZAPATILLA + IMAGEN 2 DWYANE WADE) =================
  {
    id: "wow-all-city-12",
    name: "Way of Wade All City 12 'City of Angels'",
    brand: "Way of Wade",
    signatureAthlete: "Dwyane Wade",
    athleteNumber: "#3",
    nbaTeam: "Miami Heat (Legend)",
    playerImage: "assets/dwyane-wade-player.webp",
    colorway: "Sunset Peach / Pastel Gradient / Purple Ice",
    category: "outdoor",
    categoryLabel: "Asfalto / Cemento (Outdoor)",
    badge: "🛡️ Blindaje TUFF RB • Asfalto",
    featured: true,
    priceUSD: 149,
    priceMXN: 2750,
    rating: 4.9,
    durabilityScore: 9.9,
    tractionScore: 9.5,
    cushionScore: 9.3,
    weightScore: 8.8,
    rubberType: "TUFF RB (Caucho anti-abrasión de densidad extrema indestructible)",
    cushionTech: "Li-Ning BOOM de longitud completa + Jaula de TPU envolvente",
    playerType: "Bases y escoltas agresivos que juegan en canchas públicas de calle",
    image: "assets/wow-all-city-12.webp",
    description: "Considerado por la crítica mundial como el mejor tenis para canchas de asfalto y concreto. Esta edición luce un degradado sunset en tonos durazno, amarillo y morado translúcido, blindada por la legendaria suela de caucho TUFF RB que resiste años de fricción sobre pavimento.",
    athleteBio: "Dwyane Wade (#3 Miami Heat Legend) — 3x Campeón de la NBA y MVP de las Finales. Su línea Way of Wade fue creada para dominar el streetball con tecnología de suela que no tiene comparación en durabilidad.",
    pros: [
      "Suela TUFF RB: la goma más duradera del planeta en canchas de asfalto y cemento",
      "Espuma BOOM super reactiva con retorno elástico de primer nivel",
      "Jaula lateral de TPU que asegura el pie en cambios de dirección violentos",
      "Diseño estilizado con degradado sunset exclusivo"
    ],
    cons: [
      "Disponibilidad principal en tiendas en línea y distribuidores oficiales",
      "Ajuste ligeramente ceñido para pies anchos"
    ],
    verdict: "La inversión definitiva si juegas en la calle. Un par indestructible que te durará múltiples temporadas en asfalto."
  },

  // ================= ADIDAS AE 1 (IMAGEN 3 ZAPATILLA + IMAGEN 4 ANTHONY EDWARDS) =================
  {
    id: "adidas-ae-1",
    name: "Adidas AE 1 'With Love / Georgia Peach'",
    brand: "Adidas",
    signatureAthlete: "Anthony Edwards",
    athleteNumber: "#5",
    nbaTeam: "Minnesota Timberwolves",
    playerImage: "assets/anthony-edwards-player.jpg",
    colorway: "Core Black / Georgia Peach / Acid Orange",
    category: "hybrid",
    categoryLabel: "Versátil / Híbrida (Mixto)",
    badge: "⭐ Zapatilla Sensación del Año",
    featured: true,
    priceUSD: 120,
    priceMXN: 2299,
    rating: 4.9,
    durabilityScore: 8.8,
    tractionScore: 9.6,
    cushionScore: 9.4,
    weightScore: 7.9,
    rubberType: "Suela en espina de pescado tradicional profunda sobredimensionada",
    cushionTech: "Jet Boost encapsulado + espuma Lightstrike de despegue",
    playerType: "Jugadores agresivos que atacan el aro con potencia y mates feroces",
    image: "assets/adidas-ae1-shoe.webp",
    description: "El primer modelo signature de 'Ant-Man' se convirtió en un fenómeno global por su llamativa estructura de TPU en panal de abeja color melocotón ('Georgia Peach') y negro mate. Su suela de espiga clásica rinde con agarre feroz en duela y aguanta castigo en canchas al aire libre.",
    athleteBio: "Anthony Edwards (#5 Minnesota Timberwolves) — La joven superestrella más explosiva de la NBA. Su calzado fue diseñado para resistir las fuerzas gravitacionales de sus saltos descomunales y cambios de ritmo.",
    pros: [
      "Tracción de espiga en espina de pescado de fiabilidad total en madera y exterior",
      "Amortiguación Jet Boost con balance ideal entre despegue y suavidad",
      "Diseño icónico con soporte de contención lateral de TPU masivo",
      "Excelente precio ($120 USD) para un tenis signature de superestrella"
    ],
    cons: [
      "Peso por encima del promedio debido a la estructura de TPU (unos 470g)",
      "Alta demanda y stock que se agota con frecuencia"
    ],
    verdict: "El todoterreno moderno por excelencia. Aguanta asfalto decentemente y domina en duela sin perder tracción."
  },

  // ================= UNDER ARMOUR CURRY FLOW 8 (IMAGEN 5 ZAPATILLA - CAMBIADO POR KD 16) =================
  {
    id: "ua-curry-flow-8",
    name: "Under Armour Curry Flow 8 'Snake Bite'",
    brand: "Under Armour",
    signatureAthlete: "Stephen Curry",
    athleteNumber: "#30",
    nbaTeam: "Golden State Warriors",
    playerImage: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=400&q=80",
    colorway: "Black / Snake Print / Blaze Orange / White Flow",
    category: "indoor",
    categoryLabel: "Duela / Madera Pulida (Indoor NBA)",
    badge: "🎯 Tecnología UA Flow Sin Goma",
    featured: true,
    priceUSD: 160,
    priceMXN: 2950,
    rating: 4.85,
    durabilityScore: 5.0,
    tractionScore: 10.0,
    cushionScore: 8.8,
    weightScore: 9.9,
    rubberType: "UA Flow (Espuma directa al suelo sin caucho tradicional)",
    cushionTech: "Amortiguación UA Flow de contacto directo de una sola pieza + placa Pebax",
    playerType: "Tiradores puros, bases escurridizos y anotadores perimetrales rápidos",
    image: "assets/curry-8-shoe.png",
    description: "El revolucionario calzado donde Stephen Curry y Under Armour cambiaron las reglas de la industria eliminando por completo la pesada suela de caucho. Toda la zapatilla descansa directamente sobre la espuma UA Flow, proporcionando la mordida más rápida e instantánea del mundo en duela de madera limpia con un llamativo estampado snakeskin y cuello tejido elástico.",
    athleteBio: "Stephen Curry (#30 Golden State Warriors) — 4x Campeón de la NBA y el mejor tirador de todos los tiempos. La tecnología Flow fue creada para permitirle frenar en milésimas de segundo y lanzar triples sin resbalar un solo milímetro.",
    pros: [
      "El agarre más violento e instantáneo jamás probado en duela limpia (10/10)",
      "Peso ultra reducido al no tener goma de caucho pesada",
      "Parte superior tejida con paneles en textura snakeskin y cuello tipo calcetín",
      "Placa de propulsión Pebax que potencia el salto de suspensión"
    ],
    cons: [
      "PROHIBIDO EN ASFALTO: Al no tener goma, el pavimento lija la espuma en pocos partidos",
      "Sensible al polvo excesivo si la duela no se limpia regularmente"
    ],
    verdict: "Arma definitiva exclusiva para duela limpia. En madera es casi magia; en asfalto es una sentencia de muerte para el tenis."
  }
];

// Guía técnica comparativa por tipo de superficie
const courtTypesGuide = [
  {
    type: "outdoor",
    title: "Asfalto & Cemento (Outdoor)",
    subtitle: "Streetball & Canchas Públicas",
    badge: "Alta Abrasión",
    colorBadge: "bg-red-600 text-white",
    keyTech: "Caucho denso macizo (como Giannis Immortality 4 o TUFF RB de Way of Wade)",
    challenges: [
      "El pavimento actúa como lija de grano grueso sobre gomas blandas.",
      "Cero amortiguación natural: el impacto de los saltos pasa directo a rodillas y talones.",
      "Presencia de tierra y partículas que saturan surcos finos."
    ],
    idealFeatures: [
      "Suelas de goma gruesa y maciza con patrones de espiga anchos.",
      "Amortiguación reforzada (Air Max o Phylon de alta densidad).",
      "Modelos económicos resistentes que no duelan desgastar."
    ]
  },
  {
    type: "indoor",
    title: "Duela de Madera & Parquet (Indoor)",
    subtitle: "Gimnasios & Ligas Techadas NBA",
    badge: "Máxima Adherencia",
    colorBadge: "bg-blue-600 text-white",
    keyTech: "Suelas con grabado 3D, espigas dentadas y UA Flow (como Ja 3, Kobe 8 y Curry 8)",
    challenges: [
      "Película invisible de polvo fino que causa deslizamientos inesperados.",
      "Necesidad de frenadas en seco instantáneas (stop-and-pop) sin resbalar."
    ],
    idealFeatures: [
      "Compuestos de goma suaves que proporcionan sonido chirriante ('squeak').",
      "Espumas reactivas de bajo perfil para sentir la pista (court-feel).",
      "Corte ajustado para contención lateral en eurosteps y crossovers."
    ]
  },
  {
    type: "hybrid",
    title: "Canchas Híbridas & Mixtas",
    subtitle: "Uso Todo-Terreno (Duela + Concreto)",
    badge: "Equilibrio Total",
    colorBadge: "bg-amber-500 text-black font-bold",
    keyTech: "Max Air + Goma duradera dividida (como LeBron Witness 8 y Adidas AE 1)",
    challenges: [
      "Transición constante entre superficies abrasivas y pistas pulidas.",
      "Riesgo de arruinar un par costoso al alternar ambientes."
    ],
    idealFeatures: [
      "Goma sólida de dureza intermedia con espiga tradicional en espina de pescado.",
      "Cámaras de amortiguación versátiles (Max Air / Jet Boost).",
      "Estructuras robustas con buen soporte de tobillo y contención TPU."
    ]
  }
];
