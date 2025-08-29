# Plano de Aula: Testes de Carga com k6

**Disciplina:** Qualidade e Teste de Software  
**Professor:** [Nome do Professor]  
**Duração:** 2 horas/aula  
**Público-alvo:** Estudantes de Engenharia de Software/Ciência da Computação

## Objetivos da Aula

### Objetivo Geral
Capacitar os alunos a compreender e implementar testes de carga utilizando a ferramenta k6.

### Objetivos Específicos
- Compreender os conceitos fundamentais de teste de carga
- Conhecer a ferramenta k6 e suas características
- Configurar o ambiente de desenvolvimento
- Criar e executar scripts básicos de teste
- Analisar resultados e métricas de performance

## 1. Introdução aos Testes de Carga (20 min)

### O que são Testes de Carga?
Os testes de carga verificam como um sistema se comporta sob condições normais e de pico de uso, simulando múltiplos usuários simultâneos.

### Tipos de Teste de Performance
- **Teste de Carga:** Comportamento sob carga esperada
- **Teste de Estresse:** Comportamento além dos limites
- **Teste de Pico:** Comportamento com aumentos súbitos
- **Teste de Volume:** Comportamento com grandes quantidades de dados

## 2. Conhecendo o k6 (15 min)

### O que é o k6?
O k6 é uma ferramenta moderna de teste de carga, desenvolvida pela Grafana Labs, que permite:
- Scripts em JavaScript (ES6+)
- Execução local ou em nuvem
- Métricas detalhadas em tempo real
- Integração com CI/CD

### Vantagens do k6
- **Simplicidade:** Sintaxe JavaScript familiar
- **Performance:** Escrito em Go, alta performance
- **Flexibilidade:** Suporte a protocolos HTTP, WebSocket, gRPC
- **Observabilidade:** Métricas ricas e dashboards

## 3. Instalação e Configuração (15 min)

### Pré-requisitos
- Sistema operacional: Windows, macOS ou Linux
- Conhecimento básico de JavaScript
- Terminal/linha de comando

### Instalação

#### Linux/macOS
```bash
# Usando package manager
sudo apt-get install k6  # Ubuntu/Debian
brew install k6         # macOS

# Ou download direto
wget https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz
```

#### Windows
```powershell
# Usando Chocolatey
choco install k6

# Ou download do executável
# https://github.com/grafana/k6/releases
```

### Verificação da Instalação
```bash
k6 version
```

## 4. Primeiro Script k6 (20 min)

### Estrutura Básica
Todo script k6 possui três fases principais:

```javascript
// 1. Fase de Inicialização
import http from 'k6/http';
import { check, sleep } from 'k6';

// 2. Configuração do Teste
export const options = {
  vus: 10,        // Virtual Users
  duration: '30s', // Duração do teste
};

// 3. Função Principal (executada por cada VU)
export default function () {
  const response = http.get('https://httpbin.org/get');
  
  check(response, {
    'status é 200': (r) => r.status === 200,
    'tempo < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

### Executando o Primeiro Teste
```bash
k6 run meu-primeiro-teste.js
```

## 5. Configurações Avançadas (25 min)

### Opções de Configuração
```javascript
export const options = {
  // Cenários básicos
  vus: 50,
  duration: '5m',
  
  // Cenários avançados
  stages: [
    { duration: '2m', target: 20 },  // Ramp-up
    { duration: '5m', target: 20 },  // Sustentação
    { duration: '2m', target: 50 },  // Pico
    { duration: '3m', target: 0 },   // Ramp-down
  ],
  
  // Thresholds (critérios de sucesso)
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
};
```

### Exemplo Prático: API de E-commerce
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '3m', target: 10 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  // Teste de listagem de produtos
  const produtos = http.get('https://api.exemplo.com/produtos');
  check(produtos, {
    'produtos carregados': (r) => r.status === 200,
    'tem produtos': (r) => JSON.parse(r.body).length > 0,
  });
  
  sleep(Math.random() * 3 + 1); // Pausa realística
  
  // Teste de detalhes do produto
  const produto = http.get('https://api.exemplo.com/produtos/1');
  check(produto, {
    'produto encontrado': (r) => r.status === 200,
  });
  
  sleep(1);
}
```

