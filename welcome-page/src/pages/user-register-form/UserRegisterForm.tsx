"use client";

import React, { FormEvent, useState } from "react";

import Image from "next/image";
import { InputForm } from "../generics/InputForm";
import http from "../../http";

interface IUserRegisterForm {
  viewUserRegisterForm: boolean;
  onClose: (value: boolean) => void;
}

interface IResponse {
  error: boolean;
  message: string;
}

export const UserRegisterForm = ({
  viewUserRegisterForm,
  onClose,
}: IUserRegisterForm) => {
  const [username, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  const [response, setResponse] = useState<IResponse | null>(null);

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setTerms(false);
    setResponse(null);
    onClose(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    http.post('/user', {username, email, password}).then(()=>{
        setResponse({
          message: "Cadastro realizado com sucesso!",
          error: false,
        });
        setName("");
        setEmail("");
        setPassword("");
        setTerms(false);
        }).catch((error) => {
          setResponse({
            message: error.response?.data?.message || "Ocorreu um erro ao realizar o cadastro.",
            error: true,
          });
        }    
        )
  };

  return (
    <>
      {viewUserRegisterForm && (
        <div className="fixed inset-0 bg-modal-100 bg-opacity-50 flex justify-center items-center z-50 px-6 m-0 min-h-modal max-h-modal max-w-md overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="max-w-lg bg-stone-50 min-h-modal max-h-modal flex flex-col gap-8 py-8 px-6 relative"
          >
            <button
              className="absolute right-4 top-4"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              <Image src="/close.svg" alt="fechar" width={16} height={16} />
            </button>
            <div className="flex flex-col gap-8 justify-center items-center">
              <Image
                src="/images/user-register.svg"
                alt="imagem"
                width={355}
                height={260}
              />
              <h1 className="font-bold text-xl text-center">
                Preencha os campos abaixo para criar sua conta corrente!
              </h1>
            </div>
            {response && !response.error ? (
              <div
                className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>
                  <span className="font-medium">{response.message}</span>
                </div>
              </div>
            ) : (
              response && (
                <div
                  className="flex items-center p-4 mb-0 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div>
                    <span className="font-medium">{response.message}</span>
                  </div>
                </div>
              )
            )}
            <div className="flex flex-col gap-6">
              <InputForm
                label="Nome"
                placeholder="Digite seu nome completo"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <InputForm
                label="Email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <InputForm
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  required
                  className="h-[1.5rem] w-[1.5rem]"
                />
                <label>
                  Li e estou ciente quanto às condições de tratamento dos meus
                  dados conforme descrito na Política de Privacidade do banco.
                </label>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="w-36 h-12 bg-secondary-500 rounded-lg text-white font-bold"
                type="submit"
              >
                Criar conta
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
