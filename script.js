const PROCEDIMENTOS = {
            "Limpeza de Pele": 1.72, "Microagulhamento Simples": 15.59, "Terapia Capilar": 1.70,
            "Drenagem Linfática": 2.22, "Peeling Diamante": 2.10, "Microagulhamento com PDRN": 25.00,
            "Intradermoterapia": 15.00, "Ultrassom": 5.00, "Peeling Cisteamina": 12.00,
            "Blefaro Jato Plasma": 10.00, "Remoção de Tatuagem": 20.00, "Remoção de Micropigmentação": 15.00
        };

        let selecionado = "";
        const listContainer = document.getElementById('options-list');
        
        Object.keys(PROCEDIMENTOS).forEach(p => {
            let div = document.createElement('div');
            div.className = 'option-item';
            div.innerText = p;
            div.onclick = () => { selecionado = p; document.getElementById('select-label').innerHTML = p + " <span>▼</span>"; toggleOptions(); };
            listContainer.appendChild(div);
        });

        function toggleOptions() {
            let list = document.getElementById('options-list');
            list.style.display = list.style.display === 'block' ? 'none' : 'block';
        }

        function lancar() {
            const valor = parseFloat(document.getElementById("valor-pago").value);
            if (!selecionado || isNaN(valor)) return alert("Ciméia, preencha o procedimento e o valor!");
            const custoSalao = valor * 0.30;
            const custoInsumo = PROCEDIMENTOS[selecionado];
            const lucro = valor - custoSalao - custoInsumo;
            const baseDados = JSON.parse(localStorage.getItem('bd_paola_v2')) || [];
            baseDados.push({ servico: selecionado, valor, custoSalao, custoInsumo, lucro });
            localStorage.setItem('bd_paola_v2', JSON.stringify(baseDados));
            document.getElementById("valor-pago").value = "";
            selecionado = "";
            document.getElementById('select-label').innerHTML = "Escolha o Procedimento... <span>▼</span>";
            carregar();
        }

        function carregar() {
            const dados = JSON.parse(localStorage.getItem('bd_paola_v2')) || [];
            const corpo = document.getElementById("corpo-tabela");
            corpo.innerHTML = "";
            let f = 0, r = 0, i = 0, l = 0;
            dados.forEach(d => { 
                f+=d.valor; r+=d.custoSalao; i+=d.custoInsumo; l+=d.lucro; 
                corpo.innerHTML += `<tr><td>${d.servico}</td><td>R$ ${d.valor.toFixed(2)}</td><td>R$ ${d.custoSalao.toFixed(2)}</td><td>R$ ${d.custoInsumo.toFixed(2)}</td><td style="font-weight:bold; color:#2e7d32">R$ ${d.lucro.toFixed(2)}</td></tr>`;
            });
            const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById("fat-bruto").innerText = fmt(f);
            document.getElementById("repasse-salao").innerText = fmt(r);
            document.getElementById("total-insumos").innerText = fmt(i);
            document.getElementById("lucro-final").innerText = fmt(l);
        }

        function verHistorial() {
            let h = document.getElementById("historial");
            h.style.display = h.style.display === 'block' ? 'none' : 'block';
        }

        function reset() { if(confirm("Ciméia, deseja mesmo apagar tudo?")) { localStorage.removeItem('bd_paola_v2'); carregar(); } }

        window.onload = carregar;