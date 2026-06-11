let status = { prod: 50, sust: 50, agua: 50, econ: 50 };
let rodada = 0;

const missoes = [
    {
        titulo: "Recuperação de Solo",
        desc: "Sua pastagem está degradada. Como aumentar a produção sem desmatar?",
        opcoes: [
            { txt: "Implementar iLPF (Integração Lavoura-Pecuária-Floresta)", p: 30, s: 20, a: 10, e: 15, msg: "Excelente! O iLPF pode triplicar a produção e sequestrar carbono." },
            { txt: "Expandir área sobre a mata nativa", p: 20, s: -40, a: -20, e: 5, msg: "A produção subiu, mas a biodiversidade foi gravemente afetada." },
            { txt: "Manter pecuária tradicional extensiva", p: 5, s: -5, a: 0, e: -10, msg: "Cuidado: pastagens degradadas geram baixa renda a longo prazo." }
        ]
    },
    {
        titulo: "Saúde da Planta",
        desc: "Uma praga ameaça o milho. Qual sua estratégia de controle?",
        opcoes: [
            { txt: "Bioinsumos e Controle Biológico", p: 15, s: 30, a: 10, e: 10, msg: "Ótimo! Você usou inimigos naturais para proteger a lavoura." },
            { txt: "Agrotóxicos químicos intensivos", p: 25, s: -25, a: -15, e: -5, msg: "As pragas morreram, mas o solo e a água foram contaminados." },
            { txt: "Não intervir e deixar a natureza agir", p: -30, s: 10, a: 5, e: -20, msg: "Sua produção caiu drasticamente por falta de manejo." }
        ]
    },
    {
        titulo: "Gestão Hídrica",
        desc: "A seca chegou. Como manter a irrigação com baixo custo?",
        opcoes: [
            { txt: "Instalar Bombas de Irrigação Solar", p: 20, s: 20, a: 5, e: 25, msg: "Perfeito! Energia limpa e renovável sem custos mensais." },
            { txt: "Motores a Diesel 24 horas", p: 15, s: -20, a: 0, e: -25, msg: "Caro e poluente, impactando seu lucro e o ar." },
            { txt: "Captar água do rio sem controle", p: 10, s: -30, a: -40, e: 10, msg: "Perigoso. O rio pode secar e você será multado." }
        ]
    },
    {
        titulo: "Rotação de Culturas",
        desc: "Após colher o milho, o que você plantará na mesma área?",
        opcoes: [
            { txt: "Rotação: Hortaliças de raízes e folhas", p: 20, s: 25, a: 5, e: 15, msg: "Certo! Alternar culturas evita o esgotamento dos nutrientes." },
            { txt: "Plantar milho novamente", p: 10, s: -20, a: -5, e: -10, msg: "Isso atrai mais pragas e cansa o solo." },
            { txt: "Deixar o solo exposto", p: -10, s: -30, a: -20, e: -15, msg: "O sol e a chuva causarão erosão e perda de solo." }
        ]
    },
    {
        titulo: "Cobertura de Solo",
        desc: "Como preparar a terra para a próxima safra?",
        opcoes: [
            { txt: "Plantio Direto sobre a palhada", p: 15, s: 20, a: 25, e: 10, msg: "A palha protege o solo e mantém a umidade." },
            { txt: "Queimar os restos vegetais", p: 5, s: -40, a: -15, e: -5, msg: "A queimada destrói a vida do solo e libera CO2." },
            { txt: "Aragem profunda (revirar a terra)", p: 10, s: -15, a: -10, e: -5, msg: "Isso expõe o solo ao ressecamento e erosão." }
        ]
    },
    {
        titulo: "Proteção de Nascentes",
        desc: "A APP (Área de Preservação Permanente) está degradada. E agora?",
        opcoes: [
            { txt: "Reflorestar com espécies nativas", p: -5, s: 40, a: 40, e: -10, msg: "Excelente! Você garantiu água para o futuro da fazenda." },
            { txt: "Usar a área para pasto de bezerros", p: 10, s: -30, a: -35, e: 5, msg: "O gado pisoteia a nascente e a água desaparece." },
            { txt: "Ignorar a área por não dar lucro", p: 0, s: -10, a: -15, e: 0, msg: "A degradação continuará diminuindo sua oferta de água." }
        ]
    },
    {
        titulo: "Adubação Sustentável",
        desc: "Como nutrir suas plantas de forma equilibrada?",
        opcoes: [
            { txt: "Uso de Biofertilizantes e Compostagem", p: 15, s: 30, a: 15, e: 10, msg: "Muito bem! Resíduos da fazenda viraram nutriente barato." },
            { txt: "Apenas fertilizantes minerais NPK", p: 25, s: -10, a: -5, e: -15, msg: "Dá resultado rápido, mas não melhora a estrutura do solo." },
            { txt: "Não adubar nesta safra", p: -25, s: 0, a: 5, e: -20, msg: "As plantas ficaram fracas e a produção caiu." }
        ]
    },
    {
        titulo: "Energia na Fazenda",
        desc: "Sua conta de energia está muito alta. Como resolver?",
        opcoes: [
            { txt: "Instalar painéis fotovoltaicos", p: 5, s: 30, a: 0, e: 35, msg: "Investimento inteligente! Sua fazenda agora é autossuficiente." },
            { txt: "Instalar gerador a gasolina", p: 0, s: -20, a: -5, e: -30, msg: "Poluente e com custo de combustível muito elevado." },
            { txt: "Cortar o uso de máquinas elétricas", p: -20, s: 5, a: 5, e: -10, msg: "Sua produção atrasou por falta de tecnologia." }
        ]
    },
    {
        titulo: "Polinizadores",
        desc: "Como aumentar a qualidade dos seus frutos?",
        opcoes: [
            { txt: "Criar abelhas nativas (Meliponicultura)", p: 25, s: 35, a: 5, e: 15, msg: "Incrível! As abelhas aumentam o peso e a qualidade do agro." },
            { txt: "Usar hormônios de crescimento", p: 15, s: -20, a: -10, e: -10, msg: "Pode afetar a aceitação do mercado sustentável." },
            { txt: "Não fazer nada", p: 0, s: 0, a: 0, e: 0, msg: "A produção seguiu o padrão normal, sem melhorias." }
        ]
    },
    {
        titulo: "Resíduos Orgânicos",
        desc: "O que fazer com os dejetos dos animais?",
        opcoes: [
            { txt: "Produzir Biogás para energia", p: 10, s: 30, a: 10, e: 30, msg: "Sustentabilidade total! Lixo virou energia e adubo." },
            { txt: "Lançar em tanques abertos", p: 5, s: -35, a: -40, e: -10, msg: "Grave! Isso causa mau cheiro e polui o lençol freático." },
            { txt: "Vender como esterco bruto", p: 5, s: 10, a: 5, e: 10, msg: "Uma escolha razoável que gera alguma renda extra." }
        ]
    }
];

