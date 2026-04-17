/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Term {
  word: string;
  definition: string;
  summary: string;
  example: string;
}

export const chemistryDictionary: Term[] = [
  { 
    word: 'Ácido de Arrhenius', 
    definition: 'Substância que, em solução aquosa, se ioniza liberando como único cátion o íon H+ (ou H3O+).',
    summary: 'A teoria de Arrhenius foi a primeira tentativa sistemática de classificar ácidos e bases. É limitada a meios aquosos e foca na liberação de prótons.',
    example: 'HCl (g) + H2O (l) → H3O+ (aq) + Cl- (aq). O cloreto de hidrogênio é um ácido de Arrhenius pois libera H+ na água.'
  },
  { 
    word: 'Base de Arrhenius', 
    definition: 'Substância que, em solução aquosa, se dissocia liberando o ânion hidroxila (OH-).',
    summary: 'Restrita a substâncias que possuem o grupo hidroxila em sua fórmula original e o liberam em água.',
    example: 'NaOH (s) → Na+ (aq) + OH- (aq). O hidróxido de sódio é uma base típica usada na fabricação de sabões.'
  },
  { 
    word: 'Átomo', 
    definition: 'Unidade fundamental da matéria que conserva as propriedades de um elemento químico.',
    summary: 'Composto por um núcleo central (prótons e nêutrons) e uma eletrosfera (elétrons). O equilíbrio dessas partículas define a estabilidade atômica.',
    example: 'O átomo de Oxigênio (O) possui 8 prótons, 8 nêutrons e 8 elétrons em seu estado fundamental.'
  },
  { 
    word: 'Entalpia (H)', 
    definition: 'Grandeza termodinâmica que mede a energia térmica de um sistema sob pressão constante.',
    summary: 'Representa o "conteúdo de calor". Em processos exotérmicos, a entalpia final é menor que a inicial (ΔH < 0), liberando calor.',
    example: 'A combustão do metano (CH4 + 2O2 → CO2 + 2H2O) possui um ΔH de -890 kJ/mol, indicando alta liberação de energia.'
  },
  { 
    word: 'Entropia (S)', 
    definition: 'Medida da desordem ou aleatoriedade de um sistema; em processos espontâneos, a entropia total do universo tende a aumentar.',
    summary: 'Relacionada à Segunda Lei da Termodinâmica. Sistemas tendem naturalmente de estados organizados para estados de maior desordem.',
    example: 'A sublimação do gelo seco (CO2 sólido para gasoso) aumenta drasticamente a entropia do sistema.'
  },
  { 
    word: 'Energia Livre de Gibbs (G)', 
    definition: 'Energia disponível para realizar trabalho em um sistema a T e P constantes.',
    summary: 'Combina entalpia e entropia (ΔG = ΔH - TΔS). Se ΔG for negativo, a reação é espontânea naquelas condições.',
    example: 'A formação de ferrugem (oxidação do ferro) ocorre espontaneamente porque resulta em uma diminuição da energia livre de Gibbs.'
  },
  { 
    word: 'Estequiometria', 
    definition: 'Estudo das relações quantitativas entre reagentes e produtos em reações químicas.',
    summary: 'Baseada na Lei de Conservação das Massas (Lavoisier) e na Lei das Proporções Definidas (Proust). Essencial para escala industrial.',
    example: 'Para produzir 2 mols de amônia (NH3), são necessários exatamente 3 mols de H2 e 1 mol de N2.'
  },
  { 
    word: 'Ligação Covalente', 
    definition: 'Ligação química resultante do compartilhamento de pares de elétrons.',
    summary: 'Ocorre geralmente entre ametais. Pode ser polar (compartilhamento desigual) ou apolar (IGUAL).',
    example: 'Na molécula de H2O, o oxigênio compartilha elétrons com dois hidrogênios em ligações covalentes polares.'
  },
  { 
    word: 'Ligação Iônica', 
    definition: 'Ligação resultante da atração eletrostática entre íons de cargas opostas.',
    summary: 'Formada pela transferência definitiva de elétrons de um metal para um ametal, criando íons que se atraem.',
    example: 'NaCl (Sal de cozinha) é formado pela doação de um elétron do Sódio (Na) para o Cloro (Cl).'
  },
  { 
    word: 'Princípio de Le Chatelier', 
    definition: 'Afirma que um sistema em equilíbrio, se perturbado, se desloca para minimizar essa perturbação.',
    summary: 'As perturbações podem ser variações de concentração, pressão ou temperatura. O sistema busca um novo estado de equilíbrio.',
    example: 'Aumentar a pressão na síntese de amônia desloca o equilíbrio para o lado com menos mols de gás (produção de NH3).'
  },
  { 
    word: 'Cinética Química', 
    definition: 'Estudo da velocidade das reações e dos mecanismos pelos quais elas ocorrem.',
    summary: 'Analisa fatores como temperatura, superfície de contato, concentração e catalisadores para controlar o tempo de reação.',
    example: 'Aumentar a temperatura de cozimento de um alimento acelera as reações químicas, reduzindo o tempo de preparo.'
  },
  { 
    word: 'Nomenclatura IUPAC', 
    definition: 'Sistema internacional padronizado para nomear compostos químicos.',
    summary: 'Garante que cada estrutura única tenha um nome único e decifrável globalmente, facilitando a comunicação científica.',
    example: 'O nome IUPAC do álcool comum é Etanol, indicando dois carbonos (Et), ligação simples (an) e função álcool (ol).'
  },
  { 
    word: 'Catalisador', 
    definition: 'Substância que aumenta a velocidade de uma reação sem ser consumida.',
    summary: 'Oferece um caminho alternativo com menor energia de ativação. Não altera o ΔH ou o produto final da reação.',
    example: 'As enzimas no corpo humano são catalisadores biológicos (biocatalisadores) essenciais para a digestão.'
  },
  { 
    word: 'Oxidorredução (Redox)', 
    definition: 'Reação que envolve a transferência de elétrons entre espécies.',
    summary: 'Consiste em dois processos simultâneos: oxidação (perda de elétrons) e redução (ganho de elétrons).',
    example: 'Em uma pilha comum, o zinco sofre oxidação enquanto o cobre sofre redução, gerando corrente elétrica.'
  },
  { 
    word: 'Solução Tampão', 
    definition: 'Solução que resiste a variações de pH após adição de pequenas quantidades de ácidos ou bases.',
    summary: 'Composta geralmente por um ácido fraco e seu sal correspondente, ou uma base fraca e seu sal.',
    example: 'O sangue humano é um sistema tampão (bicarbonato) que mantém o pH estável em torno de 7,4.'
  },
  { 
    word: 'Radioatividade', 
    definition: 'Emissão espontânea de radiação por núcleos instáveis para ganhar estabilidade.',
    summary: 'Pode envolver a emissão de partículas alfa, beta ou radiação gama. Cada tipo possui poder de penetração diferente.',
    example: 'O Urânio-235 é radioativo e usado como combustível em usinas nucleares para gerar eletricidade.'
  },
  { 
    word: 'Hibridização', 
    definition: 'Mistura de orbitais atômicos para formar novos orbitais híbridos equivalentes.',
    summary: 'Explica a geometria molecular e a capacidade de formação de ligações de átomos como o Carbono (sp, sp2, sp3).',
    example: 'O Carbono no metano (CH4) está hibridizado em sp3, o que lhe confere uma geometria tetraédrica.'
  },
  { 
    word: 'Isomeria', 
    definition: 'Fenômeno onde compostos com a mesma fórmula molecular possuem estruturas diferentes.',
    summary: 'Dividida em isomeria plana (cadeia, função, posição) e espacial (geométrica e óptica).',
    example: 'Etanol e Éter Dimetílico possuem a mesma fórmula (C2H6O), mas funções e propriedades químicas opostas.'
  },
  { 
    word: 'Eletronegatividade', 
    definition: 'Tendência de um átomo em atrair elétrons em uma ligação química.',
    summary: 'Escala de Pauling é a mais comum. Flúor é o elemento mais eletronegativo, enquanto o Césio é um dos menos.',
    example: 'Na molécula de HF, o Flúor atrai os elétrons com mais força, criando um polo negativo na molécula.'
  },
  { 
    word: 'Solubilidade', 
    definition: 'Capacidade máxima de um soluto se dissolver em um solvente a uma dada temperatura.',
    summary: 'Depende da natureza das substâncias ("semelhante dissolve semelhante") e de fatores físicos como temperatura e pressão.',
    example: 'O sal de cozinha dissolve-se bem em água devido à polaridade de ambas as substâncias.'
  }
];
