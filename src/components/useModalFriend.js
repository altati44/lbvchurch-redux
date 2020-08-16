import { useState } from 'react';

const useModalFriend = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,

    }

};

export default useModalFriend;