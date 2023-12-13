import express from 'express';

import path from 'path';

import cookieParser from 'cookie-parser';

import session from 'express-session';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios=[];
var listaMensagens=[];

function processarCadastro(requisicao,resposta)
{
     // extrair os dados do corpo da requisição, além de validar os dados
     const dados = requisicao.body;
     let conteudoResposta = '';
     
     if (!(dados.nome && dados.data_nas && dados.nickname)) 
        {
            conteudoResposta = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>CADASTRO DE USUÁRIO</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                        <style>
                            body {
                                background-color: black;
                                color: white;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 100vh;
                                margin: 0;
                            }

                            .container {
                                width: 400px;
                                padding: 20px;
                                background-color: #333;
                                border-radius: 15px;
                                box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                            }

                            .form-label {
                                color: white;
                            }

                            .form-control {
                                background-color: #444;
                                color: white;
                                border: 1px solid #666;
                            }

                            .btn-danger {
                                background-color: #dc3545;
                                border-color: #dc3545;
                            }

                            .btn-danger:hover {
                                background-color: #c82333;
                                border-color: #bd2130;
                            }
                        </style>
                    </head>
                <body>        
                    <div class="container">
                        <form action="/Cadastrados" method='POST' class="row g-3 needs-validation g-3" novalidate >
                        <!-- <fieldset class="border p-2">-->
                            <legend class="mb-3" style="text-align: center;">CADASTRO DE USUÁRIO</legend>                            
                            <div class="col-md">
                            <label for="" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required>
                            </div>
                `;
                if (!dados.nome){
                    conteudoResposta +=
                        `
                            <div>
                            <p class="text-danger">Por favor, informe o nome!</p>
                            </div>  `;}
                conteudoResposta +=`
                            <div class="col-md">
                            <label for="data_nas" class="form-label">Data de nascimento</label>
                            <input type="date" class="form-control" id="data_nas" name="data_nas" value="${dados.data_nas}" required>
                            </div>
                            `;
                if (!dados.sobrenome){
                    conteudoResposta += `
                            <div>
                            <p class="text-danger">Por favor, informe sua data de nascimento!</p>
                            </div>`;}
        
                    conteudoResposta +=`
                            <div class="col-md">
                            <label for="nickname" class="form-label">Nickname</label>
                            <div class="input-group has-validation">
                            <input type="tel" class="form-control" id="nickname" name="nickname" aria-describedby="inputGroupPrepend" value="${dados.nickname}" required>
                            </div>`;
                    if (!dados.tel){   
                        conteudoResposta+=`             
                                <div>
                                <p class="text-danger">Por favor, informe o seu nickname!</p>
                                </div>`;}
                    
                            conteudoResposta += `
                            <div class="col-12 mt-4"></div>              
                            <div class="d-grid gap-2 col-6 mx-auto">
                            <button class=" btn btn-outline-info" style="font-size: larger;"type="submit">Cadastrar</button>
                            </div>                            
                        </form>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                    </body>
                    </html>`;
                    resposta.end(conteudoResposta);
        } 
        else
        {            
            const usuario = {
                                nome: dados.nome,
                                data_nas: dados.data_nas,
                                nickname: dados.nickname                           
                            }

            //adiciona um nome usuario na lista de usuarios ja cadastrados
            listaUsuarios.push(usuario);

            //retornar a lista de usuarios

            conteudoResposta = `
            <!DOCTYPE html>
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    <title>LISTA DE USUÁRIOS </title>
                </head>
                <body>
                    <h1 style="text-align: center; color:black">LISTA DE USUÁRIOS</h1>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">NOME</th>
                                <th scope="col">DATA DE NASCIMENTO</th>
                                <th scope="col">NICKNAME</th>             
                            </tr>
                        </thead>   
                        <tbody>`; 
                        
                for (const usuario of listaUsuarios)
                    {
                        conteudoResposta += `
                            <tr>
                                <td>${usuario.nome}</td>
                                <td>${usuario.data_nas}</td>
                                <td>${usuario.nickname}</td>
                                
                            </tr>
                            `;
                    }
                conteudoResposta +=`
                            </tbody>
                        </table>
                        <a class="btn btn-outline-info" href="/" role="button">MENU</a>
                        <a class="btn btn-outline-info" href="/Form_User.html" role="button">Cadastro de Usuário</a>
                    </body>
                
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                    </html> `;  
                    resposta.end(conteudoResposta);
        } //fim else
}


//pseudo middleware
function autenticar(requisicao,resposta,next)
{
    if (requisicao.session.usuarioAutenticado){
        next();
    }
    else {
        resposta.redirect("/login.html")
    }

}


const app = express();

//ativando a funcionalidade de manipular cookies
app.use(cookieParser());

//adicionar uma nova capacidade para essa aplicacao: memorizar com quem o servidor esta falando
// durante o uso do sistema, a aplicacao sabera, dentro de uma aplicacao valida, com quem ela se comunica
app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave: true, //atualiza a sessao mesmo que nao haja alteracoes a cada requisicao
    saveUninitialized: true,
    cookie: {
        //tempo de vida da sessao
        maxAge: 1000 *60 *15 //15 minutos   
    }
}));

//ativar a extensão que manipula requisisões HTTP
//opção false ativa a extensão querystring
//opção true ativa a extensão qs (manipula objetos (lista, aninhados))
app.use(express.urlencoded({ extended: true }));


//indicando para a aplicacao como servir arquivo estaticos localizados na pasta 'paginas'
app.use(express.static(path.join(process.cwd(),'paginas')));

//pagina inicial
app.get('/',autenticar,(requisicao,resposta) =>{

    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso",data.toLocaleDateString() + " " + data.toLocaleTimeString(),
    {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });
    resposta.end(`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MENU</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <style>
            body {
                background-color: black;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                font-family: 'Arial', sans-serif;
            }
    
            .container {
                width: 400px;
                padding: 20px;
                background-color: #333;
                border-radius: 15px;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                margin-top: 40px;
            }
    
            .legend {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #dc3545;
            }
    
            .menu-link {
                display: block;
                padding: 10px 0;
                color: white;
                text-decoration: none;
                transition: background-color 0.3s;
            }
    
            .menu-link:hover {
                background-color: #555;
            }
    
            footer {
                text-align: center;
                margin-top: auto;
                padding: 10px;
                background-color: #333;
                color: white;
                width: 100%;
            }
            
        </style>
        </head>
        <body style="display: flex; flex-direction: column; min-height: 100vh;">            
            <div class="container">
            <legend class="mb-3" style="text-align: center;">MENU</legend>
            <a href="/Form_User.html" class="menu-link">Cadastro de Usuários</a>
            <a href="/Bate_Papo" class="menu-link">Bate-papo</a>
            </div>                       
            <footer>    
            <p>&copy; 2023 Nátaly Lara Moraes da Silva | PPI | UNOESTE | BATE-PAPO | <br>
            Seu ultimo acesso foi em ${dataUltimoAcesso}</p>    
            </footer>
        </body> 
    </html>         
    `);
})

//endepoint login que ira processar o login da aplicacao 
app.post('/login', (requisicao,resposta) => 
{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

    if (usuario && senha && (usuario === 'nataly') && (senha === '12345'))
    {
        requisicao.session.usuarioAutenticado = true;
        resposta.redirect('/');
    }
    else {
        resposta.end(`
        <!DOCTYPE html>
            <head>
                <meta charset= "UTF-8">
                <title> FALHA NA  AUTENTICAÇÃO</title>
                <style>
                body {
                    background-color: black;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    font-family: 'Arial', sans-serif;
                }
        
                .container {
                    width: 400px;
                    padding: 20px;
                    background-color: #333;
                    border-radius: 15px;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                    margin-top: 40px;
                }
            
                </style>
            </head>
            <body>
                <div class="container">               
                    <h2>Usuarios e senha invalidos !!</h2>
                    <a href="/login.html">Voltar ao LOGIN</a>                
                </div>
            </body> 
        </html>            
        `)
    }});


    app.set('view engine', 'ejs');

    app.get('/Bate_Papo', autenticar, (requisicao, resposta) => {
        resposta.render('Bate_Papo', { listaUsuarios, listaMensagens });
    });
    
    app.post('/enviarMensagem', autenticar, (requisicao, resposta) => {
        const { usuario, mensagem } = requisicao.body;
    
        const novaMensagem = {
            usuario,
            texto: mensagem,
            data: new Date().toLocaleString(),
        };
        listaMensagens.push(novaMensagem);
    
        resposta.redirect('/Bate_Papo');
    });


//rota para processar o cadastro de usuarios endpont = '/CadastraUsuario'

app.post('/Cadastrados',autenticar, processarCadastro);
//primeiro foi get, agora e post 

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
})

