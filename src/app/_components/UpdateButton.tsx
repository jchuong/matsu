"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { completeToday } from "~/app/items/actions";

interface UpdateButtonProps {
  id: number;
}
export default function UpdateButton({ id }: UpdateButtonProps) {
  return (
    <Button size="icon" variant="outline" onClick={() => completeToday(id)}>
      <CheckIcon className="h-4 w-4" />
    </Button>
  );
}
