"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { DeleteClientById } from "../new/ClientRequest";
import { type ClientDataType } from "../new/NewClientsTypes";

type ListClientComponentType = {
  clients: ClientDataType[];
};

export default function ListClientComponent({
  clients,
}: ListClientComponentType) {
  const router = useRouter();
  const [diologVisible, setDialogVisible] = useState(false);
  const [clientsData, setClientsData] = useState<ClientDataType[]>([]);
  const [clientToDelete, setClientToDelete] = useState<number | undefined>();
  const [filter, setFilter] = useState<string>("");

  const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    if (!!filter) {
      const filteredClients = clients.filter((client) => {
        return client.companyName.toLowerCase().includes(filter.toLowerCase());
      });
      setClientsData(filteredClients);
    } else {
      setClientsData(clients);
    }
  }, [filter, clients]);

  const clearFilter = () => {
    // initFilters();
  };

  const renderHeader = () => {
    return (
      <div className="flex-column justify-content-between flex gap-4 md:flex-row ">
        <div className="justify-content-center flex-column flex gap-4 md:flex-row">
          <Button
            type="button"
            icon="pi pi-plus-circle"
            label="Criar um novo cliente"
            onClick={() => router.push("/dashboard/clients/new")}
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
              type="text"
              value={filter}
              onChange={(e) => filterChange(e)}
            />
          </span>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: ClientDataType) => {
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
            setClientToDelete(rowData.id);
            setDialogVisible(true);
          }}
          rounded
        />
      </div>
    );
  };

  const handleEdit = (client: ClientDataType) => {
    router.push(`/dashboard/clients/${client.id}`);
  };

  const handleDelete = async () => {
    await DeleteClientById(clientToDelete!);
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
            setClientsData(
              clientsData.filter((client) => client.id !== clientToDelete),
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
        header="Exluir cliente"
        visible={diologVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
        footer={footerContentDiolog}
      >
        <p className="m-0 flex text-3xl font-bold">
          Tem certeza que deseja excluir este cliente?
        </p>
        <p className="m-0 mt-4 flex text-xl">
          Ao excluir este cliente, os dados do mesmo serão perdidos
        </p>
      </Dialog>

      <DataTable
        value={clientsData}
        paginator
        className="p-datatable-gridlines mt-8"
        showGridlines
        rows={10}
        dataKey="id"
        filterDisplay="menu"
        responsiveLayout="scroll"
        emptyMessage="No customers found."
        header={renderHeader}
        globalFilterFields={["companyName", "cnpj"]}
      >
        <Column
          field="companyName"
          header="Nome"
          alignHeader={"center"}
          sortable
          style={{ minWidth: "12rem", maxWidth: "17rem" }}
        />
        <Column
          field="cnpj"
          header="CNPJ"
          alignHeader={"center"}
          sortable
          style={{ minWidth: "10rem", textAlign: "center" }}
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
