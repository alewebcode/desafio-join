# :desktop_computer: Instalação e Execução


## Backend:
```bash
  #adicionar no arquivo .env  as configurações para rodar o banco
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

