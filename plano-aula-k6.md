# Plano de Aula — Testes de Performance em Sistemas Web com k6

## 🎯 Objetivos da Aula
- Introduzir conceitos de testes de performance em sistemas web.
- Ensinar a instalar, configurar e executar testes com **k6**.
- Demonstrar como interpretar os resultados no terminal.
- Mostrar como visualizar métricas em dashboards.

---

## 📚 Estrutura da Aula
1. **Introdução aos Testes de Performance**
2. **Instalação do k6**
3. **Criando um Script de Teste**
4. **Executando o Teste**
5. **Analisando os Resultados no Terminal**
6. **Exportando Resultados**
7. **Visualizando Resultados em Dashboard**
8. **Conclusão e Discussão**

---

## 1. Introdução aos Testes de Performance

### Conceito
Os **testes de performance** verificam como um sistema se comporta sob carga.  
Principais tipos:
- **Load Test (Teste de Carga):** verifica o desempenho do sistema sob carga esperada.
- **Stress Test (Teste de Estresse):** identifica o limite do sistema sob alta demanda.
- **Spike Test (Teste de Pico):** avalia o comportamento em picos súbitos de usuários.
- **Soak Test (Teste de Endurance):** mede a estabilidade por longos períodos de uso.

### Por que usar o **k6**?
- Ferramenta **open-source** e leve.
- Escreve os testes em **JavaScript**.
- Fácil de rodar localmente ou integrado a pipelines CI/CD.
- Permite integração com dashboards (Grafana, InfluxDB, etc).

---

## 2. Instalação do k6

https://grafana.com/docs/k6/latest/set-up/install-k6/?pg=get&plcmt=selfmanaged-box10-cta1

### Linux
```bash
sudo apt update
sudo apt install -y gnupg software-properties-common
curl -s https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6.gpg
echo "deb [signed-by=/usr/share/keyrings/k6.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt update
sudo apt install -y k6
```

### MacOS
```bash
brew install k6
```

### Windows
- Baixar o binário em: [https://k6.io/docs/getting-started/installation](https://k6.io/docs/getting-started/installation)  
- Ou via **chocolatey**:
```powershell
choco install k6
```

---

## 3. Criando um Script de Teste

Crie o arquivo `script.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // número de usuários virtuais
  duration: '30s', // tempo de execução
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem responder em < 500ms
  },
};

export default function () {
  let res = http.get('https://test.k6.io'); // URL alvo do teste
  check(res, {
    'status é 200': (r) => r.status === 200,
  });
  sleep(1); // espera de 1 segundo entre cada requisição
}
```

Explicação:
- `vus`: quantidade de usuários simultâneos simulados.
- `duration`: duração total do teste.
- `thresholds`: métricas mínimas aceitáveis.
- `http.get`: requisição para o endpoint do sistema.

---

## 4. Executando o Teste

No terminal, execute:

```bash
k6 run script.js
```

---

## 5. Analisando os Resultados no Terminal

Exemplo de saída (resumido):

```
running (30s), 10 VUs, 300 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  30s

    ✓ status é 200

    checks.......................: 100.00% ✓ 300 ✗ 0
    http_req_duration............: avg=120ms min=90ms med=115ms max=200ms p(95)=150ms
    http_reqs....................: 300
    vus..........................: 10
```

Interpretação:
- **checks**: percentuais de requisições bem-sucedidas.
- **http_req_duration**: tempo de resposta (p95 = 95% das requisições foram abaixo de 150ms).
- **vus**: usuários virtuais ativos.
- **http_reqs**: número total de requisições feitas.

---

## 6. Exportando Resultados

Para exportar em JSON:

```bash
k6 run --out json=results.json script.js
```

Para exportar em CSV:

```bash
k6 run --out csv=results.csv script.js
```

---

## 7. Visualizando Resultados em Dashboard

### 7.1. Usando k6 Cloud (mais simples)
- Criar conta gratuita em: [https://app.k6.io](https://app.k6.io)
- Executar:
```bash
k6 cloud script.js
```

### 7.2. Usando Grafana + InfluxDB (opção avançada)
1. Instale o **Docker**.
2. Rode a stack oficial:
```bash
docker compose -f https://raw.githubusercontent.com/grafana/k6/master/docker-compose.yml up
```
3. Execute o teste enviando métricas:
```bash
k6 run --out influxdb=http://localhost:8086/k6 script.js
```
4. Acesse o Grafana em: [http://localhost:3000](http://localhost:3000)  
   Usuário: `admin` | Senha: `admin`.

---

## 8. Conclusão e Discussão

### Perguntas para a turma:
- Como interpretar o p95 e por que ele é mais importante que a média?
- Em que situações usar um teste de carga vs. um teste de estresse?
- Quais gargalos o teste poderia revelar no backend?

---

## 📌 Referências
- [Documentação Oficial k6](https://k6.io/docs/)
- [Repositório GitHub k6](https://github.com/grafana/k6)
- [Exemplos de Scripts](https://k6.io/docs/examples)
