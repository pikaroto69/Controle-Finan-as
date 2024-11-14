document.getElementById('novaTransacaoBtn').addEventListener('click', function () {
    document.getElementById('modalNovaTransacao').style.display = 'flex';
});

document.getElementById('fecharModal').addEventListener('click', function () {
    document.getElementById('modalNovaTransacao').style.display = 'none';
});

document.getElementById('fecharModalEditar').addEventListener('click', function () {
    document.getElementById('modalEditarTransacao').style.display = 'none';
});

let transacaoAtual = null;

function adicionarTransacao(tipo) {
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;
    const data = new Date().toLocaleDateString('pt-BR');

    if (!descricao || !preco || isNaN(preco)) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    const tabela = document.querySelector('#listaTransacoes tbody');
    const linha = document.createElement('tr');
    linha.classList.add(tipo);
    linha.innerHTML = `
        <td>${descricao}</td>
        <td>${tipo === 'entrada' ? 'R$ ' + preco.toFixed(2) : '-R$ ' + preco.toFixed(2)}</td>
        <td>${categoria}</td>
        <td>${data}</td>
    `;
    linha.onclick = () => abrirModalEdicao(linha);
    tabela.appendChild(linha);

    atualizarTotais(preco, tipo);
    document.getElementById('modalNovaTransacao').style.display = 'none';
    limparCampos();
}

function abrirModalEdicao(linha) {
    transacaoAtual = linha;

    const descricao = linha.children[0].textContent;
    const preco = parseFloat(linha.children[1].textContent.replace('R$', '').replace('-', '').trim());
    const categoria = linha.children[2].textContent;

    document.getElementById('editarDescricao').value = descricao;
    document.getElementById('editarPreco').value = preco;
    document.getElementById('editarCategoria').value = categoria;

    document.getElementById('modalEditarTransacao').style.display = 'flex';
}

document.getElementById('salvarEdicao').addEventListener('click', function () {
    const novaDescricao = document.getElementById('editarDescricao').value;
    const novoPreco = parseFloat(document.getElementById('editarPreco').value);
    const novaCategoria = document.getElementById('editarCategoria').value;

    if (!novaDescricao || !novoPreco || isNaN(novoPreco)) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    const tipo = transacaoAtual.classList.contains('entrada') ? 'entrada' : 'saida';
    const precoAntigo = parseFloat(transacaoAtual.children[1].textContent.replace('R$', '').replace('-', '').trim());

    transacaoAtual.children[0].textContent = novaDescricao;
    transacaoAtual.children[1].textContent = tipo === 'entrada' ? `R$ ${novoPreco.toFixed(2)}` : `-R$ ${novoPreco.toFixed(2)}`;
    transacaoAtual.children[2].textContent = novaCategoria;

    atualizarTotais(novoPreco - precoAntigo, tipo);
    document.getElementById('modalEditarTransacao').style.display = 'none';
});

document.getElementById('deletarTransacao').addEventListener('click', function () {
    const tipo = transacaoAtual.classList.contains('entrada') ? 'entrada' : 'saida';
    const preco = parseFloat(transacaoAtual.children[1].textContent.replace('R$', '').replace('-', '').trim());

    atualizarTotais(-preco, tipo);
    transacaoAtual.remove();
    document.getElementById('modalEditarTransacao').style.display = 'none';
});

function atualizarTotais(preco, tipo) {
    const totalEntradasEl = document.getElementById('totalEntradas');
    const totalSaidasEl = document.getElementById('totalSaidas');
    const saldoTotalEl = document.getElementById('saldoTotal');

    let totalEntradas = parseFloat(totalEntradasEl.textContent.replace('R$', '').replace(',', '.')) || 0;
    let totalSaidas = parseFloat(totalSaidasEl.textContent.replace('R$', '').replace(',', '.')) || 0;

    if (tipo === 'entrada') {
        totalEntradas += preco;
    } else {
        totalSaidas += preco;
    }

    const saldoTotal = totalEntradas - totalSaidas;

    totalEntradasEl.textContent = `R$ ${totalEntradas.toFixed(2)}`;
    totalSaidasEl.textContent = `R$ ${totalSaidas.toFixed(2)}`;
    saldoTotalEl.textContent = `R$ ${saldoTotal.toFixed(2)}`;
}

function limparCampos() {
    document.getElementById('descricao').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('categoria').value = '';
}
