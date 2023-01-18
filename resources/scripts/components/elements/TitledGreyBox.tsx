import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import tw from 'twin.macro';
import isEqual from 'react-fast-compare';

interface Props {
    icon?: IconProp;
    title: string | React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const TitledGreyBox = ({ icon, title, children, className }: Props) => (
    <div css={tw`rounded-2xl bg-white shadow-md`} className={className}>
        <div css={tw`bg-white rounded-2xl px-5 py-6`}>
            {typeof title === 'string' ?
                <div css={tw`flex items-center`}>
                    <span css={tw`w-10 h-10 p-2 border-4 rounded-full border-dactyl-orange2 text-black text-center mr-2 flex items-center justify-center`}>
                        {icon && <FontAwesomeIcon icon={icon} css={tw`text-neutral-500`}/>}
                    </span>
                    <p css={tw`text-sm text-neutral-400`}>{title}</p>
                </div>
                :
                title
            }
        </div>
        <div css={tw`px-5 pb-6`}>
            {children}
        </div>
    </div>
);

export default memo(TitledGreyBox, isEqual);
