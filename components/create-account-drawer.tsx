"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { ReactNode } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import useFetch from "@/hooks/usefetch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createAccount } from "@/action/dasboard";
import { z } from "zod";

const CreateAccountDrawer = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  type AccountFormData = z.infer<typeof accountSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT" as "CURRENT" | "SAVINGS",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [createAccountLoading, newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create Account");
      reset();
    }
  }, [error, reset]);

  const onSubmit = async (data: AccountFormData) => {
    await createAccountFn(data);
    console.log(data);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Main Checking"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Account Type
              </label>
              <Select
                onValueChange={(value: "CURRENT" | "SAVINGS") =>
                  setValue("type", value)
                }
                defaultValue={watch("type")}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium">
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.01"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <label htmlFor="isDefault" className="text-sm font-medium">
                  Set as Default
                </label>

                <p className="text-sm text-muted foreground">
                  This acount will be selected by default bu default for
                  transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                type="submit"
                className="flex-1"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
