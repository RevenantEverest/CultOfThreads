"use client"

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
    Button,
    Card,
    CardContent, 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogTitle, 
    DialogTrigger, 
    ToastSuccess
} from '@repo/ui';
import { FaNoteSticky } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'motion/react';

import CustomerNoteForm, { type CustomerNoteFormType, type CustomerNoteFormValues } from '@@shop/components/Forms/CustomerNoteForm';
import { useCartStore } from '@@shop/store/cart';

export default function CustomerNote() {

    const [open, setOpen] = useState(false);
    const customerNote = useCartStore((state) => state.customerNote);
    const setCustomerNote = useCartStore((state) => state.setCustomerNote);

    const formType: CustomerNoteFormType = customerNote !== "" ? "UPDATE" : "ADD";

    const initialValues: CustomerNoteFormValues = {
        note: customerNote
    };

    const getFormTypeLabel = () => {
        switch(formType) {
            case "ADD":
                return "Add A";
            case "UPDATE":
                return "Update";
            default:
                return "Add A"
        }
    };

    const onSubmit = async (value: CustomerNoteFormValues) => {
        setCustomerNote(value.note);

        toast((t) => (
            <ToastSuccess toast={t} message={`Personalization note ${formType === "ADD" ? "added" : "updated"}`} />
        ));

        setOpen(false);
    };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="icon" className="relative w-full" colorScheme="cardLight">
                        <FaNoteSticky />
                        {getFormTypeLabel()} Personalization Note
                    </Button>
                </DialogTrigger>
                <AnimatePresence mode="wait">
                    <DialogContent className="border-none bg-transparent border-0 m-0 p-0">
                        <motion.div
                            initial={{ y: "-100vh" }}
                            animate={{ y: "0" }}
                            exit={{ y: "-100vh" }}
                            transition={{
                                type: "spring",
                                duration: .5
                            }}
                        >
                            <Card>
                                <CardContent className="py-8 flex flex-col gap-8 w-full">
                                    <DialogClose className="absolute right-5 top-5 hover:cursor-pointer hover:text-primary hover:bg-card-light duration-150 p-1 rounded-full">
                                        <FaTimes />
                                    </DialogClose>
                                    <DialogTitle>
                                        <div className="text-center">
                                            <h1 className="text-2xl font-bold">Personalization Note</h1>
                                            <p className="font-semibold text-accent">
                                                Let us know if you want a specific color scheme for your oder, or just a friendly message!
                                            </p>
                                            <p className="font-semibold text-muted italic mt-5">Not all requests can be guaranteed.</p>
                                        </div>
                                    </DialogTitle>
                                    <div className="flex flex-col gap-4">
                                        <CustomerNoteForm
                                            type={formType}
                                            initialValues={initialValues} 
                                            onSubmit={onSubmit}
                                        />
                                        <div className="flex gap-2 items-center justify-center">
                                            <DialogClose asChild>
                                                <Button colorScheme="cardLight" className="w-full">
                                                    Close
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </DialogContent>
                </AnimatePresence>    
            </Dialog>
    );
};