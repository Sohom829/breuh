import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLayerGroup, faSignOutAlt, faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw, { theme } from 'twin.macro';
import styled from 'styled-components/macro';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Avatar from '@/components/Avatar';
import logo from '@/assets/images/logo.svg';

const Navigation = styled.div`
    ${tw`bg-dactyl-purple3 rounded-r-none sm:rounded-r-3xl shadow-md overflow-y-auto ease-linear duration-200 sticky top-0`};
    flex-shrink: 0;

    & > div {
        ${tw`flex items-center justify-center`};
    }

    & #logo {
        ${tw`py-6`};
        
        & > a {
            ${tw`text-2xl font-header px-4 no-underline text-neutral-200 hover:text-neutral-100 transition-colors duration-150`};
        }
    }
`;

const RightNavigation = styled.div`
    ${tw`flex-col items-center justify-center mx-4`};
    & > a, & > button, & > .navigation-link {
        ${tw`w-full py-4 my-1 items-center no-underline text-neutral-300 px-6 cursor-pointer transition-all duration-150`};
        
        &:active, &:hover {
            ${tw`text-neutral-100 mx-4 rounded-lg bg-black`};
        }
        
        &:active, &:hover, &.active {
            ${tw`bg-dactyl-purple text-dactyl-white2 rounded-lg`};
        }
    }
`;

const Button = styled.button`
    ${tw`text-left`};
`;

const Category = styled.span`
    ${tw`w-full px-4 mt-5 mb-3 uppercase font-semibold`};
`;

const AvatarWrapp = styled.div`
    ${tw`my-7 flex-col`};
    
    & .user-avatar {
        ${tw`p-1 border-3 rounded-full border-dactyl-purple4`};
    }

    & .user-email {
        ${tw`mt-2 text-base`};
    }
`;

export default () => {
    const name = useStoreState((state: ApplicationStore) => state.user.data!.username);
    const email = useStoreState((state: ApplicationStore) => state.user.data!.email).toLowerCase();
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    // Sidebar
    const [ sidebar, setSidebar ] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const NavContainer = styled.div`
        ${tw`z-40`};
        ${sidebar ? tw`w-0 fixed` : tw`w-72 fixed left-0`};

        .bars-container {
            ${tw`absolute top-0 left-0 p-3 bg-dactyl-purple z-10 text-dactyl-white2 transition duration-200 rounded-br-3xl`};

            &:hover {
                ${tw`text-dactyl-white`};
            }
        }
    `;

    return (
        <>
            <NavContainer>
                <Link to="#" className={'bars-container'} onClick={showSidebar}>
                    <FontAwesomeIcon icon={faBars} className={'icon-bars'}/>
                </Link>
            </NavContainer>
            <Navigation css={ sidebar ? tw`w-full sm:w-0 sm:h-0 h-screen` : tw`w-0 sm:w-72 h-screen`}>
                <SpinnerOverlay visible={isLoggingOut} />
                    <div id={'logo'}>
                        <Link to={'/'}>
                            <img css={tw`w-32`} src={logo} alt="logo" />
                        </Link>
                    </div>
                    <AvatarWrapp>
                        <div className={'user-avatar'}>
                            <Avatar.User size={75}/>
                        </div>
                        <p className={'user-email'}>
                            Hello, <span css={tw`text-dactyl-white2`}>{name}</span>
                        </p>
                        <p css={tw`text-sm`}>{email}</p>
                    </AvatarWrapp>
                    <RightNavigation>
                        <Category>
                            Dashboard
                        </Category>
                        <SearchContainer />
                        <NavLink to={'/'} exact>
                            <FontAwesomeIcon icon={faLayerGroup} css={tw`mr-4`}/>
                            Servers List
                        </NavLink>
                        <NavLink to={'/account'}>
                            <FontAwesomeIcon icon={faUserCircle} css={tw`mr-4`}/>
                            Account Settings
                        </NavLink>
                        {rootAdmin &&
                        <a href={'/admin'} rel={'noreferrer'} css={tw`text-yellow-400!`}>
                            <FontAwesomeIcon icon={faCogs} css={tw`mr-4`}/>
                            Admin Area
                        </a>
                        }
                        <Button onClick={onTriggerLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} css={tw`mr-4`}/>
                            Sign Out
                        </Button>
                    </RightNavigation>
            </Navigation>
        </>
    );
};
