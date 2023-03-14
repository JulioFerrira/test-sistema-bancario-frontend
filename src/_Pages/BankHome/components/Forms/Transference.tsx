import { gqlBankAccount, gqlUserBankSettings } from "@/gql";
import { useMutation } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Drawer, Input, SelectPicker } from "rsuite";
import { ITransferToAccountInput } from "../../../../gql/BankAccount/mutations";
import {
  EAccountType,
  ITransferToAccount,
} from "../../../../types/BankAccount/index";

interface Props {
  drawer: boolean;
  setDrawer: Dispatch<SetStateAction<boolean>>;
}

const Transference = ({ drawer, setDrawer }: Props) => {
  const { control, handleSubmit } = useForm<ITransferToAccount>();

  const BANK_ACCOUNTS_DATA = Object.keys(EAccountType)?.map((account) => ({
    label: account,
    value: account,
  }));

  const [transferTo] = useMutation<
    any,
    { transferBalanceInput: ITransferToAccountInput }
  >(gqlBankAccount.mutations.TRANSFER_TO_ACCOUNT, {
    refetchQueries: [gqlUserBankSettings.queries.GET_USER_BANK_SETTINGS],
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      toast(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const onTransfer = async (input: ITransferToAccount) => {
    transferTo({
      variables: {
        transferBalanceInput: {
          accountNumberTo: input.accountNumberTo,
          bankNameTo: input.bankNameTo,
          emailTo: input.emailTo,
          amount: +input.amount,
          accountTypeTo: input.accountTypeTo,
          transferencePassword: input.password,
        },
      },
    });
  };

  return (
    <Drawer open={drawer} onClose={() => setDrawer(false)}>
      <Drawer.Body>
        <form
          className="flex flex-col mt-10 space-y-6"
          onSubmit={handleSubmit(onTransfer)}
        >
          <div className="">
            <label className="text-md">Tipo de cuenta</label>
            <Controller
              name="accountTypeTo"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <SelectPicker
                  searchable={false}
                  block
                  onChange={(v) => field.onChange(v)}
                  value={field.value}
                  data={BANK_ACCOUNTS_DATA || []}
                  placeholder="Monto"
                />
              )}
            />
          </div>
          <div className="">
            <label className="text-md">Numero de cuenta</label>
            <Controller
              name="accountNumberTo"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Numero de cuenta"
                  className="p-3 "
                />
              )}
            />
          </div>
          <div className="">
            <label className="text-md">Banco</label>
            <Controller
              name="bankNameTo"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nombre del banco"
                  className="p-3 "
                />
              )}
            />
          </div>
          <div className="">
            <label className="text-md">Email</label>
            <Controller
              name="emailTo"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Email" className="p-3 " />
              )}
            />
          </div>
          <div className="">
            <label className="text-md">Monto</label>
            <Controller
              name="amount"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Monto" className="p-3 " />
              )}
            />
          </div>
          <div className="">
            <label className="text-md">Password</label>
            <Controller
              name="password"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Password"
                  type="password"
                  className="p-3 "
                />
              )}
            />
          </div>
          <Button
            type="submit"
            className="py-3 text-white bg-blue-700 rounded-md hover:bg-blue-500 hover:text-white"
          >
            Transferir
          </Button>
        </form>
      </Drawer.Body>
    </Drawer>
  );
};

export default Transference;
