import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";

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
    // Assuming the form data is in the form of a FormData object
    const formData = new FormData(event.currentTarget);
    // Convert FormData to a plain object if needed
    const data = Object.fromEntries(formData.entries());
    onSubmit(data); // Call onSubmit with form data
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="" asChild>
          <button className="bg-primary/15 px-2 rounded-md">{trigger}</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            {children}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
