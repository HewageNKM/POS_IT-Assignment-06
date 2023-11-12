function loadOrderTable() {
    $.ajax({
        url: '/orders',
        method: 'GET',
        success: function (data) {
            $('#orderTable').empty();
            data.forEach(function (order) {
                let date = new Date(order.order_date).toLocaleDateString();
                let discount = order.discount == null ? 0 : order.discount;
                let row = `<tr class="table_row" data-id="${order._id.toUpperCase()}" data-discount="${discount}" data-date="${date}" data-total="${order.order_total} " data-name="${order.customer.name}">
                                <td>${order._id.toUpperCase()}</td>
                                <td>${date}</td>
                                <td>${order.customer.name}</td>
                                <td>${discount}</td>
                                <td>${order.order_total}</td>
                            </tr>`;
                $('#orderTable').append(row);
                $("#orderTable tr").on("click", function () {
                    const row = $(this);
                    $('#orderId').val(row.data("id"));
                    $('#OrderDate').val(row.data("date"));
                    $('#customerName').val(row.data("name"));
                    $('#discount').val(row.data("discount"));
                    $('#cost').val(row.data("total"));
                });
            });
        }
    });

}

$('#clearBtn').on('click', function (event) {
    $('#orderId').val("");
    $('#OrderDate').val("");
    $('#customerName').val("");
    $('#discount').val("");
    $('#cost').val("");
});
$('#deleteBtn').on('click', function (event) {
    const value = confirm("Are you sure you want to delete this order?");
    if (!value) {
        return;
    }
    if (($('#orderId').val().trim().length > 0)) {
        $.ajax({
            type: 'DELETE',
            url: '/orders/' + $('#orderId').val().toLowerCase(),
            success: function (response) {
                loadOrderTable();
                alert("Order Deleted");
            },
            error: function (error) {
                console.error(error);
                alert(error.responseText)
            }
        });
    } else {
        alert("Please select an order to delete");
    }
});

$('#searchBtn').on('click', function (event) {
    if ($('#searchFld').val().trim().length >= 16) {
        $.ajax({
            url: '/orders/' + $('#searchFld').val().trim().toLowerCase(),
            method: 'GET',
            success: function (data) {
                let date = new Date(data.order_date).toLocaleDateString();
                let discount = data.discount == null ? 0 : data.discount;
                $('#orderId').val(data._id.toUpperCase());
                $('#OrderDate').val(date);
                $('#customerName').val(data.customer._id.toUpperCase());
                $('#discount').val(discount);
                $('#cost').val(data.order_total);
                $('#searchFld').val('')
            }
        });
    } else {
        alert("Invalid Order Id")
    }
});
loadOrderTable();