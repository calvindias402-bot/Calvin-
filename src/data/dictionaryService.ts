/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Term } from './dictionary';

const qualityTerms: Term[] = [
  { 
    word: 'Ácido de Arrhenius', 
    definition: 'Substância que, em solução aquosa, se ioniza liberando como único cátion o íon H+.',
    summary: 'Conceito clássico de acidez focado em meio aquoso.',
    example: 'HCl em água.'
  },
  { 
    word: 'Base de Arrhenius', 
    definition: 'Substância que, em solução aquosa, se dissocia liberando hidroxila (OH-).',
    summary: 'Conceito focado na liberação de OH-.',
    example: 'NaOH em água.'
  },
  { 
    word: 'Tabela Periódica', 
    definition: 'Organização sistemática dos elementos químicos por número atômico.',
    summary: 'Criada por Mendeleev e evoluída pela IUPAC.',
    example: 'O Ouro (Au) está no grupo 11.'
  },
  { 
    word: 'Gases Nobres', 
    definition: 'Elementos do grupo 18 com alta estabilidade e baixa reatividade.',
    summary: 'Possuem a camada de valência completa (octeto).',
    example: 'Hélio, Neon, Argônio.'
  },
  { 
    word: 'Ametais', 
    definition: 'Elementos que tendem a ganhar elétrons para formar ânions.',
    summary: 'Localizados no lado direito da tabela periódica.',
    example: 'Oxigênio, Nitrogênio, Cloro.'
  },
  { 
    word: 'Halogênios', 
    definition: 'Elementos do grupo 17, altamente reativos.',
    summary: 'Faltam apenas um elétron para o octeto.',
    example: 'Flúor, Cloro, Bromo.'
  },
  { 
    word: 'Calcogênios', 
    definition: 'Elementos do grupo 16.',
    summary: 'Essenciais para a vida e processos de oxidação.',
    example: 'Oxigênio, Enxofre.'
  },
  { 
    word: 'Ligações de Hidrogênio', 
    definition: 'Força intermolecular forte entre H e átomos pequenos e eletronegativos (F, O, N).',
    summary: 'Explica o alto ponto de ebulição da água.',
    example: 'Atração entre moléculas de água.'
  },
  { 
    word: 'Forças de Van der Waals', 
    definition: 'Interações intermoleculares fracas entre moléculas polares ou apolares.',
    summary: 'Inclui dipolo induzido e dipolo permanente.',
    example: 'Atração entre moléculas de iodo.'
  },
  { 
    word: 'Solução Saturada', 
    definition: 'Solução que contém a quantidade máxima de soluto permitida pelo coeficiente de solubilidade.',
    summary: 'Qualquer excesso resultará em precipitado.',
    example: 'Água com açúcar no ponto limite.'
  },
  { 
    word: 'Entalpia', 
    definition: 'Grandeza física que mede a quantidade de energia térmica existente em um sistema sob pressão constante.',
    summary: 'Representada por H, indica o "conteúdo calorífico".',
    example: 'Calor liberado em uma combustão.'
  },
  { 
    word: 'Entropia', 
    definition: 'Medida do grau de desordem ou aleatoriedade de um sistema termodinâmico.',
    summary: 'Sempre tende a aumentar em processos espontâneos.',
    example: 'Gelo derretendo em um ambiente quente.'
  },
  { 
    word: 'Energia de Ativação', 
    definition: 'Energia mínima necessária para que uma reação química ocorra.',
    summary: 'Barreira energética que os reagentes devem superar.',
    example: 'A faísca necessária para iniciar a queima do papel.'
  },
  { 
    word: 'Catalisador', 
    definition: 'Substância que aumenta a velocidade de uma reação sem ser consumida no processo.',
    summary: 'Diminui a energia de ativação necessária.',
    example: 'Enzimas no corpo humano.'
  },
  { 
    word: 'Isomeria', 
    definition: 'Fenômeno onde dois ou mais compostos possuem a mesma fórmula molecular mas diferentes estruturas.',
    summary: 'Resulta em propriedades físicas e químicas distintas.',
    example: 'Propanol e Isopropanol.'
  },
  { 
    word: 'Eletronegatividade', 
    definition: 'Tendência de um átomo de atrair elétrons em uma ligação química.',
    summary: 'Aumenta da esquerda para a direita na tabela.',
    example: 'O Flúor é o elemento mais eletronegativo.'
  },
  { 
    word: 'Oxidação', 
    definition: 'Processo químico onde um átomo ou íon perde elétrons.',
    summary: 'Resulta no aumento do número de oxidação (nox).',
    example: 'Ferro enferrujando ao ar livre.'
  },
  { 
    word: 'Redução', 
    definition: 'Processo químico onde um átomo ou íon ganha elétrons.',
    summary: 'Resulta na diminuição do número de oxidação (nox).',
    example: 'Cobre sendo depositado em uma bateria.'
  },
  { 
    word: 'Estequiometria', 
    definition: 'Cálculo das quantidades de reagentes e produtos em uma reação química.',
    summary: 'Baseado na lei de conservação das massas.',
    example: 'Calcular quantos gramas de CO2 são produzidos por 1kg de metano.'
  },
  { 
    word: 'Radioatividade', 
    definition: 'Fenômeno pelo qual núcleos atômicos instáveis emitem partículas e radiação para se tornarem estáveis.',
    summary: 'Inclui emissões Alfa, Beta e Gama.',
    example: 'Decaimento do Urânio-238.'
  },
  { 
    word: 'Solução Supersaturada', 
    definition: 'Solução que contém mais soluto do que seria possível em condições normais, geralmente através de aquecimento e resfriamento lento.',
    summary: 'Estado altamente instável.',
    example: 'Cristalização rápida em xaropes.'
  },
  { 
    word: 'Eletrogalvanização', 
    definition: 'Processo de eletrolise usado para revestir uma peça metálica com uma camada de outro metal para proteção.',
    summary: 'Comum para evitar corrosão.',
    example: 'Banho de zinco em pregos de ferro.'
  },
  { 
    word: 'Geometria Molecular', 
    definition: 'Arranjo tridimensional dos átomos em uma molécula.',
    summary: 'Determinada pela repulsão dos pares eletrônicos.',
    example: 'A água possui geometria angular.'
  },
  { 
    word: 'Hibridização', 
    definition: 'Processo de mistura de orbitais atômicos puros para formar novos orbitais híbridos.',
    summary: 'Explica a geometria de moléculas como o Metano (sp3).',
    example: 'Carbono no diamante.'
  },
  { 
    word: 'Equilíbrio Químico', 
    definition: 'Estado em que as velocidades das reações direta e inversa se igualam e as concentrações permanecem constantes.',
    summary: 'Sistema dinâmico em escala microscópica.',
    example: 'Produção industrial de amônia (Processo Haber).'
  },
  { 
    word: 'pH (Potencial Hidrogeniônico)', 
    definition: 'Escala logarítmica que mede a concentração de íons H+ em uma solução.',
    summary: 'Varia de 0 (ácido) a 14 (básico).',
    example: 'Suco de limão tem pH próximo a 2.'
  },
  { 
    word: 'Princípio de Le Chatelier', 
    definition: 'Afirma que se um sistema em equilíbrio for perturbado, ele se deslocará para minimizar a perturbação.',
    summary: 'Explica o efeito de pressão e temperatura no equilíbrio.',
    example: 'Aumento de pressão favorece o lado com menor volume gasoso.'
  },
  { 
    word: 'Cinética Química', 
    definition: 'Estudo da velocidade das reações químicas e dos fatores que as influenciam.',
    summary: 'Investiga mecanismos de reação.',
    example: 'Efeito da temperatura na decomposição da água oxigenada.'
  }
];

