"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { PostForm } from "./post-form";
import { Category } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NewPostProps {
  userId: string;
  categories: Category[];
}

export function NewPost({ userId, categories }: NewPostProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          Novo Post
          <PlusIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <PostForm
          userId={userId}
          categories={categories}
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
