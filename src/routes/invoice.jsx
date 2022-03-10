import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom"
import { getInvoice, deleteInvoice } from "../data";

export default function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  // useParams grabs the parameters from the render (Index.js) and returns it as an object. destructured to get invoiceId param:
  const {invoiceId} = useParams();
  // parseInt since URL params comes in as a string
  const invoice = getInvoice(parseInt(invoiceId));

  return (
    <div>
      <h2>{invoice.name}: {invoice.number}</h2>
      <p>Total Due: {invoice.amount}</p>
      <p>Due Date: {invoice.due}</p>

      <button
        onClick={() => {
          deleteInvoice(invoice.number);
          navigate("/invoices" + location.search); // have to trigger navigation to get list to re render with the persistent search params
        }}
      >
        Delete
      </button>

    </div>
  )
}