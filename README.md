# :desktop_computer: Instalação e Execução


## Backend:
```bash
  #subir os containers laravel e postgre
   cd backend
   docker compose up 
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

