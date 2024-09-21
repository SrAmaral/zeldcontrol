/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  NewQuotationFormSchema,
  type NewQuotationFormSchemaType,
  type QuotationItemsType,
} from "./NewQuotationTypes";
import {
  AproveQuotation,
  GetQuotationById,
  ReopenQuotation,
  ReproveQuotation,
} from "./QuotationRequest";

export default function QuotationComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewQuotationFormSchemaType>({
    resolver: zodResolver(NewQuotationFormSchema),
    defaultValues: {
      items: [
        {
          description: "",
          serviceType: {
            name: "",
            code: "",
          },
          priority: {
            name: "",
            code: "",
          },
          qty: "0",
          price: 0,
        },
      ],
      deadLine: "",
    },
  });

  const { quotationId } = useParams();
  const [diologVisible, setDialogVisible] = useState(false);
  const [diologType, setDialogType] = useState<string>("");
  const [status, setStatus] = useState("");
  const formValues = watch();

  const router = useRouter();

  const fetchRequest = async () => {
    if (!!quotationId) {
      try {
        const request = await GetQuotationById(Number(quotationId));
        setStatus(request?.status ?? "");
        if (!!request) {
          Object.entries(request).forEach(([key, value]) => {
            const keyName = key as keyof NewQuotationFormSchemaType;
            const valueName = value as string;
            setValue(keyName, valueName);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    void fetchRequest();
  }, []);

  const convertToMonetary = (value: string | number) => {
    let newValue: number | string = value;
    if (typeof value === "number") {
      newValue = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else if (typeof value === "string") {
      newValue = parseFloat(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return newValue;
  };

  const footerContentDiolog = () => {
    return (
      <div>
        <Button
          label="Não"
          icon="pi pi-times"
          onClick={() => setDialogVisible(false)}
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          severity={diologType === "approved" ? "success" : "danger"}
          onClick={async () => {
            if (diologType === "approved") {
              await AproveQuotation(Number(quotationId));
              setTimeout(
                () => router.push("/dashboard/product_requests/list"),
                1000,
              );
            } else if (diologType === "rejected") {
              await ReproveQuotation(Number(quotationId));
              setTimeout(
                () => router.push("/dashboard/product_requests/list"),
                1000,
              );
            } else if (diologType === "reopened") {
              await ReopenQuotation(Number(quotationId));
              setTimeout(
                () => router.push("/dashboard/product_requests/list"),
                1000,
              );
            }

            setDialogVisible(false);
          }}
          autoFocus
        />
      </div>
    );
  };

  return (
    <div className="card overflow-auto px-6 py-8 md:px-8">
      <Dialog
        header={`${
          diologType === "approved"
            ? "Aprovar"
            : diologType === "rejected"
              ? "Rejeitar"
              : "Reabrir"
        } Orçamento`}
        visible={diologVisible}
        style={{ width: "50vw" }}
        onHide={() => setDialogVisible(false)}
        footer={footerContentDiolog}
      >
        <p className="m-0 flex text-3xl font-bold">
          Tem certeza que deseja{" "}
          {diologType === "approved"
            ? "aprovar"
            : diologType === "rejected"
              ? "rejeitar"
              : "reabrir"}{" "}
          este Orçamento?
        </p>
        <p className="m-0 mt-4 flex text-xl">
          Ao{" "}
          {diologType === "approved"
            ? "aprovar"
            : diologType === "rejected"
              ? "rejeitar"
              : "reabrir"}{" "}
          este Orçamento, a ação não podera ser desfeita.
        </p>
      </Dialog>
      <div className="flex-column align-items-start md:align-items-center md:justify-content-between border-bottom-1 surface-border flex min-w-max pb-5 md:flex-row">
        <div className="flex-column flex">
          <svg
            width="48"
            height="50"
            viewBox="0 0 48 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M33.1548 9.65956L23.9913 4.86169L5.54723 14.5106L0.924465 12.0851L23.9913 0L37.801 7.23403L33.1548 9.65956ZM23.9931 19.3085L42.4255 9.65955L47.0717 12.0851L23.9931 24.1595L10.1952 16.9361L14.8297 14.5106L23.9931 19.3085ZM4.6345 25.8937L0 23.4681V37.9149L23.0669 50V45.1489L4.6345 35.4894V25.8937ZM18.4324 28.2658L0 18.6169V13.7658L23.0669 25.8403V40.2977L18.4324 37.8615V28.2658ZM38.7301 23.468V18.6169L24.9205 25.8403V49.9999L29.555 47.5743V28.2659L38.7301 23.468ZM43.3546 35.4892V16.1914L48.0008 13.7659V37.9148L34.1912 45.1488V40.2977L43.3546 35.4892Z"
              fill="var(--primary-color)"
            />
          </svg>
          <div className="text-900 my-3 text-4xl font-bold">YOUR COMPANY</div>
          <span className="mb-2">9137 3rd Lane California City</span>
          <span>CA 93504, U.S.A.</span>
        </div>
        <div className="flex-column mt-5 flex md:mt-0">
          <div className="mb-3 text-left text-2xl font-semibold md:text-right">
            COTAÇÃO
          </div>
          <div className="flex-column flex">
            <div className="justify-content-between align-items-center mb-2 flex">
              <span className="mr-6 font-semibold">DATE</span>
              <span>xx/xx/xxxx</span>
            </div>
            <div className="justify-content-between align-items-center mb-2 flex">
              <span className="mr-6 font-semibold">Cotação #</span>
              <span>{quotationId}</span>
            </div>
            <div className="justify-content-between align-items-center flex">
              <span className="mr-6 font-semibold">CUSTOMER ID</span>
              <span>xxxxx</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-column mb-8 mt-5 flex">
        <div className="mb-3 text-2xl font-medium">IFORMAÇÔES</div>
        <span className="mb-2">
          Data limite para entrega:{" "}
          {formValues.deadLine !== null ? formValues.deadLine : "N/A"}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table
          className="w-full"
          style={{
            borderCollapse: "collapse",
            tableLayout: "auto",
          }}
        >
          <thead>
            <tr>
              <th className="border-bottom-1 surface-border white-space-nowrap py-3 text-left font-semibold">
                Descrição
              </th>
              <th className="border-bottom-1 surface-border white-space-nowrap px-3 py-3 text-right font-semibold">
                Tipo de Serviço
              </th>
              <th className="border-bottom-1 surface-border white-space-nowrap px-3 py-3 text-right font-semibold">
                Prioridade
              </th>
              <th className="border-bottom-1 surface-border white-space-nowrap py-3 text-right font-semibold">
                Quantidade
              </th>
              <th className="border-bottom-1 surface-border white-space-nowrap py-3 text-right font-semibold">
                Valor
              </th>
              <th className="border-bottom-1 surface-border white-space-nowrap py-3 text-right font-semibold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {formValues.items.map((item: QuotationItemsType, index: number) => (
              <tr key={index}>
                <td className="border-bottom-1 surface-border white-space-nowrap py-3 text-left">
                  {item.description}
                </td>

                <td className="border-bottom-1 surface-border px-3 py-3 text-right">
                  {item.serviceType?.name}
                </td>
                <td className="border-bottom-1 surface-border px-3 py-3 text-right">
                  {item.priority?.name}
                </td>
                <td className="border-bottom-1 surface-border px-3 py-3 text-right">
                  {" "}
                  {item.qty}
                </td>
                <td className="border-bottom-1 surface-border py-3 text-right">
                  {convertToMonetary(Number(item.qty))}
                </td>
                <td className="border-bottom-1 surface-border py-3 text-right">
                  {item.qty !== null && item.price !== null
                    ? " " +
                      convertToMonetary(Number(item.qty) * Number(item.price))
                    : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-column md:align-items-start md:justify-content-between mt-8 flex md:flex-row">
        <div className="mb-3 font-semibold md:mb-0">NOTES</div>
        <div className="flex-column flex">
          <div className="justify-content-between align-items-center mb-2 flex">
            <span className="mr-6 font-semibold">SUBTOTAL</span>
            <span>
              {" " +
                convertToMonetary(
                  formValues.items.reduce((a, b) => {
                    if (b.qty !== null && b.qty !== undefined) {
                      return (
                        a +
                        (b.qty !== null &&
                        b.price !== null &&
                        b.price !== undefined
                          ? Number(b.qty) * Number(b.price)
                          : 0)
                      );
                    } else {
                      return a;
                    }
                  }, 0),
                )}
            </span>
          </div>
          <div className="justify-content-between align-items-center mb-2 flex">
            <span className="mr-6 font-semibold">VAT #</span>
            <span>{convertToMonetary("0")}</span>
          </div>
          <div className="justify-content-between align-items-center flex">
            <span className="mr-6 font-semibold">TOTAL</span>
            <span>
              {" " +
                convertToMonetary(
                  formValues.items.reduce((a, b) => {
                    if (b.qty !== null && b.qty !== undefined) {
                      return (
                        a +
                        (b.qty !== null &&
                        b.price !== null &&
                        b.price !== undefined
                          ? Number(b.qty) * Number(b.price)
                          : 0)
                      );
                    } else {
                      return a;
                    }
                  }, 0),
                )}
            </span>
          </div>
        </div>
      </div>
      <div className="justify-content-end col-12 mt-8 flex gap-4 ">
        {status === "requestQuotation" ? (
          <>
            <Button
              onClick={() => {
                setDialogType("approved");
                setDialogVisible(true);
              }}
              severity="success"
              label="Aprovar Orçamento"
              icon="pi pi-check"
            ></Button>
            <Button
              onClick={() => {
                setDialogType("rejected");
                setDialogVisible(true);
              }}
              severity="danger"
              label="Reprovar Orçamento"
              icon="pi pi-times"
            ></Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setDialogType("reopened");
              setDialogVisible(true);
            }}
            severity="warning"
            label="Reabrir Aprovação de Cotação"
            icon="pi pi-directions-alt"
          ></Button>
        )}
      </div>
    </div>
  );
}
