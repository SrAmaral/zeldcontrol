import Link from "next/link";
import { Button } from "primereact/button";
import ListClientComponent from "~/components/Clients/list/ListClient";
import { db } from "~/server/db";

export default async function ClientPage() {
  const clients = await db.client.findMany();

  return (
    <div className="col-12 card grid h-full p-0">
      <div className="card w-full">
        <div className="justify-content-between flex">
          <h1>Listagem de Clientes</h1>
          <Link href="/dashboard/clients">
            <Button
              label="Voltar"
              outlined
              icon="pi pi-arrow-left"
              size="small"
            />
          </Link>
        </div>
        <ListClientComponent clients={clients} />
      </div>
    </div>
  );
}
