function initConfig(){
	putMemo('initi',0);
	var app = {
	    // Application Constructor
	    initialize: function() {
	        this.bindEvents();
	    },
	    bindEvents: function() {
	        document.addEventListener('deviceready', this.onDeviceReady, false);
	    },
	    onDeviceReady: function() {
	        app.receivedEvent('deviceready');
	    },
	    receivedEvent: function(id) {
	        var parentElement = document.getElementById(id);
	        var listeningElement = parentElement.querySelector('.listening');
	        var receivedElement = parentElement.querySelector('.received');

	        listeningElement.setAttribute('style', 'display:none;');
	        receivedElement.setAttribute('style', 'display:block;');

	        console.log('Received Event: ' + id);
			var pastaAtual=getPastaAtual();
			document.getElementById('tPasta').value=pastaAtual;
			trazRegistro();
			putMemo('initi',1);
	    }
	};
	if (getMemo('initi') == 0){
		var pastaAtual=getPastaAtual();
		document.getElementById('tPasta').value=pastaAtual;
		trazRegistro();
	}
}
function getPastaAtual(){
	if (window.localStorage.getItem('parmPasta') == null){
		window.localStorage.setItem('parmPasta','/');
	}
	var pastaAtual=window.localStorage.getItem('parmPasta');
	return pastaAtual;
}
function goBuscaPasta() {
	var pastaAtual=document.getElementById('tPasta').value;
	var pasta='file://'+pastaAtual;
	//alert("Pasta: "+pasta);

	try {
		window.requestFileSystem(LocalFileSystem.PERSISTENT,0,  onFileSystemSuccess, onErrorRead);
		//window.requestFileSystem(PERSISTENT,0,  onFileSystemSuccess, onErrorRead);
		//alert("Passou passo 1");
		window.resolveLocalFileSystemURI(pasta, onResolveSuccess, fail);
		//alert("Passou passo 2");
	}  catch(e){
		alert("Erro: "+e.message);
	}

	function onResolveSuccess(fileEntry) {
		//alert("resolvido.");
        console.log(fileEntry.name);
        var reader = fileEntry.createReader();
        reader.readEntries(okLeu, naoLeu);
    }
    function naoLeu(erro){
    	alert("Errou leitura, "+erro.code+", "+erro.message);
    }
    function okLeu(entradas){
    	//alert("Entradas: "+entradas);
    	successRead(entradas);
    }

    function fail(evt) {
    	alert("Falhou");
        console.log(evt.target.error.code);
        alert(evt.target.error.code+' '+evt.target.error.message);
    }
	
/*
	try {
		new ExternalStorageSdcardAccess( fileHandler ).scanPath( "pasta" );
	} catch(e){
		alert("Erro: "+e.message);
	}
    function fileHandler( fileEntry ) {
        alert( fileEntry.name + " | " + fileEntry.toURL() );
        document.getElementById('spanResposta').append(fileEntry.name+'<br>');
    }
*/    
}
function onFileSystemSuccess(fs) {
    //alert("Sucesso");
    var pathInicial=fs.root.fullPath;
    //alert("Entrando com "+pathInicial+"...");
    fs.root.fullPath = document.getElementById('tPasta').value;
    //alert("mudou o path...");
    var dirReader = fs.root.createReader();
    //alert("reader criado para ler de "+fs.root.fullPath+"...");
    dirReader.readEntries(successRead,onErrorRead);
}
function successRead(entries){ 
    //alert("sucesso lendo");
     var i;
     var objectType;
     var n=entries.length;
     //alert("varrendo "+n+" entradas...");
     //var dump=JSON.stringify(entries);
     //alert(dump);
     document.getElementById('spanResposta').innerHTML='';
     var yInicial=240;
     var conta=0;
     for (i=0; i < entries.length; i++) {
        if(entries[i].isDirectory == true) {
            //alert('Pasta');
            objectType = 'Directory';
        } else {
            //alert("arquivo");
            objectType = 'File';
            //alert(entries[i].name);
        }
        try{
        	//document.getElementById('spanResposta').append('<h3>' + entries[i].name + '</h3><p>' + entries[i].toURI() + '</p><p class="ui-li-aside">Type:<strong>' + objectType + '</strong></p><br>');
        	var conteudo=document.getElementById('spanResposta').innerHTML;
        	if (objectType == 'Directory'){
	        	if (conteudo != ''){
	        		conteudo+='<br><br>';
	        	}
	        	var top=yInicial+(conta*30);
	        	var nome=entries[i].name;
	        	var parte='<span id="spanLin'+i+'" style="padding: 5px;position:absolute;width:350px;height:30px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:getPasta(\''+nome+'\');" class="z" style="font-size: 15px;">'+nome+'</a></span><br><br>';
	    		// conteudo+='<b>'+entries[i].name+'</b><br>';
	    		// conteudo+=entries[i].toURI()+"<br>";
	    		// conteudo+=objectType+'<br>';
	    		document.getElementById('spanResposta').innerHTML+=parte;
	    		var elemento=document.getElementById('spanLin'+i);
        		elemento.classList.add('cantinhos');
        		conta+=1;
        	}
        } catch(e){
        	alert("Erro apendando. "+e.message);
        }
    }
    //document.getElementById('spanResposta').listview("refresh");
}

