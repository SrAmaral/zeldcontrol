import Link from "next/link";
import { Button } from "primereact/button";
import QuotationComponent from "~/components/Requests/quotation/QuotationComponent";

export const metadata = {
  title: "Aprovar Cotação",
};

export default function EditProductRequest() {
  return (
    <div className="col-12 card grid h-full p-0">
      <div className="card w-full">
        <div className="justify-content-between flex">
          <h1>Aprovar Cotação</h1>
          <Link href="/dashboard/product_requests/list">
            <Button
              label="Voltar"
              outlined
              icon="pi pi-arrow-left"
              size="small"
            />
          </Link>
        </div>
        <div className="mt-8">
          <QuotationComponent />
        </div>
      </div>
    </div>
  );
}
