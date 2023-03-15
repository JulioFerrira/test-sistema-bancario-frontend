import { gqlAuth, gqlUserBankSettings } from "@/gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Message, Panel, SelectPicker } from "rsuite";
import { USER_TOKEN_PERSIST } from "../../config/constants";
import { ILoginInput, ILoginResponse } from "../../gql/Auth/mutations";
import { IAddUserBankSettingsInput } from "../../gql/UserBankSettings/mutations";
import { EAccountType } from "../../types/BankAccount/index";
import { IUserBankSettings } from "../../types/UserBankSettings/index";

const BankLoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { control, handleSubmit, formState } = useForm<ILoginInput>();
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: formState2,
  } = useForm<IUserBankSettings>();
  const router = useRouter();

  const [login, { data: loginData }] = useMutation<
    { login: ILoginResponse },
    { loginInput: ILoginInput }
  >(gqlAuth.mutations.LOGIN);

  const { errors } = formState;
  const { errors: errors2 } = formState2;

  const [createAccount] = useMutation<any, IAddUserBankSettingsInput>(
    gqlUserBankSettings.mutations.ADD_USER_BANK_SETTINGS,
    {
      onCompleted: () => {
        setErrorMessage("");
        setSuccessMessage("Cuenta creada con exito");
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    }
  );

  const BANK_ACCOUNTS_DATA = Object.keys(EAccountType)?.map((account) => ({
    label: account,
    value: account,
  }));

  const onLogin = async (input: ILoginInput) => {
    try {
      await login({
        variables: {
          loginInput: {
            email: input.email,
            password: input.password,
          },
        },
      });
      router.replace("/app/home");
    } catch (error: any) {
      console.log(error);
    }
  };

  const onCreateUser = async (input: IUserBankSettings) => {
    try {
      await createAccount({
        variables: {
          createUserBankSettingDto: {
            bankSettingInput: {
              transferencePassword: input.bankSetting.transferencePassword,
            },
            createBankAccountsFactoryInput: {
              accountType: input.bankAccount.accountType,
              balance: +input.bankAccount.balance,
              bankName: input.bankAccount.bankName,
            },
            userInput: {
              email: input.user.email,
              name: input.user.name,
              password: input.user.password,
            },
          },
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginData?.login) {
      localStorage.setItem(USER_TOKEN_PERSIST, loginData?.login?.token || "");
    }
  }, [loginData]);

  const genericMessage = (type: any, message: string) => (
    <Message showIcon type={type}>
      {message}
    </Message>
  );

  return (
    <>
      {errorMessage && genericMessage("error", errorMessage)}
      {successMessage && genericMessage("success", successMessage)}
      <div className="flex items-center justify-center w-screen h-screen space-x-8 bg-blue-200">
        <form onSubmit={handleSubmit(onLogin)}>
          <Panel
            header={
              <h1 className="font-sans text-2xl">Login Sistema Bancario</h1>
            }
            shaded
            className="bg-white py-14 px-11"
            bodyFill
          >
            <div className="flex flex-col space-y-7">
              <div>
                <label className="text-md">Email</label>
                <Controller
                  name="email"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Email" className="p-3 " />
                  )}
                />
                {errors && errors.email && (
                  <span className="text-sm text-red-500">
                    Este campo es requerido
                  </span>
                )}
              </div>
              <div>
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
                {errors && errors.password && (
                  <span className="text-sm text-red-500">
                    Este campo es requerido
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="py-3 text-white bg-blue-700 rounded-md hover:bg-blue-500 hover:text-white"
              >
                Login
              </Button>
            </div>
          </Panel>
        </form>
        <Panel className="px-10 bg-white py-11 mt-14 space-y-11" bodyFill>
          <form
            className="flex flex-col space-y-3"
            onSubmit={handleSubmit2(onCreateUser)}
          >
            <h2 className="font-sans text-3xl text-center">Registro</h2>
            <div>
              <label className="text-md">Email</label>
              <Controller
                name="user.email"
                rules={{ required: true }}
                control={control2}
                render={({ field }) => (
                  <Input {...field} placeholder="Email" className="p-3" />
                )}
              />
              {errors2 && errors2.user?.email && (
                <span className="text-sm text-red-500">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div>
              <label className="text-md">Nombre</label>
              <Controller
                name="user.name"
                rules={{ required: true }}
                control={control2}
                render={({ field }) => (
                  <Input {...field} placeholder="Email" className="p-3 " />
                )}
              />
              {errors2 && errors2.user?.name && (
                <span className="text-sm text-red-500">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div>
              <label className="text-md">Password sesion</label>
              <Controller
                name="user.password"
                rules={{ required: true }}
                control={control2}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    className="p-3 "
                  />
                )}
              />
              {errors2 && errors2.user?.password && (
                <span className="text-sm text-red-500">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div>
              <label className="text-md">Tipo de cuenta</label>
              <Controller
                name="bankAccount.accountType"
                rules={{ required: true }}
                control={control2}
                render={({ field }) => (
                  <SelectPicker
                    searchable={false}
                    block
                    onChange={(v) => field.onChange(v)}
                    value={field.value}
                    data={BANK_ACCOUNTS_DATA || []}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errors2 && errors2.bankAccount?.accountType && (
                <span className="text-sm text-red-500">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div>
              <label className="text-md">Monto de cuenta</label>
              <Controller
                name="bankAccount.balance"
                rules={{ required: true }}
                control={control2}
                render={({ field }) => (
                  <Input {...field} placeholder="Email" className="p-3 " />
                )}
              />
              {errors2 && errors2.bankAccount?.balance && (
                <span className="text-sm text-red-500">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div>
              <label className="text-md">Nombre de banco</label>
              <Controller
                name="bankAccount.bankName"
                rules={{ required: true }}
                control={control2}
                render={({ field }) => (
                  <Input {...field} placeholder="Email" className="p-3 " />
                )}
              />
              {errors2 && errors2.bankAccount?.bankName && (
                <span className="text-sm text-red-500">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div>
              <label className="text-md">Password de transferencia</label>
              <Controller
                name="bankSetting.transferencePassword"
                rules={{ required: true }}
                control={control2}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    className="p-3 "
                  />
                )}
              />
              {errors2 && errors2?.bankSetting?.transferencePassword && (
                <span className="text-sm text-red-500">
                  Este campo es requerido
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="py-3 text-white bg-blue-700 rounded-md hover:bg-blue-500 hover:text-white"
            >
              Registro
            </Button>
          </form>
        </Panel>
      </div>
    </>
  );
};

export default BankLoginPage;
