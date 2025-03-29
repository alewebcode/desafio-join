# :desktop_computer: Instalação e Execução


## Backend:
```bash
  #Adicionar no arquivo .env  as configurações do banco.
  #Para facilitar no repositório do backend existe o arquivo.env.example,é só substituir por essa parte abaixo.
  DB_CONNECTION=pgsql
  DB_HOST=postgres
  DB_PORT=5432
  DB_DATABASE=app-join
  DB_USERNAME=root
  DB_PASSWORD=root

  #subir os containers laravel e postgre
   cd backend
   docker compose up -d

  #executar as migrations no banco
   docker exec laravelapp php artisan migrate
```

## Frontend:
```bash
  #Instalar dependências e rodar no cliente
  cd frontend
  npm install
  
  #Iniciar a aplicação
  npm run dev

 Acesse http://localhost:3000 para ver o frontend.
```

