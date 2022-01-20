![](https://raw.githubusercontent.com/dankas/SMI_IFSul/main/extras/img/IFSulmonitor.png)
# Sistema de Monitoramento da Infraestrutura

S.M.I é o projeto de um sistema de gerenciamento e monitoramento da infraestrutura do IFSul Campus Pelotas, disponibilizando de maneira centralizada uma visão integrada da infraestrutura do campus tanto em tempo real quanto em datasets do estado ao longo do tempo.



## Web API

A interface com os equipamentos de sensoriamento é realizada através de uma api restful implementada usando o framework [Loopback](https://github.com/strongloop/loopback), escrito em typescript e rodando em nodeJS.   Os dados são persistindo em um banco de dados SQL. 

#### Instalar e Rodar:

1. Crie um banco de dados chamado smi_db, crie e configure o arquivo **.env**  com as informações de conexão do banco 

   ```
   DB_USR= <usuário>
   DB_PSW= <senha>
   DB_HOST=localhost
   ```

2. Instale aplicação com `npm install`

3. Rode a pré migração com `npm run premigrate`

4. Rode a migração dos modelos com `npm run migrate`

5. Rode a aplicação com `npm start` e abra o no navegador http://127.0.0.1:8004



## Visualização.

Para visualização dos dados usa-se grafana configurado para consumir a web API



![](https://raw.githubusercontent.com/dankas/SMI_IFSul/main/extras/img/grafana.png)





