"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { ListBox } from "primereact/listbox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  NewRequestFormSchema,
  type NewRequestFormSchemaType,
} from "./NewRequestTypes";

export default function NewRequestForm() {
  const [findingCNPJ, setFindingCNPJ] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewRequestFormSchemaType>({
    resolver: zodResolver(NewRequestFormSchema),
    defaultValues: {
      items: [{ description: "", serviceType: "", priority: "", qty: "0" }],
      deadLine: "",
    },
  });

  const { clientId } = useParams();
  const [isRequest, setIsCLient] = useState(false);
  const pathName = usePathname();
  const [loading, setLoading] = useState(pathName !== "/dashboard/clients/new");
  const formValues = watch();

  const router = useRouter();

  const fetchRequest = async () => {
    // if (!!clientId) {
    //   try {
    //     const client = await GetRequestRequest(Number(clientId));
    //     if (!!client) {
    //       setIsCLient(true);
    //       setLoading(false);
    //       Object.entries(client).forEach(([key, value]) => {
    //         const keyName = key as keyof NewRequestFormSchemaType;
    //         const valueName = value as string;
    //         setValue(keyName, valueName);
    //       });
    //     } else {
    //       setIsCLient(false);
    //       setLoading(false);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  useEffect(() => {
    void fetchRequest();
  }, []);

  async function handleCreateRequest(data: NewRequestFormSchemaType) {
    console.log(data);
    // if (!!clientId) {
    //   await UpdateRequestRequest(Number(clientId), data);
    //   setTimeout(() => router.push("/dashboard/clients"), 2000);
    // } else {
    //   await CreateRequestRequest(data);
    //   setTimeout(() => router.push("/dashboard/clients"), 2000);
    // }
  }

  const addNewItem = () => {
    const items = getValues("items");
    items.push({ description: "", serviceType: "", priority: "", qty: "" });
    setValue("items", items);
  };
  const removeItem = (index: number) => {
    const items = getValues("items");
    items.splice(index, 1);
    setValue("items", items);
  };

  const showForm =
    pathName === "/dashboard/clients/new" ? true : isRequest ? true : false;
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
      {/* {showForm && ( */}
      <form onSubmit={handleSubmit(handleCreateRequest)}>
        <div className="col-12 card grid gap-5">
          <h1>Criar SOlicitação</h1>
          <div className="p-fluid row-gap-4 formgrid col-12 grid">
            <Button
              label="Adicionar solicitação"
              icon="pi pi-plus"
              className="col-2 sm:col-4 h-3rem"
              onClick={() => addNewItem()}
            />
          </div>
          <div className="p-fluid row-gap-4 formgrid col-12 mt-8 grid">
            {getValues("items")?.map((item, index) => (
              <div key={index} className="col-12 grid">
                <div
                  className="field col-6 sm:col-4"
                  key={index + " description"}
                >
                  <label htmlFor="description" className="mb-2 ">
                    Descrição
                  </label>
                  <InputTextarea
                    style={{
                      resize: "none",
                      maxHeight: "105px",
                    }}
                    rows={5}
                    value={formValues.items[index]?.description}
                    {...register(`items.${index}.description` as const)}
                    onChange={(e) => {
                      setValue(
                        `items.${index}.description` as const,
                        e.target.value,
                      );
                    }}
                  />
                </div>
                <div className="field col-2" key={index + "type"}>
                  <label htmlFor="type" className="mb-2 ">
                    tipo
                  </label>
                  <ListBox
                    value={formValues.items[index]?.serviceType}
                    onChange={(e) => {
                      setValue(
                        `items.${index}.serviceType` as const,
                        e.value as string,
                      );
                    }}
                    options={[
                      {
                        name: "Serviço",
                        code: "service",
                      },
                      {
                        name: "Produto",
                        code: "product",
                      },
                    ]}
                    optionLabel="name"
                    className="md:w-14rem w-full"
                  />
                </div>
                <div className="field col-2" key={index + "priority"}>
                  <label htmlFor="priority" className="mb-2 ">
                    tipo
                  </label>
                  <ListBox
                    value={formValues.items[index]?.priority}
                    onChange={(e) => {
                      setValue(
                        `items.${index}.priority` as const,
                        e.value as string,
                      );
                    }}
                    options={[
                      {
                        name: "Baixa",
                        code: "low",
                      },
                      {
                        name: "Media",
                        code: "medium",
                      },
                      {
                        name: "Alta",
                        code: "high",
                      },
                    ]}
                    optionLabel="name"
                    className="md:w-14rem w-full"
                  />
                </div>
                <div className="field col-1 sm:col-2 " key={index + "qty"}>
                  <label htmlFor="qty" className="mb-2 ">
                    Quantidade
                  </label>
                  <InputNumber
                    id="qty"
                    value={Number(formValues.items[index]?.qty)}
                    onValueChange={(e) => {
                      setValue(
                        `items.${index}.qty` as const,
                        e.target.value?.toString(),
                      );
                    }}
                  />
                </div>
                <Button
                  label=""
                  key={index + "delete"}
                  severity="danger"
                  icon="pi pi-times"
                  className="h-3rem ml-6 mt-5"
                  onClick={() => removeItem(index)}
                />
              </div>
            ))}
            <div className="field col-12 md:col-6">
              <span className="p-float-label">
                <Calendar
                  id="deadline"
                  showIcon
                  showButtonBar
                  dateFormat="dd/mm/yy"
                  value={
                    formValues.deadLine ? new Date(formValues.deadLine) : null
                  }
                  onChange={(e) => {
                    setValue(
                      "deadLine" as const,
                      e.target.value ? e.target.value.toString() : "",
                    );
                  }}
                />
                <label htmlFor="deadline">Data Limite</label>
              </span>
            </div>
          </div>
        </div>
        <div className="justify-content-end flex">
          <Button
            label={!!clientId ? "Atualizar Solicitação" : "Criar Solicitação"}
            type="submit"
            className="mt-4 w-4"
          />
        </div>
      </form>
      {/* )} */}
      {!showForm && !loading && (
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
      )}
    </>
  );
}
