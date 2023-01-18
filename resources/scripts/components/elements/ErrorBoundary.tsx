import React from 'react';
import tw from 'twin.macro';
import Icon from '@/components/elements/Icon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface State {
    hasError: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
// 9ET76586HC304681U_3149
class ErrorBoundary extends React.Component<{}, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error(error);
    }

    render() {
        return this.state.hasError ? (
            <div css={tw`flex items-center justify-center w-full sm:my-10 my-4`}>
                <div css={tw`flex items-center bg-dactyl-purple rounded-2xl p-3 text-dactyl-red`}>
                    <Icon icon={faExclamationTriangle} css={tw`h-4 w-auto mr-2`} />
                    <p css={tw`text-sm text-neutral-100`}>
                        An error was encountered by the application while rendering this view. Try refreshing the page.
                    </p>
                </div>
            </div>
        ) : (
            this.props.children
        );
    }
}

export default ErrorBoundary;