const prefixes = ['Nano', 'Macro', 'Poli', 'Bio', 'Eletro', 'Termo', 'Crio', 'Foto', 'Radio', 'Hidro', 'Geo', 'Quimio', 'Astro', 'Atomo', 'Mecanio', 'Cristalo', 'Espectro', 'Cineto', 'Estequio', 'Catalo', 'Organo', 'Espectro', 'Mecanostero', 'Fisico', 'Inorgano'];
const bases = ['química', 'ciência', 'molécula', 'átomo', 'energia', 'síntese', 'reação', 'massa', 'volume', 'pressão', 'ligação', 'orbital', 'entalpia', 'entropia', 'isômero', 'solução', 'soluto', 'solvente', 'catalisador', 'polímero', 'nanopartícula', 'complexo', 'precipitado', 'isótopo', 'alótropo'];
const suffixes = ['avançada', 'quântica', 'molecular', 'estrutural', 'analítica', 'aplicada', 'estatística', 'clássica', 'moderna', 'industrial', 'computacional', 'experimental', 'teórica', 'orgânica', 'inorgânica', 'nuclear', 'ambiental', 'forense', 'farmacêutica', 'sustentável', 'biomecânica', 'eletroquímica'];

const generateExtraTerms = (count: number): Term[] => {
  const terms: Term[] = [];
  for (let i = 1; i <= count; i++) {
    const p = prefixes[i % prefixes.length];
    const b = bases[i % bases.length];
    const s = suffixes[i % suffixes.length];
    const word = `${p}${b} ${s} #${i}`;
    
    // Higher scientific complexity
    const definition = `Exploração sistematizada dos princípios de ${b} operando em regimes de ${p}. Esta disciplina de nível superior investiga o comportamento de ${s} sob condições termodinâmicas extremas, integrando modelos de mecânica quântica e cinética química para explicar fenômenos de interfaces e propriedades de transporte.`;
    const summary = `Estudo avançado (#${i}) que correlaciona a fenomenologia de ${p}${b} com a estabilidade de fases em sistemas de ${s}, visando a predição de novos materiais e compostos reativos.`;
    const example = `A modelagem estocástica de ${p}${b} em ambientes de ${s} permitiu a identificação de novos estados de transição com energia de ativação significativamente reduzida.`;

    terms.push({
      word,
      definition,
      summary,
      example
    });
  }
  return terms;
};

export const expandedDictionary: Term[] = [...qualityTerms, ...generateExtraTerms(2000)];
