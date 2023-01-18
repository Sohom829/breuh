import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`rounded-2xl mx-3 my-3 shadow-md overflow-x-auto`};
    background-image: linear-gradient(to right, rgba(69, 60, 111, 0.8), rgba(69, 60, 111, 0.7), rgba(222, 91, 111, 0.9), rgba(178, 75, 125, 0.9), rgba(124, 68, 126, 0.8), rgba(69, 60, 111, 0.8));

    & > div {
        ${tw`flex items-center text-sm mx-auto px-2`};

        & > a, & > div {
            ${tw`inline-block py-3 px-4 text-neutral-300 no-underline whitespace-nowrap transition-all duration-150`};
            color: #eecfda;

            &:not(:first-of-type) {
                ${tw`ml-2`};
            }

            &:hover {
                ${tw`text-neutral-100`};
            }

            &:active, &.active {
                ${tw`text-neutral-100`};
                background: rgba(69, 60, 111, 0.1);
            }
        }
    }
`;

export default SubNavigation;
