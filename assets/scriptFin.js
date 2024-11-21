const btnTransacao = document.getElementById("novaTransacaoBtn")
const descInput = document.getElementById("descricao")
const precoInput = document.getElementById("preco")
const listaTransacoes = document.getElementById("listaTransacoes").getElementsByTagName('tbody')[0]
const data = new Date().toLocaleDateString("pt-BR")
const btnEntrada = document.querySelector(".income")
const btnSaida = document.querySelector(".outflow")

const saldoTotalCard = document.getElementById("saldoTotal")
const saidasCard = document.getElementById("totalSaidas")
const entradasCard = document.getElementById("totalEntradas")

const modal = document.getElementById('modalNovaTransacao')
const closeBtn = document.getElementById('closeModal')

const modalEdit = document.getElementById('modalEditaTransacao')
const closeEdit = document.getElementById('closeModalEdita')

closeEdit.addEventListener('click', () => {
    modalEdit.style.display = 'none'  
})


var saldoTotal = 0
var saida = 0
var entrada = 0

function abrirModalEditar(id, desc, preco) {
    document.getElementById("id").value = id
    document.getElementById("descricao_edit").value = desc
    document.getElementById("preco_edit").value = preco
 
    // ABRE MODAL
    const modalEdit = document.getElementById('modalEditaTransacao')
    modalEdit.style.display = 'flex'


}


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
        <td class="entrada" style="color:#007C59">R$ ${precoValue.toFixed(2).replace(".", ",")}</td>
        <td style="color:#007C59">Entrada</td> 
        <td>${data}</td>
    `
    }
    else{
        novaLinha.innerHTML = `
            <td>${descValue}</td>            
            <td class="saida" style="color:#8D2C2C">R$ ${precoValue.toFixed(2).replace(".", ",")}</td>
            <td style="color:#8D2C2C">Saída</td>    
            <td>${data}</td>
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

