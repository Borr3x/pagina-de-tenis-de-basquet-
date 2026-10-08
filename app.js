// Estado de la aplicación estilo Nike / NBA
const state = {
  category: 'all',
  budget: 'all',
  brand: 'all',
  currency: 'USD',
  sortBy: 'recommended',
  searchQuery: '',
  compareList: [] // Almacena IDs de tenis para comparar (máximo 3)
};

// Formateador de precios
function formatPrice(amountUSD, amountMXN, currency) {
  if (currency === 'USD') {
    return `$${amountUSD.toLocaleString('en-US')} USD`;
  } else {
    return `$${amountMXN.toLocaleString('es-MX')} MXN`;
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderCourtGuideSection();
  renderBrandFilters();
  renderShoes();
  setupEventListeners();
  initQuiz();
  updateStaticFeaturedPrices();
});

// Actualizar precios en las tarjetas estáticas del Big Three al cambiar moneda
function updateStaticFeaturedPrices() {
  document.querySelectorAll('[data-price-usd]').forEach(el => {
    const usd = parseInt(el.getAttribute('data-price-usd'), 10);
    const mxn = parseInt(el.getAttribute('data-price-mxn'), 10);
    el.textContent = state.currency === 'USD' ? `$${usd} USD` : `$${mxn.toLocaleString('es-MX')} MXN`;
  });
}

// Renderizar filtros de marcas disponibles
function renderBrandFilters() {
  const brandContainer = document.getElementById('brand-filters');
  if (!brandContainer) return;

  const brands = ['all', ...new Set(basketballShoes.map(s => s.brand))];
  brandContainer.innerHTML = brands.map(b => `
    <button class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
      state.brand === b 
        ? 'bg-[#ff5000] text-white' 
        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700'
    }" data-brand="${b}">
      ${b === 'all' ? 'Todas las Marcas' : b}
    </button>
  `).join('');

  brandContainer.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.brand = e.currentTarget.dataset.brand;
      renderBrandFilters();
      renderShoes();
    });
  });
}

// Renderizar guía técnica de canchas
function renderCourtGuideSection() {
  const container = document.getElementById('court-guides-grid');
  if (!container) return;

  container.innerHTML = courtTypesGuide.map(guide => `
    <div class="nike-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-neutral-800 transition-all">
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${guide.colorBadge}">
            ${guide.badge}
          </span>
          <button onclick="filterByCourt('${guide.type}')" class="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1 group">
            Ver Modelos 
            <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <h3 class="font-nike text-2xl text-white font-black mb-1">${guide.title}</h3>
        <span class="text-xs text-neutral-400 block mb-4 font-semibold uppercase">${guide.subtitle}</span>

        <div class="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 mb-4 text-xs">
          <span class="text-neutral-400 block font-bold uppercase text-[10px]">Ejemplo Clave de Suela:</span>
          <span class="text-white font-semibold">${guide.keyTech}</span>
        </div>

        <div class="space-y-4 text-xs text-neutral-300">
          <div>
            <h4 class="font-bold text-rose-400 uppercase text-[11px] mb-1.5 flex items-center gap-1.5">
              ⚠️ El Gran Desafío
            </h4>
            <ul class="list-disc pl-4 space-y-1 text-neutral-400">
              ${guide.challenges.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>

          <div class="pt-2 border-t border-neutral-800">
            <h4 class="font-bold text-emerald-400 uppercase text-[11px] mb-1.5 flex items-center gap-1.5">
              ✓ Qué Buscar en la Zapatilla
            </h4>
            <ul class="list-disc pl-4 space-y-1 text-neutral-400">
              ${guide.idealFeatures.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-neutral-800">
        <button onclick="filterByCourt('${guide.type}')" class="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-black uppercase tracking-wider rounded-xl transition-all border border-neutral-700">
          Explorar Tenis para Esta Cancha
        </button>
      </div>
    </div>
  `).join('');
}