function narrar(texto) {
    window.speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = 'pt-BR';
    window.speechSynthesis.speak(voz);
}

function alterarFonte(tipo) {
    let corpo = document.body;
    let tamanho = parseFloat(window.getComputedStyle(corpo).fontSize);
    corpo.style.fontSize = (tipo === 'aumentar') ? (tamanho + 2) + "px" : "16px";
}

function iniciarJogo() {
    document.getElementById('tela-inicial').classList.add('oculto');
    document.getElementById('tela-jogo').classList.remove('oculto');
    carregarMissao();
}

function carregarMissao() {
    if (rodada < missoes.length) {
        const m = missoes[rodada];
        document.getElementById('missao-titulo').innerText = m.titulo;
        document.getElementById('missao-desc').innerText = m.desc;
        narrar(m.titulo + ". " + m.desc);

        const container = document.getElementById('opcoes');
        container.innerHTML = "";
        m.opcoes.forEach(o => {
            const btn = document.createElement('button');
            btn.innerText = o.txt;
            btn.onclick = () => processarEscolha(o);
            container.appendChild(btn);
        });
    } else { finalizar(); }
}

function processarEscolha(o) {
    status.prod = Math.min(100, Math.max(0, status.prod + o.p));
    status.sust = Math.min(100, Math.max(0, status.sust + o.s));
    status.agua = Math.min(100, Math.max(0, status.agua + o.a));
    status.econ = Math.min(100, Math.max(0, status.econ + o.e));
    
    atualizarUI();
    narrar(o.msg);
    rodada++;
    setTimeout(carregarMissao, 2500);
}

function atualizarUI() {
    document.getElementById('prog-producao').style.width = status.prod + "%";
    document.getElementById('prog-sustent').style.width = status.sust + "%";
    document.getElementById('prog-agua').style.width = status.agua + "%";
    document.getElementById('prog-economia').style.width = status.econ + "%";
    let inclinacao = (status.sust - status.prod);
    document.getElementById('balanca').style.transform = `rotate(${inclinacao}deg)`;
}

function finalizar() {
    document.getElementById('tela-jogo').classList.add('oculto');
    const telaF = document.getElementById('tela-final');
    telaF.classList.remove('oculto');
    
    if (status.sust > 60 && status.prod > 60) {
        telaF.classList.add('venceu-milho'); // Ativa fundo de milho
        document.getElementById('resultado-titulo').innerText = "🏆 Guardião do Agro Sustentável!";
        document.getElementById('resultado-desc').innerText = "Você venceu! Sua fazenda de milho é produtiva e protege o meio ambiente.";
    } else {
        document.getElementById('resultado-titulo').innerText = "🥈 Produtor em Evolução";
        document.getElementById('resultado-desc').innerText = "Você teve bons resultados, mas precisa equilibrar melhor seus indicadores.";
    }
    narrar(document.getElementById('resultado-titulo').innerText);
