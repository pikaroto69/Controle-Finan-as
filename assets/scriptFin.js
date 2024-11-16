const btnTransacao = document.getElementById("novaTransacaoBtn")
const descInput = document.getElementById("descricao")
const precoInput = document.getElementById("preco")
const listaTransacoes = document.getElementById("listaTransacoes").getElementsByTagName('tbody')[0]
const data = new Date().toLocaleDateString("pt-BR")
const btnEntrada = document.querySelector(".add")
const btnSaida = document.querySelector(".outflow")

const saldoTotalCard = document.getElementById("saldoTotal")
const saidasCard = document.getElementById("totalSaidas")
const entradasCard = document.getElementById("totalEntradas")

const modal = document.getElementById('modalNovaTransacao')
const closeBtn = document.getElementById('closeModal')

var saldoTotal = 0
var saida = 0
var entrada = 0


function atualizarSaldo() {
    saldoTotalCard.textContent = `R$ ${saldoTotal.toFixed(2).replace(".", ",")}`
    entradasCard.textContent = `R$ ${entrada.toFixed(2).replace(".", ",")}`
    saidasCard.textContent = `R$ ${saida.toFixed(2).replace(".", ",")}`
}


const adicionarTransacao = (tipoTransacao) => {
    const descValue = descInput.value
    const precoValue = parseFloat(precoInput.value)

    if (!descValue || isNaN(precoValue) || precoValue <= 0 || tipoTransacao === null) {
        alert("Preencha todos os campos corretamente e defina o tipo de transação!")
        return
    }

    const novaLinha = document.createElement("tr")
    if (tipoTransacao === "entrada"){
        novaLinha.innerHTML = `
        <td>${descValue}</td>            
        <td class="entrada" style="color:greenyellow">R$ ${precoValue.toFixed(2).replace(".", ",")}</td>
        <td>${data}</td>
        <td style="color:greenyellow">Entrada</td> 
    `
    }
    else{
        novaLinha.innerHTML = `
            <td>${descValue}</td>            
            <td class="saida" style="color:red">R$ ${precoValue.toFixed(2).replace(".", ",")}</td>
            <td>${data}</td>
            <td style="color:red">Saída</td>    
    `
    }


    listaTransacoes.appendChild(novaLinha)

    if (tipoTransacao === "entrada") {
        saldoTotal += precoValue
        entrada += precoValue
    } else if (tipoTransacao === "saida") {
        saldoTotal -= precoValue
        saida += precoValue
    }

    atualizarSaldo()

    descInput.value = ""
    precoInput.value = ""
    tipoTransacao = null
    modal.style.display = 'none'
}

btnTransacao.addEventListener('click', () => {
    modal.style.display = 'flex' 
})


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'  
})


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
})


const saveButton = document.getElementById("save")
saveButton.addEventListener("click", () => {
    if (btnEntrada.classList.contains('active')) {
        adicionarTransacao("entrada")
    } else if (btnSaida.classList.contains('active')) {
        adicionarTransacao("saida")
    } else {
        alert("Por favor, selecione o tipo de transação.")
    }


    modal.style.display = 'none' 
})