// Filtrar y ordenar tenis
function getFilteredShoes() {
  return basketballShoes.filter(shoe => {
    // Filtro por cancha
    if (state.category !== 'all' && shoe.category !== state.category) return false;

    // Filtro por marca
    if (state.brand !== 'all' && shoe.brand !== state.brand) return false;

    // Filtro por presupuesto
    if (state.budget === 'budget' && shoe.priceUSD >= 100) return false;
    if (state.budget === 'mid' && (shoe.priceUSD < 100 || shoe.priceUSD > 140)) return false;
    if (state.budget === 'premium' && shoe.priceUSD <= 140) return false;

    // Búsqueda en vivo
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = shoe.name.toLowerCase().includes(q);
      const matchAthlete = (shoe.signatureAthlete || '').toLowerCase().includes(q);
      const matchBrand = shoe.brand.toLowerCase().includes(q);
      const matchTech = shoe.cushionTech.toLowerCase().includes(q);
      const matchRubber = shoe.rubberType.toLowerCase().includes(q);
      if (!matchName && !matchAthlete && !matchBrand && !matchTech && !matchRubber) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (state.sortBy) {
      case 'price-low':
        return state.currency === 'USD' ? a.priceUSD - b.priceUSD : a.priceMXN - b.priceMXN;
      case 'price-high':
        return state.currency === 'USD' ? b.priceUSD - a.priceUSD : b.priceMXN - a.priceMXN;
      case 'durability':
        return b.durabilityScore - a.durabilityScore;
      case 'traction':
        return b.tractionScore - a.tractionScore;
      case 'recommended':
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });
}

// Renderizar tarjetas de tenis en el catálogo
function renderShoes() {
  const container = document.getElementById('shoes-grid');
  const countBadge = document.getElementById('results-count');
  if (!container) return;

  const shoes = getFilteredShoes();
  if (countBadge) {
    countBadge.textContent = `${shoes.length} modelo${shoes.length === 1 ? '' : 's'} disponible${shoes.length === 1 ? '' : 's'}`;
  }

  if (shoes.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center nike-card rounded-3xl p-8 border border-neutral-800">
        <h3 class="font-nike text-3xl text-white mb-2">NO ENCONTRAMOS MODELOS CON ESOS FILTROS</h3>
        <p class="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto mb-6">Prueba seleccionando "Todas las Canchas" o limpiando tu búsqueda.</p>
        <button onclick="resetFilters()" class="px-6 py-3 bg-[#ff5000] hover:bg-[#e04500] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all">
          Restablecer Filtros
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = shoes.map(shoe => {
    const isCompared = state.compareList.includes(shoe.id);
    const priceDisplay = formatPrice(shoe.priceUSD, shoe.priceMXN, state.currency);
    const isKobe = shoe.id === 'nike-kobe-8-protro';

    let courtTagClass = 'bg-[#ff5000]/20 text-[#ff5000] border-[#ff5000]/40';
    if (shoe.category === 'indoor') {
      courtTagClass = 'bg-blue-600/20 text-cyan-400 border-blue-500/40';
    } else if (shoe.category === 'hybrid') {
      courtTagClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }

    // CASILLA ESPECIAL PARA KOBE 8 PROTRO (ZAPATILLA + KOBE BRYANT)
    if (isKobe) {
      return `
        <div class="nike-card kobe-mamba-card rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 border-2" data-shoe-id="${shoe.id}">
          <div>
            <!-- Banner Kobe Bryant (Imagen 5) -->
            <div class="bg-gradient-to-r from-[#552583]/90 via-[#37135e] to-black p-4 flex items-center justify-between border-b border-[#fdb927]/30">
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-[#fdb927] bg-black shadow-lg flex-shrink-0">
                  <img 
                    src="${shoe.playerImage}" 
                    alt="Kobe Bryant mordiendo la camiseta de los Lakers #24" 
                    class="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span class="text-[10px] font-black uppercase text-[#fdb927] tracking-widest block">MAMBA FOREVER LEGEND</span>
                  <h4 class="font-nike text-lg text-white font-black leading-tight">KOBE BRYANT</h4>
                  <span class="text-[11px] text-amber-200 font-bold">#8 / #24 • Los Angeles Lakers</span>
                </div>
              </div>
              <span class="px-2 py-1 rounded bg-[#fdb927] text-black font-nike text-xs font-black tracking-wider">
                NBA GOAT
              </span>
            </div>

            <!-- Foto Zapatilla Kobe 8 Protro (Imagen 4) -->
            <div class="relative bg-[#18181c] aspect-[4/3] flex items-center justify-center p-4 overflow-hidden">
              <img 
                src="${shoe.image}" 
                alt="Nike Kobe 8 Protro Court Purple 8/24" 
                loading="lazy" 
                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${courtTagClass}">
                  Duela / Indoor
                </span>
              </div>
              <div class="absolute top-3 right-3">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/80 text-amber-300 border border-amber-500/30">
                  ★ ${shoe.rating}
                </span>
              </div>
              <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded bg-black/85 text-[#fdb927] text-[10px] font-bold uppercase tracking-wider border border-[#fdb927]/40">
                  🐍 Edición: Court Purple 8 & 24
                </span>
              </div>
            </div>

            <!-- Info Kobe 8 -->
            <div class="p-6">
              <div class="flex items-start justify-between gap-2 mb-1">
                <div>
                  <span class="text-[10px] uppercase tracking-widest font-black text-amber-400">
                    KOBE BRYANT SIGNATURE
                  </span>
                  <h3 class="font-nike text-2xl text-white font-black leading-tight group-hover:text-[#fdb927] transition-colors">
                    ${shoe.name}
                  </h3>
                </div>
                <div class="text-right">
                  <span class="text-xs text-neutral-400 block font-semibold uppercase">Precio</span>
                  <span class="text-lg font-black text-[#fdb927] font-mono">
                    ${priceDisplay}
                  </span>
                </div>
              </div>

              <p class="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                El santo grial para duela de madera. Con estampados de los dorsales 8 y 24, peso pluma de menos de 340g y mordida quirúrgica que abraza el parquet.
              </p>

              <div class="mt-4 pt-3 border-t border-neutral-800 space-y-2">
                <div>
                  <div class="flex justify-between text-[11px] mb-1">
                    <span class="text-neutral-300 font-bold uppercase">Tracción Quirúrgica en Duela</span>
                    <span class="font-mono font-black text-cyan-400">10 / 10 (Perfecto)</span>
                  </div>
                  <div class="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div class="bg-cyan-400 h-full rounded-full" style="width: 100%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-[11px] mb-1">
                    <span class="text-neutral-400 font-bold uppercase">Ligereza de Corte Bajo</span>
                    <span class="font-mono font-black text-[#fdb927]">10 / 10 (&lt; 340g)</span>
                  </div>
                  <div class="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div class="bg-gradient-to-r from-[#552583] to-[#fdb927] h-full rounded-full" style="width: 100%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 pt-0 flex items-center gap-2">
            <button 
              onclick="openShoeModal('${shoe.id}')"
              class="flex-1 py-3 px-3 bg-[#fdb927] hover:bg-white text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all text-center shadow-lg shadow-[#fdb927]/20"
            >
              Ficha Técnica & Kobe Bryant
            </button>
            <button 
              onclick="toggleCompare('${shoe.id}')"
              class="py-3 px-3.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 ${
                isCompared 
                  ? 'bg-[#ff5000] text-white border-[#ff5000]' 
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
              }"
            >
              <span>${isCompared ? '✓' : '+'}</span>
            </button>
          </div>
        </div>
      `;
    }

    // TARJETA GENERAL CON FOTO DEL ATLETA INTEGRADA (WAY OF WADE, ADIDAS AE 1, CURRY 8, GIANNIS, JA, LEBRON)
    return `
      <div class="nike-card rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300" data-shoe-id="${shoe.id}">
        <div>
          <!-- Cabecera del Atleta con su Foto Oficial -->
          ${shoe.playerImage ? `
            <div class="bg-neutral-900/90 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-full overflow-hidden border-2 border-neutral-700 bg-black flex-shrink-0">
                  <img src="${shoe.playerImage}" alt="${shoe.signatureAthlete}" class="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <span class="text-[9px] font-black uppercase text-[#ff5000] tracking-widest block">SIGNATURE ATHLETE</span>
                  <span class="text-xs font-black text-white uppercase block leading-tight">${shoe.signatureAthlete}</span>
                  <span class="text-[10px] text-neutral-400 font-bold">${shoe.athleteNumber || ''} • ${shoe.nbaTeam || ''}</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase border ${courtTagClass}">
                ${shoe.category === 'outdoor' ? 'Asfalto' : shoe.category === 'indoor' ? 'Duela' : 'Híbrido'}
              </span>
            </div>
          ` : ''}

          <!-- Imagen del Calzado -->
          <div class="relative bg-[#1a1a1a] aspect-[4/3] flex items-center justify-center p-4 overflow-hidden">
            <img 
              src="${shoe.image}" 
              alt="${shoe.name}" 
              loading="lazy" 
              class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            
            <div class="absolute top-3 right-3">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/80 text-amber-300 border border-amber-500/30">
                ★ ${shoe.rating}
              </span>
            </div>

            <div class="absolute bottom-3 left-3">
              <span class="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-md border border-neutral-700">
                ${shoe.badge}
              </span>
            </div>
          </div>

          <!-- Cuerpo Informativo -->
          <div class="p-6">
            <div class="flex items-start justify-between gap-2 mb-1">
              <div>
                <span class="text-[10px] uppercase tracking-widest font-black text-neutral-400">
                  ${shoe.brand}
                </span>
                <h3 class="font-nike text-2xl text-white font-black leading-tight group-hover:text-[#ff5000] transition-colors">
                  ${shoe.name}
                </h3>
              </div>
              <div class="text-right">
                <span class="text-xs text-neutral-400 block font-semibold uppercase">Precio</span>
                <span class="text-lg font-black text-white font-mono text-[#ff5000]">
                  ${priceDisplay}
                </span>
              </div>
            </div>

            <p class="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
              ${shoe.description}
            </p>

            <!-- Métricas -->
            <div class="mt-4 pt-3 border-t border-neutral-800 space-y-2">
              <div>
                <div class="flex justify-between text-[11px] mb-1">
                  <span class="text-neutral-400 font-bold uppercase">Durabilidad en Asfalto</span>
                  <span class="font-mono font-black ${shoe.durabilityScore >= 9 ? 'text-emerald-400' : shoe.durabilityScore >= 7.5 ? 'text-amber-400' : 'text-rose-400'}">${shoe.durabilityScore} / 10</span>
                </div>
                <div class="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full rounded-full ${shoe.durabilityScore >= 9 ? 'bg-emerald-500' : shoe.durabilityScore >= 7.5 ? 'bg-amber-500' : 'bg-rose-500'}" style="width: ${shoe.durabilityScore * 10}%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-[11px] mb-1">
                  <span class="text-neutral-400 font-bold uppercase">Agarre en Duela</span>
                  <span class="font-mono font-black text-cyan-400">${shoe.tractionScore} / 10</span>
                </div>
                <div class="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div class="h-full rounded-full bg-cyan-400" style="width: ${shoe.tractionScore * 10}%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="p-6 pt-0 flex items-center gap-2">
          <button 
            onclick="openShoeModal('${shoe.id}')"
            class="flex-1 py-2.5 px-3 bg-white hover:bg-[#ff5000] hover:text-white text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all text-center"
          >
            Ficha Técnica & Atleta
          </button>

          <button 
            onclick="toggleCompare('${shoe.id}')"
            class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 ${
              isCompared 
                ? 'bg-[#ff5000] text-white border-[#ff5000]' 
                : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
            }"
            title="Comparar calzado"
          >
            <span>${isCompared ? '✓' : '+'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Modal de detalles técnicos con fotografía del jugador
function openShoeModal(id) {
  const shoe = basketballShoes.find(s => s.id === id);
  if (!shoe) return;

  const modal = document.getElementById('shoe-modal');
  const modalContent = document.getElementById('shoe-modal-content');
  if (!modal || !modalContent) return;

  const priceDisplay = formatPrice(shoe.priceUSD, shoe.priceMXN, state.currency);

  modalContent.innerHTML = `
    <div class="relative">
      <button onclick="closeShoeModal()" class="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/80 hover:bg-[#ff5000] text-white transition-all shadow-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
        
        <!-- Columna Izquierda: Imagen del calzado y Fotografía del Jugador -->
        <div class="md:col-span-5 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-800">
          <div>
            <!-- Foto del Calzado -->
            <div class="relative rounded-2xl overflow-hidden mb-4 bg-[#1a1a1a] aspect-[4/3] flex items-center justify-center p-3 border border-neutral-800">
              <img src="${shoe.image}" alt="${shoe.name}" class="w-full h-full object-contain" />
              <div class="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-black uppercase text-[#ff5000] border border-[#ff5000]/30">
                ${shoe.badge}
              </div>
            </div>

            <!-- Casilla Destacada del Jugador con su Foto Oficial -->
            ${shoe.playerImage ? `
              <div class="p-3.5 bg-neutral-900 rounded-2xl border border-neutral-700/80 mb-4 flex items-center gap-3.5">
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border-2 border-[#ff5000]">
                  <img src="${shoe.playerImage}" alt="${shoe.signatureAthlete}" class="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <span class="text-[9px] font-black uppercase text-[#ff5000] tracking-widest block">NBA SIGNATURE ATHLETE</span>
                  <h4 class="font-nike text-lg text-white font-black leading-tight">${shoe.signatureAthlete} ${shoe.athleteNumber || ''}</h4>
                  <span class="text-xs text-neutral-400 font-bold block">${shoe.nbaTeam || ''}</span>
                </div>
              </div>
            ` : ''}

            <div class="space-y-1">
              <h2 class="font-nike text-3xl font-black text-white leading-tight">${shoe.name}</h2>
              ${shoe.colorway ? `<span class="text-xs text-neutral-400 block font-mono">Colorway: ${shoe.colorway}</span>` : ''}
              <div class="text-2xl font-black text-[#ff5000] font-mono pt-1">${priceDisplay}</div>
            </div>
          </div>

          <!-- Barras de Evaluación -->
          <div class="mt-5 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
            <h4 class="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">Evaluación Técnica en Pista (0 - 10)</h4>
            
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-neutral-300 font-bold uppercase text-[10px]">Durabilidad en Asfalto</span>
                <span class="font-black text-emerald-400 font-mono">${shoe.durabilityScore} / 10</span>
              </div>
              <div class="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: ${shoe.durabilityScore * 10}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-neutral-300 font-bold uppercase text-[10px]">Tracción en Duela</span>
                <span class="font-black text-cyan-400 font-mono">${shoe.tractionScore} / 10</span>
              </div>
              <div class="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div class="bg-cyan-400 h-full rounded-full" style="width: ${shoe.tractionScore * 10}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-neutral-300 font-bold uppercase text-[10px]">Amortiguación & Absorción</span>
                <span class="font-black text-amber-400 font-mono">${shoe.cushionScore} / 10</span>
              </div>
              <div class="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div class="bg-amber-400 h-full rounded-full" style="width: ${shoe.cushionScore * 10}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna Derecha: Especificaciones Técnicas y Veredicto -->
        <div class="md:col-span-7 p-6 sm:p-8 bg-[#141414] flex flex-col justify-between">
          <div class="space-y-5">
            
            ${shoe.athleteBio ? `
              <div class="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 italic">
                <span class="font-bold text-white not-italic uppercase tracking-wider text-[10px] block mb-1">Perfil del Atleta:</span>
                "${shoe.athleteBio}"
              </div>
            ` : ''}

            <div>
              <span class="text-xs font-black uppercase tracking-widest text-[#ff5000]">ANÁLISIS DE RENDIMIENTO</span>
              <p class="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-1">${shoe.description}</p>
            </div>

            <!-- Ficha Técnica -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span class="text-neutral-400 block text-[10px] uppercase font-bold mb-1">🏀 Cancha Destinada:</span>
                <span class="font-bold text-white">${shoe.categoryLabel}</span>
              </div>
              <div class="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span class="text-neutral-400 block text-[10px] uppercase font-bold mb-1">👤 Perfil Ideal:</span>
                <span class="font-bold text-white">${shoe.playerType}</span>
              </div>
              <div class="p-3 rounded-xl bg-neutral-900 border border-neutral-800 sm:col-span-2">
                <span class="text-neutral-400 block text-[10px] uppercase font-bold mb-1">🛡️ Compuesto de Suela:</span>
                <span class="font-semibold text-neutral-200">${shoe.rubberType}</span>
              </div>
              <div class="p-3 rounded-xl bg-neutral-900 border border-neutral-800 sm:col-span-2">
                <span class="text-neutral-400 block text-[10px] uppercase font-bold mb-1">⚡ Tecnología de Mediasuela:</span>
                <span class="font-semibold text-neutral-200">${shoe.cushionTech}</span>
              </div>
            </div>

            <!-- Pros y Contras -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
                <h4 class="font-bold text-emerald-400 uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1.5">
                  ✓ Ventajas
                </h4>
                <ul class="space-y-1 text-neutral-300">
                  ${shoe.pros.map(p => `<li>• ${p}</li>`).join('')}
                </ul>
              </div>

              <div class="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs">
                <h4 class="font-bold text-rose-400 uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1.5">
                  ✕ Desventajas
                </h4>
                <ul class="space-y-1 text-neutral-300">
                  ${shoe.cons.map(c => `<li>• ${c}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- Veredicto Final -->
            <div class="p-4 rounded-xl bg-neutral-900 border border-[#ff5000]/40">
              <span class="text-[10px] font-black text-[#ff5000] uppercase tracking-widest block mb-1">🏆 Veredicto Oficial:</span>
              <p class="text-xs sm:text-sm text-white italic font-medium leading-relaxed">
                "${shoe.verdict}"
              </p>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
            <button onclick="toggleCompare('${shoe.id}'); closeShoeModal();" class="text-xs font-bold text-[#ff5000] hover:underline uppercase tracking-wider">
              ${state.compareList.includes(shoe.id) ? 'Quitar del comparador' : '+ Agregar al comparador'}
            </button>
            <button onclick="closeShoeModal()" class="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-black uppercase tracking-wider rounded-full">
              Cerrar Ficha
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeShoeModal() {
  const modal = document.getElementById('shoe-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Lógica de Comparación
function toggleCompare(id) {
  const index = state.compareList.indexOf(id);
  if (index > -1) {
    state.compareList.splice(index, 1);
  } else {
    if (state.compareList.length >= 3) {
      alert("Puedes comparar hasta 3 modelos simultáneamente. Elimina uno primero.");
      return;
    }
    state.compareList.push(id);
  }
  updateCompareDrawer();
  renderShoes();
}

function updateCompareDrawer() {
  const drawer = document.getElementById('compare-drawer');
  const itemsContainer = document.getElementById('compare-items-preview');
  const countBadge = document.getElementById('compare-count-badge');
  if (!drawer || !itemsContainer) return;

  if (state.compareList.length === 0) {
    drawer.classList.add('hide');
    drawer.classList.remove('show');
    return;
  }

  drawer.classList.remove('hide');
  drawer.classList.add('show');

  if (countBadge) {
    countBadge.textContent = `${state.compareList.length}/3`;
  }

  const comparedShoes = state.compareList.map(id => basketballShoes.find(s => s.id === id)).filter(Boolean);

  itemsContainer.innerHTML = comparedShoes.map(shoe => `
    <div class="flex items-center gap-2 bg-neutral-900 py-1.5 px-3 rounded-xl border border-neutral-800">
      <img src="${shoe.image}" alt="${shoe.name}" class="w-8 h-8 rounded-lg object-contain bg-black" />
      <span class="text-xs font-bold text-white max-w-[120px] truncate">${shoe.name}</span>
      <button onclick="toggleCompare('${shoe.id}')" class="text-neutral-400 hover:text-rose-400 ml-1">
        ✕
      </button>
    </div>
  `).join('');
}

function openCompareModal() {
  if (state.compareList.length < 2) {
    alert("Selecciona al menos 2 modelos para poder compararlos lado a lado.");
    return;
  }

  const modal = document.getElementById('compare-modal');
  const content = document.getElementById('compare-table-container');
  if (!modal || !content) return;

  const shoes = state.compareList.map(id => basketballShoes.find(s => s.id === id)).filter(Boolean);

  content.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs sm:text-sm text-neutral-300">
        <thead>
          <tr class="border-b border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-widest">
            <th class="p-4 bg-neutral-950 min-w-[160px]">Especificación</th>
            ${shoes.map(s => `
              <th class="p-4 text-center min-w-[220px]">
                <div class="flex flex-col items-center">
                  <div class="w-24 h-24 bg-black rounded-2xl flex items-center justify-center p-2 mb-2 border border-neutral-800">
                    <img src="${s.image}" alt="${s.name}" class="w-full h-full object-contain" />
                  </div>
                  <span class="font-nike text-lg font-black text-white">${s.name}</span>
                  <span class="text-xs text-[#ff5000] font-mono font-bold mt-1">
                    ${formatPrice(s.priceUSD, s.priceMXN, state.currency)}
                  </span>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-800">
          <tr>
            <td class="p-4 font-bold text-neutral-400 bg-neutral-950">Atleta Oficial</td>
            ${shoes.map(s => `
              <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-2">
                  ${s.playerImage ? `<img src="${s.playerImage}" class="w-8 h-8 rounded-full object-cover object-top border border-neutral-700">` : ''}
                  <span class="font-bold text-white text-xs">${s.signatureAthlete || s.brand}</span>
                </div>
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-4 font-bold text-neutral-400 bg-neutral-950">Superficie Ideal</td>
            ${shoes.map(s => `
              <td class="p-4 text-center">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                  s.category === 'outdoor' ? 'bg-pink-600/20 text-pink-300' : s.category === 'indoor' ? 'bg-blue-600/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
                }">${s.categoryLabel}</span>
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-4 font-bold text-neutral-400 bg-neutral-950">Durabilidad Asfalto</td>
            ${shoes.map(s => `
              <td class="p-4 text-center font-mono font-black ${s.durabilityScore >= 9 ? 'text-emerald-400' : s.durabilityScore >= 7.5 ? 'text-amber-400' : 'text-rose-400'}">
                ${s.durabilityScore} / 10
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-4 font-bold text-neutral-400 bg-neutral-950">Agarre Duela (Grip)</td>
            ${shoes.map(s => `
              <td class="p-4 text-center font-mono font-black text-cyan-400">
                ${s.tractionScore} / 10
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-4 font-bold text-neutral-400 bg-neutral-950">Compuesto Suela</td>
            ${shoes.map(s => `
              <td class="p-4 text-center text-neutral-300">
                ${s.rubberType}
              </td>
            `).join('')}
          </tr>

          <tr>
            <td class="p-4 font-bold text-neutral-400 bg-neutral-950">Amortiguación</td>
            ${shoes.map(s => `
              <td class="p-4 text-center font-bold text-white">
                ${s.cushionTech}
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeCompareModal() {
  const modal = document.getElementById('compare-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function clearComparison() {
  state.compareList = [];
  updateCompareDrawer();
  renderShoes();
}

// Filtro rápido por tipo de cancha
function filterByCourt(type) {
  state.category = type;
  document.querySelectorAll('[data-court-filter]').forEach(b => {
    if (b.dataset.courtFilter === type) {
      b.classList.add('bg-[#ff5000]', 'text-white');
      b.classList.remove('bg-neutral-800', 'text-neutral-300');
    } else {
      b.classList.remove('bg-[#ff5000]', 'text-white');
      b.classList.add('bg-neutral-800', 'text-neutral-300');
    }
  });

  const catalog = document.getElementById('catalogo');
  if (catalog) {
    catalog.scrollIntoView({ behavior: 'smooth' });
  }
  renderShoes();
}

// Restablecer filtros
function resetFilters() {
  state.category = 'all';
  state.budget = 'all';
  state.brand = 'all';
  state.searchQuery = '';
  state.sortBy = 'recommended';

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'recommended';

  document.querySelectorAll('[data-court-filter]').forEach(b => {
    b.classList.toggle('bg-[#ff5000]', b.dataset.courtFilter === 'all');
    b.classList.toggle('text-white', b.dataset.courtFilter === 'all');
    b.classList.toggle('bg-neutral-800', b.dataset.courtFilter !== 'all');
    b.classList.toggle('text-neutral-300', b.dataset.courtFilter !== 'all');
  });

  document.querySelectorAll('[data-budget-filter]').forEach(b => {
    b.classList.toggle('bg-[#ff5000]', b.dataset.budgetFilter === 'all');
    b.classList.toggle('text-white', b.dataset.budgetFilter === 'all');
    b.classList.toggle('bg-neutral-800', b.dataset.budgetFilter !== 'all');
    b.classList.toggle('text-neutral-300', b.dataset.budgetFilter !== 'all');
  });

  renderBrandFilters();
  renderShoes();
}

// Asistente Interactivo / Shoe Finder
const quizData = {
  court: null,
  priority: null,
  budget: null
};

function initQuiz() {
  const startBtn = document.getElementById('quiz-start-btn');
  if (!startBtn) return;

  startBtn.addEventListener('click', () => {
    document.getElementById('quiz-intro').classList.add('hidden');
    document.getElementById('quiz-step-1').classList.remove('hidden');
  });
}

function selectQuizAnswer(step, answer) {
  if (step === 1) {
    quizData.court = answer;
    document.getElementById('quiz-step-1').classList.add('hidden');
    document.getElementById('quiz-step-2').classList.remove('hidden');
  } else if (step === 2) {
    quizData.priority = answer;
    document.getElementById('quiz-step-2').classList.add('hidden');
    document.getElementById('quiz-step-3').classList.remove('hidden');
  } else if (step === 3) {
    quizData.budget = answer;
    calculateQuizRecommendation();
  }
}

function calculateQuizRecommendation() {
  document.getElementById('quiz-step-3').classList.add('hidden');
  const resultCard = document.getElementById('quiz-result');
  resultCard.classList.remove('hidden');

  let candidate = null;

  if (quizData.court === 'outdoor') {
    candidate = basketballShoes.find(s => s.id === 'giannis-immortality-4-pink') || basketballShoes.find(s => s.id === 'wow-all-city-12');
  } else if (quizData.court === 'indoor') {
    if (quizData.priority === 'traction' && quizData.budget === 'premium') {
      candidate = basketballShoes.find(s => s.id === 'nike-kobe-8-protro') || basketballShoes.find(s => s.id === 'ua-curry-flow-8');
    } else {
      candidate = basketballShoes.find(s => s.id === 'nike-ja-3-zoomx');
    }
  } else {
    candidate = basketballShoes.find(s => s.id === 'adidas-ae-1') || basketballShoes.find(s => s.id === 'lebron-witness-8-lakers');
  }

  if (!candidate) candidate = basketballShoes[0];

  const priceDisplay = formatPrice(candidate.priceUSD, candidate.priceMXN, state.currency);

  document.getElementById('quiz-recommended-card').innerHTML = `
    <div class="flex flex-col sm:flex-row items-center gap-6 bg-neutral-950 p-6 rounded-2xl border border-[#ff5000]/40">
      <div class="w-36 h-36 bg-[#1a1a1a] rounded-xl p-2 flex items-center justify-center border border-neutral-800">
        <img src="${candidate.image}" alt="${candidate.name}" class="w-full h-full object-contain" />
      </div>
      <div class="flex-1 text-center sm:text-left">
        <span class="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-[#ff5000]/20 text-[#ff5000] border border-[#ff5000]/30">
          Match Perfecto Oficial
        </span>
        <h3 class="font-nike text-3xl font-black text-white mt-2">${candidate.name}</h3>
        <p class="text-xs text-neutral-300 mt-1 line-clamp-2">${candidate.description}</p>
        <div class="mt-4 flex items-center justify-center sm:justify-start gap-4">
          <span class="text-xl font-mono font-black text-[#ff5000]">${priceDisplay}</span>
          <button onclick="openShoeModal('${candidate.id}')" class="px-6 py-2.5 bg-white hover:bg-[#ff5000] hover:text-white text-black rounded-full text-xs font-black uppercase tracking-wider transition-all">
            Ver Ficha Completa
          </button>
        </div>
      </div>
    </div>
  `;
}

function resetQuiz() {
  quizData.court = null;
  quizData.priority = null;
  quizData.budget = null;

  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-step-1').classList.add('hidden');
  document.getElementById('quiz-step-2').classList.add('hidden');
  document.getElementById('quiz-step-3').classList.add('hidden');
  document.getElementById('quiz-intro').classList.remove('hidden');
}

// Configuración de eventos
function setupEventListeners() {
  // Filtro por Cancha
  document.querySelectorAll('[data-court-filter]').forEach(button => {
    button.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.courtFilter;
      state.category = type;

      document.querySelectorAll('[data-court-filter]').forEach(b => {
        b.classList.remove('bg-[#ff5000]', 'text-white');
        b.classList.add('bg-neutral-800', 'text-neutral-300');
      });
      e.currentTarget.classList.add('bg-[#ff5000]', 'text-white');
      e.currentTarget.classList.remove('bg-neutral-800', 'text-neutral-300');

      renderShoes();
    });
  });

  // Filtro por Presupuesto
  document.querySelectorAll('[data-budget-filter]').forEach(button => {
    button.addEventListener('click', (e) => {
      const budget = e.currentTarget.dataset.budgetFilter;
      state.budget = budget;

      document.querySelectorAll('[data-budget-filter]').forEach(b => {
        b.classList.remove('bg-[#ff5000]', 'text-white');
        b.classList.add('bg-neutral-800', 'text-neutral-300');
      });
      e.currentTarget.classList.add('bg-[#ff5000]', 'text-white');
      e.currentTarget.classList.remove('bg-neutral-800', 'text-neutral-300');

      renderShoes();
    });
  });

  // Alternador de Moneda (USD / MXN)
  document.querySelectorAll('[data-currency-btn]').forEach(button => {
    button.addEventListener('click', (e) => {
      const curr = e.currentTarget.dataset.currencyBtn;
      state.currency = curr;

      document.querySelectorAll('[data-currency-btn]').forEach(b => {
        if (b.dataset.currencyBtn === curr) {
          b.className = 'px-2.5 py-1 rounded text-xs font-bold bg-[#ff5000] text-white';
        } else {
          b.className = 'px-2.5 py-1 rounded text-xs font-bold text-neutral-400 hover:text-white';
        }
      });

      renderShoes();
      updateStaticFeaturedPrices();
      updateCompareDrawer();
    });
  });

  // Buscador
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderShoes();
    });
  }

  // Ordenamiento
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderShoes();
    });
  }

  // Tecla Escape para modales
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeShoeModal();
      closeCompareModal();
    }
  });

  // Click fuera del modal para cerrar
  const shoeModal = document.getElementById('shoe-modal');
  if (shoeModal) {
    shoeModal.addEventListener('click', (e) => {
      if (e.target === shoeModal) closeShoeModal();
    });
  }

  const compareModal = document.getElementById('compare-modal');
  if (compareModal) {
    compareModal.addEventListener('click', (e) => {
      if (e.target === compareModal) closeCompareModal();
    });
  }
}
