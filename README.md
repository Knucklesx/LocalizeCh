# LocalizeCh

## Descrição


## Tecnologias
- Angular
- .Net
- SQL Server


## Como rodar o projeto
1. Clone o repositório (git clone {code do projeto});
2. Abra o projeto na sua IDE;
3. Abra o terminal na pasta LocalizeAPI;
4. É necessário criar um arquivo .env na pasta LocalizeApi
  4.1. Este arquivo deve ter um valor para CONNECTION_STRING, um valor de SA_PASSWORD e um valor MSSQL_DATABASE
5. Rode os comandos `docker compose up -d`, `dotnet ef migrations add 1st`, `dotnet ef database update` e `dotnet run`, nessa ordem.
6. Abra um terminal na pasta LocalizeFront;
7. Rode o comando `npm install`;
8. Rode o comando `ng serve`;
9. Abra o navegador e acesse `http://localhost:4200`;
10. Na primeira vez que se roda o projeto é criado um usuário com e-mail usuario1@gmail.com e senha 1. Este usuário está no arquivo BretonContext.cs.
11. O login deve ser feito, na primeira vez, com esse usuário/senha. Posteriormente é possível criar novos usuários.

## Autor
- [Gustavo Facchinetti](https://www.linkedin.com/in/gustavo-facchinetti/)
