function goAcesso(){
	db = window.openDatabase("DbPesqNotas", "1.0", "DbPesqNotas", 10);
	db.transaction(setDB, erroOpen, sucesso); 
}
function erroOpen(erro){
	alert("Erro set database..."+erro.code+":"+erro.message);
}
function sucesso(){
	checaLogin();
}
function setDB(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS pesqnotas (id integer primary key, pasta text)');
}

function checaLogin(){
    db.transaction(getRegistro, errorCheca);
}
function errorCheca(erro){
	alert("Erro lendo registros..."+erro.code+":"+erro.message);
}
function getRegistro(tx){
	tx.executeSql('SELECT * FROM pesqnotas', [], dbSucesso, dbErro);
}
function dbErro(erro){
	alert("Erro lendo login..."+erro.code+":"+erro.message);
}
function dbSucesso(tx, results){
	var n=results.rows.length;
	var mensagem ="Temos "+n+" registros, saltar login...";
	if (n == 0){
		location.href="config.html";
	} else {
		location.href="menu.html";
	}
}
