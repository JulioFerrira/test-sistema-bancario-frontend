import { useState } from "react";
import { Button, Drawer, Table } from "rsuite";
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
        <Button appearance="default" onClick={() => setOpen(true)}>
          Transferir
        </Button>
      ),
    },
  ];
  const { Cell, Column, HeaderCell } = Table;

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <h1>hola</h1>
        </Drawer.Body>
      </Drawer>
      <div className="flex justify-between mb-5">
        <h2 className="text-4xl">Tabla de contactos</h2>
        <Button
          className="p-5 text-white bg-blue-700"
          onClick={() => setOpen(true)}
        >
          Agregar Contacto
        </Button>
      </div>
      <Table data={data} width={1440}>
        <Column width={360} align="center">
          <HeaderCell>Numero de cuenta</HeaderCell>
          <Cell dataKey="accountNumber" />
        </Column>

        <Column width={360}>
          <HeaderCell>Primer nombre</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={360}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column width={360}>
          <HeaderCell>Transferir</HeaderCell>
          <Cell dataKey="onTransfer" />
        </Column>
      </Table>
    </>
  );
};

export default ContactsTable;
