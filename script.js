// ===== Dados do Quiz - Biomas Brasileiros (6º Ano) =====
const perguntas = [
    {
        pergunta: "Qual bioma brasileiro é conhecido como a maior floresta tropical do mundo e possui enorme biodiversidade?",
        opcoes: ["Cerrado", "Amazônia", "Caatinga", "Pampa"],
        correta: 1,
        explicacao: "A Amazônia é a maior floresta tropical do planeta e abriga uma diversidade incrível de plantas e animais!"
    },
    {
        pergunta: "Em qual bioma encontramos vegetação com árvores de troncos retorcidos, adaptadas ao fogo e a períodos de seca?",
        opcoes: ["Mata Atlântica", "Pantanal", "Cerrado", "Amazônia"],
        correta: 2,
        explicacao: "O Cerrado é a 'savana brasileira', com vegetação adaptada ao clima sazonal e ao fogo."
    },
    {
        pergunta: "A Caatinga é um bioma típico de qual região do Brasil?",
        opcoes: ["Sul", "Norte", "Nordeste", "Centro-Oeste"],
        correta: 2,
        explicacao: "A Caatinga ocorre principalmente no Nordeste brasileiro, em clima semiárido."
    },
    {
        pergunta: "Qual bioma é caracterizado por extensas áreas alagáveis e grande quantidade de aves e peixes?",
        opcoes: ["Pampa", "Pantanal", "Cerrado", "Mata Atlântica"],
        correta: 1,
        explicacao: "O Pantanal é a maior planície alagável do mundo e um paraíso para a fauna aquática e aves."
    },
    {
        pergunta: "O bioma que originalmente cobria grande parte do litoral brasileiro e possui alta biodiversidade é a:",
        opcoes: ["Caatinga", "Amazônia", "Mata Atlântica", "Pampa"],
        correta: 2,
        explicacao: "A Mata Atlântica se estendia ao longo do litoral e ainda guarda muitas espécies endêmicas."
    },
    {
        pergunta: "Qual bioma é formado principalmente por gramíneas e campos naturais, predominante no Sul do Brasil?",
        opcoes: ["Cerrado", "Pampa", "Caatinga", "Pantanal"],
        correta: 1,
        explicacao: "O Pampa (ou Campos Sulinos) é caracterizado por vegetação rasteira de gramíneas."
    },
    {
        pergunta: "Em qual bioma é comum encontrar plantas com espinhos, folhas pequenas e animais de hábitos noturnos por causa da escassez de água?",
        opcoes: ["Amazônia", "Mata Atlântica", "Caatinga", "Pantanal"],
        correta: 2,
        explicacao: "A Caatinga tem adaptações à seca: cactos, arbustos espinhosos e muitos animais noturnos."
    },
    {
        pergunta: "Qual dos biomas abaixo NÃO é exclusivo ou típico do território brasileiro?",
        opcoes: ["Caatinga", "Cerrado", "Tundra", "Pantanal"],
        correta: 2,
        explicacao: "A Tundra é um bioma de regiões frias do Ártico. Não existe no Brasil!"
    },
    {
        pergunta: "O Cerrado é conhecido por ser a 'savana brasileira' e também por:",
        opcoes: [
            "Ter apenas florestas densas e úmidas",
            "Possuir muitas nascentes de rios importantes",
            "Ser coberto por gelo durante o inverno",
            "Não ter nenhuma espécie de animal"
        ],
        correta: 1,
        explicacao: "O Cerrado é berço de águas: muitas nascentes de grandes rios brasileiros nascem lá."
    },
    {
        pergunta: "Quantos são os principais biomas brasileiros reconhecidos oficialmente?",
        opcoes: ["4", "5", "6", "8"],
        correta: 2,
        explicacao: "São 6: Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa e Pantanal."
    }
];

// ===== Estado do Jogo =====
let perguntaAtual = 0;
let pontuacao = 0;
let vidas = 3;
let respondendo = false;

// ===== Elementos do DOM =====
const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const telaFinal = document.getElementById('tela-final');

const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');

const textoPergunta = document.getElementById('texto-pergunta');
const opcoesContainer = document.getElementById('opcoes');
const contadorPergunta = document.getElementById('contador-pergunta');
const preenchimento = document.getElementById('preenchimento');
const pontuacaoEl = document.getElementById('pontuacao');
const vidasEl = document.getElementById('vidas');
const feedbackEl = document.getElementById('feedback');
const mensagemFeedback = document.getElementById('mensagem-feedback');