function onErrorRead2(error) {
    alert("Failed to list directory contents: " + error.code+","+error.message);
}

function pastaSucesso(entry){
	alert("Iniciando o scan...");
	if (entry.isFile) {
		alert("Achei um arquivo...");
            //fileHandler( entry );
            var nome=entry.name;
            var msg="arquivo "+nome;
        } else {
        	alert("Achei uma pasta...");
        	var nome=entry.name;
        	var msg="pasta "+nome;
        }
        var resultado=document.getElementById('spanResposta').innerHTML;
        alert("já pegou um resultado...");
        if (resultado != ''){
        	resultado+='<br>';
        }
        resultado+=msg;
        document.getElementById('spanResposta').innerHTML=resultado;
}
function pastaErro(erro){
	alert("Erro acessando arquivos: "+erro.code+","+erro.message)
}






function startaLeitura(){
    //alert("vou ler...");
     //window.requestFileSystem(LocalFileSystem.PERSISTENT,0,  onFileSystemSuccess, onErrorRead);

     var entries=[];
     var cart={"name":"primeira"};
     cart.isDirectory=true;
     entries[0]=cart;
     cart={"name":"segunda"};
     cart.isDirectory=true;
     entries[1]=cart;
     cart={"name":"terceira"};
     cart.isDirectory=true;
     entries[2]=cart;
     cart={"name":"quarta"};
     cart.isDirectory=false;
     entries[3]=cart;
     successRead(entries);
}

function onFileSystemSuccess2(fs) {
    alert("Sucesso");
    var pathInicial=fs.root.fullPath;
    alert("Entrando com "+pathInicial+"...");
    fs.root.fullPath = '/mnt/sdcard';
    alert("mudou o path...");
    var dirReader = fs.root.createReader();
    alert("reader criado para ler de "+fs.root.fullPath+"...");
    dirReader.readEntries(successRead,onErrorRead);
}

function successRead2(entries){
    alert("sucesso lendo");
     var i;
     var objectType;
     var n=entries.length;
     alert("varrendo "+n+"...");
     for (i=0; i < entries.length; i++) {
        if(entries[i].isDirectory == true) {
            objectType = 'Directory';
        } else {
            objectType = 'File';
            alert("arquivo");
            alert(entries[i].name);
        }
        $('#dirList').append('<li><h3>' + entries[i].name + '</h3><p>' + entries[i].toURI() + '</p><p class="ui-li-aside">Type:<strong>' + objectType + '</strong></p></li>');
    }
    $('#dirList').listview("refresh");
}

