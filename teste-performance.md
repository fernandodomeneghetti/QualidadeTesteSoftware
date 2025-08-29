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

### Linux
```bash
sudo apt update
sudo apt install -y gnupg software-properties-common
curl -s https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6.gpg
echo "deb [signed-by=/usr/share/keyrings/k6.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt update
sudo apt install -y k6
