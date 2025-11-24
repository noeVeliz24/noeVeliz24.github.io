function calcular() {

    const precioUnit = parseFloat(document.getElementById("precioUnitario").value);
    const cantidad = parseFloat(document.getElementById("cantidadProductos").value);
    const otros = parseFloat(document.getElementById("otrosGastos").value);
    const flete1 = parseFloat(document.getElementById("flete1").value);
    const flete2 = parseFloat(document.getElementById("flete2").value);
    const seguroPct = parseFloat(document.getElementById("seguro").value) / 100;
    const gaPct = parseFloat(document.getElementById("ga").value) / 100;
    const tcParalelo = parseFloat(document.getElementById("tipoCambio").value);

    const tcOficial = 6.96;
    const IVA_PORC = 0.1494;

    // -------- CALCULOS BASE EN USD ----------
    const FOB = precioUnit * cantidad;
    const seguro = FOB * seguroPct;

    const CIF = FOB + otros + flete1 + flete2 + seguro;

    const GA = CIF * gaPct;
    const IVA = (CIF + GA) * IVA_PORC;

    // -------- CONVERSIONES A BOLIVIANOS --------
    const GA_BOB = GA * tcOficial;
    const IVA_BOB = IVA * tcOficial;

    const FOB_BOB = FOB * tcParalelo;
    const transporte_BOB = (otros + flete1 + flete2 + seguro) * tcParalelo;

    const totalImpuestos = GA_BOB + IVA_BOB;
    const totalMercaderia = FOB_BOB;

    // -------- COSTOS FIJOS DE DESPACHO ----------
    const comision = 348;
    const archivo = 150;
    const formularios = 300;

    const totalDespacho = comision + archivo + formularios;

    // -------- SUMA TOTAL REAL ----------
    const sumaTotal = totalImpuestos + totalMercaderia + transporte_BOB + totalDespacho;

    const costoUnidad = sumaTotal / cantidad;

    document.getElementById("resultados").innerHTML = `
        <h3 class="section-title">Resultados Generales</h3>
        <div class="result-box">
            <strong>Gasto Total en Mercancía (BOB): ${totalMercaderia.toFixed(0)}</strong><br>
            <strong>Gasto Total en Transporte (BOB): ${transporte_BOB.toFixed(0)}</strong><br>
            <strong>Gastos Totales en Impuestos (BOB): ${totalImpuestos.toFixed(0)}</strong><br>
        </div>

        <h3 class="section-title">Costos de Despacho</h3>
        <div class="result-box">
            Comisión (BOB): ${comision}<br>
            Archivo y Custodia (BOB): ${archivo}<br>
            Elaboración de Formularios (BOB): ${formularios}<br>
            <strong>Costos Totales de Despacho (BOB): ${totalDespacho}</strong>
        </div>

        <h3 class="section-title">Costos Reales</h3>
        <div class="result-box">
            Valor FOB Real (BOB): ${FOB_BOB.toFixed(0)}<br>
            Costo Total Real (BOB): ${sumaTotal.toFixed(0)}<br>
            <strong>Costo por Unidad Real (BOB): ${costoUnidad.toFixed(0)}</strong>
        </div>
    `;
}
