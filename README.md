# Backend TCC
Backend do TCC utilizando Watson API pela IBM
## Getting Started
Siga a documentação abaixo para conseguir iniciar o projeto com sucesso.
### Prerequisites
É necessário ter instalado na máquina o [NodeJs](https://nodejs.org/en/) e o [Git](https://git-scm.com/).
<br/>
Após a instalação do NodeJs e do Git, rode o comando `git clone https://github.com/VictorCandido/backend-tcc.git` no seu terminal.
<br/>
Após dar o clone, abrir arquivo `.env.example` no diretório principal e editar as seguintes linhas:
```
ASSISTANT_APIKEY=ui8U6Yzl8HY7z4i596h-Lu8AttHJAyoyvZlfk0Hj_j5y
TRANSLATOR_APIKEY=aHUhZI3zoGOeGwgnuqcp5Jf9rYuBzdd3R7RHlCyirA6t
UNDERSTANDING_APIKEY=iARlYy-vvf74vAQvTVXC5L0ncet3PkYhUv_d4NHw0dVY
SPEECH_TO_TEXT_APIKEY=xyyowCaDVc3bjk_bmZIRCrm9W4F_8vaB-0S8gIj1sixQ
WIKIPEDIA_APIKEY=simeaMPY9/hTQF0RVQLk7uOXo1J1
GOOGLE_APIKEY=AIzaSyBLgzo6tvD1RZIyy0qbdjppFohH8wMEO6k

ASSISTANT_URL=https://gateway.watsonplatform.net/assistant/api
UNDERSTANDING_URL=https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/6bb11dd3-34df-4557-b22c-99d436142f9f
TRANSLATOR_URL=https://api.us-south.language-translator.watson.cloud.ibm.com/instances/b5780da2-f712-4bcc-8995-83f05e8e2fce
SPEECH_TO_TEXT_URL=https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/e335f390-19bb-4244-a707-1a782444e85b

WORKSPACE_ID=2a055289-e59a-4ebb-8942-8457dd0f9a10
VERSION=2020-04-01
```
Após a edição, deve salvar (ou mudar o nome do arquivo) como `.env` apenas.
### Installing
Será necessário instalar todos os repositórios antes de rodar o serviço. Para isso, basta rodar:
```
npm install
```
### Executing
Para executar a aplicação, basta rodar o comando:
```
npm start
```
ou até mesmo:
```
node .
```
## API usage
Siga as instruções abaixo para usar a API com o chatbot Watson
### Starting conversation
Para iniciar a conversa com o chatbot e receber a mensagem inicial, faça uma requisição do tipo `GET` para a URL
```
http://localhost:3333/api/chatbot
```
### Continuing the conversation
Para continuar a conversa com o bot, é necessário fazer uma requisição do tipo `POST` para a URL
```
http://localhost:3333/api/chatbot
```
Porém, agora, é necessário passar 2 parametros no corpo da requisição:
* **input**. Deve conter o texto de entrada do usuário;
* **context**. Deve conter o contexto retornado na requisição anterior pelo chatbot, para que ele saiba o que responder logo em seguida.

Exemplo do corpo da requisição:
```
{
	"input": {
		"text": "O que você pode fazer?"
	},
	"context": {
        "conversation_id": "2f08c97b-6459-49e1-a06a-2a185afbdce5",
        "system": {
            "initialized": true,
            "dialog_stack": [
                {
                    "dialog_node": "root"
                }
            ],
            "dialog_turn_counter": 1,
            "dialog_request_counter": 1,
            "_node_output_map": {
                "Bem-vindo": {
                    "0": [
                        0,
                        1,
                        2,
                        0
                    ]
                }
            },
            "last_branch_node": "Bem-vindo",
            "branch_exited": true,
            "branch_exited_reason": "completed"
        }
    }
}
```
Toda vez que for feita uma requisição `POST` para a API, será retornada um contexto. O mesmo deverá ser passado como parâmetro, de forma com que o bot nunca se perca durante a conversa.