function onErrorRead(error) {
    alert("Failed to list directory contents: " + error.code+","+error.message);
}
function getPasta(pasta){
	var anterior=document.getElementById('tPasta').value;
	window.localStorage.setItem('parmPasta',anterior+'/'+pasta);
	window.open('config.html');
}
function goPastaDefinida(){
	db = window.openDatabase("DbPesqNotas", "1.0", "DbPesqNotas", 10);
	db.transaction(setDB, erroOpen, sucesso);
}
function setDB(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS pesqnotas (id integer primary key, pasta text)');
}
function erroOpen(erro){
	alert("Erro set database..."+erro.code+":"+erro.message);
}
function sucesso(){
	checaLogin();
}
function nova(parm){
	console.log("estou em nova...");
}
function checaLogin(){
    db.transaction(getRegistro, errorCheca,nova);
}
function errorCheca(erro){
	alert("Erro lendo registros..."+erro.code+":"+erro.message);
}
function getRegistro(tx){
	tx.executeSql('SELECT * FROM pesqnotas', [], dbSucesso, dbErro);
}
function dbErro(erro){
	alert("Erro de erro..."+erro.code+":"+erro.message)
}
function dbSucesso(tx, results){
	var n=results.rows.length;
	var mensagem ="Temos "+n+" registros, saltar login...";
	if (n == 0){
		db.transaction(salvarPasta, erroPasta, successoPasta);
	} else {
		db.transaction(alterarPasta, erroPasta, successoPasta);
	}
}
function successoPasta(){
	alert("Sucesso pasta");
}
function erroPasta(erro){
	alert("Erro ..."+erro.code+":"+erro.message);
}
function nullHandler(){
	alert("Erro de null handler");
}
function errorHandler(){
	alert("Erro de error handler");
}
function salvarPasta(tx){
	var pasta=document.getElementById('tPasta').value;
	tx.executeSql('DROP TABLE IF EXISTS pesqnotas');
	tx.executeSql('CREATE TABLE IF NOT EXISTS pesqnotas (id unique, pasta TEXT)');
	tx.executeSql('INSERT INTO pesqnotas(id, pasta) VALUES (?,?)',[1,pasta],nullHandler,errorHandler);
	alert("Sistema salvo");
	return false;
}
function alterarPasta(tx){
	console.log("Pondo na pasta...");
	var pasta=document.getElementById('tPasta').value; 
	console.log("pondo em pasta "+pasta+"...");
	tx.executeSql('UPDATE pesqnotas set pasta=?',[pasta],deuCerto,deuRuim);
	return false;
}
function deuCerto(tx){
	console.log("Deu certo");
}
function deuRuim(erro){
	console.log("Erro deu Ruim..."+erro.code+":"+erro.message);
}

function trazRegistro(){
	try {
		db = window.openDatabase("DbPesqNotas", "1.0", "DbPesqNotas", 10);
	} catch (e){}
	db.transaction(getGravado, erroPega,OkPega);
}
function erroPega(erro){
	console.log("Erro lendo registros..."+erro.code+":"+erro.message);
}
function OkPega(){
	console.log("leu");
}
function getGravado(tx){
	tx.executeSql('SELECT * FROM pesqnotas', [], okPego, erroPego);
}
function erroPego(erro){
	var msg="Erro lendo registros...";
	if (window.localStorage.getItem('msgErro') != null) {
		msg=window.localStorage.getItem('msgErro');
		window.localStorage.removeItem('msgErro');
	}
	console.log(msg+' '+erro.code+":"+erro.message);
}
function okPego(tx, results){
	var n=results.rows.length;
	if (n > 0){
		var pasta=results.rows.item(0).pasta;
		console.log("Trouxe "+pasta);
		document.getElementById('tPasta').value=pasta;
	}
	console.log("Varreu "+n);
}

function abrindoArquivo(){
	window.localStorage.setItem('msgErro','Erro gerado por função abrindoArquivo');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, pegouUm, erroPego);
    //window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/index.html", gotFile, fail);
}
function pegouUm(fileSystem){
	window.localStorage.setItem('msgErro','Erro gerado por função pegouUm');
	var arquivo=document.getElementById('tPasta').value;
	var pasta=arquivo;
	arquivo+='/manualBackup.json';
	alert("Arquivo: "+arquivo);
	//fileSystem.root.getFile(arquivo, {create: false}, aberto, erroPego);
	try{
		window.resolveLocalFileSystemURI(pasta, gotFile, erroPego);
		alert("Resolveu.");
	} catch (e){
		alert(e.message);
	}
	alert("Deve chamar o gotFile...");
}
function aberto(fileEntry){
	window.localStorage.setItem('msgErro','Erro gerado por função aberto');
	alert("Passou abertura passo 1");
	//var reader = fileEntry.createReader();
	//alert("Criou reader para pasta.");
	var arquivo=document.getElementById('tPasta').value;
	arquivo+='/manualBackup.json';
	try {
		var reader = arquivo.createReader();
		alert("Agora reader para arquivo");
		fileEntry.file(gotFile, erroPego);
	} catch (e){
		alert(e.message);
	}
}
function gotFile(file){
	alert("Definido reader...");
	var reader = new FileReader();
	reader.onloadend = function(e){
		alert("onloadend...");
		var lido=this.result;
		alert("Leu o resultado");
		alert(lido);
	};
	alert("Acionando reader...");
	reader.readAsText(file);
	alert("Acionado");
}