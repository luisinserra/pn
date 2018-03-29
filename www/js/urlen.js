var urVetor=new urSetGet('');
var Y1=0;
var X1=0;
function URLEncode (clearString) {
  var output = "";
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != "") {
    	output += match[1];
      x += match[1].length;
    } else {
      if (clearString[x] == " ")
        output += "+";
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += "%" + ( hexVal.length < 2 ? "0" : "" ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}
function URLDecode(parm)
{
   var HEXCHARS = "0123456789ABCDEFabcdef";
   var encoded = parm;
   var plaintext = "";
   var i = 0;
   while (i < encoded.length) {
       var ch = encoded.charAt(i);
	   if (ch == "+") {
	       plaintext += " ";
		   i++;
	   } else if (ch == "%") {
			if (i < (encoded.length-2)
					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1
					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape( encoded.substr(i,3) );
				i += 3;
			} else {
				alert( "Bad escape combination near ..." + encoded.substr(i) );
				plaintext += "%[ERROR]";
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	} // while
   return plaintext;
}

function getIdxCombo(codigo, elemento)
{
	var n=elemento.length;
	var retorno=0;
	for (var i=0; i< n; i++)
	{
		if (elemento.options[i].value == codigo)
		{
			retorno=i;
		}
	}
	return retorno;
}
function Marcar(parm)
{
	document.getElementById("teste").innerHTML=parm;
}
function resetChoose()
{
	try
	{
		document.getElementById("janelaChoose").style.visibility='hidden';
		document.FormChoose.visao.value='h';
		document.FormChoose.ativa.value="-1";
		document.FormChoose.trt13.value='t';
	}
	catch(ex){}
}
function foraNeblina()
{
	try
	{
		document.getElementById("Neblina").style.visibility="hidden";
	}
	catch(ex)
	{
		return;
	}
}
function putNeblina()
{
 	len=screen.width;
	hei=screen.height;
	var topo='150px';
	document.getElementById("Neblina").style.left = '0px';;
	document.getElementById("Neblina").style.top = '150px';
	document.getElementById("Neblina").style.width = len+'px';
	document.getElementById("Neblina").style.height = hei+'px';
	document.getElementById("Neblina").style.visibility="visible";
	document.getElementById("Neblina").style.opacity = 0.6;
	document.getElementById("Neblina").style.filter = "alpha(opacity=60)";
}
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}
function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
function click(e)
{
	var teste=document.FormVai.hListaCtt.value;
	if (teste == '0') return true;
	if (navigator.appName == 'Netscape' && e.which == 3)
	{
		popMemCtt();
		
		return true;
	}
	else
	{
		if (navigator.appName == 'Microsoft Internet Explorer' && event.button==2)
		{
			popMemCtt();
		
			return true;
		}
	}
	return true;
}
function estaIstoNaquilo(isto,aquilo)
{
	var retorno=false;
	for (var i=0; i< aquilo.length; i++)
	{
		if (aquilo[i] == isto)
		{
			retorno=true;
		}
	}
	return retorno;
}
function registraParm(nome,parm)
{
	var now = new Date();
	now.setTime(now.getTime() + (2*60*1000));
	var expires = "; expires="+now.toGMTString();
	document.cookie = nome+"="+parm+expires+"; path=/";
}
function tomarParm(nome)
{
	var retorno='';
	var biscs = document.cookie.split(';');
	for(var i=0;i < biscs.length;i++)
	{
		var este = biscs[i];
		while (este.charAt(0)==' ') este = este.substring(1,este.length);
		if (este.indexOf(nome) == 0)
		{
			retorno=este.substring(nome.length+1,este.length);
		}
	}
	return retorno;
}
function mostraParm(parm)
{
	var retorno=tomarParm(parm);
	alert(retorno);
}
function eraseParm(parm)
{
	var date = new Date();
	date.setTime(date.getTime()+(-1*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = parm+"="+expires+"; path=/";
}
function urNada()
{
}
function acrescenta(codigo,elemento)
{
	var abertos=elemento.value;
	var lista=abertos.split("\|");
	if (estaIstoNaquilo(codigo,lista))
	{
		return;
	}
	if (abertos != '')
	{
		abertos+='|';
	}
	abertos+=codigo;
	elemento.value=abertos;
}
function remove(codigo,elemento)
{
	var abertos=elemento.value;
	var lista=abertos.split("\|");
	if (!estaIstoNaquilo(codigo,lista))
	{
		return;
	}
	var listaLimpa=limpaLista(lista,codigo);
	elemento.value=listaLimpa;
}
function limpaLista(lista,parm)
{
	var limpo='';
	for (var i=0; i< lista.length; i++)
	{
		if (lista[i] != parm)
		{
			if (limpo != '')
			{
				limpo+='|';
			}
			limpo+=lista[i];
		}
	}
	return limpo;
}
function adCok(codigo,nomeCok)
{
	var trecho=tomarParm(nomeCok);
	var lista=trecho.split("\|");
	if (estaIstoNaquilo(codigo,lista))
	{
		return;
	}
	if (trecho != '')
	{
		trecho+='|';
	}
	trecho+=codigo;
	registraParm(nomeCok,trecho);
}
function remCok(codigo,nomeCok)
{
	var trecho=tomarParm(nomeCok);
	var lista=trecho.split("\|");
	if (!estaIstoNaquilo(codigo,lista))
	{
		return;
	}
	var listaLimpa=limpaLista(lista,codigo);
	registraParm(nomeCok,listaLimpa);
}
function getValoresParmElemento(parm,elemento)
{
	var retorno=new Array();
	var tomo=document.getElementById(elemento).innerHTML;
	var termos=tomo.split(parm);
	var n=termos.length;
	for (var i=1; i< n; i++)
	{
		var trecho=termos[i];
		var partes=trecho.split(' ');
		var codigo=partes[0];
		codigo=codigo.replace('"','');
		retorno.push(codigo);
	}
	return retorno;
}
function trocaVigulaPonto(parm)
{
    var n=parm.indexOf(',');
    while (n >= 0)
    {
        parm=parm.substring(0, n)+'.'+parm.substring(n+1, parm.length);
        n=parm.indexOf(',');
    }
    return parm;
}
function removePonto(parm)
{
    var n=parm.indexOf('.');
    while (n >= 0)
    {
        parm=parm.substring(0, n)+parm.substring(n+1, parm.length);
        n=parm.indexOf('.');
    }
    return parm;
}
function correnciaParaFloat(parm)
{
	parm=removePonto(parm);
	parm=trocaVigulaPonto(parm);
	parm=parm.replace('R$', '');
	parm=parm.replace(' ', '');
	return parm;
}
function aguarda(msecs)
{
	var start = new Date().getTime();
	var cur = start;
	while(cur - start < msecs)
	{
		cur = new Date().getTime();
	}	
} 
function putVetor(vetorP,chave,valor)
{
	var vetor=vetorP;
	if (vetor == undefined) vetor='';
	if (vetor == '')
	{
		var comando='vetor={'+chave+':valor};';
		eval(comando);
	}
	else
	{
		vetor[chave]=valor;
	}
	return vetor;
}
function remVetor2(vetorP,chave)
{
	var vetor=vetorP;
	if (vetor == '') return vetor;
	var contComando="";
	for (key in vetor)
	{
		if (key != chave)
		{
			if (contComando != '') contComando+=', ';
			var contente=vetor[key];
			try
			{
				contente=contente.replaceAll("'","\'");
			}
			catch(ex) {}
			contComando+="'"+key+"'"+':'+"'"+contente+"'";
		}
	}
	if (contComando == '')
	{
		vetor='';
	}
	else
	{
		//contComando=contComando.replaceAll("'","\'");
		var comando='vetor={'+contComando+'};';
		eval(comando);
	}
	return vetor;
}
function remVetor(vetorP,chave)
{
	var vetor=vetorP;
	delete vetor[chave];
	return vetor;
}
function urSetGet(val)
{
	var valor=val;
	
	this.getValue =function()
	{
		return valor;
	}
	
	this.setValue = function(val)
	{
		valor=val;
	}
}
function funcsFloat(parm)
{
	var visivel='';
	var cabecalho='';
	var msgStBar='';
	var largo='300';
	var top=10;
	var conteudo='';
	var lef='';
	var cmd='var vetor='+parm+'.getValue();';
	eval(cmd);
	
	this.setVisivel = function(v)
	{
		var como='hidden';
		if (v == 1) como='visible';
		vetor=putVetor(vetor,'visivel',como);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setColocaLinkFecha = function(valor)
	{
		var cl=1;
		if (valor == '0') cl=0;
		vetor=putVetor(vetor,'colocaLink',cl);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setCabecalho = function(valor)
	{
		vetor=putVetor(vetor,'cabecalho',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setMsgStBar = function(rodap)
	{
		vetor=putVetor(vetor,'msgStBar',rodap);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setLargura = function(largo)
	{
		vetor=putVetor(vetor,'largo',largo);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setLeft=function(valor)
	{
		vetor=putVetor(vetor,'lef',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setTop = function(valor)
	{
		vetor=putVetor(vetor,'top',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setOutrosLinks = function(valor)
	{
		vetor=putVetor(vetor,'outrosLinks',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setConteudo = function(valor)
	{
		vetor=putVetor(vetor,'conteudo',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.show = function(dive)
	{
		var retorno=getJanelaPop(vetor);
		document.getElementById(dive).innerHTML=retorno;
		document.getElementById(dive).style.visibility='visible';
		var largo=vetor['largo'];
	 	var len=screen.width;
		var posX=(len-largo)/2;
		var lef=vetor['lef'];
		if (lef != '') 
		{
			if (lef != undefined)
			{
				posX=lef;
			}
		}
		var teste=0;
		try
		{
			teste=document.FormVai.hIpod.value;
		} catch(ex){}
		if (teste == '1')
		{
			posX=10;
		}
		document.getElementById("janelaRed").style.left = posX;
		var top=vetor['top'];
		document.getElementById("janelaRed").style.top = top;
		document.getElementById("janelaRed").style.width = largo;
	}
	
	this.fechaFloat=function(dive)
	{
		document.getElementById(dive).innerHTML='';
		document.getElementById(dive).style.visibility='hidden';
	}
}
function fechaFloat(dive)
{
	document.getElementById(dive).innerHTML='';
	document.getElementById(dive).style.visibility='hidden';
}
function getJanelaPop(caracs)
{
	var visivel=caracs['visivel'];
	var cabecalho=caracs['cabecalho'];
	var msgStBar=caracs['msgStBar'];
	var parte='<div id="janelaRed" style="visibility: '+visivel+';">';
	var outrosLinks=caracs['outrosLinks'];
	var colocaLink=caracs['colocaLink'];
	var conteudo=caracs['conteudo'];
	parte+='	<div id="barraRed">';
	if (colocaLink != '0')
	{
		parte+='		<a id="fechar" href="javascript:fecharFloat();" title="Fechar" onmouseup="fecharFloat();"><img src="imagens/bot3.gif" width="17" height="17" border="0"></a><span id="lkFloat">'+outrosLinks+'</span>';
	}
	parte+='		<div id="cabec"><font color=Red>'+cabecalho+'</font></div>';
	parte+='	</div>';
	parte+='';
	parte+='	<div id="conteudoRed">';
	parte+=conteudo;
	parte+='	</div>';
	parte+='';
	parte+='	<div id="statusbarRed">'+msgStBar+'</div>';
	parte+='</div>';
	return parte;
}
function funcsJanelaCor(parm)
{
	var visivel='';
	var titulo='';
	var largo='300';
	var top=10;
	var conteudo='';
	var lef='';
	var cor='';
	var zindex='1060';
	var cmd='var vetor='+parm+'.getValue();';
	eval(cmd);
	
	this.setCor = function(valor)
	{
		vetor=putVetor(vetor,'cor',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setZIndex = function(valor)
	{
		vetor=putVetor(vetor,'zindex',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setVisivel = function(v)
	{
		var como='hidden';
		if (v == 1) como='visible';
		vetor=putVetor(vetor,'visivel',como);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setTitulo = function(valor)
	{
		vetor=putVetor(vetor,'titulo',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setLargura = function(largo)
	{
		vetor=putVetor(vetor,'largo',largo);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setLeft=function(valor)
	{
		vetor=putVetor(vetor,'lef',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}

	this.setTop = function(valor)
	{
		vetor=putVetor(vetor,'top',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setOutrosLinks = function(valor)
	{
		vetor=putVetor(vetor,'outrosLinks',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.setConteudo = function(valor)
	{
		vetor=putVetor(vetor,'conteudo',valor);
		cmd=parm+'.setValue(vetor);';
		eval(cmd);
	}
	
	this.show = function(dive)
	{
		var retorno=getJanelaCor(vetor);
		document.getElementById(dive).innerHTML=retorno;
		document.getElementById(dive).style.visibility='visible';
		var largo=vetor['largo'];
	 	var len=screen.width;
		var posX=(len-largo)/2;
		try
		{
			if (document.FormVai.hIpod.value == '1')
			{
				posX=10;
			}
		} catch(ex){}
		var lef=vetor['lef'];
		if (lef != '') 
		{
			if (lef != undefined)
			{
				posX=lef;
			}
		}
		var elemento='Ficha'+vetor['cor'];
		document.getElementById(elemento).style.left = posX+'px';
		var top=vetor['top'];
		document.getElementById(elemento).style.top = top+'px';
		document.getElementById(elemento).style.width = largo;
		//document.getElementById(elemento).style.marginLeft = "-" + parseInt(document.getElementById(elemento).offsetWidth / 2) + "px";
	}
}
function getJanelaCor(caracs)
{
	var cor=caracs['cor'];
	var visivel=caracs['visivel'];
	var titulo=caracs['titulo'];
	var conteudo=caracs['conteudo'];
	var outrosLinks=caracs['outrosLinks'];
	var parte='<div id="Ficha'+cor+'" style="visibility: '+visivel+';">';
	parte+='    <div id="barraFicha'+cor+'" onMousedown=javascript:moveFicha'+cor+'(); onMouseup=javascript:paraFicha'+cor+'(); onMouseover="chamaIdFicha'+cor+'();">';
	parte+='        <span id="idFecha'+cor+'"><a id="fechaFicha'+cor+'" href="#" title="Fechar" onmouseup="foraNeblina();fecharFicha'+cor+'();">x</a></span><span id="lk'+cor+'">'+outrosLinks+'</span>';
	parte+='        <div id="cabDet'+cor+'">'+titulo+'</div>';
	parte+='    </div>';
	parte+='    <div id="conteudoFicha'+cor+'">';
	parte+=conteudo;
	parte+='    </div>';
	parte+='</div>';
	return parte;
}
function fecharFloat()
{
	document.getElementById("janelaRed").style.visibility='hidden';
}
function getCorVerde()
{
	return 'CDFEF0';
}
function getCorVermelha()
{
	return 'FCBABA';
}
String.prototype.replaceAll = function(de, para)
{
	var str = this;
	var pos = str.indexOf(de);
	var reptPos=-4;
	while (pos > -1)
	{
		str = str.replace(de, para);
		pos = str.indexOf(de);
		if (pos == reptPos) pos=-1;
		reptPos=pos;
	}
	return (""+str);
}
function vetorToQueryString(vetor)
{
	var chaves="";
	var valores="";
	for (var i in vetor)
	{
		chaves+="&chaves[]="+i;
		valores+="&valores[]="+vetor[i];
	}
	var retorno=chaves+valores;
	return retorno;
}
function temPai(obj,pai)
{
	var retorno=false;
	try
	{
		if (obj.offsetParent)
		{
			while (obj = obj.offsetParent)
			{
				var id='';
				try{id=obj.id;}catch(ex2){}
				if (id == pai)
				{
					retorno=true;
				}
			}
		}
	} catch(ex){}
	return retorno;
}
function openNewTelaParm(label,funcao)
{
	var urle="work.php?Funcao=openNewTelaParm&label="+label+"&funcao="+funcao+"&random=" + Math.random();
	try { 
	    http_request = new ActiveXObject("Msxml2.XMLHTTP"); 
	} catch (e) { 
	try { 
	        http_request = new ActiveXObject("Microsoft.XMLHTTP"); 
	    } catch (E) { 
	        http_request = false; 
	    } 
	}
	if  (!http_request && typeof  XMLHttpRequest != "undefined" ) { 
	    try  { 
	        http_request = new  XMLHttpRequest();
	    } catch  (e) { 
	        http_request = false ; 
	    } 
	}
	http_request.open("GET", urle, true);
	http_request.onreadystatechange = trataOpenNewTelaParm;
	http_request.send(null);	
}
function trataOpenNewTelaParm()
{
	if (http_request.readyState == 4) {
		var xmldoc = http_request.responseXML;
		var tam=xmldoc.getElementsByTagName("linha").length;
		var conteudo='';
		for (var i=0; i<tam; i++)
		{
			var linha = xmldoc.getElementsByTagName("linha")[i].childNodes[0].data;
			if (linha != '0') conteudo+=linha;
		}
		conteudo=URLDecode(conteudo);
		cmd='var vetor='+document.getElementById("hVetor").value+'.getValue();';
		eval(cmd);
		var funcaoRetorno=vetor['funcaoRetornoNewParm'];
		cmd=funcaoRetorno+'(conteudo);';
		eval(cmd);
	}
}
function chamaAx(negocio,funcao,parms)
{
	var urle=negocio+".html?Funcao="+funcao+parms+"&random=" + Math.random();
	try { 
	    http_request = new ActiveXObject("Msxml2.XMLHTTP"); 
	} catch (e) { 
	try { 
	        http_request = new ActiveXObject("Microsoft.XMLHTTP"); 
	    } catch (E) { 
	        http_request = false; 
	    } 
	}
	if  (!http_request && typeof  XMLHttpRequest != "undefined" ) { 
	    try  { 
	        http_request = new  XMLHttpRequest();
	    } catch  (e) { 
	        http_request = false ; 
	    } 
	}
	http_request.open("GET", urle, true);
	http_request.onreadystatechange = trataChamaAx;
	http_request.send(null);	
}
function trataChamaAx()
{
	if (http_request.readyState == 4) {
		var xmldoc = http_request.responseXML;
		var queVetor='';
		try{queVetor=document.getElementById("hVetor").value;}catch(ex){}
		if (!document.getElementById("hVetor"))
		{
			var vetor=urVetor.getValue();
			queVetor=vetor['nomeVetor'];
		}
		cmd='var vetor='+queVetor+'.getValue();';
		eval(cmd);
		var funcaoRetorno=vetor['retornoAx'];
		cmd=funcaoRetorno+'(xmldoc);';
		eval(cmd);
	}
}
function utGetEstados()
{
	var urle="estados.json";
	try { 
	    http_request = new ActiveXObject("Msxml2.XMLHTTP"); 
	} catch (e) { 
	try { 
	        http_request = new ActiveXObject("Microsoft.XMLHTTP"); 
	    } catch (E) { 
	        http_request = false; 
	    } 
	}
	if  (!http_request && typeof  XMLHttpRequest != "undefined" ) { 
	    try  { 
	        http_request = new  XMLHttpRequest();
	    } catch  (e) { 
	        http_request = false ; 
	    } 
	}
	http_request.open("GET", urle, true);
	http_request.onreadystatechange = trataChamaEstados;
	http_request.send(null);	
}
function trataChamaEstados()
{
	if (http_request.readyState == 4) {
		var texto = http_request.responseText;
		var funcaoRetorno=getMemo('retornoAx');
		cmd=funcaoRetorno+'(texto);';
		eval(cmd);
	}
}
function chamaJSon(negocio,funcao,parms)
{
    if (!ckTem('saltaEncode')){
	   parms=encodeParms(parms);
    }
    delMemo('saltaEncode');
	var urle=negocio+".html?Funcao="+funcao+parms+"&random=" + Math.random();
	if (parms.indexOf('nosuf=S') > 0)
		urle=negocio+"?Funcao="+funcao+parms+"&random=" + Math.random();
	try { 
	    http_request = new ActiveXObject("Msxml2.XMLHTTP"); 
	} catch (e) { 
	try { 
	        http_request = new ActiveXObject("Microsoft.XMLHTTP"); 
	    } catch (E) { 
	        http_request = false; 
	    } 
	}
	if  (!http_request && typeof  XMLHttpRequest != "undefined" ) { 
	    try  { 
	        http_request = new  XMLHttpRequest();
	    } catch  (e) { 
	        http_request = false ; 
	    } 
	}
	http_request.open("GET", urle, true);
	if (ckTem('encoda')){
		http_request.overrideMimeType('text/xml; charset=ISO-8859-1');
		delMemo('encoda');
	}
	if (ckTem('encodaUTF8')){
		http_request.overrideMimeType('text/xml; charset=UTF-8');
		delMemo('encodaUTF8');
	}
	http_request.onreadystatechange = trataChamaJSon;
	http_request.send(null);	
}
function trataChamaJSon()
{
	if (http_request.readyState == 4) {
		var texto = http_request.responseText;
		var dados="";
		try{
			dados=JSON.parse(http_request.responseText);
		} catch(e){
			var erro="Erro na chamada ao servidor";
			if (ckTem('msgErroJSON')){
				erro=getMemo('msgErroJSON');
			}
			dados=JSON.parse('{"erro":"'+erro+'","msg":"erro"}');
		}
		var funcaoRetorno=getMemo('retornoAx');
		cmd=funcaoRetorno+'(dados);';
		eval(cmd);
	}
}
function insertOptionBefore(idJanela,codigo,valor)
{
  var elSel = document.getElementById(idJanela);
  if (elSel.selectedIndex >= 0) {
  	//elSel.selectedIndex=0;
    var elOptNew = document.createElement('option');
    elOptNew.text = valor;
    elOptNew.value = codigo;
    var elOptOld = elSel.options[elSel.selectedIndex];  
    try {
      elSel.add(elOptNew, elOptOld); // standards compliant; doesn't work in IE
    }
    catch(ex) {
      elSel.add(elOptNew, elSel.selectedIndex); // IE only
    }
  }
}
function mudaParte2(conteudo,valor)
{
	var termos=getPartesLink(conteudo);
	var parte=termos[0]+valor+termos[1];
	return parte;
}
function putNoLinkElemento(elemento,valor)
{
	var conteudo=elemento.innerHTML;
	conteudo=mudaParte2(conteudo,valor);
	elemento.innerHTML=conteudo;
}
function putNoLink(idLink,valor)
{
	var conteudo=document.getElementById(idLink).innerHTML;
	conteudo=mudaParte2(conteudo,valor);
	document.getElementById(idLink).innerHTML=conteudo;
}
function getParte2Elemento(elemento)
{
	var conteudo=elemento.innerHTML;
	if (conteudo == '') return conteudo;
	var termos=getPartesLink(conteudo);
	return termos[2];
}
function getParte2(idLink)
{
	var conteudo=document.getElementById(idLink).innerHTML;
	var termos=getPartesLink(conteudo);
	return termos[2];
}
function getPt2(elemento)
{
	conteudo=elemento.innerHTML;
	var termos=getPartesLink(conteudo);
	return termos[2];
}
function setTdAlignRight(spanContent, labels)
{
	var tds=document.getElementById(spanContent).getElementsByTagName('td');
	for (var i=0; i< tds.length; i++)
	{
		var curTd=tds[i];
		var texto=curTd.innerText;
		if (estaIstoNaquilo(texto, labels)) tds[i+1].align='right';
	}
}
function setTdWidth(spanContent, labels, larg)
{
	var tds=document.getElementById(spanContent).getElementsByTagName('td');
	for (var i=0; i< tds.length; i++)
	{
		var curTd=tds[i];
		var texto=curTd.innerText;
		if (estaIstoNaquilo(texto, labels)) tds[i+1].width=larg+'px';
	}
}
function setTdColspan(spanContent, label, n)
{
	var tds=document.getElementById(spanContent).getElementsByTagName('td');
	for (var i=0; i< tds.length; i++)
	{
		var curTd=tds[i];
		var texto=curTd.innerText;
		if (texto == label) tds[i+1].colSpan=n;
	}
}
function getTdByLabel(spanContent, label){
	var retorno=0;
	var tds=document.getElementById(spanContent).getElementsByTagName('td');
	for (var i=0; i< tds.length; i++)
	{
		var curTd=tds[i];
		var texto=curTd.innerText;
		if (texto == label) retorno=i;
	}
	putMemo('tds', tds);
	return retorno;
}
function putLinkEdicao(idLink,partes,valor, formato)
{
	var especial=getMemo('espJan');
	var elto='';
	if (especial == undefined) especial='';
	if (especial == 1) elto=getMemo('elementoEdita');
	var conteudo=partes[0]+idLink+partes[1]+formato+partes[2]+valor+partes[3];
	if (especial == 1)
		elto.innerHTML=conteudo;
	else
		document.getElementById(idLink).innerHTML=conteudo;
}
function putElementoEdicao(elemento,partes,valor,formato)
{
	var conteudo=partes[0]+elemento.id+partes[1]+formato+partes[2]+valor+partes[3];
	elemento.innerHTML=conteudo;
}
function setTela()
{
	var tabela='';
	var nColunas=1;
	var condicao='';
	var campoChave='';
	var campos=new Array();
	var labels=new Array();
	var colspans=new Array();
	var maisInfo=new Array();
	var formatJan=new Array();
	var classeTabela='';
	var tituloTabela='';
	var classeLink='';
	var onlo='';
	var posProcessa=new Array();
	
	this.setTabela=function(valor)
	{
		tabela=valor;
	}
	this.setCampoChave=function(valor)
	{
		campoChave=valor;
	}
	this.setCondicao=function(valor)
	{
		condicao=valor;
	}
	this.setCampo=function(valor)
	{
		campos[campos.length]=valor;
	}
	this.resetCampos=function()
	{
		campos=new Array();
	}
	this.setLabel=function(valor)
	{
		labels[labels.length]=valor;
	}
	this.resetLabels=function()
	{
		labels=new Array();
	}
	this.setColSpan=function(valor)
	{
		colspans[colspans.length]=valor;
	}
	this.resetColspans=function()
	{
		colspans=new Array();
	}
	this.setMaisInfo=function(valor)
	{
		maisInfo[maisInfo.length]=valor;
	}
	this.setNColunas=function(valor)
	{
		nColunas=valor;
	}
	this.setFormatJan=function(valor)
	{
		formatJan[formatJan.length]=valor;
	}
	
	this.getTabela=function()
	{
		return tabela;
	}
	this.getCampoChave=function()
	{
		return campoChave;
	}
	this.getNColunas=function()
	{
		return nColunas;
	}
	this.getCondicao=function()
	{
		return condicao;
	}
	this.getCampos=function()
	{
		return campos;
	}
	this.getLabels=function()
	{
		return labels;
	}
	this.getColspans=function()
	{
		return colspans;
	}
	this.getMaisInfo=function()
	{
		return maisInfo;
	}
	this.getFormatJan=function()
	{
		return formatJan;
	}
	
	this.setClasseTabela=function(valor)
	{
		classeTabela=valor;
	}
	this.getClasseTabela=function()
	{
		return classeTabela;
	}
	this.getTituloTabela=function()
	{
		return tituloTabela;
	}
	this.setTituloTabela=function(valor)
	{
		tituloTabela=valor;
	}
	this.getClasseLink=function()
	{
		return classeLink;
	}
	this.setClasseLink=function(valor)
	{
		classeLink=valor;
	}
	this.getOnlo=function()
	{
		return onlo;
	}
	this.setOnlo=function(valor)
	{
		onlo=valor;
	}
	this.setPosProcessa=function(valor)
	{
		posProcessa[posProcessa.length]=valor;
	}
	this.getPosProcessa=function()
	{
		return posProcessa;
	}
}
function getFromVetor(vetor,indice)
{
	var vetor=urVetor.getValue();
	var retorno=vetor[indice];
	if (retorno == undefined) retorno='';
	return retorno;
}
function abreJan(jan,tam,maxtam,formato)
{
	var especial=getMemo('espJan');
	var elto='';
	if (especial == undefined) especial='';
	if (especial == 1) elto=getMemo('elementoEdita');
	var vetor=urVetor.getValue();
	var idJanela=getFromVetor(vetor,'idJanAbrt');
	if (idJanela != '' && idJanela != jan) fechaJan(idJanela);
	var normal=true;
	if (vetor['getParcial'] == '1')
	{
		valor="";
		normal=false
	}
	if (normal)
	{
		var work=document.getElementById(jan).innerHTML;
		if (especial == 1) work=elto.innerHTML;
		vetor=putVetor(vetor,'ctJanEra',work);
		vetor=putVetor(vetor,'idJanAbrt',jan);
		vetor=putVetor(vetor,'tam',tam);
		vetor=putVetor(vetor,'maxtam',maxtam);
		vetor=putVetor(vetor,'formato',formato);
		urVetor.setValue(vetor);
		work=work.replaceAll('<br>',"\n");
		/*
		var n=work.indexOf("\n");
		while (n >= 0)
		{
			work=work.replace("\n",'<br>');
			n=work.indexOf("\n");
		}
		*/
		var termos=work.split("\>");
		var valor=termos[1];
		
		termos=valor.split("\<");
		valor=termos[0];
	}
	idJanela=jan;
	var numerico='';
	if (formato == 'formata')
	{
		numerico=' onKeydown="Formata(this,12,event,2);"';
	}
	if (formato == 'inteiro')
	{
		numerico=' onkeydown="javascript:doMask(this, \'number\', event, true);"';
	}
	if (formato == 'numerico')
	{
		numerico=' onkeydown="javascript:doMask(this, \'number\', event, false);"';
	}
	if (formato == 'data')
	{
		numerico=' onkeydown="javascript: doMask( this, \'date\', event, true);"';
	}
	if (formato == 'cep')
	{
		numerico=' onkeydown="javascript: doMask( this, \'cep\', event, true);"';
	}
	if (formato == 'cpf')
	{
		numerico=' onkeydown="javascript: doMask( this, \'cpf\', event, true);"  onkeyup="javascript:contaCPFParm(this);"';
	}
	if (formato == 'cnpj')
	{
		numerico=' onkeydown="javascript: doMask( this, \'cnpj\', event, true);" onkeyup="javascript:contaCnpj(this);"';
	}
	if (formato == 'cnpjParm')
	{
		numerico=' onkeydown="javascript: doMask( this, \'cnpj\', event, true);" onkeyup="javascript:contaCnpjParm(this);"';
	}
	if (formato == 'timestamp')
	{
		numerico=' onkeydown="javascript: doMask( this, \'timestamp\', event, true);"';
	}
	var lId='tValor';
	var scriptBotao='putDado';
	if (formato == 'autocompletar')
	{
		numerico=' name="'+idJanela+'" onkeyup="javascript:trataJanela(event, this, 120, \'\');"';
		lId=idJanela;
		scriptBotao='putCompletado';
	}
	var fnAlt=vetor['altPutDado'];
	if (fnAlt != undefined) scriptBotao=fnAlt;
	if (valor == 'editar'){
		valor='';
	}
	if (formato != 'area')
	{
		parte='<input type="text" id="'+lId+'" value="'+valor+'" size="'+tam+'" maxlength="'+maxtam+'"'+numerico+'>';
	}
	else
	{
		parte='<textarea id="tValor" rows="'+tam+'" cols="'+maxtam+'">'+valor+'</textarea>';
	}
	if (vetor['getParcial'] == '1')
	{
		parte+=' <input type="button" id="idBtPt" value="Ok" style="font-size:10px;" oncliq>';
		vetor=remVetor(vetor,'getParcial');
		urVetor.setValue(vetor);
		return parte;
	}
	parte+=' <input type="button" id="idBtPt" value="Ok" style="font-size:10px;" onclick="'+scriptBotao+'(\''+idJanela+'\');"> <input type="button" value="Fechar" style="font-size:10px;" onclick="fechaJan(\''+idJanela+'\');">';
	if (especial == 1)
		elto.innerHTML=parte;
	else
		document.getElementById(idJanela).innerHTML=parte;
	//remVetor(vetor, 'altPutDado');
	try{document.getElementById("tValor").focus();}catch(ex){}
	try{document.getElementById("tValor").select();}catch(ex){}
}
function fechaJan(idJanela)
{
	var especial=getMemo('espJan');
	var elto='';
	if (especial == undefined) especial='';
	if (especial == 1) elto=getMemo('elementoEdita');
	var vetor=urVetor.getValue();
	try{resetChoose();}catch(ex){}
	var work=vetor['ctJanEra'];
	if (work == undefined) work='';
	if (especial == 1)
	{
		try{elto.innerHTML=work}catch(e){};
	}
	else
	{
		try{document.getElementById(idJanela).innerHTML=work}catch(e){};
	}
	vetor=putVetor(vetor,'idJanAbrt','');
	vetor=putVetor(vetor,'ctJanEra','');
	//remVetor(vetor, 'altPutDado');
	urVetor.setValue(vetor);
}
function fechaJanElemento()
{
	var el=getElementosDaLinhaAberta();
	var idx=getMemo('idxAberto');
	var elemento=el[idx];

	var especial=getMemo('espJan');
	var elto='';
	if (especial == undefined) especial='';
	if (especial == 1) elto=getMemo('elementoEdita');
	var vetor=urVetor.getValue();
	try{resetChoose();}catch(ex){}
	var work=vetor['ctJanEra'];
	if (work == undefined) work='';
	if (especial == 1)
	{
		try{elto.innerHTML=work}catch(e){};
	}
	else
	{
		try{elemento.innerHTML=getMemo('elementoTinha')}catch(e){};
	}
	vetor=putVetor(vetor,'idJanAbrt','');
	vetor=putVetor(vetor,'ctJanEra','');
	delMemo('idxAberto');
	//remVetor(vetor, 'altPutDado');
	urVetor.setValue(vetor);
}
function abreElemento(elemento,tam,maxtam,formato)
{
	var vetor=urVetor.getValue();
	var numerico='';
	var valor=getParte2Elemento(elemento);
	putMemo('elementoTinha', elemento.innerHTML);
	if (formato == 'formata')
	{
		numerico=' onKeydown="Formata(this,12,event,2);"';
	}
	if (formato == 'inteiro')
	{
		numerico=' onkeydown="javascript:doMask(this, \'number\', event, true);"';
	}
	if (formato == 'numerico')
	{
		numerico=' onkeydown="javascript:doMask(this, \'number\', event, false);"';
	}
	if (formato == 'data')
	{
		numerico=' onkeydown="javascript: doMask( this, \'date\', event, true);"';
	}
	if (formato == 'cep')
	{
		numerico=' onkeydown="javascript: doMask( this, \'cep\', event, true);"';
	}
	if (formato == 'cpf')
	{
		numerico=' onkeydown="javascript: doMask( this, \'cpf\', event, true);"  onkeyup="javascript:contaCPFParm(this);"';
	}
	if (formato == 'cnpj')
	{
		numerico=' onkeydown="javascript: doMask( this, \'cnpj\', event, true);" onkeyup="javascript:contaCnpj(this);"';
	}
	if (formato == 'timestamp')
	{
		numerico=' onkeydown="javascript: doMask( this, \'timestamp\', event, true);"';
	}
	var lId='tValor';
	var scriptBotao='putDado';
	if (formato == 'autocompletar')
	{
		numerico=' name="'+idJanela+'" onkeyup="javascript:trataJanela(event, this, 120, \'\');"';
		lId=idJanela;
		scriptBotao='putCompletado';
	}
	var fnAlt=vetor['altPutDado'];
	if (fnAlt != undefined) scriptBotao=fnAlt;
	if (formato != 'area')
	{
		parte='<input type="text" id="'+lId+'" value="'+valor+'" size="'+tam+'" maxlength="'+maxtam+'"'+numerico+'>';
	}
	else
	{
		parte='<textarea id="tValor" rows="'+tam+'" cols="'+maxtam+'">'+valor+'</textarea>';
	}
	parte+=' <input type="button" id="idBtPt" value="Ok" style="font-size:10px;" onclick="'+scriptBotao+'(\''+elemento.id+'\');"> <input type="button" value="Fechar" style="font-size:10px;" onclick="fechaJanElemento();">';
	elemento.innerHTML=parte;
	try{document.getElementById("tValor").focus();}catch(ex){}
	try{document.getElementById("tValor").select();}catch(ex){}
}
function noFechJan()
{
	var vetor=urVetor.getValue();
	vetor=putVetor(vetor,'idJanAbrt','');
	urVetor.setValue(vetor);
}
function getUrTelaPost()
{
	var queVetor='';
	try{queVetor=document.getElementById("hVetor").value;}catch(ex){}
	if (!document.getElementById("hVetor"))
	{
		var vetor=urVetor.getValue();
		queVetor=vetor['nomeVetor'];
	}
	cmd='var vetor='+queVetor+'.getValue();';
	eval(cmd);
	var telaEdit=vetor['telaEdit'];
	var passar=vetor['hidParms'];
	var parte='<form name="FormPost" method="POST" action="'+passar['negocio']+'.html">';
	for (i in passar)
	{
		parte+='<input type="hidden" name="'+i+'" value="'+passar[i]+'">';
	}
	var tabela=telaEdit.getTabela();
	parte+='<input type="hidden" name="hTabela" value="'+tabela+'">';
	var nColunas=telaEdit.getNColunas();
	parte+='<input type="hidden" name="hNColunas" value="'+nColunas+'">';
	var where=telaEdit.getCondicao();
	parte+='<input type="hidden" name="hWhere" value="'+where+'">';
	parte+='<input type="hidden" name="classeTabela" value="'+telaEdit.getClasseTabela()+'">';
	var tituloTabela=telaEdit.getTituloTabela();
	parte+='<input type="hidden" name="tituloTabela" value="'+tituloTabela+'">';
	parte+='<input type="hidden" name="classeLink" value="'+telaEdit.getClasseLink()+'">';
	parte+='<input type="hidden" name="onload" value="'+telaEdit.getOnlo()+'">';
	
	var mudancas=telaEdit.getPosProcessa();
	var muds='';
	for (var i=0; i< mudancas.length; i++)
	{
		if (muds != '')
		{
			muds+=';';
		}
		muds+=mudancas[i];
	}
	parte+='<input type="hidden" name="mudancas" value="'+muds+'">';
	
	var labels=telaEdit.getLabels();
	for (var i=0; i< labels.length; i++)
	{
		parte+='<input type="hidden" name="Label[]" value="'+labels[i]+'">';
	}
	
	var campos=telaEdit.getCampos();
	for (var i=0; i< campos.length; i++)
	{
		parte+='<input type="hidden" name="Campo[]" value="'+campos[i]+'">';
	}
	
	var colSpans=telaEdit.getColspans();
	for (var i=0; i< colSpans.length; i++)
	{
		parte+='<input type="hidden" name="colSpan[]" value="'+colSpans[i]+'">';
	}
	
	var infos=telaEdit.getMaisInfo();
	for (var i=0; i< infos.length; i++)
	{
		parte+='<input type="hidden" name="maisInfo[]" value="'+infos[i]+'">';
	}
	
	var formatos=telaEdit.getFormatJan();
	for (var i=0; i< formatos.length; i++)
	{
		parte+='<input type="hidden" name="formatos[]" value="'+formatos[i]+'">';
	}
	parte+='<!-- <input type="submit" value="Processar"> -->';
	parte+='</form>';
	return parte;
}
function abreCombo(entidade,selecionado)
{
	var vetor=urVetor.getValue();
	var idJanela=getFromVetor(vetor,'idJanAbrt');
	var jan=entidade;
	if (idJanela != '' && idJanela != jan) fechaJan(idJanela);
	var work=document.getElementById(jan).innerHTML;
	vetor=putVetor(vetor,'ctJanEra',work);
	vetor=putVetor(vetor,'idJanAbrt',jan);
	vetor=putVetor(vetor,'selecionado',selecionado);
	urVetor.setValue(vetor);
	var urle="util.html?entidade="+entidade+"&selecionado="+selecionado;
	window.open(urle,"ifra");
}
function getPartesLink(conteudo)
{
	var termos=conteudo.split("\>");
	var pt1=termos[0]+'>';
	var valor=termos[1];
	if (valor == undefined) return ['','',''];
	termos=valor.split("\<");
	valor=termos[0];
	var pt2='<'+termos[1]+'>';
	var retorno=new Array();
	retorno[0]=pt1;
	retorno[1]=pt2;
	retorno[2]=valor;
	return retorno;
}
function exibe(conteudo)
{
	var spanCal=getMemo('spanCal');
	var altura=getMemo('altura');
	var largura=getMemo('largura');
	document.getElementById(spanCal).innerHTML=conteudo;
	formataSpan(spanCal, altura, largura);
	var cmd=getMemo('complementaExibe')+'();'
	eval(cmd);;
	
}
function exibe2(conteudo, cor, titulo)
{
	var modal=new funcsJanelaCor('urVetor');
	modal.setCor(cor);
	modal.setVisivel(1);
	modal.setTitulo('<font color=White size="2">'+titulo+'</font>');
	modal.setLargura(270);
	modal.setTop(210);
	modal.setOutrosLinks('');
	modal.setConteudo(conteudo);
	modal.show(getMemo('spanCal'));
}
function calendando(alvo)
{
	var datahora=document.getElementById(alvo).value;
	var tx=calendario(alvo,datahora);
	exibe(tx, 'Laranja', 'Pesquisa');
}
function reCalenda(alvo,datahora)
{
	var tx=calendario(alvo,datahora);
	exibe(tx);
}
function retornaValorCalend(alvo,valor)
{
	document.getElementById(getMemo('spanCal')).style.visibility="hidden";
	document.getElementById(getMemo('spanCal')).style.zIndex=1050;
	var vetor=urVetor.getValue();
	var reLaranja=vetor['rechamaLaranja'];
	if (reLaranja == undefined) reLaranja=0;
	if (reLaranja == 1)
	{
		vetor=putVetor(vetor,'rechamaLaranja',0);
		urVetor.setValue(vetor);
		var conteudo=vetor['conteudo'];
		openTelaNewParm(conteudo);
	}
	document.getElementById(alvo).value=valor;
	document.getElementById(alvo).focus();
	delMemo('spanCal');
}
function fechaCb(idJan)
{
	var tava=getMemo('eraFechar');
	document.getElementById(idJan).innerHTML=tava;
}
function setCurXY(event)
{
	var posx = 0;
	var posy = 0;
	if (event.pageX || event.pageY)     {
	    posx = event.pageX;
	    posy = event.pageY;
	}
	else if (event.clientX || event.clientY)    {
	    posx = event.clientX + document.body.scrollLeft
	        + document.documentElement.scrollLeft;
	    posy = event.clientY + document.body.scrollTop
	        + document.documentElement.scrollTop;
	}
    var retorno=new Array();
    retorno.push(posx);
    retorno.push(posy);
	var vetor=urVetor.getValue();
	vetor=putVetor(vetor, 'curX', posx);
	vetor=putVetor(vetor, 'curY', posy);
	urVetor.setValue(vetor);
	putMemo('curX', posx);
	putMemo('curY', posy);
	var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
	putMemo('scrollTop', scrollTop);
}
function getCursorXY() {
	var vetor=urVetor.getValue();
	var posx=vetor['curX'];
	var posy=vetor['curY'];
    var retorno=new Array();
    retorno.push(posx);
    retorno.push(posy);
    return retorno;
}
function montaFromTelaEdit(idTab,dados,scripGravacao,header,wid)
{
	var vetor=urVetor.getValue();
	var telaEdit=vetor['telaEdit'];
	var curCo=0;
	var classeTabela='';
	var teste=telaEdit.getClasseTabela();
	if (teste != '')
	{
		classeTabela=' class="'+teste+'"';
	}
	var classeLk='p';
	teste=telaEdit.getClasseLink();
	if (teste != '')
	{
		classeLk=teste;
	}
	var labels=telaEdit.getLabels();
	var campos=telaEdit.getCampos();
	var formatos=telaEdit.getFormatJan();
	var infos=telaEdit.getMaisInfo();
	var nColunas=telaEdit.getNColunas();
	var colsSpans=telaEdit.getColspans();
	var n2colunas=nColunas*2;
	var retorno='<center>';
	retorno+='<table'+classeTabela+' width="'+wid+'" id="'+idTab+'" cellPadding="0" cellspacing="0">';
	if (header == 1)
	{
		retorno+=' <th colspan="'+n2colunas+'">'+telaEdit.getTituloTabela()+'</th>';
	}
	retorno+=' <tr>';
	var cntri=-1;
	for (var i=0; i< labels.length; i++)
	{
		var idRef='';
		if (cntri == -1)
		{
			idRef=' id="tdRefLarg"';
		}
		var qualCo=curCo+1;
		if (qualCo > nColunas)
		{
			retorno+=' </tr>';
			retorno+=' <tr>';
			curCo=0;
		}
		var campo=campos[i];
		var label=labels[i];
		var cmd='valorCampo=dados.'+campo;
		eval(cmd);
		if (campo == 'endLogradouro')
		{
			var t=1;
		}
		if (valorCampo == '') valorCampo='editar';
		var formato=formatos[i];
		if (formato.indexOf('moeda') > 0 || formato.indexOf('formata') > 0)
		{
			var valorCampo=float2moeda(valorCampo);
		}
		var partes=formato.split(',');
		var tam=partes[0];
		var maxtam=partes[1];
		var formatacao=partes[2];
		var info=infos[i];
		if (label == 'inSpan')
		{
			curCo=nColunas;
			var sp=nColunas * 2;
			retorno+='    <td colspan="'+sp+'"><span id="nomeSpan'+i+'"></span></td>';
		}
		if (label != 'inSpan')
		{
			retorno+='    <td'+idRef+'><B>'+label+'</B></td>';
		}
		if (scripGravacao != '')
		{
			retorno+='     <td><span id="'+campo+'"><A id="lk'+i+'" href="javascript:'+scripGravacao+'(\''+campo+'\',\''+tam+'\',\''+maxtam+'\',\''+formatacao+'\');" class="'+classeLk+'">'+valorCampo+'</A></span> <span id="'+info+'"></span></td>';
		}
		if (scripGravacao == '')
		{
			retorno+='     <td>'+valorCampo+' '+info+'</td>'
		}
		colSpan=colsSpans[i];
		curCo=curCo + colSpan;
		cntri++;
	}
	retorno+=' </tr>';
	retorno+='</table>';
	retorno+='</center>';
	return retorno;
}
function findPos(obj) {
	var vetor=urVetor.getValue();
	var naquilo=vetor['desconsiderar'];
	if (naquilo == undefined) naquilo='sem essa';
	var left = 0;
	var top = 0;
	if (obj == null)
	{
		return;
	}
	try
	{
		if (obj.offsetParent) {
			left = obj.offsetLeft;
			top = obj.offsetTop;
			while (obj = obj.offsetParent) {
				var id=obj.id;
				if (!estaIstoNaquilo(id, naquilo))
				{
					left += obj.offsetLeft;
					top += obj.offsetTop;
				}
			}
		}
	}
	catch(err){}
	offsetX = left;
	offsetY = top;
}
function incScript(filename)
{
	var body = document.getElementsByTagName('body').item(0);
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';
	body.appendChild(script)
}
function incCss(filename)
{
	var style = document.createElement("link");
	style.setAttribute("rel", "stylesheet");
	style.setAttribute("type", "text/css");
	style.setAttribute("href", filename);
	document.getElementsByTagName("head").item(0).appendChild(style);
}
function montaAbas(itens, links, clLk)
{
	var n=itens.length;
	var vetor=urVetor.getValue();
	vetor=putVetor(vetor,'nAbas',n);
	vetor=putVetor(vetor,'itensAbas',itens);
	vetor=putVetor(vetor,'linksAbas',links);
	vetor=putVetor(vetor,'clLkAbas',clLk);
	urVetor.setValue(vetor);
	var parte='   <table cellspacing="0" cellpadding="0" border="0">';
	parte+='    <tr>';
	for (var i=0; i< n; i++)
	{
		parte+='     <td id="iCse" width="4" height="4"><img src="imgAbas/cse1.gif" border="0"></td>';
		parte+='     <td id="ils" background="imgAbas/ls1.gif"></td>';
		parte+='     <td id="icsd"><img src="imgAbas/csd1.gif" border="0"></td>';
	}
	parte+='    </tr>';

	parte+='    <tr>';
	for (var i=0; i< n; i++)
	{
		var nome=itens[i];
		parte+='     <td id="ile" background="imgAbas/le1.gif">&nbsp;</td>';
		parte+='     <td><span id="idAba'+i+'"><A href="javascript:'+links[i]+'();" id="idLk'+i+'" class="'+clLk+'" onmousedown="ativaAba('+i+');">'+nome+'</a></span></td>';
		parte+='     <td id="ild" background="imgAbas/ld1.gif">&nbsp;</td>';
	}
	parte+='    <tr height="4">';

	parte+='    </tr>';
	for (var i=0; i< n; i++)
	{
		parte+='     <td height="2" colspan="3" id="tdPe'+i+'"><span id="imgTdPe'+i+'"></span></td>';
	}
	parte+='    </tr>';
	parte+='   </table>';
	return parte;
}
function ativaAba(qual)
{
	var vetor=urVetor.getValue();
	var nAbas=vetor['nAbas'];
	var itens=vetor['itensAbas'];
	var links=vetor['linksAbas'];
	var clLk=vetor['clLkAbas'];
	var imagem="url('imgAbas/ls1.gif')";
	for (var i=0; i< nAbas; i++)
	{
		var nome=itens[qual];
		if (i != qual)
		{
			document.getElementById('tdPe'+i).style.backgroundImage=imagem;
			var parte='<A href="javascript:'+links[i]+'();" id="idLk'+i+'" class='+clLk+' onmouseover="semVolta();">'+itens[i]+'</a>';
			document.getElementById('idAba'+i).innerHTML=parte;
		}
		else
		{
			document.getElementById('tdPe'+i).style.backgroundImage=null;
			var parte='<B>'+itens[i]+'</B>';
			document.getElementById('idAba'+i).innerHTML=parte;
		}
	}
	putMemo('abaAtiva', qual);
}
function semVolta()
{
	try{
		document.FormOS.hVoltando.value=0;
	}catch(e){}
}
function formataSpan(nome, topo,largura)
{
	var vetor=urVetor.getValue();
	var tamFonte=vetor['tamFonte'];
	document.getElementById(nome).style.top=topo+'px';
	document.getElementById(nome).style.left='0px';
	document.getElementById(nome).style.right='0px';
	document.getElementById(nome).style.position='absolute';
	document.getElementById(nome).style.margin='auto';
	document.getElementById(nome).style.width=largura+'px';
	document.getElementById(nome).style.visibility='visible';
	document.getElementById(nome).style.zIndex=5050;
	document.getElementById(nome).style.borderTop='1px solid #000000';
	document.getElementById(nome).style.borderBottom='2px solid #000000';
	document.getElementById(nome).style.borderLeft='1px solid #999999';
	document.getElementById(nome).style.borderRight='2px solid #666666';
	document.getElementById(nome).style.backgroundColor='#C6C6FF';
	document.getElementById(nome).style.zIndex=1010;
	var tabela=document.getElementById(nome).getElementsByTagName('table');
	document.getElementById(nome).style.fontSize=tamFonte+'px';
}
function putMemo(chave,valor)
{
	var vetor=urVetor;
	if (vetor == undefined) vetor='';
	if (vetor == '')
	{
		var comando='vetor={'+chave+':valor};';
		eval(comando);
	}
	else
	{
		vetor[chave]=valor;
	}
	return vetor;
}
function getMemo(chave)
{
	return urVetor[chave];
}
function delMemo(chave)
{
	delete urVetor[chave];
}
function buscaContentEmTagDeSpan(nomeSpan, nomeTag, parm)
{
	var encontrado=0;
	var elemento=document.getElementById(nomeSpan);
	var tags=elemento.getElementsByTagName(nomeTag);
	var idx=-1;
	for (var i=0; i< tags.length; i++)
	{
		var conteudo=tags[i].innerHTML;
		if (conteudo.indexOf(parm) >= 0)
		{
			putMemo('idxParm',i);
			idx=i;
			encontrado=1;
		}
	}
	putMemo('encontrado',encontrado);
	var retorno=tags[idx];
	return retorno;
}
function getElementosLinha()
{
	var linha=getMemo('elementoInsumo');
	if (linha == undefined) return ['semRegistros'];
	var elementos=linha.getElementsByTagName('td');
	var retorno=[elementos.length];
	for (var i=0; i< elementos.length; i++)
	{
		var elemento=elementos[i].getElementsByTagName('span')[0];
		if (elemento == undefined) elemento=elementos[i]; 
		retorno[i]=elemento;
	}
	return retorno;
}
function getElementosDaLinha()
{
	var linha=getMemo('linhaElemento');
	if (linha == undefined) return ['semRegistros'];
	var elementos=linha.getElementsByTagName('td');
	var retorno=[elementos.length];
	for (var i=0; i< elementos.length; i++)
	{
		var elemento=elementos[i].getElementsByTagName('span')[0];
		if (elemento == undefined) elemento=elementos[i]; 
		retorno[i]=elemento;
	}
	return retorno;
}
function getElementosDaLinhaAberta()
{
	var linha=getMemo('linhaAberta');
	if (linha == undefined) return ['semRegistros'];
	var elementos=linha.getElementsByTagName('td');
	var retorno=[elementos.length];
	for (var i=0; i< elementos.length; i++)
	{
		var elemento=elementos[i].getElementsByTagName('span')[0];
		if (elemento == undefined) elemento=elementos[i]; 
		retorno[i]=elemento;
	}
	return retorno;
}
function getLinhaItem(event, elemento, idTabela)
{
	var objeto=document.getElementById(idTabela);
	putMemo('elementoLink', elemento);
	var linhas=objeto.getElementsByTagName('tr');
	for (var i=0; i< linhas.length; i++)
	{
		var colunas=linhas[i].getElementsByTagName('td');
		for (var k=0; k< colunas.length; k++)
		{
			if (colunas[k].getElementsByTagName('span').length > 0)
			{
				try{
					if (colunas[k].childNodes[1].childNodes[1] == elemento)
					{
						retorno=colunas[0].innerHTML;
						putMemo('linhaElemento', linhas[i]);
						putMemo('elementoEdita', colunas[k].getElementsByTagName('span')[0]);
						putMemo('idxElemento', k);
						break;
					}
				}catch(e){}
				try{
					if (colunas[k].childNodes[1].childNodes[0] == elemento)
					{
						retorno=colunas[0].innerHTML;
						putMemo('linhaElemento', linhas[i]);
						putMemo('elementoEdita', colunas[k].getElementsByTagName('span')[0]);
						putMemo('idxElemento', k);
						break;
					}
				}catch(e){}
				try{
					if (colunas[k].childNodes[0].childNodes[0] == elemento)
					{
						retorno=colunas[0].innerHTML;
						putMemo('linhaElemento', linhas[i]);
						putMemo('elementoEdita', colunas[k].childNodes[0].childNodes[0]);
						putMemo('idxElemento', k);
						break;
					}
				}catch(e){}
			}
		}
	}
	putMemo('colunaItem', retorno);
}
function ckVar(que, como)
{
	var retorno=false;
	var ck=getMemo(que);
	if (ck == undefined) return retorno;
	if (ck == como) retorno=true;
	return retorno;
}
function ckTem(que)
{
	var retorno=false;
	var ck=getMemo(que);
	if (ck != undefined) retorno=true;
	return retorno;
}
function getCbTextoSelecionado(elemento,parm)
{
	var idx=getIdxCombo(parm, elemento);
	var opcoes=elemento.options;
	var retorno=opcoes[idx].text;
	return retorno;
}
function setCombo(elemento,parm){
	var idx=getIdxCombo(parm, elemento);
	elemento.options[idx].selected=true;
}
function montaLista(itens, campos, idxCols, cabs, idTab, centrar, header, linkAbre)
{
	var a1=linkAbre[0];
	var a2=linkAbre[1];
	var parte='<table id="'+idTab+'">';
	var nColunas=campos.length;
	if (header == 1){
		parte+='<tr>';
		for (var i=0; i< nColunas; i++){
			parte+='<th align="center">'+cabs[i]+'</th>';
		}
		parte+='</tr>';
	}
	var labels=[];
	for (var i=0; i< itens.length; i++){
		var c=itens[i];
		if (i == 0)
			for (var j in c){
				labels[labels.length]=j;
			}
		if (ckTem('sortLabels')){
			labels=labels.sort();
			delMemo('sortLabels');
			putMemo('getCId', 'S');
		}
		parte+='<tr>';
		for (var k=0; k< nColunas; k++){
			var id=c[labels[0]];
			if (ckTem('getCId')){
				id=c.id;
			}
			if (a1 != '') a1=linkAbre[0].replace('codigoregistro',id);
			var idxColuna=idxCols[k];
			var align='left';
			if (centrar[k] == 1) align='center';
			if (centrar[k] == 2) align='right';
			var chave=labels[idxColuna];
			parte+='<td align="'+align+'">'+a1+c[chave]+a2+'</td>';
		}
		parte+='</tr>';
	}
	delMemo('getCId');
	parte+='</table>';
	return parte;
}
function trocaConteudoDeCelula(idTabela, stringBusca, novaString)
{
	var tabela=document.getElementById(idTabela);
	var linhas=tabela.getElementsByTagName('tr');
	for (var j=0; j< linhas.length; j++){
		var linha=linhas[j];
		var coluna=linha.getElementsByTagName('td');
		for (var k=0; k< coluna.length; k++){
			if (coluna[k].innerHTML == stringBusca){
				coluna[k].innerHTML=novaString;
			}
		}
	}
}
function getDataHoje()
{
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
}
function getSpanLogin()
{
	var negocio='ajax/JSONgetLogin.jsonx';
	var funcao='';
	var parms='&nosuf=S';
	putMemo('retornoAx', 'retornoGetLogin');
	chamaJSon(negocio,funcao,parms);
}
function retornoGetLogin(dados)
{
	var login=dados.login
	var database=dados.database;
	putMemo('spanLogin', login);
	putMemo('spanDatabase', database);
	try {
		var dat=database.substring(0,3);
		var parte='<a href="#" title="'+dat+'" alt="'+dat+'" class="p">'+login+'</a>';
		document.getElementById('spanLogin').innerHTML=parte;
	} catch(e){}
}
String.prototype.addLista = function(elemento)
{
	var lista=this.toString();
	var elementos=lista.split(",");
	if (!estaIstoNaquilo(elemento,elementos)){
		if (lista != ''){
			lista+=',';
		}
		lista+=elemento;
	}
	return lista
}
String.prototype.remLista = function(elemento)
{
	var lista=this.toString();
	var elementos=lista.split(",");
	if (estaIstoNaquilo(elemento,elementos)){
		lista=','+lista+',';
		var padrao=','+elemento+',';
		lista=lista.replace(padrao, ',');
		if (lista.charAt(0) == ','){
			lista=lista.substring(1, lista.length);
		}
		var n=lista.length;
		if (lista.charAt(n-1) == ','){
			lista=lista.substring(0, lista.length-1);
		}
	}
	return lista;
}
String.prototype.dtNumGent = function() {
	var retorno="";
	var parm=this.toString();
	if (parm.length > 9)
    {
        retorno=parm.substring(8,10)+"/"+parm.substring(5, 7)+"/"+parm.substring(0, 4);
    }
    return retorno;
}
String.prototype.dtGentNum = function() {
	var retorno="";
	var parm=this.toString();
    if (parm.length > 9)
    {
        retorno=parm.substring(6,10)+"-"+parm.substring(3, 5)+"-"+parm.substring(0, 2);
    }
    return retorno;
}
function getTelaEditRemove(dados, fucaoEdita, funcaoApaga)
{
	var parte='<span id="spanTit">';
	parte+='<a href="javascript:fechaFloat(\'spanHid\');" style="background: #DC7003;border: 1px solid black; float: right;"><font color=White face="Arial">x</font></a>';
	if (ckTem('botsFloat')){
		parte+=getMemo('botsFloat');
		delMemo('botsFloat');
	}
	parte+='<br>';
	parte+='</span><br>';
	parte+='<table width="100%" id="idTbAuto" style="margin-bottom: 10px;">';
	var n=dados.length;
	for (var i = 0; i < dados.length; i++) {
		classe=dados[i];
		var valor=classe.codigo;
		if (ckTem('praId')){
			valor=classe.id;
		}
		parte+=' <tr>';
		parte+='  <td align="left">';
		parte+='   <a href="javascript:'+fucaoEdita+'('+valor+');" class="z">'+classe.nome+'</a>';
		parte+='  </td>';
		parte+='  <td align="center">';
		parte+='   <a href="javascript:'+funcaoApaga+'('+valor+');" class="z"><img src="imagens/excluir.gif" border="0"></a>';
		parte+='  </td>';
		parte+=' </tr>';
	}
	parte+=' <tr>';
	parte+='</table>';
	parte+='<br>';
	delMemo('praId');
	return parte;
}
function getTelaEditaNome(dados, label, funcaoGrava, size, max)
{
	var parte='<span id="spanTit">';
	parte+='<a href="javascript:fechaFloat(\'spanHid\');" style="background: #DC7003;border: 1px solid black; float: right;"><font color=White face="Arial">x</font></a><br>';
	parte+='</span><br>';
	parte+='<table width="100%" id="idTbClE" style="margin-bottom: 10px;">';
	parte+=' <tr>';
	parte+='  <td align="left">';
	parte+=label;
	parte+='  </td>';
	parte+='  <td align="left">';
	var pteip='<input type="text" value="'+dados.nome+'" id="tNomeEditando" size="'+size+'" maxlength="'+max+'">';
	if (ckTem('setEnNumerico')){
		pteip='<input type="text" value="'+dados.nome+'" id="tNomeEditando" size="'+size+'" maxlength="'+max+'" onkeydown="javascript:doMask(this, \'number\', event, true);">';
		delMemo('setEnNumerico');
	}
	if (ckTem('setEnReal')){
		pteip='<input type="text" value="'+dados.nome+'" id="tNomeEditando" size="'+size+'" maxlength="'+max+'" onkeydown="javascript:doMask(this, \'number\', event, false);">';
		delMemo('setEnReal');
	}
	if (ckTem('setEnDatal')){
		pteip='<input type="text" value="'+dados.nome+'" id="tNomeEditando" size="'+size+'" maxlength="'+max+'" onkeydown="javascript:doMask(this, \'date\', event, true);">';
		delMemo('setEnDatal');
	}
	parte+=pteip;
	parte+='  </td>';
	parte+=' </tr>';
	parte+=' <tr>';
	parte+='  <td align="center" colspan="2">';
	parte+='<button onclick="'+funcaoGrava+'();">Gravar</button>';
	parte+='  </td>';
	parte+=' </tr>';
	parte+='</table>';
	return parte;
}
function getTelaEdit(dados)
{
	var parte="";
	for (var i = 0; i < dados.length; i++) {
		parte+='<div class="row">';
		var linha=dados[i];
		var elementos=linha;
		for (var j = 0; j < elementos.length; j++) {
			var elemento=elementos[j];
			var col=elemento.cols.split(",");
			parte+='<div class="';
			if (col[0] == 'h'){
				parte+='hidden-xs';
			} else {
				parte+='col-xs-'+col[0];
			}
			if (col[1] == 'h'){
				parte+=' hidden-sm';
			} else {
				parte+=' col-sm-'+col[1];
			}
			if (col[2] == 'h'){
				parte+=' hidden-md';
			} else {
				parte+=' col-md-'+col[2];
			}
			if (col[3] == 'h'){
				parte+=' hidden-lg';
			} else {
				parte+=' col-lg-'+col[3];
			}
			parte+='">';
			var flot=elemento.flot;
			var fl='';
			if (flot == 'r'){
				fl=' style="float: right;"';
			} else {
				fl=' style="float: left;"';
			}
			var dado=elemento.valor;
			if (elemento.lcsmfe != ''){
				var scripGravacao='urNada';
				if (ckTem('memoScripGravacao')){
					scripGravacao=getMemo('memoScripGravacao');
				}
				var classeLk='z';
				if (ckTem('classeLk')){
					classeLk=getMemo('classeLk');
				}
				var termos=elemento.lcsmfe.split(",");
				var label=termos[0];
				var campo=termos[1];
				var tam=termos[2];
				var maxtam=termos[3];
				var formatacao=termos[4];
				var info=termos[5];
				dado='<span id="'+campo+'"'+fl+'><A href="javascript:'+scripGravacao+'(\''+campo+'\',\''+tam+'\',\''+maxtam+'\',\''+formatacao+'\');" class="'+classeLk+'">'+elemento.valor+'</A></span> <span id="'+info+'"></span>';
				parte+=dado;
			} else {
				if (flot == 'r'){
					parte+='<span style="float: right;">'+dado+'</span>';
				} else {
					parte+=dado;
				}
			}
			parte+='</div>';
		}
		
		parte+='</div>';
	}
	return parte;
}
function setTel()
{
	var cols='';
	var flot='';
	var lcsmfe='';
	var valor='';
	var elemento=new Array();
	var elementos=new Array();
	var linha=new Array();
	
	this.setCols=function(val){
		cols=val;
		lcsmfe='';
		flot='';
	}
	this.setFlot=function(val){
		flot=val;
	}
	this.setValor=function(val){
		valor=val;
		elemento={'cols' : cols,'flot' : flot, 'valor' : valor, 'lcsmfe':lcsmfe}
		elementos[elementos.length]=elemento;
	}
	this.createLinha=function(){
		linha[linha.length]=elementos;
		elementos=new Array();
	}
	
	this.getCols=function(){
		return cols;
	}
	this.getFlot=function(){
		return flot;
	}
	this.getElemento=function(){
		return elemento;
	}
	this.getElementos=function(){
		return elementos;
	}
	this.getLinha=function(){
		return linha;
	}
	this.getLcsmfe=function(){
		return lcsmfe;
	}
	this.setLcsmfe=function(val){
		lcsmfe=val;
	}
}
String.prototype.putJanela = function() {
	var retorno="";
	var parm=this.toString();
	retorno=parm;
    if (parm == 'null')
    {
        retorno="editar";
    }
    if (parm == "")
    {
        retorno="editar";
    }
    if (parm == "undefined")
    {
        retorno="editar";
    }
    return retorno;
}
function getJson(dados)
{
	var parte='{';
	for (var i=0; i<dados.length; i++)
	{
	  if (parte != '{') parte+=',';
	  var campo=dados[i];
	  var nome=campo.codigo;
	  var valor=campo.nome;
	  parte+='"'+nome+'":"'+valor+'"';
	}
	parte+='}';
	return JSON.parse(parte);
}
function getHoje()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd
	} 
	if(mm<10){
	    mm='0'+mm
	}
	var hora=today.getHours();
	var minuto=today.getMinutes();
	if (hora < 10){
		hora='0'+hora;
	}
	if (minuto<10){
		minuto="0"+minuto;
	}
	var today = dd+'/'+mm+'/'+yyyy+' '+hora+":"+minuto;
	return today;
}
function encodeParms(parms)
{
	var retorno='';
	var pares=parms.split('&');
	for (var i=0; i< pares.length; i++){
		if (pares[i].split('=').length == 2){
			var igs=pares[i].split('=');
			var valor=URLEncode(igs[1]);
			retorno+='&'+igs[0]+'='+valor;
		}
	}
	return retorno;
}
function setValorBusca(talSpan, valor)
{
    var nomeSav=talSpan+'MemoSAV';
    if (!ckTem(nomeSav)){
        var conteudoSalvando=document.getElementById(talSpan).innerHTML;
        putMemo(nomeSav, conteudoSalvando);
    }
    var pondo='<a href="javascript:voltaEditar(\''+talSpan+'\');" class="z">'+valor+'<a>';
    document.getElementById(talSpan).innerHTML=pondo;
}
function voltaEditar(talSpan)
{
    var nomeSav=talSpan+'MemoSAV';
    var valorRetorno=getMemo(nomeSav);
    document.getElementById(talSpan).innerHTML=valorRetorno;
    delMemo(nomeSav);
    var nomeDados=talSpan+'Dados';
    delMemo(nomeDados);
}
function setInteiro(elemento, event)
{
    var inteiros='0123456789';
    var valorCampo=elemento.value;
    var anterior=valorCampo.substring(0, valorCampo.length-1);
    var atual=valorCampo.substring(valorCampo.length-1, valorCampo.length);
    if (inteiros.indexOf(atual) < 0){
        elemento.value=anterior;
    }
}
function consisteParcelasCondicaoPagamento(parm)
{
    var consistido=true;
    var inteiros='0123456789';
    var termos=parm.split('/');
    for (var i=0; i< termos.length; i++){
        var item=termos[i];
        var n=item.length;
        for (var k=0; k< n; k++){
            var dig=item.substring(i, i+1);
            if (inteiros.indexOf(dig) < 0){
                consistido=false;
            }
        }
    }
    return consistido;
}
function resetAberta(){
	if (ckTem('volta')){
		var jan=getMemo('volta');
		document.getElementById(jan.nome).innerHTML=jan.cont;
		delMemo('volta');
	}
	if (ckTem('apagaAoVoltar')){
	    var nome=getMemo('apagaAoVoltar');
	    delMemo(nome);
	    delMemo('apagaAoVoltar');
	}
	if (ckTem('callBackScript')){
	    var cmd=getMemo('callBackScript')+'();';
	    eval(cmd);
	    delMemo('callBackScript')
	}
}
function setAberta(newJan){
	if (ckTem('volta')){
		var jan=getMemo('volta');
		document.getElementById(jan.nome).innerHTML=jan.cont;
		delMemo('volta');
	}
	putMemo('volta',{"nome":newJan,"cont":document.getElementById(newJan).innerHTML});
}
function getEstados(){
	var estados='{"ufs":[ {"sigla":"AC","nome":"Acre"}, {"sigla":"AL","nome":"Alagoas"}, {"sigla":"AM","nome":"Amazonas"}, {"sigla":"AP","nome":"Amap&aacute;"}, {"sigla":"BA","nome":"Bahia"}, {"sigla":"CE","nome":"Cear&aacute;"}, {"sigla":"DF","nome":"Distrito Federal"}, {"sigla":"ES","nome":"Esp&iacute;rito Santo"}, {"sigla":"GO","nome":"Goi&aacute;s"}, {"sigla":"MA","nome":"Maranh&atilde;o"}, {"sigla":"MG","nome":"Minas Gerais"}, {"sigla":"MS","nome":"Mato Grosso do Sul"}, {"sigla":"MT","nome":"Mato Grosso"}, {"sigla":"PA","nome":"Par&aacute;"}, {"sigla":"PB","nome":"Paraiba"}, {"sigla":"PE","nome":"Pernambuco"}, {"sigla":"PI","nome":"Piau&iacute;"}, {"sigla":"PR","nome":"Paran&aacute;"}, {"sigla":"RJ","nome":"Rio de Janeiro"}, {"sigla":"RN","nome":"Rio Grande do Norte"}, {"sigla":"RO","nome":"Rond&ocirc;nia"}, {"sigla":"RR","nome":"Roraima"}, {"sigla":"RS","nome":"Rio Grande do Sul"}, {"sigla":"SC","nome":"Santa Catarina"}, {"sigla":"SE","nome":"Sergipe"}, {"sigla":"SP","nome":"S&atilde;o Paulo"}, {"sigla":"TO","nome":"Tocantins"}]}';
	estados=JSON.parse(estados);
	return estados;
}
function setTableInSpan(span,espaco){
	var corpo=document.getElementById(span);
	var tds=corpo.getElementsByTagName('td');
	for (i=0; i< tds.length; i++)
	{
	  tds[i].style.padding=espaco+'px';
	}
}
function getCombo(lista,nomeId,nomeNome,nomeCombo,selecionado,valorBlank){
	var parte='<select id="'+nomeCombo+'" size="1">';
	if (valorBlank != ''){
		parte+='<option value="">'+valorBlank+'</option>';
	}
	var n=lista.length;
	for (var i=0; i< n; i++){
		var item=lista[i];
		var cmd='var cod=item.'+nomeId+';';
		eval(cmd);
		cmd='var nom=item.'+nomeNome+';';
		eval(cmd);
		var sel='';
		if (selecionado != ''){
			if (cod == selecionado){
				sel=' selected';
			}
		}
		parte+='<option value="'+cod+'"'+sel+'>'+nom+'</option>';
	}
	parte+='</select>';
	return parte;
}
