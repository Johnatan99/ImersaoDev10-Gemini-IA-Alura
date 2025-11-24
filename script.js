// Palavra chave da primeira aula: "Aprender"
// Palavra da segunda aula: "na Alura"
//Palavra chave 3 aula: com IA
//Palavra 4: Google

//Adicionar outra base de conhecimento.
//Adicionar algo com foto na lateral
//Deixar arquivos de fotos em outra pasta
//Melhorar cores
//Fazer sobre séries que gosto
let cardContainer = document.querySelector(".card-container")
let campoBusca = document.querySelector("header input"); // Adicionado para capturar o input de busca
let dados = []; // Lista vazia

async function iniciarBusca(){
    let d;
    if(dados.length === 0){
        try{
            let response = await fetch('../data.json');
            dados = await response.json();
        }catch(error){
            console.error("Falha ao buscar dados: ", error);
            return;
        }
    }
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    // if(dadosFiltrados.length === 1){ 
    renderizarCards(dadosFiltrados);
    console.log(dadosFiltrados.length); 
    // }else{
    //     return;
    //     console.log(dadosFiltrados.length);  
    // }   
}
   


async function renderizarCards(dados){
        cardContainer.innerHTML = ""; // Limpa o container antes de renderizar novos cards
    for (let dado of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <p>Tags: ${dado.tags.join(", ")}</p>
            <a href="${dado.link}" target="_blank">Saiba mais...</a>
        `
        cardContainer.appendChild(article)
    }
}

iniciarBusca(); // Chama a função para carregar os dados iniciais