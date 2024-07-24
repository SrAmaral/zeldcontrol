import Link from "next/link";
import { Button } from "primereact/button";
import NewRequestForm from "~/components/Requests/new/RequestForm";

export const metadata = {
  title: "Adicionar",
};

export default function NewProductRequest() {
  return (
    <div className="col-12 card grid h-full p-0">
      <div className="card w-full">
        <div className="justify-content-between flex">
          <h1>Nova Solicitação</h1>
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
          <NewRequestForm />
        </div>
      </div>
    </div>
  );
}
