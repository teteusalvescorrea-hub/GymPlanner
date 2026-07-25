// ======================================
// GYMPLANNER
// ======================================

// CAMPOS

const nome = document.getElementById("nome");
const idade = document.getElementById("idade");
const sexo = document.getElementById("sexo");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const nivel = document.getElementById("nivel");
const objetivo = document.getElementById("objetivo");

const btnGerar = document.getElementById("gerarPlano");

// RESULTADOS

const imcResultado = document.getElementById("imc");
const classificacaoResultado = document.getElementById("classificacao");
const caloriasResultado = document.getElementById("calorias");
const aguaResultado = document.getElementById("agua");
const proteinaResultado = document.getElementById("proteina");
const carboResultado = document.getElementById("carbo");
const gorduraResultado = document.getElementById("gordura");

const treinoContainer = document.getElementById("treinoContainer");
const alimentacaoContainer = document.getElementById("alimentacaoContainer");

// ======================================
// GERAR PLANO
// ======================================

btnGerar.addEventListener("click", gerarPlano);

function gerarPlano(){

    if(
        nome.value.trim()==="" ||
        idade.value==="" ||
        sexo.value==="" ||
        peso.value==="" ||
        altura.value===""

    ){

        alert("Preencha todos os campos.");

        return;

    }

    const pesoValor = Number(peso.value);

    const alturaValor = Number(altura.value);

    const idadeValor = Number(idade.value);

    // IMC

    const imc = pesoValor/(alturaValor*alturaValor);

    imcResultado.innerHTML = imc.toFixed(1);

    let classificacao="";

    if(imc<18.5){

        classificacao="Abaixo do peso";

    }

    else if(imc<25){

        classificacao="Peso ideal";

    }

    else if(imc<30){

        classificacao="Sobrepeso";

    }

    else if(imc<35){

        classificacao="Obesidade Grau I";

    }

    else if(imc<40){

        classificacao="Obesidade Grau II";

    }

    else{

        classificacao="Obesidade Grau III";

    }

    classificacaoResultado.innerHTML = classificacao;

    // TMB

    let tmb=0;

    if(sexo.value==="Masculino"){

        tmb=
        88.36+
        (13.4*pesoValor)+
        (4.8*(alturaValor*100))-
        (5.7*idadeValor);

    }

    else{

        tmb=
        447.6+
        (9.2*pesoValor)+
        (3.1*(alturaValor*100))-
        (4.3*idadeValor);

    }

    let fator=1.55;

    if(nivel.value==="Iniciante"){

        fator=1.40;

    }

    if(nivel.value==="Intermediário"){

        fator=1.55;

    }

    if(nivel.value==="Avançado"){

        fator=1.75;

    }

    let calorias=Math.round(tmb*fator);

    if(objetivo.value==="Hipertrofia"){

        calorias+=300;

    }

    if(objetivo.value==="Emagrecimento"){

        calorias-=400;

    }

    caloriasResultado.innerHTML=calorias+" kcal";

    // Água

    const agua=(pesoValor*35)/1000;

    aguaResultado.innerHTML=agua.toFixed(1)+" L";

    // Macronutrientes

    let proteina=pesoValor*2;

    let gordura=pesoValor*0.9;

    let carbo=(calorias-(proteina*4+gordura*9))/4;

    proteinaResultado.innerHTML=Math.round(proteina)+" g";

    gorduraResultado.innerHTML=Math.round(gordura)+" g";

    carboResultado.innerHTML=Math.round(carbo)+" g";

    gerarTreino();

    gerarAlimentacao(
        proteina,
        carbo,
        gordura
    );

    salvarDados();

}
// ======================================
// GERAÇÃO DO TREINO
// ======================================

function gerarTreino() {

    let treino = [];

    if (objetivo.value === "Hipertrofia") {

        treino = [
            {
                dia: "Segunda",
                exercicios: [
                    "Supino Reto",
                    "Supino Inclinado",
                    "Crucifixo",
                    "Tríceps Pulley"
                ]
            },
            {
                dia: "Terça",
                exercicios: [
                    "Puxada Frontal",
                    "Remada Curvada",
                    "Rosca Direta",
                    "Rosca Martelo"
                ]
            },
            {
                dia: "Quarta",
                exercicios: [
                    "Agachamento",
                    "Leg Press",
                    "Cadeira Extensora",
                    "Panturrilha"
                ]
            },
            {
                dia: "Quinta",
                exercicios: [
                    "Desenvolvimento",
                    "Elevação Lateral",
                    "Elevação Frontal",
                    "Encolhimento"
                ]
            },
            {
                dia: "Sexta",
                exercicios: [
                    "Levantamento Terra",
                    "Barra Fixa",
                    "Abdominal",
                    "Cardio 20 min"
                ]
            }
        ];

    } else if (objetivo.value === "Emagrecimento") {

        treino = [
            {
                dia: "Segunda",
                exercicios: [
                    "Caminhada 40 min",
                    "Abdominal",
                    "Prancha"
                ]
            },
            {
                dia: "Terça",
                exercicios: [
                    "Musculação Corpo Inteiro",
                    "Bike 20 min"
                ]
            },
            {
                dia: "Quarta",
                exercicios: [
                    "HIIT 25 min",
                    "Alongamento"
                ]
            },
            {
                dia: "Quinta",
                exercicios: [
                    "Treino Funcional",
                    "Abdominal"
                ]
            },
            {
                dia: "Sexta",
                exercicios: [
                    "Musculação",
                    "Escada 20 min"
                ]
            }
        ];

    } else {

        treino = [
            {
                dia: "Segunda",
                exercicios: [
                    "Cardio 30 min",
                    "Mobilidade"
                ]
            },
            {
                dia: "Terça",
                exercicios: [
                    "Treino Corpo Inteiro"
                ]
            },
            {
                dia: "Quarta",
                exercicios: [
                    "Bike",
                    "Alongamento"
                ]
            },
            {
                dia: "Quinta",
                exercicios: [
                    "Treino Corpo Inteiro"
                ]
            },
            {
                dia: "Sexta",
                exercicios: [
                    "Corrida Leve",
                    "Abdominal"
                ]
            }
        ];

    }

    treinoContainer.innerHTML = "";

    treino.forEach(item => {

        treinoContainer.innerHTML += `

        <div class="treino-card">

            <h3>${item.dia}</h3>

            <ul>

                ${item.exercicios.map(ex => `<li>✔ ${ex}</li>`).join("")}

            </ul>

        </div>

        `;

    });

}

