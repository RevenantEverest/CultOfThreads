import { createLazyFileRoute } from '@tanstack/react-router';

import { Box } from 'reflexbox';
import { Layout, Card } from '@@components/Common';

import { IMAGE_RESOURCES } from '@@constants';

export const Route = createLazyFileRoute('/')({
    component: Index
});

function Index() {
    return(
        <Layout main>
            <Box>
                <Card className="flex items-center justify-center">
                    <img src={IMAGE_RESOURCES.LOGO_LANDSCAPE} className="w-3/6 self-center" alt="logo" />
                    <h3 className="text-muted font-semibold text-3xl">Hello!</h3>
                </Card>
            </Box>
        </Layout>
    );
};