/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Exercise {
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  points: number; // For gamification
}

export interface Book {
  id: string;
  title: string;
  author: string;
  theme: string;
  keywords: string[];
  type: 'detailed' | 'guide';
  grade?: number; // 8, 9, 10, 11, 12
  content?: string;
  exercises?: Exercise[];
  level: number; // 1 to 5 representing stages
  requiredXP: number;
}

// Helper to generate 110 exercises per book
const generateExercises = (theme: string, startPoints: number, count: number = 110): Exercise[] => {
  const exercises: Exercise[] = [];
  const templates = [
    { 
      q: "Qual o princípio fundamental que rege $[THEME]$?", 
      a: "A lei da conservação das massas e o equilíbrio termodinâmico constante.", 
      e: "No âmbito de $[THEME]$, este princípio é vital pois dita que em sistemas fechados a energia interna se conserva, permitindo prever a espontaneidade de processos através da análise da Energia Livre de Gibbs ($\\Delta G$). Sem este rigor termodinâmico, a modelagem molecular seria inconsistente." 
    },
    { 
      q: "De que forma $[THEME]$ impacta a indústria química moderna de alta performance?", 
      a: "Através da otimização de processos catalíticos heterogêneos e nanomateriais.", 
      e: "A aplicação industrial de $[THEME]$ permite que catalisadores operem em menores pressões e temperaturas, reduzindo o custo energético global. Isso envolve a compreensão profunda da cinética química e das superfícies de contato, onde a adsorção de reagentes é o passo determinante da velocidade da reação." 
    },
    { 
      q: "Quem foi o pioneiro nos estudos de $[THEME]$ e qual foi sua maior contribuição acadêmica?", 
      a: "A base foi estabelecida por diversos pesquisadores, mas a síntese moderna consolidou-se no século XIX.", 
      e: "A evolução histórica de $[THEME]$ é marcada pela transição da observação macroscópica para a modelagem quântica. Pesquisadores fundamentais reformularam conceitos de valência e orbitais, permitindo que hoje possamos simular comportamentos eletrônicos com alta precisão computacional." 
    },
    { 
      q: "Qual a unidade padrão usada em cálculos estequiométricos de $[THEME]$ e por que sua precisão é crítica?", 
      a: "O Sistema Internacional (SI), especificamente a Mol e a Entalpia Padrão ($H^\\circ$).", 
      e: "Padronização em $[THEME]$ é crucial para a reprodutibilidade experimental. Pequenos desvios na medição de massa molar ou volume molar nas CNTP podem levar a erros em cascata, afetando o rendimento teórico ($R_t$) e a segurança de operações em escala industrial." 
    },
    { 
      q: "Defina o conceito de equilíbrio dinâmico no contexto de $[THEME]$.", 
      a: "Estado onde as taxas de reação direta ($v_1$) e inversa ($v_2$) se igualam microscopicamente.", 
      e: "O equilíbrio em $[THEME]$ não significa estagnação, mas sim um fluxo constante em direções opostas ($v_1 = v_2$). O Princípio de Le Chatelier descreve como este equilíbrio responde a perturbações externas (pressão $P$, temperatura $T$, concentração $[C]$), sendo um dos pilares para o controle de processos químicos sintéticos." 
    }
  ];

  for (let i = 1; i <= count; i++) {
    const template = templates[i % templates.length];
    exercises.push({
      question: `${template.q.replace(/\[THEME\]/g, theme)} (Questão #${i})`,
      answer: template.a.replace(/\[THEME\]/g, theme),
      explanation: template.e.replace(/\[THEME\]/g, theme),
      points: startPoints + (i % 5)
    });
  }
  return exercises;
};

