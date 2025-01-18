### **Tech Challenge - Fase 2 - FIAP**  

---

### **Índice**  
1. [Descrição do Projeto](#descrição-do-projeto)  
2. [Pré-requisitos](#pré-requisitos)  
3. [Estrutura do Projeto](#estrutura-do-projeto)  
4. [Como Rodar o Projeto](#como-rodar-o-projeto)  
   - [Subir os Containers](#subir-os-containers)  
   - [Acessar os Microfrontends e API](#acessar-os-microfrontends-e-api)  
5. [Comandos Úteis](#comandos-úteis)  

---

### **Descrição do Projeto**  
Este projeto é uma aplicação composta por:  
- Uma API backend (`api-tech-challenge`) utilizando Node.js.  
- Dois microfrontends (`dashboard` e `welcome`) utilizando React.  

Cada serviço é containerizado e orquestrado com Docker Compose para facilitar a execução.  

---

### **Pré-requisitos**  
Antes de iniciar, certifique-se de ter instalado:  

- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

---

### **Estrutura do Projeto**  

```plaintext
root/
├── api-tech-challenge/    # Diretório da API Node.js (porta 8080)
├── dashboard/             # Microfrontend Dashboard (porta 3003)
├── welcome/               # Microfrontend Welcome (porta 3000)
└── docker-compose.yml     # Configuração Docker Compose
```  

---

### **Como Rodar o Projeto**  

#### **Subir os Containers**  

1. Clone o repositório e navegue até a pasta raiz:  

   ```bash
   git clone https://github.com/CarolBastos/tech-challenge-fase2.git
   cd tech-challenge-fase2
   ```  

2. Construa e inicie os serviços:  

   ```bash
   docker-compose up --build
   ```  

3. O Docker Compose fará o build das imagens e iniciará todos os serviços. 

---

### **Acessar os Microfrontends e API**  

- **Microfrontend Welcome:** [http://localhost:3000](http://localhost:3000)  
- **Microfrontend Dashboard:** [http://localhost:3003](http://localhost:3003)  
- **API Backend:** [http://localhost:8080](http://localhost:8080)  

---

### **Comandos Úteis**  

- **Parar os Containers:**  

   ```bash
   docker-compose down
   ```  

- **Reiniciar Containers sem Rebuild:**  

   ```bash
   docker-compose up
   ```  

- **Verificar Logs em Tempo Real:**  

   ```bash
   docker-compose logs -f
   ```  

- **Remover Imagens e Containers Parados:**  

   ```bash
   docker system prune -a
   ```  

- **Para listar os containers em execução**
   ```bash
   docker-compose ps
   ```  

- **Para acessar o shell do container**

   Se precisar acessar o shell do container dashboard (por exemplo):

   ```bash
   docker exec -it dashboard sh
   ``` 

#### **Resolvendo erros de containers órfãos**
   
   Caso você encontre um erro como este:

   ```
   ⚠️ WARNING: Found orphan containers (`dashboard_front`) for this project.  
   If you removed or renamed this service in your compose file, you can run this command  
   with the `--remove-orphans` flag to clean it up.
   ```

   Siga os passos abaixo para corrigir:

   1. Execute o comando para remover containers órfãos:

      ```bash
      docker-compose down --remove-orphans 
      ``` 
   2. Inicie novamente os serviços:
      ```bash
      docker-compose up
      ``` 
---

---  
### **Observações**  
- Certifique-se de que as portas 3000, 3003 e 8080 estejam livres antes de iniciar os containers.  

