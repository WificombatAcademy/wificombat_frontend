import React, { ReactNode, Suspense } from 'react';
import { Breadcrumbs } from './breadcrumb'; // Adjust the import path as necessary

type Props = {
    homeLabel: any;
    lightMode?: boolean;
    children: ReactNode;
}

const BreadcrumbsWrapper = ({ homeLabel, lightMode, children }: Props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Breadcrumbs homeLabel={homeLabel} />
            {children} {/* Render any children components */}
        </Suspense>
    );
};

export default BreadcrumbsWrapper;