const emojiFinal = document.getElementById('emoji-final');
const tituloFinal = document.getElementById('titulo-final');
const mensagemFinal = document.getElementById('mensagem-final');
const pontosFinais = document.getElementById('pontos-finais');
const desempenhoEl = document.getElementById('desempenho');

// ===== Funções de Controle de Telas =====
function mostrarTela(tela) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    tela.classList.add('ativa');
}

// ===== Iniciar Jogo =====
btnIniciar.addEventListener('click', () => {
    perguntaAtual = 0;
    pontuacao = 0;
    vidas = 3;
    respondendo = false;
    atualizarStatus();
    mostrarTela(telaJogo);
    carregarPergunta();
});

// ===== Carregar Pergunta =====
function carregarPergunta() {
    respondendo = false;
    feedbackEl.classList.add('escondido');
    feedbackEl.classList.remove('acerto', 'erro');

    const p = perguntas[perguntaAtual];
    textoPergunta.textContent = p.pergunta;
    contadorPergunta.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    preenchimento.style.width = `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

    opcoesContainer.innerHTML = '';
    p.opcoes.forEach((texto, index) => {
        const btn = document.createElement('button');
        btn.className = 'opcao';
        btn.textContent = texto;
        btn.addEventListener('click', () => verificarResposta(index));
        opcoesContainer.appendChild(btn);
    });
}

// ===== Verificar Resposta =====
function verificarResposta(indiceEscolhido) {
    if (respondendo) return;
    respondendo = true;

    const p = perguntas[perguntaAtual];
    const botoes = opcoesContainer.querySelectorAll('.opcao');

    // Desabilita todos os botões
    botoes.forEach(b => b.disabled = true);

    if (indiceEscolhido === p.correta) {
        // Acerto
        botoes[indiceEscolhido].classList.add('correta');
        pontuacao += 10;
        mostrarFeedback(true, p.explicacao);
    } else {
        // Erro
        botoes[indiceEscolhido].classList.add('errada');
        botoes[p.correta].classList.add('correta');
        vidas--;
        mostrarFeedback(false, p.explicacao);
    }

    atualizarStatus();

    // Próxima pergunta ou fim
    setTimeout(() => {
        if (vidas <= 0 || perguntaAtual >= perguntas.length - 1) {
            finalizarJogo();
        } else {
            perguntaAtual++;
            carregarPergunta();
        }
    }, 2200);
}

// ===== Feedback =====
function mostrarFeedback(acertou, explicacao) {
    feedbackEl.classList.remove('escondido');
    if (acertou) {
        feedbackEl.classList.add('acerto');
        mensagemFeedback.textContent = `✅ Acertou! ${explicacao}`;
    } else {
        feedbackEl.classList.add('erro');
        mensagemFeedback.textContent = `❌ Ops! ${explicacao}`;
    }
}

// ===== Atualizar Status =====
function atualizarStatus() {
    pontuacaoEl.textContent = `⭐ ${pontuacao}`;
    let coracoes = '';
    for (let i = 0; i < 3; i++) {
        coracoes += i < vidas ? '❤️' : '🖤';
    }
    vidasEl.textContent = coracoes;
}

// ===== Finalizar Jogo =====
function finalizarJogo() {
    mostrarTela(telaFinal);
    pontosFinais.textContent = pontuacao;

    const totalPossivel = perguntas.length * 10;
    const percentual = (pontuacao / totalPossivel) * 100;

    if (vidas <= 0) {
        emojiFinal.textContent = '😅';
        tituloFinal.textContent = 'Quase lá, explorador!';
        mensagemFinal.textContent = 'Suas vidas acabaram, mas você aprendeu bastante!';
    } else if (percentual >= 80) {
        emojiFinal.textContent = '🏆';
        tituloFinal.textContent = 'Incrível, Super Explorador!';
        mensagemFinal.textContent = 'Você conhece muito bem os biomas brasileiros!';
    } else if (percentual >= 50) {
        emojiFinal.textContent = '🌟';
        tituloFinal.textContent = 'Muito bem, Explorador!';
        mensagemFinal.textContent = 'Bom desempenho! Continue explorando e aprendendo.';
    } else {
        emojiFinal.textContent = '🌱';
        tituloFinal.textContent = 'Continue explorando!';
        mensagemFinal.textContent = 'Cada aventura é uma chance de aprender mais.';
    }

    desempenhoEl.textContent = `Você acertou ${pontuacao / 10} de ${perguntas.length} perguntas.`;
}

// ===== Reiniciar =====
btnReiniciar.addEventListener('click', () => {
    mostrarTela(telaInicio);
});

// ===== Inicialização =====
mostrarTela(telaInicio);