from flask import Flask, render_template, redirect, url_for, flash, request
import fdb

app = Flask(__name__)

host = 'localhost'
database = r'C:\Users\Aluno\Documents\wepay_dados\WePay.FDB'
user = 'SYSDBA'
password = 'sysdba'

con = fdb.connect(host=host, database=database, user=user, password=password)

class Usuario:
    def __init__(self, id_usuario, nome, telefone, email):
        self.id_usuario = id_usuario
        self.nome = nome
        self.telefone = telefone
        self.email = email

class Despesa:
    def __init__(self, id_despesa, id_usuario, preco, descricao):
        self.id_despesa = id_despesa
        self.id_usuario = id_usuario
        self.preco = preco
        self.descricao = descricao

class Receita:
    def __init__(self, id_receita, id_usuario, preco, descricao):
        self.id_receita = id_receita
        self.id_usuario = id_usuario
        self.preco = preco
        self.descricao = descricao

@app.route('/')
def index():
    cursor = con.cursor()
    cursor.execute("SELECT id_usuario, nome, telefone, email FROM USUARIO")
    USUARIO = cursor.fetchall()
    cursor.close()
    return render_template('index.html', usuario=USUARIO)

@app.route('/criar', methods=['POST'])
def criar():
    nome = request.form['nome']
    telefone = request.form['Telefone']
    email = request.form['Email']

    # Criando o cursor
    cursor = con.cursor()

    try:
        # Verificar se o usuário já existe
        cursor.execute("SELECT 1 FROM usuario WHERE NOME = ?", (nome,))
        if cursor.fetchone():  # Se existir algum registro
            flash("Erro: usuário já cadastrado.", "error")
            return redirect(url_for('novo'))

        # Inserir o novo usuário
        cursor.execute(
            "INSERT INTO usuario (NOME, TELEFONE, EMAIL) VALUES (?, ?, ?)",
            (nome, telefone, email)
        )
        con.commit()
    finally:
        # Fechar o cursor manualmente, mesmo que haja erro
        cursor.close()

    flash("Usuário cadastrado com sucesso!", "success")
#     return redirect(url_for('index'))


#
# # Aperta o play
if __name__ == '__main__':
    app.run(debug=True)