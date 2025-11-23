function calcular() {

    const precioUnit = parseFloat(document.getElementById("precioUnitario").value);
    const cantidad = parseFloat(document.getElementById("cantidadProductos").value);
    const otros = parseFloat(document.getElementById("otrosGastos").value);
    const flete = parseFloat(document.getElementById("flete").value);
    const seguroPct = parseFloat(document.getElementById("seguro").value) / 100;
    const gaPct = parseFloat(document.getElementById("ga").value) / 100;
    const tcParalelo = parseFloat(document.getElementById("tipoCambio").value);

    const tcOficial = 6.96; // IMPUESTOS SOLO AQUÍ
    const IVA_PORC = 0.1494; // IVA 14.94%

    // --- CALCULOS EN USD ---
    const FOB = precioUnit * cantidad;
    const seguro = FOB * seguroPct;
    const CIF = FOB + flete + otros + seguro;
    const GA = CIF * gaPct;
    const IVA = (CIF + GA) * IVA_PORC;

    const totalUSD = CIF + GA + IVA;

    // --- CONVERSIONES A BOLIVIANOS ---
    const GA_BOB = GA * tcOficial;
    const IVA_BOB = IVA * tcOficial;
    const CIF_BOB = CIF * tcOficial;
    const FOB_BOB = FOB * tcParalelo;

    // NUEVOS TOTALES
    const totalImpuestos = GA_BOB + IVA_BOB;
    const totalTransporte = (flete + seguro + otros) * tcParalelo;
    const totalMercaderia = FOB_BOB;

    const totalRealBOB = totalUSD * tcParalelo;
    const costoUnidadReal = totalRealBOB / cantidad;

    document.getElementById("resultados").innerHTML = `
        <h3 class="section-title">Resultados Generales</h3>
        <div class="result-box">
            <strong>Gastos Totales en Impuestos (BOB): ${totalImpuestos.toFixed(0)}</strong><br>
            <strong>Gastos Totales en Transporte (BOB): ${totalTransporte.toFixed(0)}</strong><br>
            <strong>Gasto Total en Mercancía (BOB): ${totalMercaderia.toFixed(0)}</strong>
        </div>

        <h3 class="section-title">Resultados Básicos</h3>
        <div class="result-box">
            Valor CIF (BOB): ${CIF_BOB.toFixed(0)}<br>
            GA (BOB): ${GA_BOB.toFixed(0)}<br>
            IVA 14.94% (BOB): ${IVA_BOB.toFixed(0)}<br>
            <strong>Costo Total (BOB): ${(GA_BOB + IVA_BOB + CIF_BOB).toFixed(0)}</strong>
        </div>

        <h3 class="section-title">Costos Reales</h3>
        <div class="result-box">
            Valor FOB Real (BOB): ${FOB_BOB.toFixed(0)}<br>
            CIF Real (BOB): ${CIF_BOB.toFixed(0)}<br>
            Costo Total Real (BOB): ${totalRealBOB.toFixed(0)}<br>
            <strong>Costo por Unidad Real (BOB): ${costoUnidadReal.toFixed(0)}</strong>
        </div>
    `;
}
