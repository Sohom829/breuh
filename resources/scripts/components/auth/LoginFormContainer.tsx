import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';
import logo from '@/assets/images/logo-dark.svg';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${breakpoint('sm')`
        ${tw`mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('xl')`
        ${tw`w-auto`}
    `};
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <div css={tw`flex justify-center flex-col`}>
        <Container>
            <FlashMessageRender css={tw`mb-2 px-1`}/>
            <div css={tw`rounded-2xl bg-white shadow-lg md:py-16 md:px-12 py-12 px-6 md:mb-8 mb-4 ease-in-out duration-300`}>
                <img css={tw`w-48 mx-auto`} src={logo} alt="logo" />
                <Form css={tw`flex flex-col`} {...props} ref={ref}>
                    {title &&
                    <h2 css={tw`text-base text-dactyl-purple2 font-medium py-4`}>
                        {title}
                    </h2>
                    }
                    <div css={tw`block w-80`}>
                        {props.children}
                    </div>
                </Form>
            </div>
            <p css={tw`text-center text-neutral-500 text-xs mt-4`}>
                &copy; 2015 - {(new Date()).getFullYear()}&nbsp;
                <a
                    rel={'noopener nofollow noreferrer'}
                    href={'https://pterodactyl.io'}
                    target={'_blank'}
                    css={tw`no-underline text-neutral-500 hover:text-neutral-300`}
                >
                    Pterodactyl Software
                </a>
            </p>
        </Container>
    </div>
));
