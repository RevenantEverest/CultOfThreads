import type { CategoryFormValues } from '@@admin/components/Forms/CategoryForm';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { FaPlus } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';

import { 
    Button, 
    Dialog, 
    DialogTrigger, 
    DialogContent,
    ToastError,
    ToastSuccess
} from '@repo/ui';
import CategoryForm from '@@admin/components/Forms/CategoryForm';

import { categoryApi } from '@repo/supabase';
import { useState } from 'react';

function AddEvent() {

    const [visible, setVisible] = useState(false);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: categoryApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    });

    const initialValues: CategoryFormValues = {
        name: ""
    };

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            await mutation.mutateAsync({ name: values.name });

            toast((t) => (
                <ToastSuccess toast={t} message={"Category Added!"} />
            ));

            setVisible(false);
        }
        catch(error) {
            console.error(error);
            toast((t) => (
                <ToastError toast={t} message={"Error creating Category"} />
            ));
        }
    };

    return(
        <Dialog open={visible} onOpenChange={setVisible}>
            <DialogTrigger asChild>
                <Button className="!font-semibold !text-sm text-white bg-card-light hover:bg-card-light" onClick={() => setVisible(true)}>
                    <FaPlus />
                    Add Category
                </Button>
            </DialogTrigger>
            <AnimatePresence>
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
                        <CategoryForm type="create" initialValues={initialValues} onSubmit={onSubmit} />
                    </motion.div>
                </DialogContent>
            </AnimatePresence>
        </Dialog>
    );
};

export default AddEvent;