import Background from "../Background";
import Registration from "./Registration";

const Mechanism = ({data}) => {
    return (
        data.mechanism ? <Background>
            <div className="mechanism">
                    {data.is_open && <Registration slug={data.slug} registrationFields={data.registrationFields} />}
                    <h2>{data.mechanism.title}</h2>
                    <div className="content-wysiwyg" dangerouslySetInnerHTML={{ __html: data.mechanism.content }} />
                </div>
            </Background> : null
        ) 
}

export default Mechanism;