## 6. Métricas e Análise de Resultados (20 min)

### Métricas Principais
- **http_req_duration:** Tempo de resposta das requisições
- **http_req_failed:** Taxa de falha das requisições
- **http_reqs:** Número total de requisições
- **vus:** Usuários virtuais ativos
- **iterations:** Iterações completadas

### Interpretando Resultados
```
✓ status é 200........................: 100.00% ✓ 1500      ✗ 0
✓ tempo < 500ms.......................: 95.33%  ✓ 1430      ✗ 70

http_req_duration..............: avg=245ms min=89ms med=198ms max=2.1s p(90)=456ms p(95)=612ms
http_req_failed................: 0.00%   ✓ 0         ✗ 1500
http_reqs......................: 1500    24.99/s
vus............................: 10      min=10      max=10
```

### Exportando Resultados
```bash
# JSON
k6 run --out json=results.json script.js

# InfluxDB + Grafana
k6 run --out influxdb=http://localhost:8086/k6 script.js

# CSV
k6 run --out csv=results.csv script.js
```

## 7. Exercício Prático (20 min)

### Cenário: Teste de uma API REST
Criar um script que teste uma API com os seguintes requisitos:
- 20 usuários simultâneos
- Duração de 2 minutos
- Testar endpoints GET e POST
- Validar status codes e tempo de resposta
- Definir thresholds apropriados

### Template do Exercício
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // TODO: Configurar usuários e duração
  // TODO: Definir thresholds
};

export default function () {
  // TODO: Implementar testes GET e POST
  // TODO: Adicionar validações
  // TODO: Incluir sleep realístico
}
```

## 8. Boas Práticas (10 min)

### Desenvolvimento de Scripts
- Use dados dinâmicos (não hardcode)
- Implemente padrões de usuário realísticos
- Modularize código reutilizável
- Documente cenários de teste

### Execução de Testes
- Comece com cargas pequenas
- Monitore recursos do sistema
- Execute em ambiente similar à produção
- Mantenha histórico de resultados

### Exemplo de Estrutura Modular
```javascript
// config.js
export const config = {
  baseUrl: 'https://api.exemplo.com',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
};

// utils.js
export function randomUser() {
  return {
    name: `user${Math.floor(Math.random() * 1000)}`,
    email: `user${Math.floor(Math.random() * 1000)}@test.com`,
  };
}
```

## 9. Recursos Adicionais

### Documentação Oficial
- [k6.io/docs](https://k6.io/docs/)
- [Exemplos no GitHub](https://github.com/grafana/k6/tree/master/examples)

### Ferramentas Complementares
- **Grafana:** Visualização de métricas
- **InfluxDB:** Armazenamento de dados
- **Prometheus:** Monitoramento

### Extensões Úteis
- k6/x/sql: Testes de banco de dados
- k6/x/kafka: Testes de mensageria
- k6/x/browser: Testes de navegador

## 10. Avaliação e Próximos Passos (5 min)

### Critérios de Avaliação
- Compreensão dos conceitos de teste de carga
- Capacidade de criar scripts básicos
- Interpretação correta de resultados
- Aplicação de boas práticas

### Atividade para Casa
Criar um plano de teste de carga para um sistema web de sua escolha, incluindo:
- Análise de requisitos de performance
- Definição de cenários de teste
- Implementação de scripts k6
- Relatório de resultados

### Próxima Aula
- Testes de performance em CI/CD
- Monitoramento contínuo
- Otimização baseada em métricas

---

## Material de Apoio

### Comandos Essenciais
```bash
# Executar teste básico
k6 run script.js

# Executar com configurações específicas
k6 run --vus 50 --duration 5m script.js

# Executar com saída personalizada
k6 run --out json=results.json script.js

# Verificar script sem executar
k6 run --dry-run script.js
```

### Checklist de Preparação
- [ ] k6 instalado e funcionando
- [ ] Editor de código configurado
- [ ] Ambiente de teste disponível
- [ ] Documentação da API a ser testada
- [ ] Ferramentas de monitoramento (opcional)

**Observação:** Este plano de aula pode ser adaptado conforme o nível da turma e tempo disponível. Recomenda-se prática hands-on durante toda a aula.