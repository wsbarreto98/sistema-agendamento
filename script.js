let nomes = JSON.parse(localStorage.getItem("nomes")) || []

function adicionar() {

  let nome = document.getElementById("nome").value

  let dataOriginal = document.getElementById("data").value

  let partes = dataOriginal.split("-")

  let data = partes[2] + "/" + partes[1] + "/" + partes[0]

  let servico = document.getElementById("servico").value

  let hora = document.getElementById("hora").value

  let valor = document.getElementById("valor").value

  if (nome === "") {
    alert("Digite um nome")
    return
  }

  for (let i = 0; i < nomes.length; i++) {

    if (
      nomes[i].data === data &&
      nomes[i].hora === hora
    ) {

      alert("Já existe agendamento nesse horário")

      return
    }
  }

  nomes.push({
    nome: nome,
    data: data,
    hora: hora,
    servico: servico,
    valor: valor,
status: "Agendado"
  })

  localStorage.setItem("nomes", JSON.stringify(nomes))

  atualizarLista()

  limparCampos()
}

function remover(indice) {

  nomes.splice(indice, 1)

  localStorage.setItem("nomes", JSON.stringify(nomes))

  atualizarLista()
}

function editar(indice) {

  let novoNome = prompt(
    "Novo nome:",
    nomes[indice].nome
  )

  let novaData = prompt(
    "Nova data:",
    nomes[indice].data
  )

  let novaHora = prompt(
    "Nova hora:",
    nomes[indice].hora
  )

  let novoServico = prompt(
    "Novo serviço:",
    nomes[indice].servico
  )

  let novoValor = prompt(
    "Novo valor:",
    nomes[indice].valor
  )

  nomes[indice] = {
    nome: novoNome,
    data: novaData,
    hora: novaHora,
    servico: novoServico,
    valor: novoValor,
    status: nomes[indice].status 
  }

  localStorage.setItem(
    "nomes",
    JSON.stringify(nomes)
  )

  atualizarLista()
}

function limparCampos() {

  document.getElementById("nome").value = ""

  document.getElementById("servico").value = ""

  document.getElementById("valor").value = ""

  document.getElementById("hora").value = ""

  document.getElementById("data").value = ""
}
function concluir(indice) {

  nomes[indice].status = "Concluído"

  localStorage.setItem(
    "nomes",
    JSON.stringify(nomes)
  )

  atualizarLista()
}
function atualizarLista() {
  nomes.sort((a, b) => {

  let dataA =
    a.data.split("/").reverse().join("-") +
    "T" +
    a.hora

  let dataB =
    b.data.split("/").reverse().join("-") +
    "T" +
    b.hora

  return new Date(dataA) - new Date(dataB)
})

  let pesquisa =
    document.getElementById("pesquisa")
    .value
    .toLowerCase()

  let lista = document.getElementById("lista")

  lista.innerHTML = ""

  let soma = 0
  let concluidos = nomes.filter(
  item => item.status === "Concluído"
) 
let totalConcluido = 0

for (let i = 0; i < concluidos.length; i++) {

  totalConcluido +=
    Number(concluidos[i].valor)
}

  for (let i = 0; i < nomes.length; i++) {

    soma += Number(nomes[i].valor)

    if (
      !nomes[i].nome
      .toLowerCase()
      .includes(pesquisa)
    ) {
      continue
    }

    lista.innerHTML +=
`
<li class="${nomes[i].status}">

<b>Nome:</b> ${nomes[i].nome}<br>

<b>Data:</b> ${nomes[i].data}<br>

<b>Hora:</b> ${nomes[i].hora}<br>

<b>Serviço:</b> ${nomes[i].servico}<br>

<b>Valor:</b> R$ ${nomes[i].valor}
<br>

<b>Status:</b> ${nomes[i].status}

<br><br>

<button onclick='editar(${i})'>✏️</button>

<button onclick='remover(${i})'>❌</button>
<button onclick='concluir(${i})'>✅</button>
</li>
`
  }

 document.getElementById("total").innerHTML =
    "Total: R$ " + soma

document.getElementById("concluido").innerHTML =
    "Concluído: R$ " + totalConcluido
}

document.getElementById("pesquisa")
.addEventListener("input", atualizarLista)

atualizarLista()