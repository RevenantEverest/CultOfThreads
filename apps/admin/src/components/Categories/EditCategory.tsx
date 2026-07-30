import type { CategoryFormValues } from '@@admin/components/Forms/CategoryForm';
import type { Category } from '@repo/entities';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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
import CategoryForm from '@@admin/components/Forms/CategoryForm';
import { categories } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';

interface EditCategoryProps {
    category: Category
};

function EditCategory({ category }: EditCategoryProps) {

    const auth = useAuthStore((state) => state.auth);
    const [visible, setVisible] = useState(false);
    
    const queryClient = useQueryClient();
    const mutation = categories.hooks.useUpdate(queryClient);

    const initialValues: CategoryFormValues = category;

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            await mutation.mutateAsync({
                id: category.id,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    name: values.name
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Category updated successfully!"} />
            ));

            setVisible(false);
        }
        catch {
            toast((t) => (
                <ToastError toast={t} message={"Error updating Category"} />
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
                        <CategoryForm
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

export default EditCategory;