var app = {
    // Application Constructor
    initialize: function() {
    	window.localStorage.setItem('processado',0);
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        window.localStorage.setItem('processado',1);

        console.log('Received Event: ' + id);
    }
};

function tstRead(){
	var textos="";
	return textos;
}
function initMenu(){
	try {
		app.initialize();
	} catch (e){}

	var conta=0;
	var inter = window.setInterval(function(){
		var pronto=0;
		try{
			pronto=window.localStorage.getItem('processado');
		} catch(e){}
		if (pronto == 1){
			window.clearInterval(inter);
			initApk();
		} else {
			if (conta > 2){
				window.clearInterval(inter);
				initApk();
			}
		}
		conta++;
	},1000);
}
function initApk(){
	document.getElementById('spanBotao').style.display='block';
	window.localStorage.setItem('msgErro','Erro abrindo database');
	try {
		db = window.openDatabase("DbPesqNotas", "1.0", "DbPesqNotas", 10);
	} catch (e){}
	db.transaction(getGravado, trataErro,OkPega);
}
function OkPega(){
	console.log("leu");
}
function getGravado(tx){
	window.localStorage.setItem('msgErro','Erro select do database');
	tx.executeSql('SELECT * FROM pesqnotas', [], okPego, trataErro);
	return false;
}
function okPego(tx, results){
	var n=results.rows.length;
	window.localStorage.setItem('temPasta','0');
	if (n > 0){
		var pasta=results.rows.item(0).pasta;
		console.log("Trouxe "+pasta);
		window.localStorage.setItem('temPasta','1');
		window.localStorage.setItem('pastaArquivo',pasta);
		console.log("Vai chamar textos...");
		getTextos();
	} else {
		alert("Não encontrei a pasta");
	}
	console.log("Varreu "+n);
	return false;
}
function getTextos(){
	console.log("Em textos...");
	window.localStorage.setItem('msgErro','Erro resolvendo o local do arquivo');
	console.log("Vai fazer o request nos arquivos...");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, OkPega, trataErro);
	var arquivo=window.localStorage.getItem('pastaArquivo');
	arquivo+='/manualBackup.json';
	var pasta='file://'+arquivo;
	// alert("Arquivo: "+pasta);
	console.log("AGora resolvendo...");
	window.resolveLocalFileSystemURI(pasta, resolvido, trataErro);
}
function resolvido(fileEntry){
	console.log(fileEntry.name);
	window.localStorage.setItem('msgErro','Erro ao chamar método file');
	console.log("Vai para gotFile...");
	fileEntry.file(gotFile, trataErro);
}
function gotFile(file){
	console.log("Definindo reader...");
	var reader = new FileReader();
	reader.onloadend = function(e){
		var lido=this.result;
		console.log(lido);
		window.localStorage.setItem('textos',lido);
	};
	// alert("Acionando reader...");
	reader.readAsText(file);
	// alert("Acionado");
}function goBuscaTermo(){
	var termo=document.getElementById('tParm').value;
	if (termo == ''){
		alert("Informe um parâmetro de pesquisa");
	} else {
		pesquisa(termo);
	}
}
function pesquisa(termos){
	document.getElementById('saida').innerHTML='';
	var resultado='';
	var termo=document.getElementById('tParm').value;
	// var textos=tstRead();
	var textos=window.localStorage.getItem('textos');
	textos=JSON.parse(textos);
	textos=textos.lists;
	for (var i = 0; i < textos.length; i++){
		var linhas=textos[i].rows;
		var pasta=textos[i].folder;
		var n=linhas.length;
		var inicio="";
        var descricao="";
        var primeira="";
        var linhasTexto=[];
        for (var j = 0; j < linhas.length; j++) {
        	var conteudo=linhas[j];
        	var textoNota=conteudo.text;
        	if (j == 0){
                inicio=textoNota;
            }
            if (j == 1){
                descricao=textoNota;
            }
            if (j == 2){
                primeira=textoNota;
            }
            linhasTexto[linhasTexto.length]=textoNota;
            var textoNotaGrande=textoNota.toUpperCase();
            var termoGrande=termo.toUpperCase();
            n=textoNotaGrande.indexOf(termoGrande);
            if (n >= 0){
            	var tracos="-------";
            	resultado+=tracos+'<br>';
            	resultado+=pasta+'<br>';
            	resultado+=inicio+'<br>';
            	resultado+=descricao+'<br>';
            	resultado+=primeira+'<br>';
            	resultado+='...<br>';
            	var k=linhasTexto.length;
            	if (k > 5){
            		var nota=linhasTexto[k-5];
            		resultado+=nota+'<br>';
            	}
            	if (k > 4){
            		var nota=linhasTexto[k-4];
            		resultado+=nota+'<br>';
            	}
            	if (k > 3){
            		var nota=linhasTexto[k-3];
            		resultado+=nota+'<br>';
            	}
            	if (k > 2){
            		var nota=linhasTexto[k-2];
            		resultado+=nota+'<br>';
            	}
            	if (k > 1){
            		var nota=linhasTexto[k-1];
            		//resultado+=nota+'<br>';
            	}
            	var aceso=textoNota.replace(termo,'<B>'+termo+'</B>');
            	resultado+=aceso+'<br>';
            	resultado+=tracos+'<br>';
            }
        }
	}

	var conteudo=document.getElementById('saida').innerHTML;
	conteudo+=resultado;
	document.getElementById('saida').innerHTML=conteudo;
}

function trataErro(erro){
	var msg="Erro lendo registros...";
	if (window.localStorage.getItem('msgErro') != null) {
		msg=window.localStorage.getItem('msgErro');
		window.localStorage.removeItem('msgErro');
	}
	alert(msg+' '+erro.code+":"+erro.message);
	return false;
}
function checaTextos(){
	var textos=window.localStorage.getItem('textos');
	alert(textos);
}