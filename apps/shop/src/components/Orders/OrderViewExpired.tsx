import { ENV } from '@@shop/constants';

export default function OrderViewExpired() {

    return(
        <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="font-bold text-4xl">This order has expired</h1>
            <div className="flex gap-2">
                <p className="text-lg text-accent font-semibold">If you need assistance, please contact us at</p>
                <a href={`mailto:${ENV.SUPPORT_EMAIL}`} className="text-primary font-semibold underline">
                    {ENV.SUPPORT_EMAIL}
                </a>
            </div>
        </div>
    );
};