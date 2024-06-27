import Link from "next/link";
import { Button } from "primereact/button";
import NewClientForm from "~/components/Clients/new/ClientForm";

export default async function NewClientPage() {
  return (
    <div className="col-12 card grid h-full p-0">
      <div className="card w-full">
        <div className="justify-content-between flex">
          <h1>Novo Cliente</h1>
          <Link href="/dashboard/clients">
            <Button
              label="Voltar"
              outlined
              icon="pi pi-arrow-left"
              size="small"
            />
          </Link>
        </div>
        <div className="mt-8">
          <NewClientForm />
        </div>
      </div>
    </div>
  );
}
