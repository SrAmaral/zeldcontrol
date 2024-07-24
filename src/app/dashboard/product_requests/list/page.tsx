/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import { Button } from "primereact/button";
import ListRequestsComponent from "~/components/Requests/list/ListRequests";
import { type RequestDataType } from "~/components/Requests/new/NewRequestTypes";
import { db } from "~/server/db";

export default async function ListEmployeePage() {
  const resolveStatus = (status: string) => {
    switch (status) {
      case "open":
        return "Aberto";
      case "APPROVED":
        return "Aprovado";
      case "REJECTED":
        return "Rejeitado";
      default:
        return "Pendente";
    }
  };

  const requests = await db.productRequest.findMany();
  const finalRequestData = requests.map((request: RequestDataType) => {
    return {
      ...request,
      deadLine: request.deadLine
        ? new Date(request.deadLine).toLocaleDateString("pt-BR").toString()
        : null,
      status: resolveStatus(request.status),
      qtyRequests: request.items
        ?.map(
          (item: {
            description: string;
            serviceType: string;
            priority: string;
            qty: string;
          }) => Number(item.qty),
        )
        .reduce((a, b) => a + b, 0),
    };
  });
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
        <ListRequestsComponent requests={finalRequestData} />
      </div>
    </div>
  );
}
