import React from 'react';
import classNames from 'classnames';

interface CodeProps {
    dark?: boolean | undefined;
    className?: string;
    children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export default ({ dark, className, children }: CodeProps) => (
    <code
        className={classNames('font-mono text-sm text px-2 py-1 inline-block rounded-2xl shadow-sm', className, {
            'bg-dactyl-white2 text-dactyl-purple2': !dark,
            'bg-dactyl-purple2 text-white': dark,
        })}
    >
        {children}
    </code>
);
