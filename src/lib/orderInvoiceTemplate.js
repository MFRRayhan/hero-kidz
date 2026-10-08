export const invoiceTemplate = ({
  orderId,
  customerName,
  customerEmail,
  items = [],
  subtotal = 0,
  discount = 0,
  total = 0,
  createdAt,
}) => {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td
            style="
              padding: 12px 8px;
              border-bottom: 1px solid #e5e7eb;
            "
          >
            <div
              style="
                font-weight: 600;
                color: #111827;
              "
            >
              ${item.title || "Product"}
            </div>
          </td>

          <td
            align="center"
            style="
              padding: 12px 8px;
              border-bottom: 1px solid #e5e7eb;
            "
          >
            ${Number(item.quantity) || 0}
          </td>

          <td
            align="right"
            style="
              padding: 12px 8px;
              border-bottom: 1px solid #e5e7eb;
            "
          >
            ৳${Number(item.price || 0).toFixed(0)}
          </td>

          <td
            align="right"
            style="
              padding: 12px 8px;
              border-bottom: 1px solid #e5e7eb;
              font-weight: 600;
            "
          >
            ৳${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(
              0,
            )}
          </td>
        </tr>
      `,
    )
    .join("");

  const date = createdAt ? new Date(createdAt) : null;

  const formattedDate =
    date && !isNaN(date.getTime())
      ? date.toLocaleDateString("en-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  const safeSubtotal = Number(subtotal) || 0;
  const safeDiscount = Number(discount) || 0;
  const safeTotal = Number(total) || 0;

  return `
<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Hero Kidz Invoice</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f6f8;
    font-family: Arial, Helvetica, sans-serif;
    color: #111827;
  "
>
  <div
    style="
      max-width: 700px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    "
  >

    <!-- Header -->

    <div
      style="
        padding: 30px;
        background-color: #03373d;
        color: #ffffff;
      "
    >
      <table
        width="100%"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>

          <td>
            <h1
              style="
                margin: 0;
                font-size: 28px;
                color: #caeb66;
              "
            >
              Hero Kidz
            </h1>

            <p
              style="
                margin: 6px 0 0;
                font-size: 13px;
                color: #d1d5db;
              "
            >
              Thank you for your purchase!
            </p>
          </td>

          <td align="right">

            <div
              style="
                font-size: 13px;
                color: #d1d5db;
              "
            >
              INVOICE
            </div>

            <div
              style="
                margin-top: 5px;
                font-size: 16px;
                font-weight: 700;
              "
            >
              #${orderId || "N/A"}
            </div>

          </td>

        </tr>
      </table>
    </div>


    <!-- Customer Information -->

    <div style="padding: 30px;">

      <table
        width="100%"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>

          <td
            width="50%"
            valign="top"
          >

            <p
              style="
                margin: 0 0 8px;
                font-size: 12px;
                font-weight: 700;
                color: #6b7280;
                text-transform: uppercase;
              "
            >
              Billed To
            </p>

            <p
              style="
                margin: 0;
                font-size: 15px;
                font-weight: 700;
              "
            >
              ${customerName || "Customer"}
            </p>

            <p
              style="
                margin: 5px 0 0;
                font-size: 13px;
                color: #6b7280;
              "
            >
              ${customerEmail || "N/A"}
            </p>

          </td>


          <td
            width="50%"
            align="right"
            valign="top"
          >

            <p
              style="
                margin: 0 0 8px;
                font-size: 12px;
                font-weight: 700;
                color: #6b7280;
                text-transform: uppercase;
              "
            >
              Order Date
            </p>

            <p
              style="
                margin: 0;
                font-size: 14px;
                font-weight: 600;
              "
            >
              ${formattedDate}
            </p>

          </td>

        </tr>
      </table>


      <!-- Products -->

      <div style="margin-top: 35px;">

        <table
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse;"
        >

          <thead>

            <tr
              style="
                background-color: #f3f4f6;
              "
            >

              <th
                align="left"
                style="
                  padding: 12px 8px;
                  font-size: 12px;
                  color: #4b5563;
                "
              >
                Product
              </th>


              <th
                align="center"
                style="
                  padding: 12px 8px;
                  font-size: 12px;
                  color: #4b5563;
                "
              >
                Qty
              </th>


              <th
                align="right"
                style="
                  padding: 12px 8px;
                  font-size: 12px;
                  color: #4b5563;
                "
              >
                Price
              </th>


              <th
                align="right"
                style="
                  padding: 12px 8px;
                  font-size: 12px;
                  color: #4b5563;
                "
              >
                Total
              </th>

            </tr>

          </thead>


          <tbody>
            ${itemsHtml}
          </tbody>

        </table>

      </div>


      <!-- Summary -->

      <div style="margin-top: 25px;">

        <table
          width="100%"
          cellspacing="0"
          cellpadding="0"
        >

          <!-- Subtotal -->

          <tr>

            <td
              align="right"
              style="
                padding: 6px 0;
                color: #6b7280;
                font-size: 14px;
              "
            >
              Subtotal
            </td>


            <td
              align="right"
              width="120"
              style="
                padding: 6px 0;
                font-size: 14px;
                font-weight: 600;
              "
            >
              ৳${safeSubtotal.toFixed(0)}
            </td>

          </tr>


          <!-- Discount -->

          ${
            safeDiscount > 0
              ? `
                <tr>

                  <td
                    align="right"
                    style="
                      padding: 6px 0;
                      color: #16a34a;
                      font-size: 14px;
                    "
                  >
                    Discount
                  </td>


                  <td
                    align="right"
                    style="
                      padding: 6px 0;
                      color: #16a34a;
                      font-size: 14px;
                      font-weight: 600;
                    "
                  >
                    -৳${safeDiscount.toFixed(0)}
                  </td>

                </tr>
              `
              : ""
          }


          <!-- Total -->

          <tr>

            <td
              align="right"
              style="
                padding: 15px 0 5px;
                border-top: 2px solid #111827;
                font-size: 16px;
                font-weight: 700;
              "
            >
              Total
            </td>


            <td
              align="right"
              style="
                padding: 15px 0 5px;
                border-top: 2px solid #111827;
                font-size: 20px;
                font-weight: 700;
                color: #03373d;
              "
            >
              ৳${safeTotal.toFixed(0)}
            </td>

          </tr>

        </table>

      </div>


      <!-- Thank You -->

      <div
        style="
          margin-top: 35px;
          padding: 18px;
          border-radius: 8px;
          background-color: #f0fdf4;
          text-align: center;
        "
      >

        <p
          style="
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            color: #166534;
          "
        >
          Thank you for shopping with Hero Kidz!
        </p>


        <p
          style="
            margin: 6px 0 0;
            font-size: 12px;
            color: #4b5563;
          "
        >
          We hope you enjoy your purchase!
        </p>

      </div>

    </div>


    <!-- Footer -->

    <div
      style="
        padding: 20px 30px;
        background-color: #f9fafb;
        text-align: center;
      "
    >

      <p
        style="
          margin: 0;
          font-size: 12px;
          color: #9ca3af;
        "
      >
        This is an automatically generated invoice.
        Please do not reply to this email.
      </p>

    </div>

  </div>

</body>

</html>
`;
};
