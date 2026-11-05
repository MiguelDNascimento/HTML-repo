// Pegando os elementos do HTML pelo id
const inputItem = document.getElementById("inputItem");
const btnAdicionar = document.getElementById("btnAdicionar");
const lista = document.getElementById("lista");
const msgErro = document.getElementById("msgErro");
const alerta = document.getElementById("alerta");
const btnFecharAlerta = document.getElementById("btnFecharAlerta");
const btnVoltar = document.getElementById("btnVoltar");

// Itens que já começam na lista
const itensIniciais = ["Pão integral", "Café", "Suco de maracujá", "Biscoito de Maizena"];

// Cria um item (li) com checkbox, nome e botão de lixeira
function criarItem(nome) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const texto = document.createElement("span");
  texto.textContent = nome;

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "🗑️";
  btnRemover.className = "btn-remover";

  // Marcar e desmarcar como concluído
  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      li.classList.add("concluido");
    } else {
      li.classList.remove("concluido");
    }
  });

  // Remover o item
  btnRemover.addEventListener("click", function () {
    li.remove();
    mostrarAlerta();
  });

  li.appendChild(checkbox);
  li.appendChild(texto);
  li.appendChild(btnRemover);
  lista.appendChild(li);
}

// Adiciona o item digitado
function adicionarItem() {
  const nome = inputItem.value.trim();

  if (nome === "") {
    msgErro.textContent = "Digite o nome de um item!";
    return;
  }

  criarItem(nome);
  inputItem.value = "";
  msgErro.textContent = "";
}

// Mostra o alerta e esconde depois de 3 segundos
function mostrarAlerta() {
  alerta.classList.add("mostrar");

  setTimeout(function () {
    alerta.classList.remove("mostrar");
  }, 3000);
}

// Eventos dos botões
btnAdicionar.addEventListener("click", adicionarItem);

// Apertar Enter no campo também adiciona
inputItem.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarItem();
  }
});

btnFecharAlerta.addEventListener("click", function () {
  alerta.classList.remove("mostrar");
});

btnVoltar.addEventListener("click", function () {
  history.back();
});

// Coloca os itens iniciais na tela quando a página abre
for (let i = 0; i < itensIniciais.length; i++) {
  criarItem(itensIniciais[i]);
}
