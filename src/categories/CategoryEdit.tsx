import { useState } from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import { useToast } from "@/components/hooks/use-toast";
import { RaInput } from "@/components/RaInput";
import { Button } from "@/components/ui/button";
import { EditBase, Form, required, useEditContext } from "ra-core";
import { Link } from "react-router-dom";
import { ToastAction } from "@radix-ui/react-toast";
import { useNotify } from "ra-core";

export const CategoryEdit = () => (
  <EditBase mutationMode="undoable">
    <CategoryEditView />
  </EditBase>
);

const CategoryEditView = () => {
  const context = useEditContext();
  const { toast } = useToast();
  const notify = useNotify();

  const [previousRecord, setPreviousRecord] = useState(context.record);

  if (context.isLoading || !context.record) {
    return null;
  }

  const handleSave = () => {
    const currentRecord = context.record;

    toast({
      title: "Edit",
      description: "Category edited successfully",
      action: (
        <ToastAction altText="Undo">
          <button
            className="px-2 m-0 mr-3 py-1 shadow-sm border-2 bg-lime-100 border-lime-700 text-lime-700 rounded"
            onClick={handleUndo}
          >
            Undo
          </button>
        </ToastAction>
      ),
    });

    setPreviousRecord(currentRecord);
    notify("Category edited successfully", { type: "success" });
  };

  const handleUndo = () => {
    context.save({ ...previousRecord });

    // Notify the user that the changes have been undone
    notify("Undo successful", { type: "info" });

    toast({
      title: "Undo successful",
      description: "Changes have been reverted.",
    });
  };

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight mb-2">
        {context.record.reference}
      </h2>
      <Breadcrumb className="mb-8">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/categories">Categories</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{context.record.name}</BreadcrumbItem>
      </Breadcrumb>
      <Form>
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <RaInput source="name" label="Name" validate={required()} />
          <div className="flex flex-row gap-4">
            <Button
              className="btn btn-primary"
              type="submit"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};
