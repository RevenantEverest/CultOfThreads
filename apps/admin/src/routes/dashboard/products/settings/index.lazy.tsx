import { createLazyFileRoute } from '@tanstack/react-router';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui';
import { CategoryContainer } from '@@admin/containers';

export const Route = createLazyFileRoute('/dashboard/products/settings/')({
    component: ProductSettings,
});

function ProductSettings() {
    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Product Settings</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Products", path: "/dashboard/products" },
                        { title: "Settings", path: "/dashboard/products/settings" }
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <Tabs defaultValue="categories">
                    <TabsList className="w-full h-11">
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                        <TabsTrigger value="tags">Tags</TabsTrigger>
                    </TabsList>
                    <TabsContent value="categories">
                        <CategoryContainer />
                    </TabsContent>
                    <TabsContent value="categories">
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};