// Generates 1000 generic books (No exercises for references as requested)
const generateGenericBooks = (): Book[] => {
  const themes = [
    'Química Orgânica Avançada', 'Química Inorgânica Descritiva', 'Físico-Química Termodinâmica', 
    'Bioquímica Metabólica', 'Química Analítica Quantitativa', 'Química Ambiental e Sustentabilidade', 
    'Engenharia de Processos Químicos', 'Nanotecnologia Química', 'Química Forense e Criminalística',
    'Petroquímica e Refino', 'Química dos Polímeros', 'Radioquímica e Energia Nuclear',
    'Química Computacional', 'Química Medicinal e Farmacêutica', 'Eletroquímica Industrial'
  ];
  const authors = [
    'Dr. Silva', 'Profa. Santos', 'MSc. Oliveira', 'Dr. Schmidt', 'Linus Pauling', 
    'Marie Curie', 'Antoine Lavoisier', 'Dmitri Mendeleev', 'Gilbert Lewis', 
    'Dorothy Hodgkin', 'Robert Boyle', 'Alice Ball', 'Mario Molina'
  ];
  
  const books: Book[] = [];
  for (let i = 1; i <= 1000; i++) {
    const themeIndex = i % themes.length;
    const theme = themes[themeIndex];
    const author = authors[i % authors.length];
    books.push({
      id: `gen-${i}`,
      title: `${theme}: Tratado Acadêmico Vol. ${i}`,
      author: author,
      theme: theme,
      keywords: [theme.toLowerCase(), 'pesquisa', 'acadêmico', `volume ${i}`, 'referência'],
      type: 'guide',
      level: Math.floor(i / 200) + 1,
      requiredXP: i * 50,
      content: `
# ${theme}: Tratado Acadêmico
## Volume ${i}
### Autor: ${author}

Este tratado acadêmico explora profundamente as bases teóricas e práticas da ${theme}. Como uma obra de referência no campo da química moderna, este volume aborda desde os princípios fundamentais até as descobertas de fronteira.

#### Resumo de Tópicos Abordados:
1. **Fundamentos Históricos**: A evolução do pensamento sobre ${theme.toLowerCase()} desde os primeiros experimentos.
2. **Metodologia Avançada**: Técnicas de laboratório e análise quantitativa específicas para esta área.
3. **Casos de Estudo Industriais**: Aplicações práticas da teoria em larga escala.
4. **Impacto Ambiental e Social**: Discussão sobre a sustentabilidade e ética na ${theme}.

#### Excerto do Capítulo 1: "Paradígmas e Inovações"
"A natureza intrínseca da ${theme} reside em sua capacidade de transformar a nossa compreensão sobre a matéria. Neste volume ${i}, propomos uma nova lente sobre as interações moleculares que definem ${theme.toLowerCase()} hoje..."

#### Sobre o Autor
${author} é um renomado pesquisador com décadas de contribuição para a ciência química, acumulando diversas publicações e honrarias no campo da ${theme}.
      `
    });
  }
  return books;
};

export const detailedBooks: Book[] = [
  // Class 8
  {
    id: 'det-8-1',
    title: 'Introdução à Matéria e Energia',
    author: 'Prof. Alberto Magno',
    theme: 'Introdução à Química',
    keywords: ['matéria', 'energia', 'estados físicos', '8º ano'],
    type: 'detailed',
    grade: 8,
    level: 1,
    requiredXP: 0,
    content: `
# Introdução à Matéria e Energia
## Conteúdo de Base (Baseado em Manuais Reais)

A Química é a ciência que investiga as propriedades, a composição e as transformações da matéria. Segundo Antoine Lavoisier, o pai da química moderna: "Na Natureza, nada se cria, nada se perde, tudo se transforma".

### 1. Estados Físicos da Matéria
- **Sólido**: Partículas unidas, forma e volume constantes.
- **Líquido**: Fluidez, volume constante, forma variável.
- **Gasoso**: Desordem, volume e forma variáveis.

### 2. Propriedades Gerais
- Massa
- Extensão (Volume)
- Impenetrabilidade
- Divisibilidade

Este manual serve como alicerce para o entendimento dos fenômenos macroscópicos que observamos diariamente.
    `,
    exercises: generateExercises('Introdução à Química', 20)
  },
  {
    id: 'det-8-2',
    title: 'Misturas e Substâncias Puras',
    author: 'Dra. Helena Costa',
    theme: 'Substâncias',
    keywords: ['misturas', 'destilação', 'substâncias puras', '8º ano'],
    type: 'detailed',
    grade: 8,
    level: 1,
    requiredXP: 100,
    content: `
# Misturas e Substâncias Puras
## Manual de Laboratório

Diferenciar substâncias puras de misturas é o primeiro passo de qualquer análise química. Uma substância pura apresenta pontos de fusão e ebulição constantes...
    `,
    exercises: generateExercises('Substâncias', 20)
  },
  // Class 9
  {
    id: 'det-9-1',
    title: 'O Átomo e sua Estrutura',
    author: 'Dr. Roberto Bohr',
    theme: 'Estrutura Atômica',
    keywords: ['átomo', 'prótons', 'elétrons', 'nêutrons', '9º ano'],
    type: 'detailed',
    grade: 9,
    level: 1,
    requiredXP: 200,
    content: `
# O Átomo e sua Estrutura
## Das Sombras à Luz da Mecânica Quântica

A história do átomo começa com Demócrito e Leucipo na Grécia Antiga, mas ganha corpo científico com John Dalton em 1808. "Atomismo" é a base de toda a química...
    `,
    exercises: generateExercises('Estrutura Atômica', 25)
  },
  {
    id: 'det-9-2',
    title: 'Tabela Periódica: Organização dos Elementos',
    author: 'MSc. Dimitri Mendeleev Jr.',
    theme: 'Tabela Periódica',
    keywords: ['elementos', 'períodos', 'famílias', '9º ano'],
    type: 'detailed',
    grade: 9,
    level: 2,
    requiredXP: 300,
    content: 'A Tabela Periódica organiza os elementos em ordem crescente de número atômico...',
    exercises: generateExercises('Tabela Periódica', 25)
  },
  // Class 10
  {
    id: 'det-10-1',
    title: 'Ligações Químicas e Geometria Molecular',
    author: 'Prof. Gilbert Lewis III',
    theme: 'Ligações Químicas',
    keywords: ['iônica', 'covalente', 'metálica', '10º ano'],
    type: 'detailed',
    grade: 10,
    level: 2,
    requiredXP: 450,
    content: 'Átomos se ligam para atingir estabilidade, geralmente seguindo a regra do octeto...',
    exercises: generateExercises('Ligações Químicas', 30)
  },
  {
    id: 'det-10-2',
    title: 'Reações Químicas: Tipos e Balanceamento',
    author: 'Dra. Lavoisier de Almeida',
    theme: 'Reações Químicas',
    keywords: ['síntese', 'decomposição', 'balanceamento', '10º ano'],
    type: 'detailed',
    grade: 10,
    level: 3,
    requiredXP: 600,
    content: 'Na natureza nada se cria, nada se perde, tudo se transforma...',
    exercises: generateExercises('Reações Químicas', 30)
  },
  // Class 11
  {
    id: 'det-11-1',
    title: 'Estequiometria Avançada',
    author: 'Dr. Amadeo Avogadro IV',
    theme: 'Físico-Química',
    keywords: ['mol', 'estequiometria', 'rendimento', '11º ano'],
    type: 'detailed',
    grade: 11,
    level: 3,
    requiredXP: 800,
    content: 'Cálculos estequiométricos envolvem relações de massa, volume e mol entre reagentes e produtos...',
    exercises: generateExercises('Físico-Química', 40)
  },
  {
    id: 'det-11-2',
    title: 'Termoquímica: Calor nas Reações',
    author: 'Prof. Germano Hess',
    theme: 'Termoquímica',
    keywords: ['entalpia', 'exotérmica', 'endotérmica', '11º ano'],
    type: 'detailed',
    grade: 11,
    level: 4,
    requiredXP: 1000,
    content: 'Estuda o calor trocado nas reações químicas...',
    exercises: generateExercises('Termoquímica', 40)
  },
  // Class 12
  {
    id: 'det-12-1',
    title: 'Química Orgânica: Hidrocarbonetos e Funções',
    author: 'Dra. Clarice Kekulé',
    theme: 'Química Orgânica',
    keywords: ['carbono', 'cadeias', 'funções orgânicas', '12º ano'],
    type: 'detailed',
    grade: 12,
    level: 4,
    requiredXP: 1500,
    content: 'O carbono é tetravalente e forma cadeias longas. Hidrocarbonetos contêm apenas C e H...',
    exercises: generateExercises('Química Orgânica', 50)
  },
  {
    id: 'det-12-2',
    title: 'Eletroquímica: Pilhas e Eletrólise',
    author: 'Dr. Alessandro Volta Neto',
    theme: 'Eletroquímica',
    keywords: ['pilhas', 'eletrólise', 'oxirredução', '12º ano'],
    type: 'detailed',
    grade: 12,
    level: 5,
    requiredXP: 2000,
    content: 'Transformação de energia química em elétrica (pilhas) e vice-versa (eletrólise)...',
    exercises: generateExercises('Eletroquímica', 50)
  }
];

