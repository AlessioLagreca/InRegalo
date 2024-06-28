"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  elementoRicerca: z.string().min(2).max(50),
  categoria: z.string().min(2).max(50),
});

export default function SearchBar() {
  // 1. Definiamo il form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      elementoRicerca: "",
      categoria: "",
    },
  });

  const [elementoRicerca, setElementoRicerca] = useState("");
  const [categoria, setCategoria] = useState("");

  const gestisciRicerca = () => {
    const vecchioCookie = Cookies.get("query");
    const vecchioCookieCategoria = Cookies.get("querycategoria");
    console.log("elemento ricerca:", elementoRicerca);
    console.log("vecchio cookie:", vecchioCookie);
    if (vecchioCookie) {
      Cookies.remove("query");
      Cookies.remove("querycategoria");
      Cookies.set("query", elementoRicerca);
      Cookies.set("querycategoria", categoria);
      window.location.href = "/ricerca";
    } else {
      Cookies.set("query", elementoRicerca);
      window.location.href = "/ricerca";
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="flex gap-4 items-center justify-center">
          <FormField
            control={form.control}
            name="elementoRicerca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cerca annunci</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e) => setElementoRicerca(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && gestisciRicerca()}
                    type="text"
                    placeholder="Cerca annunci"
                    className="max-w-2xl w-full py-6 text-lg focus:outline-none hover:border-gray-400 focus:ring-2 focus-visible:outline-none focus:ring-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <SelectTrigger className="flex flex-1 p-4 py-6 hover:border-gray-400">
                      <SelectValue placeholder="Tutte le categorie" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="tutte le categorie">
                        Tutte le categorie
                      </SelectItem>
                      <SelectItem value="elettronica">Elettronica</SelectItem>
                      <SelectItem value="libri">Libri</SelectItem>
                      <SelectItem value="musica">Musica</SelectItem>
                      <SelectItem value="sport">Sport</SelectItem>
                      <SelectItem value="tempo libero">Tempo libero</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-green-500 font-bold text-white self-end p-6"
            onClick={gestisciRicerca}
          >
            Cerca
          </Button>
        </div>
      </Form>
    </>
  );
}
