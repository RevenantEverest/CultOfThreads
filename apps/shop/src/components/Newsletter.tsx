import React from 'react';
import NewsletterForm from './Forms/NewsletterForm';

function Newsletter({ className }: React.HTMLAttributes<HTMLDivElement>) {


    return(
        <div className={`${className}`}>
            <NewsletterForm />
        </div>
    );
};

export default Newsletter;