export const FiltersReceivablesFunction = () => {
    // Obtener referencias a los elementos HTML
    var filterName = document.getElementById('clientSelect');
    var filterState = document.getElementById('stateSelect');
    var filterStartDate = document.getElementById('startDateSelect');
    var filterEndDate = document.getElementById('endDateSelect');
    var filterMinAmount = document.getElementById('min_value');
    var filterMaxAmount = document.getElementById('max_value');
    var table = document.getElementById('receivablesTable');

    // Obtener todas las filas de la tabla (excepto la primera que contiene los encabezados)
    var rows = table.getElementsByTagName('tr');

    // Agregar eventos de escucha para los cambios en los campos de filtro
    filterName.addEventListener('change', filterTable);
    filterState.addEventListener('change', filterTable);
    filterStartDate.addEventListener('change', filterTable);
    filterEndDate.addEventListener('change', filterTable);
    filterMinAmount.addEventListener('change', filterTable);
    filterMaxAmount.addEventListener('change', filterTable);

    function filterTable() {
        console.log("evento detectado");
        var filterNameValue = filterName.value.toLowerCase();
        var filterStateValue = filterState.value.toLowerCase();
        var filterStartDateValue = filterStartDate.value.toLowerCase();
        var filterEndDateValue = filterEndDate.value.toLowerCase();
        var filterMinAmountValue = filterMinAmount.value.toLowerCase() || 0;
        var filterMaxAmountValue = filterMaxAmount.value.toLowerCase() || Infinity;

        // Iterar sobre las filas y mostrar/ocultar según los filtros
        for (var i = 1; i < rows.length; i++) {
            var startDate = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
            var endDate = rows[i].getElementsByTagName('td')[2].textContent.toLowerCase();
            var name = rows[i].getElementsByTagName('td')[3].textContent.toLowerCase();
            var balance = rows[i].getElementsByTagName('td')[5].textContent.toLowerCase();
            var state = rows[i].getElementsByTagName('td')[6].textContent.toLowerCase();

            console.log(startDate, endDate, name, balance, state);

            var showRow = startDate.includes(filterStartDateValue)
                || endDate.includes(filterEndDateValue)
                || name.includes(filterNameValue)
                || balance >= filterMinAmountValue
                || balance <= filterMaxAmountValue
                || state.includes(filterStateValue);

            rows[i].style.display = showRow ? '' : 'none';
        }
    }
};