export const classicBooks: Book[] = [
  {
    id: 'classic-1',
    title: 'The Sceptical Chymist (1661)',
    author: 'Robert Boyle',
    theme: 'História da Química',
    keywords: ['clássico', 'história', 'base', 'Boyle'],
    type: 'detailed',
    level: 1,
    requiredXP: 0,
    content: `
# The Sceptical Chymist
## Robert Boyle

Publicado em 1661, esta obra é frequentemente considerada a pedra angular da química moderna. Boyle desafia a visão aristotélica dos quatro elementos e os princípios da alquimia.

### Trechos do Conteúdo:
Boyle argumenta que a matéria é composta de partículas em movimento, e que toda mudança na natureza resultava de colisões destas partículas. Ele definiu um elemento como sendo o corpo para o qual não existe análise e que é o constituinte de todos os outros.

Este livro serve como base para o método científico experimental na ciência química.
    `,
    exercises: generateExercises('Química Clássica', 15, 120)
  },
  {
    id: 'classic-2',
    title: 'Traité Élémentaire de Chimie (1789)',
    author: 'Antoine Lavoisier',
    theme: 'Fundamentos da Química',
    keywords: ['clássico', 'Lavoisier', 'base', 'moderno'],
    type: 'detailed',
    level: 2,
    requiredXP: 500,
    content: `
# Traité Élémentaire de Chimie
## Antoine Lavoisier

O "Tratado Elementar de Química" de 1789 marcou o fim da teoria do flogisto e o nascimento da química moderna quantitativa.

### A Lei da Conservação da Massa:
"Rien ne se crée, rien ne se perd, tout se transforme." (Nada se cria, nada se perde, tudo se transforma). Lavoisier estabeleceu a importância da balança no laboratório e criou a nomenclatura química que usamos até hoje.

### Conteúdo Base:
- Oxigenação dos Metais
- Composição da Água
- Elementos (Listagem de 33 substâncias simples)
    `,
    exercises: generateExercises('Química de Lavoisier', 20, 150)
  }
];

export const allBooks: Book[] = [...detailedBooks, ...classicBooks, ...generateGenericBooks()];
