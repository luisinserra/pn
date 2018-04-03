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
			putMemo('initi',1);
	    }
	};
	if (getMemo('initi') == 0){
		var pastaAtual=getPastaAtual();
		document.getElementById('tPasta').value=pastaAtual;
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
	alert("Pasta: "+pasta);

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
    	alert("Entradas: "+entradas);
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
    alert("sucesso lendo");
     var i;
     var objectType;
     var n=entries.length;
     alert("varrendo "+n+" entradas...");
     //var dump=JSON.stringify(entries);
     //alert(dump);
     document.getElementById('spanResposta').innerHTML='';
     var yInicial=240;
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
	        	var top=yInicial+(i*30);
	        	var nome=entries[i].name;
	        	var parte='<span id="spanLin'+i+'" style="padding: 5px;position:absolute;width:350px;height:30px;top:'+top+'px;left:0px;right:0px;margin:auto;"><a href="javascript:getPasta(\''+nome+'\');" class="z" style="font-size: 15px;">'+nome+'</a></span><br><br>';
	    		// conteudo+='<b>'+entries[i].name+'</b><br>';
	    		// conteudo+=entries[i].toURI()+"<br>";
	    		// conteudo+=objectType+'<br>';
	    		document.getElementById('spanResposta').innerHTML+=parte;
	    		var elemento=document.getElementById('spanLin'+i);
        		elemento.classList.add('cantinhos');
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
	window.open('config.html','_top');
}