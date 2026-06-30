# Plano de Testes v0.1

Use este checklist antes de considerar a v0.1 estável.

## Responsividade

- [ ] Abrir o jogo em tela grande e confirmar que o `#game-area` ocupa a tela.
- [ ] Redimensionar a janela e confirmar que o jogo escala sem mudar a lógica.
- [ ] Testar tela estreita e confirmar que o jogador, paredes e plataformas continuam alinhados.
- [ ] Confirmar que elementos internos do jogo não dependem de `vw`, `vh` ou `window.innerWidth`.

## Salas 1 a 6

- [ ] Sala 1 carrega com jogador no spawn esperado.
- [ ] Sala 1 mostra a porta e o popup de interação quando aplicável.
- [ ] Sala 2 carrega ao entrar pela porta.
- [ ] Sala 3 carrega com plataformas e paredes corretas.
- [ ] Sala 4 carrega com zona de vento e plataforma que cai.
- [ ] Sala 5 carrega com piso dividido e saída para baixo.
- [ ] Sala 6 carrega com plataformas, fragmento de memória e obstáculo de dano.

## Colisões

- [ ] Jogador não atravessa paredes da sala 1.
- [ ] Jogador não atravessa paredes da sala 2.
- [ ] Jogador colide corretamente com plataformas da sala 3.
- [ ] Jogador colide com a plataforma que cai na sala 4.
- [ ] Jogador respeita piso e paredes da sala 5.
- [ ] Jogador colide corretamente com plataformas e teto da sala 6.
- [ ] Colisões não aparecem em salas onde seus elementos estão escondidos.

## Popups

- [ ] Popup da porta aparece somente quando o jogador pode interagir.
- [ ] Popup da porta some ao sair da área de interação.
- [ ] Popup de memória aparece na sala 6 quando o jogador encosta no fragmento.
- [ ] Popup de dano aparece na sala 6 quando o jogador encosta no obstáculo.
- [ ] Popups não ficam presos na tela após trocar de sala.

## Transições

- [ ] Sala 1 para sala 3 pela saída direita.
- [ ] Sala 3 para sala 1 pela saída esquerda.
- [ ] Sala 3 para sala 4 pela abertura direita superior.
- [ ] Sala 3 para sala 5 pela abertura direita inferior.
- [ ] Sala 4 para sala 3 pela saída esquerda.
- [ ] Sala 5 para sala 3 pela saída esquerda.
- [ ] Sala 5 para sala 6 pela saída inferior.
- [ ] Sala 6 para sala 5 pela saída superior.
- [ ] Spawns especiais posicionam o jogador no lugar correto após cada transição.

## Sala 6 para sala 5

- [ ] Entrar na sala 6 pela saída inferior da sala 5.
- [ ] Subir até a saída superior da sala 6.
- [ ] Confirmar retorno para a sala 5.
- [ ] Confirmar que o jogador reaparece próximo ao buraco da sala 5.
- [ ] Confirmar que `velocityY` é zerado e o jogador não cai imediatamente de forma incorreta.

## Física básica

- [ ] Movimento horizontal responde às teclas.
- [ ] Gravidade puxa o jogador para baixo.
- [ ] Pulo funciona apenas quando permitido.
- [ ] Coyote time funciona sem permitir pulos infinitos.
- [ ] Dash funciona e respeita cooldown.
- [ ] Jogador não atravessa piso ao cair.
- [ ] Jogador não gruda em paredes de forma permanente.
- [ ] Plataforma que cai reseta corretamente ao recarregar a sala 4.
- [ ] Zona de vento empurra o jogador para cima na sala 4.