// ======================================
// PLANO ALIMENTAR
// ======================================

function gerarAlimentacao(proteina, carbo, gordura) {

    alimentacaoContainer.innerHTML = `

        <div class="alimento-card">

            <h3>Café da Manhã</h3>

            <ul>
                <li>🥚 Ovos</li>
                <li>🍞 Pão Integral</li>
                <li>🍌 Banana</li>
            </ul>

        </div>

        <div class="alimento-card">

            <h3>Almoço</h3>

            <ul>
                <li>🍗 Frango</li>
                <li>🍚 Arroz</li>
                <li>🥗 Salada</li>
            </ul>

        </div>

        <div class="alimento-card">

            <h3>Jantar</h3>

            <ul>
                <li>🥩 Carne Magra</li>
                <li>🥔 Batata Doce</li>
                <li>🥦 Legumes</li>
            </ul>

        </div>

        <div class="alimento-card">

            <h3>Macronutrientes</h3>

            <ul>

                <li>Proteínas: ${Math.round(proteina)} g</li>

                <li>Carboidratos: ${Math.round(carbo)} g</li>

                <li>Gorduras: ${Math.round(gordura)} g</li>

            </ul>

        </div>

    `;

}
// ======================================
// LOCAL STORAGE
// ======================================

function salvarDados() {

    const dados = {

        nome: nome.value,
        idade: idade.value,
        sexo: sexo.value,
        peso: peso.value,
        altura: altura.value,
        nivel: nivel.value,
        objetivo: objetivo.value

    };

    localStorage.setItem("gymplanner", JSON.stringify(dados));

}

function carregarDados() {

    const dados = JSON.parse(localStorage.getItem("gymplanner"));

    if (!dados) return;

    nome.value = dados.nome;
    idade.value = dados.idade;
    sexo.value = dados.sexo;
    peso.value = dados.peso;
    altura.value = dados.altura;
    nivel.value = dados.nivel;
    objetivo.value = dados.objetivo;

}

// ======================================
// CHECKLIST SEMANAL
// ======================================

const dias = document.querySelectorAll(".dia");

const contador = document.getElementById("contadorTreinos");

dias.forEach(item => {

    item.addEventListener("change", atualizarChecklist);

});

function atualizarChecklist() {

    let total = 0;

    dias.forEach(item => {

        if (item.checked) {

            total++;

        }

    });

    contador.innerHTML = `${total} / 5`;

    const lista = [];

    dias.forEach(item => {

        lista.push(item.checked);

    });

    localStorage.setItem(
        "checklistGym",
        JSON.stringify(lista)
    );

}

function carregarChecklist() {

    const lista = JSON.parse(localStorage.getItem("checklistGym"));

    if (!lista) return;

    dias.forEach((item, index) => {

        item.checked = lista[index];

    });

    atualizarChecklist();

}

// ======================================
// DICAS FITNESS
// ======================================

const dicas = [

    "Durma entre 7 e 9 horas por noite.",

    "Beba água durante todo o dia.",

    "Priorize alimentos naturais.",

    "Treine com técnica antes de aumentar a carga.",

    "Mantenha constância nos treinos.",

    "Não pule o aquecimento.",

    "Consuma proteínas ao longo do dia.",

    "Alongue-se após os treinos."

];

const dicaTexto = document.getElementById("dicaTexto");

function mostrarDica() {

    const indice = Math.floor(Math.random() * dicas.length);

    dicaTexto.innerHTML = dicas[indice];

}

// ======================================
// BOTÃO COMEÇAR AGORA
// ======================================

document
.getElementById("btnComecar")
.addEventListener("click", () => {

    document
    .getElementById("formulario")
    .scrollIntoView({

        behavior: "smooth"

    });

});

// ======================================
// INICIALIZAÇÃO
// ======================================

carregarDados();

carregarChecklist();

mostrarDica();

if (
    localStorage.getItem("gymplanner")
) {

    gerarPlano();

}
