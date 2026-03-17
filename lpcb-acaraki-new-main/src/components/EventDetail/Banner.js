
const Banner = ({data}) => {
    return (
        <div className="banner" style={{backgroundImage: `url(${data.image})`}}>
            <div className="container">
                <h1 className="text-white">{data.title}</h1>
                {data.description && <p className="lg:text-[24px] text-[16px] font-normal text-white">{data.description}</p>}
                {data.price && data.price !== null && 
                    <div className="price">
                        <span>Total Hadiah</span>
                        <span>Rp. {new Intl.NumberFormat('id-ID').format(data.price)}</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default Banner;