"use client";

import React, { FormEvent, useState } from "react";

import Image from "next/image";
import { InputForm } from "../generics/InputForm";
import http from "../../http";


interface ILoginForm {
  viewLoginForm: boolean;
  onClose: (value: boolean) => void;
}

export const LoginForm = ({ viewLoginForm, onClose }: ILoginForm) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setMessage("");
    onClose(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    http.post('/user/auth', {email, password}).then((response)=>{
      setMessage("Login realizado com sucesso!");
      setEmail("");
      setPassword("");
      localStorage.setItem('token', response.data.result.token);
      }).catch((error) => {
        setMessage(error.response?.data?.message || "Ocorreu um erro ao realizar o login.");
      }    
      )
  };

  return (
    <>
      {viewLoginForm && (
        <div className="fixed inset-0 bg-modal-100 bg-opacity-50 flex justify-center items-center z-50 px-6 min-h-modal max-h-modal max-w-md">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[792px] bg-stone-50 h-full flex flex-col gap-8 py-8 md:px-28 px-8 relative overflow-y-auto"
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
                src="/images/login.svg"
                alt="imagem"
                width={330}
                height={267}
              />
              <h1 className="font-bold text-xl">Login</h1>
            </div>
            {message && (
              <div
                className="flex items-center p-4 mb-0 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400 dark:border-red-800"
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
                  <span className="font-medium">{message}</span>
                </div>
              </div>
            )}
            <div>
              <div className="flex flex-col gap-6 mb-2">
                <InputForm
                  label="Email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputForm
                  label="Senha"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
              <span className="text-green-600 underline">Esqueci a senha!</span>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="w-36 h-12 bg-green-600 rounded-lg text-white font-bold"
                type="submit"
              >
                Acessar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
