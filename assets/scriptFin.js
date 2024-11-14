const btnTransacao = document.getElementById("novaTransacaoBtn");
const descInput = document.getElementById("descricao");
const precoInput = document.getElementById("preco");
const listaTransacoes = document.getElementById("listaTransacoes").getElementsByTagName('tbody')[0]; 
const data = new Date().toLocaleDateString("pt-BR");
const btnEntrada = document.querySelector(".add");
const btnSaida = document.querySelector(".outflow");
const saldoTotalCard = document.getElementById("saldoTotal");

var saldoTotal = 0


function atualizarSaldo() {
    saldoTotalCard.textContent = `R$ ${saldoTotal.toFixed(2).replace(".", ",")}`;
}


const adicionarTransacao = (tipoTransacao) => {
    const descValue = descInput.value
    const precoValue = parseFloat(precoInput.value)
    
    if (!descValue || isNaN(precoValue) || precoValue <= 0 || tipoTransacao === null) {
        alert("Preencha todos os campos corretamente e defina o tipo de transação!");
        return; 
    }

    const novaLinha = document.createElement("tr");


    novaLinha.innerHTML = `
        <td>${descValue}</td>
        <td>R$ ${precoValue.toFixed(2).replace(".", ",")}</td>
        <td>${data}</td>
        <td class="${tipoTransacao}">${tipoTransacao === "entrada" ? "Entrada" : "Saída"}</td>
    `;


    listaTransacoes.appendChild(novaLinha);

    if (tipoTransacao === "entrada") {
        saldoTotal += precoValue
    } else if (tipoTransacao === "saida") {
        saldoTotal -= precoValue
    }


    atualizarSaldo();


    descInput.value = "";
    precoInput.value = "";
    tipoTransacao = null;
}


const saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => {
    
    if (btnEntrada.classList.contains('active')) {
        adicionarTransacao("entrada");
    } else if (btnSaida.classList.contains('active')) {
        adicionarTransacao("saida");
    } else {
        alert("Por favor, selecione o tipo de transação.");
    }
});


btnTransacao.addEventListener("click", () => {
    const modal = document.getElementById("modalNovaTransacao");
    modal.style.display = "block";
});


const fecharModal = document.getElementById("fecharModal");
fecharModal.addEventListener("click", () => {
    const modal = document.getElementById("modalNovaTransacao");
    modal.style.display = "none";
})
