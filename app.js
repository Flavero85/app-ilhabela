/* --- Código gerado em: 2025-10-08 10:47 --- */

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

    // --- NOVA LÓGICA: CONTAGEM REGRESSIVA E DIÁRIO DE BORDO ---
    const tripStartDate = new Date('2025-10-19T00:00:00');
    const countdownContainer = document.getElementById('countdown-container');
    const logbookContainer = document.getElementById('logbook-container');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = tripStartDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownContainer.style.display = 'none';
            logbookContainer.style.display = 'block';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run once immediately

    // --- LÓGICA DOS CHECKLISTS (sem alterações) ---
    const checklistData = {
        pessoal: { "Documentação e Finanças": ["Documentos Pessoais: RG ou CNH", "Dinheiro em Espécie", "Cartão do Plano de Saúde", "Cópia digital dos documentos"], "Vestuário Estratégico": ["Roupas de Banho (3+ conjuntos)", "Agasalho Leve e um Médio", "Calças (proteção borrachudos)", "Chinelos e Tênis", "Papete ou sapatilha aquática", "Roupa para sair à noite", "Meias (para trilha e noite)"], "Kit de Praia & Lazer": ["Bolsa de Praia e Toalhas", "Snorkel e Capa de Celular", "Cooler/Bolsa Térmica", "Cadeiras de praia e Guarda-sol", "Sacos para lixo e roupa suja", "Livro ou jogo de cartas"], "Farmácia e Higiene": ["Kit Repelente e Pós-Sol", "Kit Primeiros Socorros Completo", "Protetores Solar e Labial", "Remédios de uso contínuo", "Analgésico e antialérgico", "Hidratante e itens de higiene pessoal"], "Eletrônicos": ["Celulares e Carregadores", "Power Bank (Obrigatório)", "Adaptador Veicular", "Fone de ouvido", "Câmera/GoPro e baterias extras"] },
        veiculo: { "Itens Essenciais": ["Documentação: CNH e CRLV", "Revisão: Pneus calibrados", "Revisão: Nível de fluidos", "Verificar limpadores de para-brisa", "Kit de Segurança Completo", "Verificar validade do extintor", "Kit Conforto (Tag, suporte, etc)", "Flanela para vidros", "Carregador veicular funcional"] }
    };
    function createChecklistItem(text, isSingle = false, completed = [false, false]) { const li = document.createElement('li'); li.dataset.itemId = `item-${Date.now()}-${Math.random()}`; let boxesHtml = `<div class="checklist-boxes"><span class="checklist-box ${completed[0] ? 'completed' : ''}" data-person="you" title="Você"><span class="checklist-box-label">Você</span></span><span class="checklist-box ${completed[1] ? 'completed' : ''}" data-person="her" title="Ela"><span class="checklist-box-label">Ela</span></span></div>`; if (isSingle) { boxesHtml = `<div class="checklist-boxes"><span class="checklist-box ${completed[0] ? 'completed' : ''}" data-person="you"></span></div>`; } li.innerHTML = `<span class="checklist-text">${text}</span>${boxesHtml}`; li.querySelectorAll('.checklist-box').forEach(box => { box.addEventListener('click', (e) => { e.stopPropagation(); box.classList.toggle('completed'); updateChecklistCounter(li.closest('section')); }); }); return li; }
    function updateChecklistCounter(section) { if (!section) return; const items = section.querySelectorAll('li'); const h3 = section.querySelector('h3'); const summary = section.closest('details')?.querySelector('summary'); let completedCount = 0; items.forEach(item => { const boxes = item.querySelectorAll('.checklist-box'); const completedBoxes = item.querySelectorAll('.checklist-box.completed'); if (completedBoxes.length === boxes.length && boxes.length > 0) { completedCount++; } }); const counterSpan = h3?.querySelector('.checklist-counter') || summary?.querySelector('.checklist-counter'); if (counterSpan) { counterSpan.textContent = items.length > 0 ? ` (${completedCount}/${items.length})` : ''; } }
    function populateChecklists() { for (const sectionId in checklistData) { const section = document.querySelector(`section[data-checklist-id="${sectionId}"]`); if (!section) continue; section.innerHTML = ''; const isSingle = sectionId === 'veiculo'; for (const category in checklistData[sectionId]) { const h3 = document.createElement('h3'); h3.innerHTML = `${category}<span class="checklist-counter"></span>`; const ul = document.createElement('ul'); ul.className = 'checklist'; section.appendChild(h3); section.appendChild(ul); checklistData[sectionId][category].forEach(itemText => ul.appendChild(createChecklistItem(itemText, isSingle))); updateChecklistCounter(section); } } }
    const newItemInput = document.getElementById('new-item-input'); const addNewItemBtn = document.getElementById('add-new-item-btn'); const outrosSection = document.querySelector('section[data-checklist-id="outros"]'); addNewItemBtn.addEventListener('click', () => { const text = newItemInput.value.trim(); if (text) { const newItem = createChecklistItem(text); outrosSection.querySelector('.checklist').appendChild(newItem); newItemInput.value = ''; outrosSection.style.display = 'block'; updateChecklistCounter(outrosSection); } });

    // --- LÓGICA DE SALVAR/CARREGAR/LIMPAR PROGRESSO (sem alterações) ---
    const saveBtn = document.getElementById('save-progress');
    const loadBtn = document.getElementById('load-progress');
    const clearBtn = document.getElementById('clear-progress');
    saveBtn.addEventListener('click', () => { const appData = { checklists: {}, budget: {}, activities: {}, notes: '', uploadedImages: {}, logbook: {} }; document.querySelectorAll('section[data-checklist-id]').forEach(section => { const sectionId = section.dataset.checklistId; appData.checklists[sectionId] = Array.from(section.querySelectorAll('li')).map(item => ({ text: item.querySelector('.checklist-text').textContent, isSingle: sectionId === 'veiculo', completed: [item.querySelector('[data-person="you"]').classList.contains('completed'), item.querySelector('[data-person="her"]') ? item.querySelector('[data-person="her"]').classList.contains('completed') : null].filter(c => c !== null) })); }); document.querySelectorAll('.gasto-input').forEach(input => appData.budget[input.id] = input.value); document.querySelectorAll('.activity-item').forEach(item => { const activityId = item.dataset.activityId; if (activityId) { appData.activities[activityId] = { checked: item.querySelector('input').checked, favorited: item.querySelector('.favorite-trigger').classList.contains('favorited') }; } }); appData.notes = document.getElementById('user-notes').value; appData.logbook.domingo = document.getElementById('log-domingo').value; appData.logbook.segunda = document.getElementById('log-segunda').value; appData.logbook.terca = document.getElementById('log-terca').value; for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i); if (key.startsWith('uploaded_image_')) { appData.uploadedImages[key] = localStorage.getItem(key); } } localStorage.setItem('ilhabelaAppData', JSON.stringify(appData)); showToast('Progresso salvo com sucesso!', 'success'); });
    function loadProgress() { const savedData = JSON.parse(localStorage.getItem('ilhabelaAppData')); if (!savedData) { populateChecklists(); showToast('Nenhum progresso salvo encontrado. Começando um novo guia!', 'info'); return; } if (savedData.uploadedImages) { for (const key in savedData.uploadedImages) { localStorage.setItem(key, savedData.uploadedImages[key]); } updateUploadedIcons(); } if (savedData.checklists) { ['pessoal', 'veiculo', 'outros'].forEach(id => { const section = document.querySelector(`section[data-checklist-id="${id}"]`); const savedItems = savedData.checklists[id] || []; const ul = section.querySelector('.checklist'); if(ul) ul.innerHTML = ''; savedItems.forEach(itemData => { const newItem = createChecklistItem(itemData.text, itemData.isSingle, itemData.completed); ul.appendChild(newItem); }); if (id === 'outros' && savedItems.length > 0) { section.style.display = 'block'; } updateChecklistCounter(section); }); } else { populateChecklists(); } if (savedData.budget) { document.querySelectorAll('.gasto-input').forEach(input => { input.value = savedData.budget[input.id] || ''; }); calculateBudget(); } if (savedData.activities) { document.querySelectorAll('.activity-item').forEach(item => { const activityId = item.dataset.activityId; const data = savedData.activities[activityId]; if (data) { item.querySelector('input').checked = data.checked; item.querySelector('.favorite-trigger').classList.toggle('favorited', data.favorited); } }); } document.getElementById('user-notes').value = savedData.notes || ''; if (savedData.logbook) { document.getElementById('log-domingo').value = savedData.logbook.domingo || ''; document.getElementById('log-segunda').value = savedData.logbook.segunda || ''; document.getElementById('log-terca').value = savedData.logbook.terca || ''; } showToast('Progresso carregado!', 'info'); }
    clearBtn.addEventListener('click', () => { if (confirm('Tem certeza que deseja limpar tudo?')) { const theme = localStorage.getItem('theme'); localStorage.clear(); if (theme) localStorage.setItem('theme', theme); location.reload(); } });
    
    // --- LÓGICAS DE ORÇAMENTO E FILTROS ---
    function calculateBudget() { let dailyTotal = 0, fixedTotal = 0; document.querySelectorAll('.daily-cost').forEach(input => { if (input.value) dailyTotal += parseFloat(input.value); }); document.querySelectorAll('.fixed-cost').forEach(input => { if (input.value) fixedTotal += parseFloat(input.value); }); ['domingo', 'segunda', 'terca', 'quarta'].forEach(day => { let dayTotal = 0; document.querySelectorAll(`.gasto-input[data-day="${day}"]`).forEach(input => { if (input.value) dayTotal += parseFloat(input.value); }); const subtotalEl = document.getElementById(`subtotal-${day}`); if (subtotalEl) subtotalEl.textContent = dayTotal.toFixed(2); }); const totalSpentEl = document.getElementById('total-spent'); const budgetStatusEl = document.getElementById('budget-status'); totalSpentEl.textContent = dailyTotal.toFixed(2); document.getElementById('total-fixed-costs').textContent = fixedTotal.toFixed(2); document.getElementById('grand-total-cost').textContent = (dailyTotal + fixedTotal).toFixed(2); const budgetGoal = 800; if (dailyTotal === 0) budgetStatusEl.textContent = ''; else if (dailyTotal > budgetGoal) { budgetStatusEl.textContent = `(Meta estourada em R$ ${(dailyTotal - budgetGoal).toFixed(2)})`; budgetStatusEl.style.color = 'var(--danger-color)'; } else { budgetStatusEl.textContent = `(R$ ${(budgetGoal - dailyTotal).toFixed(2)} restantes para a meta)`; budgetStatusEl.style.color = 'var(--success-color)'; } }
    document.querySelectorAll('.gasto-input').forEach(input => input.addEventListener('input', calculateBudget));
    const filterContainer = document.querySelector('.activity-filters');
    filterContainer.addEventListener('click', (e) => { if (e.target.tagName !== 'BUTTON') return; const filter = e.target.dataset.filter; filterContainer.querySelector('.active').classList.remove('active'); e.target.classList.add('active'); document.querySelectorAll('.activity-item').forEach(item => { const category = item.dataset.category.toLowerCase(); const isFavorited = item.querySelector('.favorite-trigger').classList.contains('favorited'); let show = false; if (filter === 'all') show = true; else if (filter === 'favorite' && isFavorited) show = true; else if (category.includes(filter.toLowerCase())) show = true; item.classList.toggle('hidden', !show); }); });
    
    // --- LÓGICA DO ROTEIRO ---
    const generateRoteiroBtn = document.getElementById('btn-generate-roteiro');
    const roteiroOutput = document.getElementById('roteiro-output');

    function getRegion(activity) { const match = activity.match(/\(([^)]+)\)/); return match ? match[1] : 'Outros'; }
    function generateDayHtml(dayActivities) { if (dayActivities.length === 0) return '<ul><li>Nenhuma atividade selecionada.</li></ul>'; const grouped = dayActivities.reduce((acc, activity) => { const region = getRegion(activity); if (!acc[region]) acc[region] = []; acc[region].push(activity.replace(/\s*\([^)]+\)$/, '')); return acc; }, {}); let html = ''; for (const region in grouped) { html += `<h5>${region === 'Barco/Trilha' || region === 'Parque' ? 'Aventura' : region}</h5><ul>${grouped[region].map(a => `<li>${a}</li>`).join('')}</ul>`; } return html; }
    
    // Roteiro por DIA (Botão "Montar Meu Roteiro")
    function generateRoteiro(activities) { if (activities.length === 0) { showToast('Nenhuma atividade selecionada.', 'error'); return null; } const roteiro = { domingo: [], segunda: [], terca: [] }; const days = ['domingo', 'segunda', 'terca']; activities.forEach((activity, index) => { roteiro[days[index % 3]].push(activity); }); roteiroOutput.innerHTML = `<div class="roteiro-dia"><h4>Domingo</h4>${generateDayHtml(roteiro.domingo)}</div><div class="roteiro-dia"><h4>Segunda</h4>${generateDayHtml(roteiro.segunda)}</div><div class="roteiro-dia"><h4>Terça</h4>${generateDayHtml(roteiro.terca)}</div>`; document.getElementById('btn-share-roteiro').style.display = 'block'; }
    
    // ### NOVA LÓGICA ### Roteiro por REGIÃO (Botão "Sugerir Roteiro")
    function generateGeographicSuggestion(activities) {
        const groupedByRegion = { Sul: [], Centro: [], Norte: [], Aventura: [] };
        activities.forEach(activity => {
            if (activity.includes('(Sul)')) { groupedByRegion.Sul.push(activity); }
            else if (activity.includes('(Centro)') || activity.includes('(Vila)')) { groupedByRegion.Centro.push(activity); }
            else if (activity.includes('(Norte)')) { groupedByRegion.Norte.push(activity); }
            else { groupedByRegion.Aventura.push(activity); }
        });
        roteiroOutput.innerHTML = `
            <div class="roteiro-dia"><h4>Sugestões para o Sul</h4>${generateDayHtml(groupedByRegion.Sul)}</div>
            <div class="roteiro-dia"><h4>Sugestões para o Centro</h4>${generateDayHtml(groupedByRegion.Centro)}</div>
            <div class="roteiro-dia"><h4>Sugestões para o Norte e Aventuras</h4>${generateDayHtml([...groupedByRegion.Norte, ...groupedByRegion.Aventura])}</div>
        `;
        document.getElementById('btn-share-roteiro').style.display = 'block';
    }

    generateRoteiroBtn.addEventListener('click', () => { const selectedActivities = Array.from(document.querySelectorAll('.activity-item input:checked')).map(input => input.value); generateRoteiro(selectedActivities); });
    
    document.getElementById('btn-suggest-roteiro').addEventListener('click', () => {
        const suggested = [
            'Praia do Julião (Sul)', 'Praia Grande (Sul)', 'Cachoeira do Paquetá (Sul)', 'Mirante do Coração (Sul)', 'Pôr do Sol no Mirante do Piúva (Sul)',
            'Passeio na Vila (Centro)', 'Igreja Matriz (Vila)', 'Praia do Perequê (Centro)', 'Poço da Ducha (Centro)', 'Cachoeira da Toca (Centro)',
            'Praia da Pacuíba (Norte)', 'Praia do Bonete (Barco/Trilha)', 'Trilha da Água Branca (Parque)', 'Mergulho Ilha das Cabras (Sul)', 'Praia do Curral (Sul)',
        ];
        document.querySelectorAll('.activity-item input').forEach(input => { input.checked = suggested.includes(input.value); });
        generateGeographicSuggestion(suggested);
        showToast('Um roteiro por região foi sugerido para você!', 'info');
    });

    // --- LÓGICAS FINAIS (sem alterações) ---
    document.getElementById('btn-share-roteiro').addEventListener('click', () => { let text = `*Nosso Roteiro para Ilhabela:*\n\n`; const roteiroDias = document.querySelectorAll('.roteiro-dia'); if (roteiroDias.length === 0 || roteiroOutput.querySelector('.dica')) { showToast('Gere um roteiro antes de compartilhar!', 'error'); return; } roteiroDias.forEach(dia => { text += `*${dia.querySelector('h4').textContent}*\n`; dia.querySelectorAll('h5').forEach(region => { text += `_${region.textContent}_\n`; region.nextElementSibling.querySelectorAll('li').forEach(li => { text += `- ${li.textContent}\n`; }); }); text += `\n`; }); const whatsappUrl = `https.api.whatsapp.com/send?text=${encodeURIComponent(text)}`; window.open(whatsappUrl, '_blank'); });
    const modal = document.getElementById('imageModal'); function handleActivityIconClick(e) { const icon = e.target; const item = icon.closest('.activity-item'); const activityId = item.dataset.activityId; const activityName = item.querySelector('.activity-label').textContent.trim(); const storageKey = `uploaded_image_${activityId}`; if (icon.classList.contains('favorite-trigger')) { icon.classList.toggle('favorited'); } else if (icon.classList.contains('image-upload-trigger')) { const savedImage = localStorage.getItem(storageKey); if (savedImage) { document.getElementById('modalImage').src = savedImage; document.getElementById('caption').textContent = activityName; modal.style.display = 'block'; } else { const fileInput = document.createElement('input'); fileInput.type = 'file'; fileInput.accept = 'image/*'; fileInput.onchange = (event) => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => { localStorage.setItem(storageKey, e.target.result); icon.classList.add('uploaded'); showToast(`Foto de "${activityName}" salva!`, 'success'); }; reader.readAsDataURL(file); }; fileInput.click(); } } }
    document.querySelector('#activity-selector').addEventListener('click', (e) => { if (e.target.matches('.favorite-trigger, .image-upload-trigger')) { handleActivityIconClick(e); } });
    function updateUploadedIcons() { document.querySelectorAll('.image-upload-trigger').forEach(icon => { const activityId = icon.closest('.activity-item').dataset.activityId; if (localStorage.getItem(`uploaded_image_${activityId}`)) { icon.classList.add('uploaded'); } }); }
    modal.querySelector('.close-modal').onclick = () => modal.style.display = "none";
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
    let deferredPrompt; const installBtn = document.getElementById('install-app-btn'); window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; installBtn.style.display = 'block'; }); installBtn.addEventListener('click', () => { if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt.userChoice.then((choiceResult) => { if (choiceResult.outcome === 'accepted') { showToast('App instalado com sucesso!', 'success'); } deferredPrompt = null; installBtn.style.display = 'none'; }); } });
    
    // --- INICIALIZAÇÃO ---
    loadProgress();
    if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').then(reg => console.log('SW Registrado!', reg)).catch(err => console.log('SW Falhou:', err)); }); }
});