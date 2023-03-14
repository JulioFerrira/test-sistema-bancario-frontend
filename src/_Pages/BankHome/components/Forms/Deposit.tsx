import { gqlBankAccount, gqlUserBankSettings } from "@/gql";
import { useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Drawer, Input, SelectPicker } from "rsuite";
import { useUser } from "../../../../context/user/user.context";
import { IDepositToAccountInput } from "../../../../gql/BankAccount/mutations";
import {
  EAccountType,
  IDepositToAccount,
} from "../../../../types/BankAccount/index";

interface Props {
  drawer: boolean;
  setDrawer: (drawer: boolean) => void;
}

const Deposit = ({ drawer, setDrawer }: Props) => {
  const { control, handleSubmit } = useForm<IDepositToAccount>();
  const { userBankAccount } = useUser();
  const BANK_ACCOUNTS_DATA = Object.keys(EAccountType)?.map((account) => ({
    label: account,
    value: account,
  }));

  const [depositTo] = useMutation<
    any,
    { depositBalanceInput: IDepositToAccountInput }
  >(gqlBankAccount.mutations.DEPOSTI_TO_ACCOUNT, {
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

  const onDeposit = async (input: IDepositToAccount) => {
    depositTo({
      variables: {
        depositBalanceInput: {
          amount: +input.amount,
          accountTypeTo: input.accountTypeTo,
          accountIdTo: userBankAccount?.bankAccount?.id || "",
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
          onSubmit={handleSubmit(onDeposit)}
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

export default Deposit;
