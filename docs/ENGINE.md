# Engine

## Estrutura atual

A engine atual fica principalmente em `script.js` e controla:

- referências dos elementos do HTML;
- tamanho lógico do jogo;
- escala visual do `#game-area`;
- estado do jogador;
- física básica;
- entrada do teclado;
- salas;
- colisões;
- transições;
- popups e efeitos de sala.

O jogo usa um único `#game-area` como mundo lógico. As salas são carregadas mostrando
ou escondendo elementos, em vez de trocar todo o HTML da fase.

## Game-area lógico

O `#game-area` tem tamanho lógico fixo de `1600x900`.

Todas as posições internas do jogo devem ser pensadas dentro desse espaço:

- `x` e `y` do jogador;
- paredes;
- pisos;
- plataformas;
- áreas de saída;
- zonas de vento;
- fragmentos e obstáculos.

Isso permite que a lógica do jogo continue igual em qualquer tamanho de tela.

## resizeGame

A função `resizeGame` ajusta a escala visual do `#game-area` de acordo com o tamanho
disponível na janela.

Ela usa:

- largura disponível da página;
- altura disponível da página;
- largura lógica do jogo;
- altura lógica do jogo.

Depois aplica `transform: translate(-50%, -50%) scale(...)` no `#game-area`.

A regra importante é: o resize deve mudar a apresentação visual, não a lógica interna
do jogo. A lógica continua usando `1600x900`.

## Rooms

As salas ficam no objeto `rooms`.

Cada sala pode definir:

- `spawnX`;
- `spawnY`;
- se mostra a porta;
- se mostra blocos;
- lista de elementos visuais que pertencem à sala.

A função `loadRoom` usa esses dados para:

- reposicionar o jogador;
- mostrar ou esconder a porta;
- mostrar ou esconder o piso correto;
- esconder elementos de outras salas;
- mostrar elementos da sala atual;
- resetar elementos especiais, como a plataforma que cai.

## collisionConfig

O objeto `collisionConfig` define quais colisões existem em cada sala.

Cada sala pode ter:

- listas de caixas de colisão;
- elementos obrigatórios para aquela colisão existir;
- regras `active` para ligar ou desligar colisões em casos específicos;
- colisões customizadas com função.

O fluxo principal é:

1. criar a hitbox atual do jogador;
2. buscar as colisões da sala atual;
3. ignorar colisões inativas;
4. testar interseção entre jogador e caixas;
5. bloquear o movimento quando houver colisão.

## roomExitRules

`roomExitRules` define as saídas lógicas entre salas.

Cada regra informa:

- sala de origem;
- condição de saída;
- sala de destino;
- ação opcional ao sair.

Exemplos de ações:

- marcar que o jogador veio da direita;
- alterar o próximo spawn;
- fazer a sala 6 voltar para a sala 5 pelo buraco.

As transições devem continuar explícitas, porque isso facilita testar e ajustar cada
passagem do mapa.

## Sistema de spawn

O spawn atual usa algumas estratégias:

- `spawnX` e `spawnY` definidos em `rooms`;
- `nextSpawn` para casos especiais dentro da mesma engine;
- `spawnFromRight` para entrar em uma sala vindo da direita;
- `localStorage.spawnPoint` para reaparecer corretamente ao trocar entre páginas.

Ao adicionar uma nova transição, verifique:

- onde o jogador aparece;
- se a velocidade vertical precisa ser zerada;
- se `isGrounded` precisa ser ajustado;
- se algum estado temporário deve voltar ao padrão.

## Regra de responsividade interna

Elementos internos do jogo não devem usar `vw`, `vh` ou `window.innerWidth` como base
da lógica.

Use sempre o sistema lógico do jogo:

- `gameWidth`;
- `gameHeight`;
- coordenadas em pixels dentro de `1600x900`;
- proporções calculadas a partir de `gameWidth` e `gameHeight`, quando necessário.

`vw`, `vh` e medidas da janela podem ser usados em telas de menu ou interface fora do
`#game-area`, mas não para posicionar elementos internos da fase.

Regra curta: dentro do jogo, tudo pertence ao mundo `1600x900`; fora do jogo, a tela
pode ser responsiva normalmente.
