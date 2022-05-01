var taxRate = 0.19;
var shipping = 5.0;

$(function () {
  var jsonData = [
    {
      title: "Produkt 1",
      price: 21,
      quantity: 1,
      total: 21,
    },
    {
      title: "Produkt 2",
      price: 15.4,
      quantity: 1,
      total: 15.4,
    },
    {
      title: "Produkt 3",
      price: 79,
      quantity: 1,
      total: 79,
    },
    {
      title: "Produkt 4",
      price: 109,
      quantity: 1,
      total: 109,
    },
    {
      title: "Produkt 5",
      price: 34.99,
      quantity: 1,
      total: 34.99,
    },
  ];
  var html = "<tbody>";
  $.each(jsonData, function () {
    html +=
      '<tr class="cart-item">' +
      "        <td>" +
      '          <input type="checkbox" class="cart-item-check" checked />' +
      "        </td>" +
      "        <td>" +
      "          " +
      this.title +
      "        </td>" +
      "        <td>€" +
      this.price +
      "</td>" +
      "        <td>" +
      '          <input class="input is-primary cart-item-qty" style="width:100px" type="number" min="1" value="' +
      this.quantity +
      '" data-price="' +
      this.price +
      '">' +
      "        </td>" +
      '        <td class="cart-item-total">€' +
      this.total +
      "</td>" +
      "        <td>" +
      '          <a class="button is-small">Odobrať</a>' +
      "        </td>" +
      "      </tr>";
  });
  html += "</tbody>";
  $(".shopping-cart").append(html);

  recalculateCart();

  $(".cart-item-check").change(function () {
    recalculateCart();
  });

  $(".cart-item-qty").change(function () {
    var $this = $(this);
    var parent = $this.parent().parent();
    parent.find(".cart-item-check").prop("checked", "checked");
    var price = $this.attr("data-price");
    var quantity = $this.val();
    var total = price * quantity;
    parent.find(".cart-item-total").html(total.toFixed(2));
    recalculateCart();
  });

  $(".button").click(function () {
    var parent = $(this).parent().parent();
    parent.remove();
    recalculateCart();
  });
});

function recalculateCart() {
  var subTotal = 0;
  var grandTotal = 0;
  var tax = 0;
  var items = $(".cart-item");
  $.each(items, function () {
    var itemCheck = $(this).find(".cart-item-check");
    var itemQuantity = $(this).find(".cart-item-qty");
    if (itemCheck.prop("checked")) {
      var itemTotal = itemQuantity.val() * itemQuantity.attr("data-price");
      subTotal += itemTotal;
    }
  });
  if (subTotal > 0) {
    tax = subTotal * taxRate;
    grandTotal = subTotal + tax + shipping;
    $(".totals,.checkout").show();
  } else {
    $(".totals,.checkout").hide();
  }
  $("#cart-subtotal").html(subTotal.toFixed(2));
  $("#cart-total").html(grandTotal.toFixed(2));
  $("#cart-tax").html(tax.toFixed(2));
  $("#cart-shipping").html(shipping.toFixed(2));
}
