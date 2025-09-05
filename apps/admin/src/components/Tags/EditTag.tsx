import type { Tag } from '@repo/supabase';
import type { TagFormValues } from '@@admin/components/Forms/TagForm';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { FaPencil } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';

import { 
    Button, 
    Dialog, 
    DialogContent, 
    DialogTrigger,
    ToastError,
    ToastSuccess
} from '@repo/ui';
import { tagApi } from '@repo/supabase';

import TagForm from '@@admin/components/Forms/TagForm';

interface EditTagProps {
    tag: Tag
};

function EditTag({ tag }: EditTagProps) {

    const [visible, setVisible] = useState(false);
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: tagApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        }
    });

    const initialValues: TagFormValues = tag;

    const onSubmit = async (values: TagFormValues) => {
        try {
            await mutation.mutateAsync({
                ...tag,
                name: values.name
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Tag updated successfully!"} />
            ));

            setVisible(false);
        }
        catch(error) {
            console.error(error);
            toast((t) => (
                <ToastError toast={t} message={"Error updating Tag"} />
            ));
        }
    };

    return(
        <Dialog open={visible} onOpenChange={setVisible}>
            <DialogTrigger asChild>
                <Button size="icon" className="relative">
                    <FaPencil />
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
                        <TagForm
                            type="update"
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                        />
                    </motion.div>
                </DialogContent>
            </AnimatePresence>
        </Dialog>
    );
};

export default EditTag;