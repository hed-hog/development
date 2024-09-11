# Como criar um novo módulo?

- 1. nest generate library name: cria um novo módulo pela CLI do Nest.
- 2. Após o desenvolvimento do módulo, copie o migration dele para dentro da pasta api e execute o comando "npm run migrate:up".
- 3. Dentro da pasta lib, execute "npx prisma:update".

# Como publicar um módulo?

- 1. Execute o comando "npm run prod".

# Como testar um módulo publicado?

- 1. Acesse o diretório da api, execute o comando "npm i -g @hedhog/cli" e "hedhog add moduleName".
- 2. Se o módulo possui migrations, execute o comando "npm run migrate:up".
- 3. Atualize os arquivos "package.json", "tsconfig.production.json", "nest-cli.json", "tsconfig.json".
- 4. Aplique as devDependencies como peerDependencies.
