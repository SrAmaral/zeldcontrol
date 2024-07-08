import Link from "next/link";
import { Button } from "primereact/button";
import NewEmployeeForm from "~/components/Employees/new/EmployeeForm";

export default async function NewEmployeePage() {
  return (
    <div className="col-12 card grid h-full p-0">
      <div className="card w-full">
        <div className="justify-content-between flex">
          <h1>Novo Funcionário</h1>
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
          <NewEmployeeForm />
        </div>
      </div>
    </div>
  );
}
