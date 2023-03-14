import { useState } from "react";
import { Button, Table } from "rsuite";
const ContactsTable = () => {
  const [open, setOpen] = useState(true);

  const data = [
    {
      accountNumber: 1,
      name: "John",
      email: "Doe",
      onTransfer: (
        <Button appearance="default" onClick={() => setOpen(true)}>
          Transferir
        </Button>
      ),
    },
    {
      accountNumber: 2,
      name: "John",
      email: "Doe",
      onTransfer: (
        <Button appearance="default" onClick={() => setOpen(true)}>
          Transferir
        </Button>
      ),
    },
    {
      accountNumber: 3,
      name: "John",
      email: "Doe",
      onTransfer: (
        <Button
          appearance="default"
          onClick={() => setOpen(true)}
          className="py-1"
        >
          Transferir
        </Button>
      ),
    },
  ];
  const { Cell, Column, HeaderCell } = Table;

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="text-4xl">Tabla de contactos</h2>
      </div>
      <div className="flex flex-col">
        <Table data={data}>
          <Column width={392} align="center">
            <HeaderCell>Numero de cuenta</HeaderCell>
            <Cell dataKey="accountNumber" />
          </Column>
          <Column width={392}>
            <HeaderCell>Primer nombre</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={392}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column width={392}>
            <HeaderCell>Transferir</HeaderCell>
            <Cell dataKey="onTransfer" />
          </Column>
        </Table>
      </div>
    </>
  );
};

export default ContactsTable;
