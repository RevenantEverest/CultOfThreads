import type { TagFormValues } from '@@admin/components/Forms/TagForm';

import { useState } from 'react';
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
import TagForm from '@@admin/components/Forms/TagForm';


import { tagApi } from '@repo/supabase';

function AddTag() {

    const [visible, setVisible] = useState(false);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: tagApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] })
        }
    });

    const initialValues: TagFormValues = {
        name: ""
    };

    const onSubmit = async (values: TagFormValues) => {
        try {
            await mutation.mutateAsync({ name: values.name });

            toast((t) => (
                <ToastSuccess toast={t} message={"Tag Added!"} />
            ));

            setVisible(false);
        }
        catch(error) {
            console.error(error);
            toast((t) => (
                <ToastError toast={t} message={"Error creating Tag"} />
            ));
        }
    };

    return(
        <Dialog open={visible} onOpenChange={setVisible}>
            <DialogTrigger asChild>
                <Button className="!font-semibold !text-sm text-white bg-card-light hover:bg-card-light" onClick={() => setVisible(true)}>
                    <FaPlus />
                    Add Tag
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
                        <TagForm type="create" initialValues={initialValues} onSubmit={onSubmit} />
                    </motion.div>
                </DialogContent>
            </AnimatePresence>
        </Dialog>
    );
};

export default AddTag;