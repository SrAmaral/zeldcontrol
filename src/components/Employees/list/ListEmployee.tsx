"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { type EmployeeDataType } from "../new//NewEmployeesTypes";
import { DeleteEmployeeById } from "../new/EmployeeRequests";

type ListEmployeeComponentType = {
  employees: EmployeeDataType[];
};

export default function ListEmployeeComponent({
  employees,
}: ListEmployeeComponentType) {
  const router = useRouter();
  const [diologVisible, setDialogVisible] = useState(false);
  const [employeesData, setEmployeesData] = useState<EmployeeDataType[]>([]);
  const [employeeToDelete, setEmployeeToDelete] = useState<
    number | undefined
  >();
  const [filter, setFilter] = useState<string>("");

  const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    if (!!filter) {
      const filteredEmployees = employees.filter((employee) => {
        return employee.firstName.toLowerCase().includes(filter.toLowerCase());
      });
      setEmployeesData(filteredEmployees);
    } else {
      setEmployeesData(employees);
    }
  }, [filter, employees]);

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
            label="Criar um novo Funcionário"
            onClick={() => router.push("/dashboard/employees/new")}
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
              placeholder="Filtrar por nome"
              type="text"
              value={filter}
              onChange={(e) => filterChange(e)}
            />
          </span>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: EmployeeDataType) => {
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
            setEmployeeToDelete(rowData.id);
            setDialogVisible(true);
          }}
          rounded
        />
      </div>
    );
  };

  const handleEdit = (employee: EmployeeDataType) => {
    router.push(`/dashboard/employees/${employee.id}`);
  };

  const handleDelete = async () => {
    await DeleteEmployeeById(employeeToDelete!);
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
            setEmployeesData(
              employeesData.filter(
                (employee) => employee.id !== employeeToDelete,
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
        header="Exluir Funcionário"
        visible={diologVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
        footer={footerContentDiolog}
      >
        <p className="m-0 flex text-3xl font-bold">
          Tem certeza que deseja excluir este funcionário?
        </p>
        <p className="m-0 mt-4 flex text-xl">
          Ao excluir este funcionário, os dados do mesmo serão perdidos
        </p>
      </Dialog>

      <DataTable
        value={employeesData}
        paginator
        className="p-datatable-gridlines mt-8"
        showGridlines
        rows={10}
        dataKey="id"
        filterDisplay="menu"
        responsiveLayout="scroll"
        emptyMessage="No customers found."
        header={renderHeader}
        globalFilterFields={["firstName", "lastName", "position"]}
      >
        <Column
          field="firstName"
          header="Nome"
          alignHeader={"center"}
          sortable
          style={{ minWidth: "5rem" }}
        />
        <Column
          field="lastName"
          header="Sobrenome"
          alignHeader={"center"}
          sortable
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="position"
          header="Posição"
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
