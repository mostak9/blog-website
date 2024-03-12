import React, { useContext } from 'react';
import AnimationWrapper from '../common/page-animation';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { removeFromSession } from '../common/session';

const UserNavigationPanel = () => {
    const { userAuth: { username }, setUserAuth } = useContext(UserContext);

    const signOut = () => {
        removeFromSession("user");
        setUserAuth({access_token: null});
    }
    return (
        <AnimationWrapper transition={{ duration: 0.2 }}
        className="absolute right-0 z-50"
        >
            <div className='bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200'>
                {/* editor link */}
                <Link to="/editor" className='flex gap-2 link md:hidden pl-8 py-4'>
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link>
                {/* profile link */}
                <Link to={`/user/${username}`} className='link pl-8 py-4'>
                    Profile
                </Link>
                {/* dashboad link */}
                <Link to="/dashboard/links" className='link pl-8 py-4'>
                    Dashboard
                </Link>
                {/* profile settings  link */}
                <Link to="/settings/edit-profile" className='link pl-8 py-4'>
                    Settings
                </Link>

                {/* sign out button */}
                <span className='absolute border-t border-grey -ml-6 w-[200%]'></span>
                <button className='text-left p-4 hover:bg-grey w-full pl-8 py-4' onClick={signOut}>
                    <h1 className='text-xl font-bold mb-1'>Sign Out</h1>
                    <p className='text-dark-grey'>@{username}</p>
                </button>
            </div>
        </AnimationWrapper>
    );
};

export default UserNavigationPanel;