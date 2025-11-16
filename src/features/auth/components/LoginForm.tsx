"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputPassword } from "@/components/ui/input-password";
import { AuthSchema, AuthType } from "../auth.schema";
import { useLogin } from "../auth.hook";

const LoginForm = () => {
  const { mutate, isPending } = useLogin();
  const form = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: AuthType) => {
    mutate({ ...data });
  };

  return (
    <Card className="w-full rounded-none border-none p-0 shadow-lg">
      <CardContent className="space-y-4 p-6 md:p-10">
        <h1 className="text-xl font-bold">Masuk ke FindJob</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">
                    Alamat email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan email" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium">
                    Kata sandi
                  </FormLabel>
                  <FormControl>
                    <InputPassword {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              loading={isPending}
              className="bg-secondary-main hover:bg-secondary-hover font- w-full rounded-lg text-lg text-[16px] font-semibold text-black"
            >
              Masuk
            </Button>
          </form>
          <p className="text-sm">
            Belum punya akun?,{" "}
            <Link
              className="text-primary-main hover:text-primary-hover"
              href={"/register"}
            >
              Daftar
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
