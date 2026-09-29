import type { Sale } from '@repo/entities';

import { 
    Button,
    Card,
    CardContent, 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogTitle, 
    DialogTrigger, 
    ToastError,
    ToastSuccess
} from '@repo/ui';
import { toast } from 'react-hot-toast';
import { FaTrashCan } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'motion/react';

import { useQueryClient } from '@tanstack/react-query';

import { sales } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';

interface RemoveSaleProps {
    sale: Sale
};

function RemoveSale({ sale }: RemoveSaleProps) {

    const auth = useAuthStore((state) => state.auth);

    const queryClient = useQueryClient();
    const mutation = sales.hooks.useDestroy(queryClient);

    const removeSale = async () => {
        try {
            await mutation.mutateAsync({
                id: sale.id,
                authToken: auth.session?.accessToken ?? ""
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Sale removed!"} />
            ));
        }
        catch(error) {
            console.error("Mutation Error", error);

            toast((t) => (
                <ToastError toast={t} message={"Error deleting Sale"} />
            ));
        }
    };

    return(
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="icon" className="relative">
                        <FaTrashCan />
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
                            <Card className="px-5">
                                <CardContent className="py-8 flex flex-col gap-8">
                                    <DialogClose className="absolute right-5 top-5 hover:cursor-pointer hover:text-primary hover:bg-card-light duration-150 p-1 rounded-full">
                                        <FaTimes />
                                    </DialogClose>
                                    <DialogTitle className="text-center text-xl">
                                        Are you sure you want to delete the sale for
                                        <br />
                                        <span className="text-primary font-bold ml-1">{sale.productName}</span>?
                                    </DialogTitle>
                                    <div className="flex gap-2 items-center justify-center">
                                        <Button onClick={removeSale}>
                                            Yes, delete
                                        </Button>
                                        <DialogClose asChild>
                                            <Button variant="outline">
                                                No, close
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </DialogContent>
                </AnimatePresence>    
            </Dialog>
        </>
    );
};

export default RemoveSale;