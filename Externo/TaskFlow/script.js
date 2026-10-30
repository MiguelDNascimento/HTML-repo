let tarefas = []

const input = document.querySelector("#tarefa")
const botao = document.querySelector("#btnAdicionar")
const lista = document.querySelector("#lista")


botao.addEventListener("click", function(){
    let texto = input.value
    if (texto.trim() === "") {
    return;
}
    tarefas.push(texto);

    mostrarTarefas();
    
    input.value = "";
});



function mostrarTarefas() {
    lista.innerHTML = "";

    for (let i=0; i<tarefas.length; i++) {
        let item = document.createElement("li");

        item.textContent = tarefas[i];
        lista.appendChild(item);
    }
}
