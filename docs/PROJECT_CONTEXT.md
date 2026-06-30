# Contexto do Projeto

## O que é o Pixfew

Pixfew é um jogo 2D em desenvolvimento, feito em HTML, CSS e JavaScript puro.
O jogador controla uma consciência em um mundo de salas conectadas, com plataformas,
colisões, transições entre áreas e elementos narrativos como fragmentos de memória.

## Tecnologias usadas

- HTML para estruturar as telas e os elementos do jogo.
- CSS para posicionamento, escala visual, aparência das salas e interface.
- JavaScript puro para engine, movimento, física, colisões, salas, popups e transições.
- `localStorage` para guardar informações simples entre telas, como pontos de spawn.

## Objetivo do projeto

O objetivo da v0.1 é consolidar uma base jogável simples:

- movimentação básica funcionando;
- pulo, gravidade e dash;
- salas conectadas;
- colisões previsíveis;
- transições de sala sem quebrar o spawn;
- primeira estrutura de mapa e interações.

Pixfew também é um projeto de aprendizado. Por isso, a prioridade é manter o código
simples, direto e explicado. Antes de criar sistemas complexos, a engine deve continuar
fácil de entender, testar e modificar.

## Versão atual

Versão atual planejada: `v0.1`.

Neste momento, o projeto está na fase de organização da base da engine e documentação
das regras principais antes da criação de novas funcionalidades maiores.

## Regra principal

Como este projeto também serve para aprendizado, prefira:

- código simples em vez de abstrações difíceis;
- nomes claros em vez de atalhos;
- comentários curtos quando ajudarem a entender a lógica;
- mudanças pequenas e testáveis;
- evolução gradual da engine.

Se uma solução funcionar mas deixar o projeto difícil de estudar, ela deve ser
simplificada antes de virar padrão.
