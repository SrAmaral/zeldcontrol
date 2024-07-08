"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, usePathname } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputFilesComponent from "../../File/InputFilesComponent";
import {
  NewEmployeeFormSchema,
  type NewEmployeeFormSchemaType,
} from "./NewEmployeesTypes";

export default function NewEmployeeForm() {
  const [findingCNPJ, setFindingCNPJ] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewEmployeeFormSchemaType>({
    resolver: zodResolver(NewEmployeeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      rg: "",
      cpf: "",
      pis: "",
      ctps: "",
      address: {
        streetType: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
      contactNumber: "",
      contactEmail: "",
      typeHiring: "",
      hiringDate: "",
      position: "",
      salary: "0",
      workLoad: "",
      comment: "",
      files: [],
    },
  });

  const { employeeId } = useParams();
  const [isEmployee, setIsEmployee] = useState(false);
  const pathName = usePathname();
  // const [loading, setLoading] = useState(
  //   pathName !== "/dashboard/employees/new",
  // );
  const formValues = watch();
  // const cnpjWatch = watch("cnpj");

  // const router = useRouter();

  // const fetchClient = async () => {
  //   if (!!clientId) {
  //     try {
  //       const client = await GetClientRequest(Number(clientId));
  //       if (!!client) {
  //         setIsCLient(true);
  //         setLoading(false);
  //         Object.entries(client).forEach(([key, value]) => {
  //           const keyName = key as keyof NewClientFormSchemaType;
  //           const valueName = value as string;
  //           setValue(keyName, valueName);
  //         });
  //       } else {
  //         setIsCLient(false);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   void fetchClient();
  // }, []);

  // useEffect(() => {
  //   if (cnpjWatch.replace(/\D/g, "").length === 14 && clientId === undefined) {
  //     setFindingCNPJ("Buscando CNPJ...");
  //     fetch(
  //       `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjWatch.replace(/\D/g, "")}`,
  //     )
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //       })
  //       .then((data: CNPJRequestType) => {
  //         if (Object.keys(data).length !== 1) {
  //           setFindingCNPJ("CNPJ encontrado!");
  //           setValue("fantasyName", data["NOME FANTASIA"]);
  //           setValue("companyName", data["RAZAO SOCIAL"]);
  //           setValue("cnaeCode", data["CNAE PRINCIPAL CODIGO"]);
  //           setValue("cnaeDescription", data["CNAE PRINCIPAL DESCRICAO"]);
  //           setValue("openingDate", data["DATA ABERTURA"]);
  //           setValue("address.streetType", data["TIPO LOGRADOURO"]);
  //           setValue("address.street", data.LOGRADOURO);
  //           setValue("address.number", data.NUMERO);
  //           setValue("address.complement", data.COMPLEMENTO);
  //           setValue("address.neighborhood", data.BAIRRO);
  //           setValue("address.city", data.MUNICIPIO);
  //           setValue("address.state", data.UF);
  //           setValue("address.zipCode", data.CEP);
  //           setValue(
  //             "contactNumber",
  //             `(${data.DDD}) ${data.TELEFONE.slice(0, 4)}-${data.TELEFONE.slice(4)}`,
  //           );
  //           setValue("contactEmail", data.EMAIL);
  //         } else {
  //           setFindingCNPJ("CNPJ não encontrado na base do governo!");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     setFindingCNPJ("");
  //   }
  // }, [cnpjWatch]);

  async function handleCreateClient(data: NewEmployeeFormSchemaType) {
    console.log(data);
    // if (!!clientId) {
    //   await UpdateClientRequest(Number(clientId), data);s
    //   setTimeout(() => router.push("/dashboard/clients"), 2000);
    // } else {
    //   await CreateClientRequest(data);
    //   setTimeout(() => router.push("/dashboard/clients"), 2000);
    // }
  }

  const showForm =
    pathName === "/dashboard/employees/new" ? true : isEmployee ? true : false;

  const typeHiringOptions = [
    { label: "CLT", value: "CLT" },
    { label: "PJ", value: "PJ" },
    { label: "Intermitente", value: "Intermitente" },
    { label: "Estagiário", value: "Estagiário" },
    { label: "Freelancer", value: "Freelancer" },
    { label: "Outros", value: "Outros" },
  ];
  const positionOptions = [
    { label: "Gerente", value: "Gerente" },
    { label: "Vendedor", value: "Vendedor" },
    { label: "Financeiro", value: "Financeiro" },
    { label: "Tecnico", value: "Tecnico" },
    { label: "Outros", value: "Outros" },
  ];

  console.log(formValues.salary);

  return (
    <>
      {/* {loading && (
        <div className="col 12 grid gap-5">
          <Skeleton className="w-full" height="2.5rem" />
          <Skeleton className="w-full" height="2.5rem" />
          <Skeleton className="w-full" height="2.5rem" />
          <Skeleton className="w-full" height="2.5rem" />
          <Skeleton className="w-full" height="2.5rem" />
          <Skeleton className="w-full" height="2.5rem" />
        </div>
      )} */}
      {showForm && (
        <form onSubmit={handleSubmit(handleCreateClient)}>
          <TabView>
            <TabPanel
              header="Informações do Funcionário"
              contentClassName="p-fluid row-gap-6 formgrid mt-8 grid"
              leftIcon="pi pi-user mr-2"
            >
              <div className="field col-6">
                <span className="p-float-label">
                  <InputText
                    id="firstName"
                    defaultValue={formValues.firstName}
                    {...register("firstName")}
                  />
                  <label htmlFor="firstName">Nome</label>
                </span>
              </div>
              <div className="field col-6">
                <span className="p-float-label">
                  <InputText
                    id="lastName"
                    defaultValue={formValues.lastName}
                    {...register("lastName")}
                  />
                  <label htmlFor="lastName">Sobrenome</label>
                </span>
              </div>
              <div className="field col-6">
                <span className="p-float-label">
                  <InputMask
                    id="rg"
                    value={formValues.rg}
                    {...register("rg")}
                    mask="99.999.999-9"
                  />
                  <label htmlFor="rg">RG</label>
                </span>
              </div>{" "}
              <div className="field col-6">
                <span className="p-float-label">
                  <InputMask
                    id="cpf"
                    value={formValues.cpf}
                    {...register("cpf")}
                    mask="999.999.999-99"
                  />
                  <label htmlFor="cpf">CPF</label>
                </span>
              </div>
              <div className="field col-6">
                <span className="p-float-label">
                  <InputMask
                    id="pis"
                    value={formValues.pis}
                    {...register("pis")}
                    mask="999.99999.99-9"
                  />
                  <label htmlFor="pis">PIS</label>
                </span>
              </div>
              <div className="field col-6">
                <span className="p-float-label">
                  <InputMask
                    id="ctps"
                    value={formValues.ctps}
                    {...register("ctps")}
                    mask="999.999.999-99"
                  />
                  <label htmlFor="ctps">CTPS</label>
                </span>
              </div>
              <div className="field col-6">
                <span className="p-float-label">
                  <InputMask
                    id="contactNumber"
                    value={formValues.contactNumber}
                    {...register("contactNumber")}
                    mask="(99) 9999-9999"
                  />
                  <label htmlFor="openingDate">Numero para Contato</label>
                </span>
              </div>
              <div className="field col-6">
                <span className="p-float-label">
                  <InputText
                    id="contactEmail"
                    defaultValue={formValues.contactEmail}
                    {...register("contactEmail")}
                  />
                  <label htmlFor="openingDate">Email para Contato</label>
                </span>
              </div>
            </TabPanel>
            <TabPanel
              header="Dados da Contratação"
              leftIcon="pi pi-briefcase mr-2"
              contentClassName="p-fluid row-gap-6 formgrid mt-6 grid"
            >
              <div className="p-inputgroup field col-4">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-calendar"></i>
                </span>
                <span className="p-float-label">
                  <InputMask
                    id="hiringDate"
                    value={formValues.hiringDate}
                    {...register("hiringDate")}
                    mask="99/99/9999"
                  />
                  <label htmlFor="hiringDate">Data da Contratação</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <Dropdown
                    id="typeHiring"
                    value={formValues.typeHiring}
                    {...register("typeHiring")}
                    options={typeHiringOptions}
                  />
                  <label htmlFor="typeHiring">Tipo de Contratação</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <Dropdown
                    id="position"
                    value={formValues.position}
                    {...register("position")}
                    options={positionOptions}
                  />
                  <label htmlFor="position">Area de Atuação</label>
                </span>
              </div>
              <div className="p-inputgroup field col-4">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-dollar"></i>
                </span>
                <span className="p-float-label">
                  <InputNumber
                    id="salary"
                    inputStyle={{
                      borderBottomLeftRadius: 0,
                      borderTopLeftRadius: 0,
                    }}
                    maxFractionDigits={2}
                    minFractionDigits={2}
                    value={Number(formValues.salary)}
                    onChange={(e) => setValue("salary", e.value?.toString())}
                  />
                  <label htmlFor="salary">Salario</label>
                </span>
              </div>
              <div className="p-inputgroup field col-4">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-clock"></i>
                </span>
                <span className="p-float-label">
                  <InputMask
                    id="workLoad"
                    value={formValues.workLoad}
                    {...register("workLoad")}
                    mask="99:99"
                  />
                  <label htmlFor="workLoad">Horas de Tabalho</label>
                </span>
              </div>
              <div className="field col-12">
                <span className="p-float-label">
                  <InputTextarea
                    id="comment"
                    style={{
                      resize: "none",
                      minHeight: "200px",
                    }}
                    className="h-"
                    value={formValues.comment}
                    {...register("comment")}
                  />
                  <label htmlFor="comment">
                    Observações sobre a contratação
                  </label>
                </span>
              </div>
            </TabPanel>
            <TabPanel
              header="Endereço"
              leftIcon="pi pi-map mr-2"
              contentClassName="p-fluid row-gap-6 formgrid mt-6 grid"
            >
              <div className="field col-2">
                <span className="p-float-label">
                  <InputText
                    id="streetType"
                    defaultValue={formValues.address?.streetType}
                    {...register("address.streetType")}
                  />
                  <label htmlFor="streetType">Tipo de Longradouro</label>
                </span>
              </div>
              <div className="field col-10">
                <span className="p-float-label">
                  <InputText
                    id="street"
                    defaultValue={formValues.address?.street}
                    {...register("address.street")}
                  />
                  <label htmlFor="street">Longradouro</label>
                </span>
              </div>
              <div className="field col-2">
                <span className="p-float-label">
                  <InputText
                    id="number"
                    defaultValue={formValues.address?.number}
                    {...register("address.number")}
                  />
                  <label htmlFor="number">Numero</label>
                </span>
              </div>
              <div className="field col-5">
                <span className="p-float-label">
                  <InputText
                    id="complement"
                    defaultValue={formValues.address?.complement}
                    {...register("address.complement")}
                  />
                  <label htmlFor="complement">Complemento</label>
                </span>
              </div>
              <div className="field col-5">
                <span className="p-float-label">
                  <InputText
                    id="neighborhood"
                    defaultValue={formValues.address?.neighborhood}
                    {...register("address.neighborhood")}
                  />
                  <label htmlFor="neighborhood">Bairro</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <InputText
                    id="city"
                    defaultValue={formValues.address?.city}
                    {...register("address.city")}
                  />
                  <label htmlFor="city">Cidade</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <InputText
                    id="state"
                    defaultValue={formValues.address?.state}
                    {...register("address.state")}
                  />
                  <label htmlFor="state">Estado</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <InputText
                    id="zipcode"
                    defaultValue={formValues.address?.zipCode}
                    {...register("address.zipCode")}
                  />
                  <label htmlFor="state">CEP</label>
                </span>
              </div>
            </TabPanel>
            <TabPanel
              header="Arquivos"
              leftIcon="pi pi-folder mr-2"
              contentClassName="p-fluid row-gap-6 formgrid mt-6 grid"
            >
              <InputFilesComponent />
            </TabPanel>
          </TabView>
          {/* <div className="justify-content-end flex">
            <Button
              label={!!clientId ? "Atualizar Cadastro" : "Criar Cliente"}
              type="submit"
              className="mt-4 w-4"
            />
          </div> */}
        </form>
      )}
      {/* {!showForm && !loading && (
        <div className="justify-content-center align-items-center mb-8 flex h-fit">
          <div className="z-1 text-center">
            <div className="text-900 mb-4 text-8xl font-bold">Oops!</div>
            <p className="line-height-3 text-700 mb-5 mt-0 text-xl font-medium">
              Este cliente não foi encontrado em nossa base de dados.
            </p>
            <Link href={"/dashboard/clients"}>
              <button
                type="button"
                className="p-button p-button-warning p-button-raised font-medium"
              >
                Voltar para clientes
              </button>
            </Link>
          </div>
        </div>
      )} */}
    </>
  );
}
