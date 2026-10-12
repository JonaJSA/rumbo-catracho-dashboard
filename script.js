/* ==========================================================================
   RUMBO CATRACHO - PANEL ADMINISTRATIVO & BACKOFFICE OPERATIVO
   Framework: Bulma CSS 1.0.4 + Chart.js 4.4
   Autor: Jonathan Ávila (Portales Web II - UNICAH)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MANEJO DEL NAVBAR BURGER RESPONSIVO (Patrón de clase bulmademo.html)
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });

  // 2. CONTROL GENÉRICO DE MODALES DE BULMA (.modal.is-active)
  function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
      modal.classList.add('is-active');
      document.documentElement.classList.add('is-clipped');
    }
  }

  function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
      modal.classList.remove('is-active');
      document.documentElement.classList.remove('is-clipped');
    }
  }

  // Cerrar al dar click en fondos oscuros o botones con clase .js-modal-close
  document.querySelectorAll('.js-modal-close').forEach(boton => {
    boton.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.remove('is-active');
        document.documentElement.classList.remove('is-clipped');
      }
    });
  });

  // Cerrar modales con tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.modal.is-active').forEach(modal => {
        modal.classList.remove('is-active');
      });
      document.documentElement.classList.remove('is-clipped');
    }
  });

  // 3. APERTURA DE MODAL 1: COMPARATIVA TEÓRICA
  const btnModalTeoria = document.getElementById('btnModalTeoria');
  if (btnModalTeoria) {
    btnModalTeoria.addEventListener('click', () => {
      abrirModal('modalComparativa');
    });
  }

  // 4. APERTURA DE MODAL 2: AUDITORÍA TRANSACCIONAL DINÁMICA
  function vincularBotonesAuditoria() {
    document.querySelectorAll('.btn-ver-detalle').forEach(btn => {
      btn.onclick = () => {
        const codigo = btn.getAttribute('data-codigo');
        const fila = btn.closest('tr');
        if (fila) {
          const cliente = fila.querySelector('td:nth-child(2) strong')?.textContent || 'Cliente';
          const destino = fila.getAttribute('data-destino') || 'Destino';
          const monto = fila.querySelector('.money-val')?.textContent || 'L. 0.00';
          const estado = fila.getAttribute('data-estado') || 'Confirmada';

          document.getElementById('modalCodigoTx').textContent = codigo;
          const badgeEstado = document.getElementById('modalEstadoTx');
          badgeEstado.textContent = estado;

          if (estado === 'Confirmada') {
            badgeEstado.className = 'tag is-success is-medium';
          } else if (estado === 'Pendiente') {
            badgeEstado.className = 'tag is-warning is-medium';
          } else if (estado === 'Completada') {
            badgeEstado.className = 'tag is-info is-medium';
          } else {
            badgeEstado.className = 'tag is-danger is-medium';
          }
        }
        abrirModal('modalDetalleTransaccion');
      };
    });
  }
  vincularBotonesAuditoria();

  const btnImprimirFiscal = document.getElementById('btnImprimirFiscal');
  if (btnImprimirFiscal) {
    btnImprimirFiscal.addEventListener('click', () => {
      alert('Voucher fiscal generado con firma digital tokenizada.');
    });
  }

  // 5. APERTURA DE MODAL 3: REGISTRO MANUAL DE RESERVAS (CALL CENTER)
  const btnNuevaReservaManual = document.getElementById('btnNuevaReservaManual');
  if (btnNuevaReservaManual) {
    btnNuevaReservaManual.addEventListener('click', () => {
      abrirModal('modalNuevaReserva');
    });
  }

  const btnGuardarReserva = document.getElementById('btnGuardarReserva');
  if (btnGuardarReserva) {
    btnGuardarReserva.addEventListener('click', () => {
      const nombre = document.getElementById('nuevoNombre').value.trim();
      const dni = document.getElementById('nuevoDni').value.trim();
      const destino = document.getElementById('nuevoDestino').value;
      const plazas = document.getElementById('nuevasPlazas').value;
      const monto = parseFloat(document.getElementById('nuevoMonto').value) || 0;
      const metodo = document.getElementById('nuevoMetodo').value;

      if (!nombre || !dni || monto <= 0) {
        alert('Por favor complete todos los campos obligatorios del pasajero.');
        return;
      }

      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const nuevoCodigo = `#RC-2026-${randomNum}`;

      // Insertar nueva fila en la tabla transaccional
      const tbody = document.getElementById('tbodyTransacciones');
      const tr = document.createElement('tr');
      tr.setAttribute('data-estado', 'Confirmada');
      tr.setAttribute('data-destino', destino);

      tr.innerHTML = `
        <td><span class="code-badge">${nuevoCodigo}</span></td>
        <td>
          <strong>${nombre}</strong>
          <div class="is-size-7 has-text-grey">DNI: ${dni} &bull; ${plazas} plazas (Manual)</div>
        </td>
        <td><span class="tag is-light">${destino} &bull; Central</span></td>
        <td><span class="is-size-7">Hoy &bull; Inmediato</span></td>
        <td><span class="money-val">L. ${monto.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</span></td>
        <td><span class="tag is-white" style="border: 1px solid #cbd5e1;"><i class="fas fa-headset has-text-primary mr-1"></i> ${metodo} Call Center</span></td>
        <td><span class="tag is-success is-light has-text-weight-bold">Confirmada</span></td>
        <td class="has-text-centered">
          <div class="buttons is-centered are-small mb-0">
            <button class="button is-light is-primary btn-ver-detalle" data-codigo="${nuevoCodigo}" title="Ver auditoría">
              <span class="icon is-small"><i class="fas fa-magnifying-glass"></i></span>
              <span>Auditar</span>
            </button>
          </div>
        </td>
      `;

      tbody.insertBefore(tr, tbody.firstChild);
      vincularBotonesAuditoria();

      // Limpiar formulario y cerrar modal
      document.getElementById('formNuevaReserva').reset();
      cerrarModal('modalNuevaReserva');
      alert(`Reserva ${nuevoCodigo} registrada exitosamente en el sistema.`);
    });
  }
  // 6. FILTRADO INTERACTIVO DE LA TABLA TRANSACCIONAL
  const filtroTexto = document.getElementById('filtroTexto');
  const filtroEstado = document.getElementById('filtroEstado');
  const filtroDestino = document.getElementById('filtroDestino');
  const btnRestablecerFiltros = document.getElementById('btnRestablecerFiltros');
  const inputBusquedaGlobal = document.getElementById('inputBusquedaGlobal');

  function filtrarTabla() {
    const texto = (filtroTexto ? filtroTexto.value : '').toLowerCase().trim();
    const estado = filtroEstado ? filtroEstado.value : 'todos';
    const destino = filtroDestino ? filtroDestino.value : 'todos';

    const filas = document.querySelectorAll('#tbodyTransacciones tr');
    filas.forEach(fila => {
      const contenidoFila = fila.innerText.toLowerCase();
      const estadoFila = fila.getAttribute('data-estado');
      const destinoFila = fila.getAttribute('data-destino');

      const coincideTexto = !texto || contenidoFila.includes(texto);
      const coincideEstado = (estado === 'todos') || (estadoFila === estado);
      const coincideDestino = (destino === 'todos') || (destinoFila === destino);

      if (coincideTexto && coincideEstado && coincideDestino) {
        fila.style.display = '';
      } else {
        fila.style.display = 'none';
      }
    });
  }

  if (filtroTexto) filtroTexto.addEventListener('input', filtrarTabla);
  if (filtroEstado) filtroEstado.addEventListener('change', filtrarTabla);
  if (filtroDestino) filtroDestino.addEventListener('change', filtrarTabla);

  if (inputBusquedaGlobal) {
    inputBusquedaGlobal.addEventListener('input', (e) => {
      if (filtroTexto) {
        filtroTexto.value = e.target.value;
        filtrarTabla();
      }
    });
  }

  if (btnRestablecerFiltros) {
    btnRestablecerFiltros.addEventListener('click', () => {
      if (filtroTexto) filtroTexto.value = '';
      if (inputBusquedaGlobal) inputBusquedaGlobal.value = '';
      if (filtroEstado) filtroEstado.value = 'todos';
      if (filtroDestino) filtroDestino.value = 'todos';
      filtrarTabla();
    });
  }

  // 7. EXPORTACIÓN DE REPORTE TRANSACCIONAL A CSV
  const btnExportarAuditoria = document.getElementById('btnExportarAuditoria');
  if (btnExportarAuditoria) {
    btnExportarAuditoria.addEventListener('click', () => {
      let csv = 'Codigo,Titular,Destino,Fecha_Salida,Monto_HNL,Canal,Estado\n';
      const filas = document.querySelectorAll('#tbodyTransacciones tr');

      filas.forEach(fila => {
        if (fila.style.display !== 'none') {
          const celdas = fila.querySelectorAll('td');
          if (celdas.length >= 7) {
            const codigo = celdas[0].innerText.trim();
            const titular = celdas[1].querySelector('strong')?.innerText.trim() || '';
            const destino = celdas[2].innerText.trim();
            const fecha = celdas[3].innerText.trim();
            const monto = celdas[4].innerText.trim().replace('L. ', '').replace(',', '');
            const canal = celdas[5].innerText.trim();
            const estado = celdas[6].innerText.trim();

            csv += `"${codigo}","${titular}","${destino}","${fecha}","${monto}","${canal}","${estado}"\n`;
          }
        }
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement('a');
      enlace.setAttribute('href', url);
      enlace.setAttribute('download', `reporte_operaciones_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
    });
  }

  // 8. GRÁFICOS ANALÍTICOS CON CHART.JS
  // Gráfico 1: Facturación Semanal (Bar Chart empresarial)
  const ctxIngresos = document.getElementById('chartIngresosSemanales');
  if (ctxIngresos && typeof Chart !== 'undefined') {
    new Chart(ctxIngresos, {
      type: 'bar',
      data: {
        labels: ['Lun 05', 'Mar 06', 'Mié 07', 'Jue 08', 'Vie 09', 'Sáb 10', 'Hoy Dom 11'],
        datasets: [
          {
            label: 'Pagos Digitales (BAC / Visa)',
            data: [210000, 245000, 280000, 310000, 395000, 480000, 315600],
            backgroundColor: '#173e32',
            borderRadius: 4
          },
          {
            label: 'Transferencias Directas ACH',
            data: [45000, 52000, 60000, 75000, 89000, 110000, 69350],
            backgroundColor: '#059669',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { size: 11, family: 'sans-serif' }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: L. ${context.raw.toLocaleString('es-HN')}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: {
              callback: function(value) {
                return 'L. ' + (value / 1000) + 'k';
              }
            }
          }
        }
      }
    });
  }

  // Gráfico 2: Distribución por Destino (Doughnut Chart)
  const ctxDestinos = document.getElementById('chartDistribucionDestinos');
  if (ctxDestinos && typeof Chart !== 'undefined') {
    new Chart(ctxDestinos, {
      type: 'doughnut',
      data: {
        labels: ['Roatán (Ferry/Vuelo)', 'Copán Ruinas', 'La Tigra Senderos', 'Cayos Cochinos'],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: ['#173e32', '#059669', '#3b82f6', '#f59e0b'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { size: 11 }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${context.raw}% de la flota`;
              }
            }
          }
        },
        cutout: '68%'
      }
    });
  }

});
