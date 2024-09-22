import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

type ModalProps = {
  trigger: string;
  title: string;
  onSubmit: (data: any) => void; // Add onSubmit prop
  children: React.ReactNode;
};

export default function Modal({
  trigger,
  title,
  onSubmit,
  children,
}: ModalProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="" asChild>
          <button className="bg-primary/15 px-2 rounded-md">{trigger}</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            {children}
            <DialogFooter>
              <button className="bg-primary/15 p-2 rounded-md" type="submit">
                Save changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
