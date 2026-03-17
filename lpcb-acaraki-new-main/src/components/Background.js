const Background = ({ children }) => {
    return (
        <div className="background-section">
            <div className="left"></div>
            <div className="right"></div>
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

export default Background;