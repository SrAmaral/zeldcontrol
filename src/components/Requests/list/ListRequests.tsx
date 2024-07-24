"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { type RequestDataType } from "../new/NewRequestTypes";
import { DeleteRequestById } from "../new/RequestRequest";

type ListRequestComponentType = {
  requests: RequestDataType[];
};

export default function ListRequestsComponent({
  requests,
}: ListRequestComponentType) {
  const router = useRouter();
  const [diologVisible, setDialogVisible] = useState(false);
  const [requestsData, setRequestsData] = useState<RequestDataType[]>([]);
  const [requestToDelete, setRequestToDelete] = useState<number | undefined>();
  const [filter, setFilter] = useState<string>("");

  const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    if (!!filter) {
      const filteredRequests = requests.filter((request) => {
        return request.id.toString().includes(filter);
      });

      setRequestsData(filteredRequests);
    } else {
      setRequestsData(requests);
    }
  }, [filter, requests]);

  const clearFilter = () => {
    setFilter("");
  };

  const renderHeader = () => {
    return (
      <div className="flex-column justify-content-between flex gap-4 md:flex-row ">
        <div className="justify-content-center flex-column flex gap-4 md:flex-row">
          <Button
            type="button"
            icon="pi pi-plus-circle"
            label="Criar uma nova solicitação"
            onClick={() => router.push("/dashboard/product_requests/new")}
          />
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            onClick={clearFilter}
          />
        </div>
        <div className="mt-4 flex md:mt-0">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText
              id="filter"
              placeholder="Filtrar por ID"
              type="text"
              value={filter}
              onChange={(e) => filterChange(e)}
            />
          </span>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: RequestDataType) => {
    return (
      <div className="justify-content-center flex gap-4">
        <Button
          icon="pi pi-pencil"
          rounded
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          onClick={() => {
            setRequestToDelete(Number(rowData.id));
            setDialogVisible(true);
          }}
          rounded
        />
      </div>
    );
  };

  const handleEdit = (request: RequestDataType) => {
    router.push(`/dashboard/product_requests/${request.id}`);
  };

  const handleDelete = async () => {
    await DeleteRequestById(requestToDelete!);
  };

  const footerContentDiolog = (
    <div>
      <Button
        label="Não"
        icon="pi pi-times"
        onClick={() => setDialogVisible(false)}
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        severity="danger"
        onClick={async () => {
          setDialogVisible(false);
          try {
            await handleDelete();
            setRequestsData(
              requestsData.filter(
                (request) => Number(request.id) !== requestToDelete,
              ),
            );
          } catch (error) {
            console.log(error);
          }
        }}
        autoFocus
      />
    </div>
  );

  return (
    <div>
      <Dialog
        header="Exluir Solicitação"
        visible={diologVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
        footer={footerContentDiolog}
      >
        <p className="m-0 flex text-3xl font-bold">
          Tem certeza que deseja excluir esta solicitação?
        </p>
        <p className="m-0 mt-4 flex text-xl">
          Ao excluir esta solicitação, os dados do mesmo serão perdidos
        </p>
      </Dialog>

      <DataTable
        value={requestsData}
        paginator
        className="p-datatable-gridlines mt-8"
        showGridlines
        rows={10}
        dataKey="id"
        filterDisplay="menu"
        responsiveLayout="scroll"
        emptyMessage="No customers found."
        header={renderHeader}
        globalFilterFields={["id", "status", "deadLine", "qtyRequests"]}
      >
        <Column
          field="id"
          header="ID"
          alignHeader={"center"}
          sortable
          style={{ minWidth: "1rem", textAlign: "center" }}
        />
        <Column
          field="status"
          header="Status"
          alignHeader={"center"}
          sortable
          style={{ minWidth: "1rem", textAlign: "center" }}
        />
        <Column
          field="deadLine"
          header="Data Limite"
          alignHeader={"center"}
          sortable
          style={{ textAlign: "center" }}
        />
        <Column
          field="qtyRequests"
          header="Quantidade de Solicitações"
          alignHeader={"center"}
          sortable
          style={{ maxWidth: "4em", textAlign: "center" }}
        />
        <Column
          header="Ações"
          alignHeader={"center"}
          style={{ maxWidth: "8em" }}
          body={actionBodyTemplate}
        />
      </DataTable>
    </div>
  );
}
