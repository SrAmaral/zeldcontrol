import Link from "next/link";
import { Button } from "primereact/button";

export default async function EmployeePage() {
  return (
    <div className="col-12 card grid h-full p-0">
      <div className="card w-full">
        <div className="justify-content-between flex">
          <h1>Dashboard de Funcionário</h1>
          <Link href="/dashboard/clients">
            <Button
              label="Voltar"
              outlined
              icon="pi pi-arrow-left"
              size="small"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
