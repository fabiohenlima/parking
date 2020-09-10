document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo); //quando fomulario for submitido

function cadastrarVeiculo(e){ //esse paramentro (e) , que o dados do formulario passem para função
	//pegando valores da folha do html
	var cpf_cliente   = document.getElementById('CPF').value;
	var modeloVeiculo = document.getElementById('modeloVeiculo').value;
	var placaVeiculo  = document.getElementById('placaVeiculo').value;
	var horaEntrada   = new Date(); //class nativa de datas e horas
	
	//validações
	if(!cpf_cliente) {
		alert("Informe CPF do proprietário");
		return false;
	}
	if(!modeloVeiculo && !placaVeiculo){
		alert("Preencha todos os campos!");
		return false;
	} 
	
	//atribuindo a um array
	var veiculo = {
		cpf:cpf_cliente,
		modelo: modeloVeiculo,
		placa: placaVeiculo,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes()
	};

	//armazenado variaveis no Browser(navegador)
	if(localStorage.getItem('patio') === null){ //caso Local Storage esteja vazio
		var veiculos = []; //estaremos criando um array veiculostable
		veiculos.push(veiculo); //E estaremos empurrando outro array, em veiculos, sendo assim vai fica em um array associativo
		localStorage.setItem('patio', JSON.stringify(veiculos)); 
	} else {
		var veiculos = JSON.parse(localStorage.getItem('patio'));/// como veiculos estão em formato json no local Storage, vamos usar função JSON.parse
		veiculos.push(veiculo); // agora estaremos acresentado novos dados
		localStorage.setItem('patio', JSON.stringify(veiculos)); // agora estramos em inserindo no localStoragem
	}

	document.getElementById('formulario').reset(); //apos inclusão de dados, vamos reseta nosso formulario

	mostraPatio();

	e.preventDefault(); //prevenindo comportamento do formulario
}

function removeVeiculo(placa){
	
	var patio = JSON.parse(localStorage.getItem('patio'));
	console.log(patio);

	 for(var i = 0 ; i < patio.length; i++){
		if(patio[i].placa == placa){
			patio.splice(i, 1);
		}
	}

	localStorage.setItem('patio', JSON.stringify(patio));

	mostraPatio();
}


function mostraPatio(){ //essa função vai carrega junto com documento html
	var veiculos = JSON.parse(localStorage.getItem('patio'));
	var patioResultado = document.getElementById('resultados');

	patioResultado.innerHTML = '';

	for(var i = 0; i < veiculos.length; i++){

		var modelo = veiculos[i].modelo;
		var cpf_cliente = veiculos[i].cpf;
		var placa = veiculos[i].placa;
		var hora = veiculos[i].hora;
		var minutos = veiculos[i].minutos;

		 patioResultado.innerHTML += '<tr><td>'+ cpf_cliente + '</td>'+
		 								  '<td>'+ modelo + '</td>'+
		 							 	  '<td>'+ placa + '</td>' +
		 							 	  '<td>'+ hora + ':' + minutos + '</td>' +
		 							 	  '<td><button onclick="removeVeiculo(\''+ placa +'\')" class="btn btn-danger">Finalizar</button></td>'+
		 							 '</tr>';
	}
}
