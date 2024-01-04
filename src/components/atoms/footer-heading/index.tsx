import { FooterHeadingProps } from '@/types/types';
import React from 'react';

export const FooterHeading: React.FC<FooterHeadingProps> = ({ title }) => {
    return (
        <h3 className="lg:pb-[24px] pb-[10px] text-black text-[18px] font-medium">
            {title}
        </h3>
    )
}
