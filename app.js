/* --- Código gerado em: 2025-10-07 16:10 --- */

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- LÓGICA DO TEMA ESCURO ---
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') toggleIcon.classList.replace('fa-moon', 'fa-sun');
    }
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let theme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        toggleIcon.classList.toggle('fa-moon');
        toggleIcon.classList.toggle('fa-sun');
        localStorage.setItem('theme', theme);
    });

    // --- LÓGICA DE TOAST NOTIFICATIONS ---
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }

    // --- LÓGICA DO CLIMA (API REAL) ---
    const API_KEY = '8bcdcb31411d73a09bac44af8ccceda6';
    const LAT = '-23.78';
    const LON = '-45.36';
    const weatherWidget = document.getElementById('weather-widget');
    const tripDates = ["2025-10-19", "2025-10-20", "2025-10-21", "2025-10-22"];

    function getWeatherIcon(code) {
        if (code >= 200 && code < 300) return 'fas fa-bolt';
        if (code >= 300 && code < 600) return 'fas fa-cloud-showers-heavy';
        if (code >= 600 && code < 700) return 'fas fa-snowflake';
        if (code >= 700 && code < 800) return 'fas fa-smog';
        if (code === 800) return 'fas fa-sun';
        if (code === 801 || code === 802) return 'fas fa-cloud-sun';
        if (code === 803 || code === 804) return 'fas fa-cloud';
        return 'fas fa-question-circle';
    }

    async function fetchWeather() {
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${LAT}&lon=${LON}&key=${API_KEY}&lang=pt&days=16`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
            const data = await response.json();
            
            weatherWidget.innerHTML = '';
            const forecastDays = data.data.filter(day => tripDates.includes(day.valid_date));

            if (forecastDays.length === 0) {
                 weatherWidget.innerHTML = '<p class="dica">Não foi possível obter a previsão para as datas da viagem.</p>';
                 return;
            }

            forecastDays.forEach(day => {
                const date = new Date(`${day.valid_date}T12:00:00`);
                const dayName = date.toLocaleDateString('pt-BR', { weekday: 'long' });
                const weatherDayDiv = document.createElement('div');
                weatherDayDiv.className = 'weather-day';
                weatherDayDiv.innerHTML = `
                    <div class="weather-day-summary">
                        <div><h4>${dayName.charAt(0).toUpperCase() + dayName.slice(1)}, ${date.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})}</h4><p>${day.weather.description}</p></div>
                        <i class="${getWeatherIcon(day.weather.code)}"></i>
                        <p class="weather-temp">${Math.round(day.max_temp)}°C / ${Math.round(day.min_temp)}°C</p>
                    </div>`;
                weatherWidget.appendChild(weatherDayDiv);
            });
        } catch (error) {
            console.error("Falha ao buscar clima:", error);
            weatherWidget.innerHTML = '<p class="dica">Não foi possível carregar a previsão do tempo. Verifique sua chave API e conexão.</p>';
        }
    }
    
    fetchWeather();

    // --- LÓGICA DOS CHECKLISTS (sem alterações) ---
    const checklistData = {
        pessoal: { "Documentação e Finanças": ["Documentos Pessoais: RG ou CNH", "Dinheiro em Espécie", "Cartão do Plano de Saúde", "Cópia digital dos documentos"], "Vestuário Estratégico": ["Roupas de Banho (3+ conjuntos)", "Agasalho Leve e um Médio", "Calças (proteção borrachudos)", "Chinelos e Tênis", "Papete ou sapatilha aquática", "Roupa para sair à noite", "Meias (para trilha e noite)"], "Kit de Praia & Lazer": ["Bolsa de Praia e Toalhas", "Snorkel e Capa de Celular", "Cooler/Bolsa Térmica", "Cadeiras de praia e Guarda-sol", "Sacos para lixo e roupa suja", "Livro ou jogo de cartas"], "Farmácia e Higiene": ["Kit Repelente e Pós-Sol", "Kit Primeiros Socorros Completo", "Protetores Solar e Labial", "Remédios de uso contínuo", "Analgésico e antialérgico", "Hidratante e itens de higiene pessoal"], "Eletrônicos": ["Celulares e Carregadores", "Power Bank (Obrigatório)", "Adaptador Veicular", "Fone de ouvido", "Câmera/GoPro e baterias extras"] },
        veiculo: { "Itens Essenciais": ["Documentação: CNH e CRLV", "Revisão: Pneus calibrados", "Revisão: Nível de fluidos", "Verificar limpadores de para-brisa", "Kit de Segurança Completo", "Verificar validade do extintor", "Kit Conforto (Tag, suporte, etc)", "Flanela para vidros", "Carregador veicular funcional"] }
    };
    function createChecklistItem(text, isSingle = false, completed = [false, false]) { const li = document.createElement('li'); li.dataset.itemId = `item-${Date.now()}-${Math.random()}`; let boxesHtml = `<div class="checklist-boxes"><span class="checklist-box ${completed[0] ? 'completed' : ''}" data-person="you" title="Você"><span class="checklist-box-label">Você</span></span><span class="checklist-box ${completed[1] ? 'completed' : ''}" data-person="her" title="Ela"><span class="checklist-box-label">Ela</span></span></div>`; if (isSingle) { boxesHtml = `<div class="checklist-boxes"><span class="checklist-box ${completed[0] ? 'completed' : ''}" data-person="you"></span></div>`; } li.innerHTML = `<span class="checklist-text">${text}</span>${boxesHtml}`; li.querySelectorAll('.checklist-box').forEach(box => { box.addEventListener('click', (e) => { e.stopPropagation(); box.classList.toggle('completed'); updateChecklistCounter(li.closest('section')); }); }); return li; }
    function updateChecklistCounter(section) { if (!section) return; const items = section.querySelectorAll('li'); const h3 = section.querySelector('h3'); const summary = section.closest('details')?.querySelector('summary'); let completedCount = 0; items.forEach(item => { const boxes = item.querySelectorAll('.checklist-box'); const completedBoxes = item.querySelectorAll('.checklist-box.completed'); if (completedBoxes.length === boxes.length && boxes.length > 0) { completedCount++; } }); const counterSpan = h3?.querySelector('.checklist-counter') || summary?.querySelector('.checklist-counter'); if (counterSpan) { counterSpan.textContent = items.length > 0 ? ` (${completedCount}/${items.length})` : ''; } }
    function populateChecklists() { for (const sectionId in checklistData) { const section = document.querySelector(`section[data-checklist-id="${sectionId}"]`); if (!section) continue; section.innerHTML = ''; const isSingle = sectionId === 'veiculo'; for (const category in checklistData[sectionId]) { const h3 = document.createElement('h3'); h3.innerHTML = `${category}<span class="checklist-counter"></span>`; const ul = document.createElement('ul'); ul.className = 'checklist'; section.appendChild(h3); section.appendChild(ul); checklistData[sectionId][category].forEach(itemText => ul.appendChild(createChecklistItem(itemText, isSingle))); updateChecklistCounter(section); } } }
    const newItemInput = document.getElementById('new-item-input'); const addNewItemBtn = document.getElementById('add-new-item-btn'); const outrosSection = document.querySelector('section[data-checklist-id="outros"]'); addNewItemBtn.addEventListener('click', () => { const text = newItemInput.value.trim(); if (text) { const newItem = createChecklistItem(text); outrosSection.querySelector('.checklist').appendChild(newItem); newItemInput.value = ''; outrosSection.style.display = 'block'; updateChecklistCounter(outrosSection); } });

    // --- LÓGICA DO ORÇAMENTO E SAVE/LOAD (sem alterações) ---
    const gastoInputs = document.querySelectorAll('.gasto-input'); const totalSpentEl = document.getElementById('total-spent'); const budgetStatusEl = document.getElementById('budget-status'); const totalFixedEl = document.getElementById('total-fixed-costs'); const grandTotalEl = document.getElementById('grand-total-cost'); const budgetGoal = 800;
    function calculateBudget() { let dailyTotal = 0, fixedTotal = 0; document.querySelectorAll('.daily-cost').forEach(input => { if (input.value) dailyTotal += parseFloat(input.value); }); document.querySelectorAll('.fixed-cost').forEach(input => { if (input.value) fixedTotal += parseFloat(input.value); }); ['domingo', 'segunda', 'terca', 'quarta'].forEach(day => { let dayTotal = 0; document.querySelectorAll(`.gasto-input[data-day="${day}"]`).forEach(input => { if (input.value) dayTotal += parseFloat(input.value); }); const subtotalEl = document.getElementById(`subtotal-${day}`); if (subtotalEl) subtotalEl.textContent = dayTotal.toFixed(2); }); totalSpentEl.textContent = dailyTotal.toFixed(2); totalFixedEl.textContent = fixedTotal.toFixed(2); grandTotalEl.textContent = (dailyTotal + fixedTotal).toFixed(2); if (dailyTotal === 0) budgetStatusEl.textContent = ''; else if (dailyTotal > budgetGoal) { budgetStatusEl.textContent = `(Meta diária estourada em R$ ${(dailyTotal - budgetGoal).toFixed(2)})`; budgetStatusEl.style.color = 'var(--danger-color)'; } else { budgetStatusEl.textContent = `(R$ ${(budgetGoal - dailyTotal).toFixed(2)} restantes para a meta)`; budgetStatusEl.style.color = 'var(--success-color)'; } }
    gastoInputs.forEach(input => input.addEventListener('input', calculateBudget));
    const saveBtn = document.getElementById('save-progress'); const loadBtn = document.getElementById('load-progress'); const clearBtn = document.getElementById('clear-progress'); const userNotes = document.getElementById('user-notes');
    saveBtn.addEventListener('click', () => { const appData = { checklists: {}, budget: {}, activities: {}, notes: '', uploadedImages: {} }; document.querySelectorAll('section[data-checklist-id]').forEach(section => { const sectionId = section.dataset.checklistId; appData.checklists[sectionId] = Array.from(section.querySelectorAll('li')).map(item => ({ text: item.querySelector('.checklist-text').textContent, isSingle: sectionId === 'veiculo', completed: [item.querySelector('[data-person="you"]').classList.contains('completed'), item.querySelector('[data-person="her"]') ? item.querySelector('[data-person="her"]').classList.contains('completed') : null].filter(c => c !== null) })); }); gastoInputs.forEach(input => appData.budget[input.id] = input.value); document.querySelectorAll('.activity-item').forEach(item => { const activityId = item.dataset.activityId; if (activityId) { appData.activities[activityId] = { checked: item.querySelector('input').checked, favorited: item.querySelector('.favorite-trigger').classList.contains('favorited') }; } }); appData.notes = userNotes.value; for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i); if (key.startsWith('uploaded_image_')) { appData.uploadedImages[key] = localStorage.getItem(key); } } localStorage.setItem('ilhabelaAppData', JSON.stringify(appData)); showToast('Progresso salvo com sucesso!', 'success'); });
    function loadProgress() { const savedData = JSON.parse(localStorage.getItem('ilhabelaAppData')); if (!savedData) { populateChecklists(); showToast('Nenhum progresso salvo encontrado. Começando um novo guia!', 'info'); return; } if (savedData.uploadedImages) { for (const key in savedData.uploadedImages) { localStorage.setItem(key, savedData.uploadedImages[key]); } updateUploadedIcons(); } if (savedData.checklists) { ['pessoal', 'veiculo', 'outros'].forEach(id => { const section = document.querySelector(`section[data-checklist-id="${id}"]`); const savedItems = savedData.checklists[id] || []; const ul = section.querySelector('.checklist'); if(ul) ul.innerHTML = ''; savedItems.forEach(itemData => { const newItem = createChecklistItem(itemData.text, itemData.isSingle, itemData.completed); ul.appendChild(newItem); }); if (id === 'outros' && savedItems.length > 0) { section.style.display = 'block'; } updateChecklistCounter(section); }); } else { populateChecklists(); } if (savedData.budget) { gastoInputs.forEach(input => { input.value = savedData.budget[input.id] || ''; }); calculateBudget(); } if (savedData.activities) { document.querySelectorAll('.activity-item').forEach(item => { const activityId = item.dataset.activityId; const data = savedData.activities[activityId]; if (data) { item.querySelector('input').checked = data.checked; item.querySelector('.favorite-trigger').classList.toggle('favorited', data.favorited); } }); } userNotes.value = savedData.notes || ''; showToast('Progresso carregado!', 'info'); }
    clearBtn.addEventListener('click', () => { if (confirm('Tem certeza que deseja limpar tudo? Isso removerá todos os dados, incluindo fotos enviadas.')) { const theme = localStorage.getItem('theme'); localStorage.clear(); if (theme) localStorage.setItem('theme', theme); location.reload(); } });

    // --- LÓGICA DO ROTEIRO PERSONALIZADO E FILTROS ---
    const generateRoteiroBtn = document.getElementById('btn-generate-roteiro');
    const roteiroOutput = document.getElementById('roteiro-output');
    const filterContainer = document.querySelector('.activity-filters');
    
    filterContainer.addEventListener('click', (e) => { if (e.target.tagName !== 'BUTTON') return; const filter = e.target.dataset.filter; filterContainer.querySelector('.active').classList.remove('active'); e.target.classList.add('active'); document.querySelectorAll('.activity-item').forEach(item => { const category = item.dataset.category.toLowerCase(); const isFavorited = item.querySelector('.favorite-trigger').classList.contains('favorited'); let show = false; if (filter === 'all') show = true; else if (filter === 'favorite' && isFavorited) show = true; else if (category.includes(filter.toLowerCase())) show = true; item.classList.toggle('hidden', !show); }); });

    // ### FUNÇÕES AUXILIARES PARA GERAR ROTEIRO (MOVidas PARA FORA) ###
    function getRegion(activity) { const match = activity.match(/\(([^)]+)\)/); return match ? match[1] : 'Outros'; }
    function generateDayHtml(dayActivities) {
        if (dayActivities.length === 0) return '<ul><li>Nenhuma atividade selecionada.</li></ul>';
        const grouped = dayActivities.reduce((acc, activity) => {
            const region = getRegion(activity);
            if (!acc[region]) acc[region] = [];
            acc[region].push(activity.replace(/\s*\([^)]+\)$/, ''));
            return acc;
        }, {});
        let html = '';
        for (const region in grouped) {
            html += `<h5>${region}</h5><ul>${grouped[region].map(a => `<li>${a}</li>`).join('')}</ul>`;
        }
        return html;
    }

    // Função para o botão "MONTAR MEU ROTEIRO" (distribui em 3 dias)
    function generateRoteiro(activities) {
        if (activities.length === 0) { showToast('Nenhuma atividade selecionada para o roteiro.', 'error'); return null; }
        const roteiro = { domingo: [], segunda: [], terca: [] };
        const days = ['domingo', 'segunda', 'terca'];
        activities.forEach((activity, index) => { roteiro[days[index % 3]].push(activity); });
        roteiroOutput.innerHTML = `
            <div class="roteiro-dia"><h4>Domingo</h4>${generateDayHtml(roteiro.domingo)}</div>
            <div class="roteiro-dia"><h4>Segunda</h4>${generateDayHtml(roteiro.segunda)}</div>
            <div class="roteiro-dia"><h4>Terça</h4>${generateDayHtml(roteiro.terca)}</div>`;
        document.getElementById('btn-share-roteiro').style.display = 'block';
    }

    // ### LÓGICA ALTERADA ###
    // Função para o botão "SUGERIR ROTEIRO" (coloca tudo em 1 dia)
    function generateSingleDaySuggestion(activities, dayName) {
        roteiroOutput.innerHTML = `
            <div class="roteiro-dia"><h4>Sugestão para ${dayName}</h4>${generateDayHtml(activities)}</div>
            <p class="dica" style="margin-top: 15px;">Esta é uma sugestão. Você pode desmarcar/marcar outras opções e clicar em "Montar Meu Roteiro" para criar seu próprio plano de 3 dias.</p>`;
        document.getElementById('btn-share-roteiro').style.display = 'block';
    }

    generateRoteiroBtn.addEventListener('click', () => {
        const selectedActivities = Array.from(document.querySelectorAll('.activity-item input:checked')).map(input => input.value);
        generateRoteiro(selectedActivities);
    });
    
    document.getElementById('btn-suggest-roteiro').addEventListener('click', () => {
        const suggested = [
            'Praia do Julião (Sul)', 'Cachoeira dos Três Tombos (Sul)', 'Passeio na Vila (Centro)',
            'Mirante do Coração (Sul)', 'Praia do Perequê (Centro)', 'Mergulho Ilha das Cabras (Sul)',
            'Pôr do Sol no Mirante do Piúva'
        ];
        document.querySelectorAll('.activity-item input').forEach(input => {
             input.checked = suggested.includes(input.value);
        });
        // Chama a nova função que gera o roteiro para um único dia
        generateSingleDaySuggestion(suggested, 'Domingo');
        showToast('Uma sugestão de roteiro para um dia foi gerada!', 'info');
    });
    
    document.getElementById('btn-share-roteiro').addEventListener('click', () => { let text = `*Nosso Roteiro para Ilhabela:*\n\n`; const roteiroDias = document.querySelectorAll('.roteiro-dia'); if (roteiroDias.length === 0 || roteiroOutput.querySelector('.dica')) { showToast('Gere um roteiro antes de compartilhar!', 'error'); return; } roteiroDias.forEach(dia => { text += `*${dia.querySelector('h4').textContent}*\n`; dia.querySelectorAll('h5').forEach(region => { text += `_${region.textContent}_\n`; region.nextElementSibling.querySelectorAll('li').forEach(li => { text += `- ${li.textContent}\n`; }); }); text += `\n`; }); const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`; window.open(whatsappUrl, '_blank'); });

    // --- LÓGICA DE FAVORITOS E UPLOAD (sem alterações) ---
    const modal = document.getElementById('imageModal');
    function handleActivityIconClick(e) { const icon = e.target; const item = icon.closest('.activity-item'); const activityId = item.dataset.activityId; const activityName = item.querySelector('.activity-label').textContent.trim(); const storageKey = `uploaded_image_${activityId}`; if (icon.classList.contains('favorite-trigger')) { icon.classList.toggle('favorited'); } else if (icon.classList.contains('image-upload-trigger')) { const savedImage = localStorage.getItem(storageKey); if (savedImage) { document.getElementById('modalImage').src = savedImage; document.getElementById('caption').textContent = activityName; modal.style.display = 'block'; } else { const fileInput = document.createElement('input'); fileInput.type = 'file'; fileInput.accept = 'image/*'; fileInput.onchange = (event) => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { localStorage.setItem(storageKey, e.target.result); icon.classList.add('uploaded'); showToast(`Foto de "${activityName}" salva!`, 'success'); }; reader.readAsDataURL(file); }; fileInput.click(); } } }
    document.querySelector('#activity-selector').addEventListener('click', (e) => { if (e.target.matches('.favorite-trigger, .image-upload-trigger')) { handleActivityIconClick(e); } });
    function updateUploadedIcons() { document.querySelectorAll('.image-upload-trigger').forEach(icon => { const activityId = icon.closest('.activity-item').dataset.activityId; if (localStorage.getItem(`uploaded_image_${activityId}`)) { icon.classList.add('uploaded'); } }); }
    modal.querySelector('.close-modal').onclick = () => modal.style.display = "none";
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
    
    // --- LÓGICA DE PDF E PWA (sem alterações) ---
    const exportPdfBtn = document.getElementById('export-pdf'); const { jsPDF } = window.jspdf; exportPdfBtn.addEventListener('click', () => { const containerToExport = document.getElementById('export-container'); showToast("Preparando o PDF...", 'info'); html2canvas(containerToExport, { scale: 2, useCORS: true, onclone: (document) => { document.querySelectorAll('details').forEach(detail => detail.open = true); } }).then(canvas => { const imgData = canvas.toDataURL('image/png'); const pdf = new jsPDF('p', 'mm', 'a4'); const pdfWidth = pdf.internal.pageSize.getWidth(); const pdfHeight = (canvas.height * pdfWidth) / canvas.width; pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); pdf.save("resumo-viagem-ilhabela.pdf"); }).catch(err => { console.error("Erro ao gerar PDF:", err); showToast("Erro ao gerar o PDF.", "error"); }); });
    let deferredPrompt; const installBtn = document.getElementById('install-app-btn'); window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; installBtn.style.display = 'block'; }); installBtn.addEventListener('click', () => { if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt.userChoice.then((choiceResult) => { if (choiceResult.outcome === 'accepted') { showToast('App instalado com sucesso!', 'success'); } deferredPrompt = null; installBtn.style.display = 'none'; }); } });

    // --- INICIALIZAÇÃO ---
    loadProgress();

    // Registrar o Service Worker
    if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').then(reg => console.log('Service Worker Registrado!', reg)).catch(err => console.log('Falha no registro do Service Worker:', err)); }); }
});