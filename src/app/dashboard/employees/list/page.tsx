import Link from "next/link";
import { Button } from "primereact/button";
import { db } from "~/server/db";
import ListEmployeeComponent from "../../../../components/Employees/list/ListEmployee";

export default async function ListEmployeePage() {
  const employees = await db.employee.findMany();
  return (
    <div className="col-12 card grid h-full p-0">
      <div className="card w-full">
        <div className="justify-content-between flex">
          <h1>Listagem de Funcionário</h1>
          <Link href="/dashboard/employees">
            <Button
              label="Voltar"
              outlined
              icon="pi pi-arrow-left"
              size="small"
            />
          </Link>
        </div>
        <ListEmployeeComponent employees={employees} />
      </div>
    </div>
  );
}
