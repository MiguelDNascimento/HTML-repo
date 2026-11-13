# 🛒 Lista de Compras

Uma lista de compras do supermercado da semana. Dá pra adicionar itens, marcar o que já pegou e remover o que não precisa mais. Fiz só com HTML, CSS e JavaScript, sem biblioteca nenhuma, e funciona no computador e no celular.

Pra rodar, é só abrir o `index.html` no navegador.

## Como o projeto se divide

Pensa numa casa. O **HTML** é a estrutura: paredes, portas, janelas. O **CSS** é a decoração, a cor da parede e onde fica cada móvel. O **JavaScript** é a parte elétrica: você aperta o interruptor e alguma coisa acontece.

Cada arquivo cuida de uma dessas partes. Separar assim deixa tudo mais fácil de achar quando dá problema.

## index.html (a estrutura)

| Elemento | Pra que serve |
|---|---|
| `<meta charset="UTF-8">` | Faz os acentos e emojis aparecerem certo |
| `<meta name="viewport">` | Sem ele, o celular mostra a página minúscula, como se fosse uma tela de PC |
| `<link href="style.css">` | Liga o CSS na página |
| `<button id="btnVoltar">` | Botão Voltar no topo |
| `<h1>` | Título da página |
| `<div class="area-adicionar">` | Caixa que junta o campo e o botão, pra o CSS colocar os dois lado a lado |
| `<input id="inputItem">` | Campo onde você digita o item. O `placeholder` é aquele texto cinza de exemplo |
| `<button id="btnAdicionar">` | Botão que adiciona o item |
| `<p id="msgErro">` | Começa vazio. O JS escreve a mensagem aqui quando o campo tá em branco |
| `<ul id="lista">` | Também começa vazia. O JS cria os itens aqui dentro |
| `<div id="alerta">` | Aviso vermelho que aparece quando você remove um item |
| `<script src="script.js">` | Liga o JS. Fica no final do `<body>` porque o JS precisa que o HTML já exista |

**id ou class?** O `id` funciona como um CPF: só um elemento pode ter. A gente usa pra o JS achar aquele elemento específico. A `class` é tipo um grupo, vários elementos podem ter a mesma, e a gente usa mais no CSS.

## style.css (a aparência)

| Trecho | O que faz |
|---|---|
| `* { box-sizing: border-box }` | O padding passa a contar dentro da largura. Evita coisa vazando da tela |
| `body` | Fundo claro, fonte e um respiro nas bordas |
| `.container` | Limita a largura em 500px e centraliza com `margin: 0 auto` |
| `.area-adicionar { display: flex }` | Coloca o input e o botão na mesma linha |
| `#inputItem { flex: 1 }` | O campo estica e ocupa o espaço que sobra |
| `.btn-adicionar` | Botão verde, que chama atenção. No `:hover` ele escurece um pouco |
| `li` | Cada item vira um cartão branco com sombra |
| `.concluido span` | Texto riscado e mais apagado quando o item tá marcado |
| `.alerta` | Começa com `display: none` (escondido) e fica preso embaixo da tela com `position: fixed` |
| `.alerta.mostrar` | Quando o JS coloca essa classe, o alerta aparece |
| `@media (max-width: 480px)` | Em tela pequena, o botão desce pra baixo do campo |

Repara num truque que o projeto usa: o CSS já deixa as classes `concluido` e `mostrar` prontas. O JS não mexe em cor nenhuma, ele só coloca e tira classe. A aparência fica toda no CSS.

## script.js (o comportamento)

### Pegando os elementos

```js
const inputItem = document.getElementById("inputItem");
```

`getElementById` procura no HTML o elemento com aquele id e guarda numa variável. Daí pra frente a gente usa a variável pra mexer nele.

### criarItem(nome)

Monta um item da lista do zero. Ela cria um `<li>`, um checkbox, um `<span>` com o nome e um botão de lixeira. No final, `appendChild` encaixa cada peça dentro do `<li>` e o `<li>` dentro da `<ul>`.

Usei `textContent` pra colocar o nome, e não `innerHTML`. Se alguém digitar código no campo, ele aparece como texto e não é executado.

Dentro dela ficam dois eventos:

O do **checkbox** confere se ele tá marcado. Se tiver, coloca a classe `concluido`; se não, tira.

O da **lixeira** apaga o item com `li.remove()` e chama o alerta.

### adicionarItem()

1. Lê o que foi digitado com `inputItem.value`
2. O `.trim()` tira os espaços das pontas. Sem ele, dava pra adicionar um item só com espaço
3. Se ficou vazio, mostra a mensagem de erro e o `return` para a função ali
4. Se tem texto, chama `criarItem`, limpa o campo e apaga a mensagem de erro

### mostrarAlerta()

Coloca a classe `mostrar` no alerta. O `setTimeout` espera 3000 milissegundos (3 segundos) e tira a classe de novo. O X também fecha na hora.

### Eventos e lista inicial

O botão Adicionar chama `adicionarItem` no clique. Também coloquei um evento de teclado: se a tecla for Enter, adiciona.

O botão Voltar usa `history.back()`, que faz a mesma coisa que a setinha de voltar do navegador.

No fim, um `for` passa pelo array `itensIniciais` e cria cada item quando a página abre.

## Checklist

| # | Pedido | Onde tá |
|---|---|---|
| 1 a 5 | Título, Voltar, input, botão ao lado, lista | `index.html` |
| 6 | Itens iniciais | array `itensIniciais` no JS |
| 7 | Checkbox, nome e lixeira | função `criarItem` |
| 8 a 11 | Capturar, adicionar, limpar e bloquear vazio | função `adicionarItem` |
| 12 a 14 | Remover, alerta e sumir sozinho ou no X | lixeira + `mostrarAlerta` |
| 15 e 16 | Marcar e desmarcar | evento do checkbox + `.concluido` |
| 17 a 20 | Fundo claro, cartões, botão em destaque, alerta vermelho | `style.css` |
| 21 | Celular | `@media` |
| 22 a 27 | Testes | Testei no PC e na largura de celular. A lista carrega, adicionar, remover, marcar e desmarcar funcionam, e o console não mostrou erro |

## Pegadinhas

**Script no `<head>`:** o JS roda antes do HTML existir e o `getElementById` devolve `null`. Por isso ele fica no fim do body.

**Esquecer o `trim()`:** o usuário consegue adicionar um item que é só espaço em branco.

**Esquecer a meta viewport:** o `@media` não funciona direito no celular.

**Pra ir além:** se você remover dois itens bem rápido, o alerta some antes dos 3 segundos do segundo. Isso acontece porque o primeiro `setTimeout` continua rodando. Dá pra resolver com `clearTimeout`, que é um bom próximo passo pra estudar.
